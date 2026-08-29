import { Activity, BadgeType, FireflyResource, JournalBadge } from './types';

export const activities: Activity[] = [
  {
    id: 'kyoto-ink',
    title: 'Ink after dusk with a third-generation tattoo artist',
    city: 'Kyoto', country: 'Japan', neighbourhood: 'Shimogyo',
    image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=1400&q=85',
    category: 'ART · NIGHT', duration: '2.5 hrs', price: 82, maxPax: 2, joined: 1,
    blurb: 'Tea, sketchbooks and the stories hidden in old Japanese motifs — inside a working studio tourists usually walk past.',
    story: 'Meet after the shutters come down. You will learn how motifs travel through generations, try hand-sketching a design and finish with tea at a tiny kissaten chosen by your host.',
    hosts: [
      { id:'h1', name:'Ren', age:29, image:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85', tagline:'Tattoo apprentice · vinyl obsessive', bio:'Born in Kyoto. I collect old record sleeves, draw every day and know the late-night shops that never appear in guidebooks.', languages:['Japanese','English'], badges:['ID VERIFIED','STUDIO VERIFIED','FIRST AID'], rating:4.98, verified:true },
      { id:'h2', name:'Mio', age:31, image:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85', tagline:'Illustrator · neighbourhood archivist', bio:'I document disappearing signs and storefronts around Kyoto and turn them into little illustrated maps.', languages:['Japanese','English','Korean'], badges:['ID VERIFIED','LOCAL CREATOR'], rating:4.94, verified:true }
    ]
  },
  {
    id: 'osaka-ramen',
    title: 'Midnight ramen crawl through three 8-seat counters',
    city: 'Osaka', country: 'Japan', neighbourhood: 'Tenma',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1400&q=85',
    category: 'FOOD · AFTER DARK', duration: '3 hrs', price: 64, maxPax: 3, joined: 2,
    blurb: 'Skip famous queues. Eat where cooks know regulars by their orders and learn how Osaka talks through food.',
    story: 'Three counters, three broths, one tiny station district. Your host handles ordering, etiquette and the stories behind each shop.',
    hosts: [
      { id:'h3', name:'Daichi', age:27, image:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85', tagline:'Line cook · night cyclist', bio:'I work kitchens, ride everywhere and care deeply about broth. Ask me anything except where my favourite shop is before we match.', languages:['Japanese','English'], badges:['ID VERIFIED','FOOD HYGIENE'], rating:4.99, verified:true }
    ]
  },
  {
    id: 'oaxaca-kitchen',
    title: 'Sunday mole in a family courtyard kitchen',
    city: 'Oaxaca', country: 'Mexico', neighbourhood: 'Jalatlaco',
    image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1400&q=85',
    category: 'FOOD · HOME', duration: '4 hrs', price: 58, maxPax: 3, joined: 0,
    blurb: 'Toast, grind and taste your way through one family recipe, then eat together in the courtyard.',
    story: 'This is not a restaurant class. It is a slow Sunday cook-up hosted in a family home, with ingredients bought that morning.',
    hosts: [
      { id:'h4', name:'Sofía', age:34, image:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85', tagline:'Ceramicist · home cook', bio:'My family has lived in Oaxaca for generations. I make clay cups, cook with my aunties and love introducing people properly — not quickly.', languages:['Spanish','English'], badges:['ID VERIFIED','HOME HOST VERIFIED','FOOD HYGIENE'], rating:4.97, verified:true }
    ]
  },
  {
    id: 'sydney-ceramics',
    title: 'Clay, coffee and back-lane studios in the Inner West',
    city: 'Sydney', country: 'Australia', neighbourhood: 'Marrickville',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1400&q=85',
    category: 'CRAFT · LOCAL', duration: '3 hrs', price: 72, maxPax: 3, joined: 1,
    blurb: 'Throw a small cup, meet a working ceramicist and walk through the industrial pockets where Sydney makes things.',
    story: 'Start with a flat white, walk to a shared studio and spend an hour on clay before a final stop at a tiny local bakery.',
    hosts: [
      { id:'h5', name:'Tahlia', age:26, image:'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85', tagline:'Ceramicist · radio nerd', bio:'I grew up in Western Sydney and moved into the Inner West for the studios, music and chaos.', languages:['English'], badges:['ID VERIFIED','WORKING WITH CHILDREN','FIRST AID'], rating:4.95, verified:true }
    ]
  }
];

export const seedFirefly: FireflyResource[] = [
  { id:'WATER_143', name:'Community water point', type:'water', status:'available', updatedAt:Date.now()-4*60*1000, reports:7, confidence:0.96, distanceKm:0.4 },
  { id:'POWER_021', name:'Library charging hub', type:'power', status:'limited', updatedAt:Date.now()-11*60*1000, reports:4, confidence:0.83, distanceKm:0.7 },
  { id:'FIRST_009', name:'Pop-up first aid station', type:'firstaid', status:'available', updatedAt:Date.now()-7*60*1000, reports:5, confidence:0.91, distanceKm:1.1 },
  { id:'SHELTER_72', name:'Community safe centre', type:'shelter', status:'available', updatedAt:Date.now()-16*60*1000, reports:9, confidence:0.94, distanceKm:1.4 },
  { id:'NET_18', name:'Emergency Wi‑Fi point', type:'connectivity', status:'unavailable', updatedAt:Date.now()-3*60*1000, reports:11, confidence:0.98, distanceKm:1.8 }
];

export const badgeCatalog: BadgeType[] = [
  { emoji:'🍜', label:'Night Market Feast' },
  { emoji:'🏺', label:'Hands in Clay' },
  { emoji:'🌶️', label:'Spice Trail' },
  { emoji:'📸', label:'Street Photographer' },
  { emoji:'🌊', label:'Coastal Wander' },
  { emoji:'⛰️', label:'Mountain Trek' },
  { emoji:'🎨', label:'Local Artist' },
  { emoji:'🕯️', label:'Candlelit Evening' },
  { emoji:'🚲', label:'Two-Wheel Explorer' },
  { emoji:'🎭', label:'Festival Night' },
];

export const journalBadges: JournalBadge[] = [
  { id:'b1', emoji:'🍜', title:'After-hours Osaka', city:'Osaka', note:'Ren taught me to order from a ticket machine without panicking.', date:'18 AUG', accent:'#D96F4C', activityId:'osaka-ramen' },
  { id:'b2', emoji:'🏺', title:'Hands in Clay', city:'Sydney', note:'My cup is crooked. Keeping it forever.', date:'03 AUG', accent:'#526A58', activityId:'sydney-ceramics' },
  { id:'b3', emoji:'🌶️', title:'Courtyard Cook', city:'Oaxaca', note:'The smoked chilli was the whole point.', date:'19 JUL', accent:'#E8BD67', activityId:'oaxaca-kitchen' },
];
