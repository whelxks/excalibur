/**
 * Seeds three demo conversations for the live demo.
 *
 *   node --env-file=.env scripts/seed-chat.mjs
 *   npm run seed:chat
 *
 * Safe to re-run: channels are keyed by match ID, and the script wipes each
 * channel's messages before re-seeding so you never get doubled-up threads.
 *
 * Uses STREAM_API_SECRET, which is why this is a Node script and not app code.
 * The cast mirrors src/lib/mockData.ts — keep the IDs in sync.
 */
import { StreamChat } from 'stream-chat';

const key = process.env.EXPO_PUBLIC_STREAM_API_KEY;
const secret = process.env.STREAM_API_SECRET;
if (!key || !secret) {
  console.error('Missing EXPO_PUBLIC_STREAM_API_KEY / STREAM_API_SECRET.');
  console.error('Copy .env.example to .env and fill both in from the Stream dashboard.');
  process.exit(1);
}

const client = StreamChat.getInstance(key, secret);

const TOURIST = {
  id: 'alex',
  name: 'Alex Morgan',
  image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=85',
};

/** Every host in mockData, so channels created by swiping never hit a missing user. */
const HOSTS = [
  { id: 'h1', name: 'Ren',    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85' },
  { id: 'h2', name: 'Mio',    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85' },
  { id: 'h3', name: 'Daichi', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85' },
  { id: 'h4', name: 'Sofía',  image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85' },
  { id: 'h5', name: 'Tahlia', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85' },
];

const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

const CONVERSATIONS = [
  {
    activityId: 'kyoto-ink',
    hostId: 'h1',
    activityName: 'Ink after dusk with a third-generation tattoo artist',
    city: 'Kyoto',
    neighbourhood: 'Shimogyo',
    image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=1400&q=85',
    startedAgo: 2 * DAY,
    unread: true, // left unread so the conversations list shows a live unread dot on stage
    messages: [
      ['h1',    'Hey Alex — really glad you swiped. I saw you listed architecture and art, so this should land well.'],
      ['alex',  'Thanks Ren! I’ve been wanting to see a working studio rather than a gallery version of one.'],
      ['h1',    'That’s exactly what this is. We start after the shutters come down, so it’s just us and the light box.'],
      ['alex',  'Perfect. Where should we meet?'],
      ['h1',    'Shimogyo — I’ll send the exact pin the morning of. It’s an unmarked door, so easier if I walk you in from Gojo station.'],
      ['alex',  'Gojo station works. What time?'],
      ['h1',    '7:30pm. Come a little hungry, we finish at a kissaten around the corner and the owner makes an unreasonable amount of toast.'],
      ['alex',  'Sold. What should I bring?'],
      ['h1',    'Nothing really — sketchbooks and tea are on me. Just wear something you can sit on tatami in for a while.'],
      ['h1',    'One thing: the studio is on the second floor and there’s no lift. Let me know if that’s an issue and I’ll rearrange.'],
    ],
  },
  {
    activityId: 'osaka-ramen',
    hostId: 'h3',
    activityName: 'Midnight ramen crawl through three 8-seat counters',
    city: 'Osaka',
    neighbourhood: 'Tenma',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1400&q=85',
    startedAgo: 5 * HOUR,
    unread: false,
    messages: [
      ['alex',   'Hi Daichi — matched! Three counters in one night sounds ambitious and I’m fully in.'],
      ['h3',     'Ha, it’s less food than it sounds. Small bowls at each, otherwise you die at counter two.'],
      ['alex',   'Good, I was worried. What time?'],
      ['h3',     'We start 10:30pm at Tenma station. The first shop only gets good after the salarymen clear out.'],
      ['alex',   'That’s later than I expected — is the last train an issue?'],
      ['h3',     'We finish around 1am and you’re a 12 min walk from the loop line. I’ll get you back, I do this every week.'],
      ['alex',   'Great. Anything I should know about ordering?'],
      ['h3',     'I’ll handle all three. Two are ticket machines and the buttons are Japanese only — that’s half the reason people never go in.'],
      ['alex',   'That’s exactly the barrier I wanted help with.'],
      ['h3',     'Cash for the third one by the way, they still don’t take cards. ¥1200 should cover you.'],
      ['alex',   'Noted, I’ll bring cash.'],
    ],
  },
  {
    activityId: 'oaxaca-kitchen',
    hostId: 'h4',
    activityName: 'Sunday mole in a family courtyard kitchen',
    city: 'Oaxaca',
    neighbourhood: 'Jalatlaco',
    image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1400&q=85',
    startedAgo: 30 * MIN,
    unread: false,
    messages: [
      ['h4',    'Hola Alex! We cook this Sunday. I go to the market at 8am if you want to come for the ingredients too.'],
      ['alex',  'I’d love to do the market part. Is that extra time on top?'],
      ['h4',    'About 90 minutes more, no extra cost. Honestly the market is where you learn the most — the chillies are the whole story.'],
      ['alex',  'Then yes please. Where should we meet?'],
      ['h4',    'Jalatlaco, at the blue corner by the church. From there we walk to the market together.'],
      ['alex',  'What should I bring?'],
      ['h4',    'A bag for the market and an appetite. We eat in the courtyard at the end and my aunt does not accept small portions.'],
      ['alex',  'Understood 😄 One thing — I don’t eat pork, is that workable?'],
      ['h4',    'Completely. Our mole is chicken and I will make the stock separately. Thank you for telling me early.'],
    ],
  },
];

async function main() {
  console.log('Upserting users…');
  await client.upsertUsers([TOURIST, ...HOSTS]);
  console.log(`  ${1 + HOSTS.length} users ready`);

  for (const c of CONVERSATIONS) {
    const host = HOSTS.find(h => h.id === c.hostId);
    const matchId = `${c.activityId}__${c.hostId}__${TOURIST.id}`;

    const channel = client.channel('messaging', matchId, {
      created_by_id: c.hostId,
      members: [TOURIST.id, c.hostId],
      activity_id: c.activityId,
      activity_name: c.activityName,
      city: c.city,
      neighbourhood: c.neighbourhood,
      host_id: c.hostId,
      image: c.image,
    });
    await channel.create();

    // Idempotency: clear prior seeded messages so re-runs don't stack up.
    const existing = await channel.query({ messages: { limit: 100 } });
    for (const m of existing.messages ?? []) await client.deleteMessage(m.id, true);

    // Stream reserves created_at and only allows true backdating via its paid
    // import API, so we carry a custom sent_at field and render that instead.
    // See formatTime() in src/lib/chatFormat.ts.
    const step = c.startedAgo / (c.messages.length + 1);
    let t = Date.now() - c.startedAgo;
    for (const [senderId, text] of c.messages) {
      t += step;
      await channel.sendMessage({ text, user_id: senderId, sent_at: new Date(t).toISOString() });
    }

    if (!c.unread) await channel.markRead({ user_id: TOURIST.id });

    console.log(`  ${matchId} — ${c.messages.length} messages${c.unread ? ' (left unread)' : ''}`);
  }

  console.log('\nDone. Three conversations seeded for alex.');
}

main().catch(e => { console.error('\nSeed failed:', e.message); process.exit(1); });
