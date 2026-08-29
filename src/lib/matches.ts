import { activities } from './mockData';
import { streamClient } from './stream';
import type { Activity, Host } from './types';

/**
 * A match is a mutual right-swipe between one tourist and one host for one
 * activity. The repo has no match table yet — supabase/schema.sql models this
 * as an activity_request whose host_decision is 'accepted'. Until that is
 * wired up, matches live here and the match ID is derived, not stored.
 */
export type Match = {
  id: string;
  activityId: string;
  activityName: string;
  city: string;
  neighbourhood: string;
  image: string;
  host: Host;
  touristId: string;
};

/** The signed-in traveller. Hardcoded until real auth exists (see app/(tabs)/profile.tsx). */
export const currentUser = {
  id: 'alex',
  name: 'Alex Morgan',
  image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=85',
};

/** Stream channel IDs allow a-z A-Z 0-9 @ _ - and max 64 chars. */
export function matchId(activityId: string, hostId: string, touristId: string) {
  return `${activityId}__${hostId}__${touristId}`.replace(/[^a-zA-Z0-9@_-]/g, '-').slice(0, 64);
}

export function buildMatch(activity: Activity, host: Host, touristId = currentUser.id): Match {
  return {
    id: matchId(activity.id, host.id, touristId),
    activityId: activity.id,
    activityName: activity.title,
    city: activity.city,
    neighbourhood: activity.neighbourhood,
    image: activity.image,
    host,
    touristId,
  };
}

export function findHost(hostId?: string): Host | undefined {
  if (!hostId) return undefined;
  for (const a of activities) { const h = a.hosts.find(x => x.id === hostId); if (h) return h; }
  return undefined;
}

/** Rebuild a Match from a channel ID, so the chat screen can deep-link without app state. */
export function matchFromId(id: string): Match | undefined {
  const [activityId, hostId, touristId] = id.split('__');
  const activity = activities.find(a => a.id === activityId);
  const host = activity?.hosts.find(h => h.id === hostId);
  if (!activity || !host) return undefined;
  return buildMatch(activity, host, touristId || currentUser.id);
}

/**
 * Idempotent: the match ID is the channel ID, so calling this twice returns the
 * same channel rather than creating a duplicate.
 */
export async function ensureMatchChannel(match: Match) {
  if (!streamClient) return null;
  const channel = streamClient.channel('messaging', match.id, {
    members: [match.touristId, match.host.id],
    activity_id: match.activityId,
    activity_name: match.activityName,
    city: match.city,
    neighbourhood: match.neighbourhood,
    host_id: match.host.id,
    image: match.image,
  } as any);
  await channel.watch();
  return channel;
}
