import { StreamChat } from 'stream-chat';

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;
const userToken = process.env.EXPO_PUBLIC_STREAM_USER_TOKEN;

/** Mirrors the hasSupabase pattern: the app still runs without a key, chat just stays empty. */
export const hasStream = Boolean(apiKey);

export const streamClient = hasStream ? StreamChat.getInstance(apiKey!) : null;

let connecting: Promise<void> | null = null;

/**
 * No token server, as specified.
 *
 * Prefers a pre-generated signed token from .env. We cannot use client.devToken()
 * here because Stream only accepts dev tokens on apps with "Disable Auth Checks"
 * enabled, and refuses that flag on Production apps (error 17). The devToken call
 * is kept as a fallback so this still works against a Development app.
 *
 * Generate a token with: node --env-file=.env scripts/stream-token.mjs <userId>
 */
export async function connectStreamUser(user: { id: string; name: string; image?: string }) {
  if (!streamClient) return;
  if (streamClient.userID === user.id) return;
  if (connecting) return connecting;
  const token = userToken || streamClient.devToken(user.id);
  connecting = streamClient
    .connectUser(user, token)
    .then(() => undefined)
    .finally(() => { connecting = null; });
  return connecting;
}

export async function disconnectStreamUser() {
  if (streamClient?.userID) await streamClient.disconnectUser();
}
