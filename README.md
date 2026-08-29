# EVERY TOURIST

### Don’t visit. Belong for a moment.

A mobile-first cultural travel marketplace for tiny groups (1–3 tourists), verified local hosts, mutual matching, encrypted group chat, collectible travel journals, and **Firefly** offline emergency-resource exchange.

## What is already built in this prototype

- Destination entry by country + city
- Editorial local-activity discovery feed
- Capacity / joined / spots-left indicators
- Activity details + safety/verification presentation
- Tinder-style swipe deck for choosing a host
- Host-side traveller review + accept/pass workflow
- Match-unlocked 1:1 messaging on Stream Chat (conversations list + chat screen)
- Client-side encryption helpers using TweetNaCl `secretbox` (see note below — no longer wired to the UI)
- Journal with collectible passport-style badges and notes
- Firefly dark-mode resource cache
- Firefly **QR share + camera scan + deterministic cache merge** that works locally without a backend handshake
- Supabase/Postgres schema with RLS, matching tables, encrypted-message storage, badges, Firefly data, and a trigger that creates a booking/chat when the group reaches capacity
- Immediate demo-mode data so the UI works before Supabase is configured

## Run it

Current Expo docs list SDK 57 with React Native 0.86 / React 19.2.3, which this scaffold targets.

```bash
cd every-tourist
npm install
npx expo install --fix
npx expo start
```

Scan the Expo QR with a phone or launch a simulator.

## Messaging (Stream Chat)

Chat runs on [Stream](https://getstream.io). A Stream channel of type `messaging`
represents one match; the match ID is the channel ID, so creating a channel twice
is a no-op. The activity name and city ride along as custom channel data, which is
what the chat header and the conversations list render.

1. Create a Stream app and copy the **Key** and **Secret**.
2. `cp .env.example .env` and fill in `EXPO_PUBLIC_STREAM_API_KEY` and `STREAM_API_SECRET`.
3. Generate a token for the demo traveller and add it to `.env`:

```bash
node --env-file=.env scripts/stream-token.mjs alex
```

4. Seed the demo conversations:

```bash
npm run seed:chat
```

Without `EXPO_PUBLIC_STREAM_API_KEY` the app still runs — the Messages tab just
shows an empty state, the same way the app falls back to mock data without Supabase.

### Why a signed token and not `devToken`

Stream only accepts `client.devToken()` on apps with **Disable Auth Checks**
enabled, and it refuses that flag on Production apps (`error 17`). So
`scripts/stream-token.mjs` pre-generates a long-lived signed user token instead.
This still needs no token server, and is narrower than a dev token: it authorises
one user, rather than letting anyone holding the public key connect as anyone.

Before production, replace the static token with a real token endpoint that mints
short-lived tokens after authenticating the user.

### Seeded timestamps

`message.created_at` is reserved by Stream, and genuine backdating requires their
paid import API. Seeded messages therefore carry a custom `sent_at` field, and the
UI renders that in preference to `created_at` (`src/lib/chatFormat.ts`).

## Connect the real backend

1. Create a Supabase project.
2. Open **SQL Editor** and run `supabase/schema.sql`.
3. Copy `.env.example` to `.env`.
4. Fill in:

```env
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

5. Restart Expo.

Supabase's current Expo quickstart uses `@supabase/supabase-js`, Expo-compatible session persistence, and `EXPO_PUBLIC_*` environment variables; this project follows that pattern.

## Encryption design

> **Status:** superseded. The group chat screen now runs on Stream Chat, which
> stores message text server-side, so the encrypted path below is no longer
> reachable from the UI. `src/lib/crypto.ts`, `src/lib/chat.ts` and the
> `chat_key_envelopes` table are all still present. Re-wiring them means either
> encrypting message text before handing it to Stream, or moving messaging back
> onto Supabase.

`src/lib/crypto.ts` implements a practical **E2EE foundation** rather than pretending plain TLS is end-to-end encryption:

1. Each user gets a NaCl public/private keypair stored locally in `expo-secure-store`.
2. A confirmed chat gets a random symmetric secretbox key.
3. That key can be wrapped separately to each member using `nacl.box` and the recipient's public key.
4. Message plaintext is encrypted on-device with `nacl.secretbox`.
5. Supabase stores only `ciphertext`, `nonce`, sender ID, and timestamps.

The schema includes `chat_key_envelopes` to store wrapped group keys.

**Important:** this is a serious prototype architecture, but it has not undergone a professional cryptographic/security audit and is not a drop-in implementation of the full Signal Protocol. Before production, add key verification, multi-device handling, secure recovery, attachment encryption, abuse reporting safeguards, and a security review.

## Firefly merge rule in the prototype

Every resource has an ID, status, timestamp, report count and confidence. When two phones exchange a QR payload:

- unseen records are added;
- a newer observation replaces an older observation;
- if timestamps tie, the higher-confidence record wins;
- the merged cache is stored in AsyncStorage.

The next technical step is to replace this simple last-writer/confidence merge with signed reports, provenance tracking, bounded payload chunks, expiry/decay, and CRDT-style conflict handling.

## Main folders

```text
app/
  index.tsx                 destination / onboarding
  (tabs)/discover.tsx       experience feed
  activity/[id].tsx         activity details
  swipe/[activityId].tsx    host swipe deck
  host-dashboard.tsx        host reviews tourists
  chat/[id].tsx             Stream chat screen (custom header + quick replies)
  host/[id].tsx             host profile
  (tabs)/messages.tsx       conversations list
  (tabs)/journal.tsx        badges + notes
  (tabs)/firefly.tsx        offline resources
  firefly-sync.tsx          QR share / scan
  (tabs)/profile.tsx        traveller identity + host switch
src/
  lib/crypto.ts             encryption helpers
  lib/chat.ts               encrypted message persistence (unused, see above)
  lib/stream.ts             Stream client + connection
  lib/matches.ts            match model + channel creation
  components/chat/          themed message list, bubbles, composer, quick replies
  lib/firefly.ts            offline resource cache + merge
  lib/supabase.ts           backend client
  lib/mockData.ts           instant demo dataset
supabase/
  schema.sql                backend schema + RLS + matching trigger
scripts/
  seed-chat.mjs             demo conversations
  stream-token.mjs          signed user token generator
```

## Product rules represented

- Experiences are intentionally tiny: database constrains `max_pax` to **1–3**.
- Tourists choose the experience first, then swipe hosts.
- Hosts can accept/reject tourists.
- When accepted tourists reach the experience capacity, the database trigger confirms the booking and creates a group chat.
- Journal badges are linked to users and optionally the activity that earned them.
- Host credentials live separately from profiles so verification can be moderated.

## Before App Store production

Add real authentication screens, payments/payouts, host identity/KYC provider, background checks where appropriate, credential-review tooling, push notifications, cancellation/refund rules, map provider, moderation, report/block flows, age/safety policy, production E2EE key lifecycle, analytics/observability, accessibility testing, localization, legal/privacy copy, and image licensing.

The remote Unsplash photography in `mockData.ts` is prototype content only; replace it with licensed host/activity media before release.

# How to run

1. Ensure you have node downloaded
   https://nodejs.org/en/download

2. Create .env file and replace key, values by asking any team member

3. Run these commands

```
node -v
npm i
npx expo start
```

4. View locally
   http://localhost:8081
