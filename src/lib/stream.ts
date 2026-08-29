import { StreamChat } from 'stream-chat';

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;

/** Mirrors the hasSupabase pattern: the app still runs without a key, chat just stays empty. */
export const hasStream = Boolean(apiKey);

export const streamClient = hasStream ? StreamChat.getInstance(apiKey!) : null;

let connecting: Promise<void> | null = null;

/**
 * Dev tokens are signed client-side, so there is no token server to run.
 * Fine for a hackathon demo — swap for a real token endpoint before production,
 * and turn OFF "Disable Auth Checks" in the Stream dashboard.
 */
export async function connectStreamUser(user: { id: string; name: string; image?: string }) {
  if (!streamClient) return;
  if (streamClient.userID === user.id) return;
  if (connecting) return connecting;
  connecting = streamClient
    .connectUser(user, streamClient.devToken(user.id))
    .then(() => undefined)
    .finally(() => { connecting = null; });
  return connecting;
}

export async function disconnectStreamUser() {
  if (streamClient?.userID) await streamClient.disconnectUser();
}
