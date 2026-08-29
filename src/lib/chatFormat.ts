import type { MessageResponse } from 'stream-chat';

/**
 * Seeded messages carry a custom sent_at because Stream reserves created_at
 * and only allows real backdating through its paid import API.
 */
export function messageTime(m: { sent_at?: string; created_at?: string | Date }): Date {
  const raw = (m as any).sent_at ?? m.created_at ?? Date.now();
  return raw instanceof Date ? raw : new Date(raw);
}

/** "14:32" — used under message bubbles. */
export function clockTime(m: Parameters<typeof messageTime>[0]) {
  return messageTime(m).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/** "now" / "12m" / "5h" / "2d" / "14 Aug" — used in the conversations list. */
export function relativeTime(date?: Date | string | null) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  const mins = Math.floor((Date.now() - d.getTime()) / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return d.toLocaleDateString([], { day: 'numeric', month: 'short' });
}

/** Newest message wins, preferring sent_at so seeded threads sort believably. */
export function latestMessage(messages: MessageResponse[] = []) {
  return messages.length ? messages[messages.length - 1] : undefined;
}
