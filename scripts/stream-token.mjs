/**
 * Prints a long-lived Stream user token.
 *   node --env-file=.env scripts/stream-token.mjs alex
 *
 * Needed because dev tokens (client.devToken) only work on apps with
 * "Disable Auth Checks" enabled, and Stream refuses that flag on Production
 * apps. A signed user token keeps auth checks on and still needs no server.
 */
import { StreamChat } from 'stream-chat';

const userId = process.argv[2] || 'alex';
const key = process.env.EXPO_PUBLIC_STREAM_API_KEY;
const secret = process.env.STREAM_API_SECRET;
if (!key || !secret) { console.error('Missing EXPO_PUBLIC_STREAM_API_KEY / STREAM_API_SECRET in .env'); process.exit(1); }

const client = StreamChat.getInstance(key, secret);
console.log(client.createToken(userId));
