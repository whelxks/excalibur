import { Activity, BadgeType, FireflyResource, JournalBadge } from "./types";

export const activities: Activity[] = [
  {
    id: "kiama-blowhole-dawn",
    title: "Dawn rock platform walk with a Yuin knowledge holder",
    city: "Kiama",
    country: "Australia",
    neighbourhood: "Blowhole Point",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=85",
    category: "CULTURE · DAWN",
    duration: "2 hrs",
    price: 0,
    maxPax: 3,
    joined: 1,
    blurb:
      "Skip the lookout crowds. Walk the rock platforms at first light and hear the Country the blowhole actually sits on.",
    story:
      "Long before the tour buses arrive, you will walk the basalt platforms with a Yuin knowledge holder who shares stories, bush foods and the real names for places most visitors only photograph.",
    hosts: [
      {
        id: "h6",
        name: "Warrick",
        age: 52,
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
        tagline: "Yuin knowledge holder · fisherman",
        bio: "I have walked this coastline my whole life. I share what my elders taught me, at the pace it deserves.",
        languages: ["English"],
        badges: ["ID VERIFIED", "CULTURAL GUIDE", "FIRST AID"],
        certifications: [
          "Yuin Cultural Guide Certified",
          "Advanced First Aid",
          "Ocean Rescue Certified",
        ],
        rating: 4.99,
        verified: true,
      },
      {
        id: "h19",
        name: "Kayleen",
        age: 44,
        image:
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85",
        tagline: "Yuin ranger · bush foods educator",
        bio: "I work as a land ranger and run bush food walks on weekends. This coast raised me and I want to pass that on properly.",
        languages: ["English"],
        badges: ["ID VERIFIED", "CULTURAL GUIDE"],
        certifications: [
          "Certified Bush Food Educator",
          "Working With Children Check",
          "Cert III Conservation & Land Management",
        ],
        rating: 4.97,
        verified: true,
      },
    ],
  },
  {
    id: "kiama-pottery-shed",
    title: "Wood-fired pottery in a dairy-country tin shed",
    city: "Kiama",
    country: "Australia",
    neighbourhood: "Jamberoo",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1400&q=85",
    category: "CRAFT · RURAL",
    duration: "3 hrs",
    price: 74,
    maxPax: 2,
    joined: 0,
    blurb:
      "A working potter in the green hills behind Kiama, firing in a kiln she built herself. No showroom, no script.",
    story:
      "Drive up into the Jamberoo valley to a converted dairy shed. Throw a small piece, load the wood kiln, and talk dairy-town history over tea from cups she made last season.",
    hosts: [
      {
        id: "h7",
        name: "Fern",
        age: 47,
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
        tagline: "Potter · third-generation dairy family",
        bio: "My family has farmed this valley for three generations. I traded cows for clay but never left the hill.",
        languages: ["English"],
        badges: ["ID VERIFIED", "STUDIO VERIFIED"],
        certifications: ["Cert IV Ceramics", "Kiln Safety Certified"],
        rating: 4.96,
        verified: true,
      },
      {
        id: "h20",
        name: "Noah",
        age: 29,
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
        tagline: "Apprentice potter · Fern's studio hand",
        bio: "I moved down from Sydney to apprentice under Fern. I teach the beginner sessions while she's on the wheel.",
        languages: ["English"],
        badges: ["ID VERIFIED", "STUDIO VERIFIED"],
        certifications: ["Working With Children Check", "First Aid Certified"],
        rating: 4.88,
        verified: true,
      },
    ],
  },
  {
    id: "kiama-cheese-cellar",
    title: "Cellar tastings at a family dairy most tourists drive past",
    city: "Kiama",
    country: "Australia",
    neighbourhood: "Jamberoo Valley",
    image:
      "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1400&q=85",
    category: "FOOD · FARM",
    duration: "2.5 hrs",
    price: 55,
    maxPax: 3,
    joined: 2,
    blurb:
      "Kiama built its name on dairy, not blowholes. Taste the cheeses, curds and cultures a working farm actually eats.",
    story:
      "This is not a cellar door built for coaches. You will walk the paddocks, watch the afternoon milking and taste small-batch cheese in the same room the family eats dinner in.",
    hosts: [
      {
        id: "h8",
        name: "Declan",
        age: 38,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
        tagline: "Dairy farmer · cheesemaker",
        bio: "Fourth generation on this land. I make cheese the way my grandmother did, just with better fridges.",
        languages: ["English"],
        badges: ["ID VERIFIED", "FOOD HYGIENE", "FARM SAFETY"],
        certifications: [
          "Cert III Food Processing (Cheesemaking)",
          "HACCP Food Safety Certified",
          "Farm Safety Induction",
        ],
        rating: 4.93,
        verified: true,
      },
      {
        id: "h21",
        name: "Priya",
        age: 41,
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85",
        tagline: "Farm manager · Declan's business partner",
        bio: "I run the day-to-day of the farm and lead most of the tastings while Declan's out with the herd.",
        languages: ["English", "Hindi"],
        badges: ["ID VERIFIED", "FOOD HYGIENE"],
        certifications: [
          "Food Safety Supervisor Certified",
          "Working With Children Check",
        ],
        rating: 4.9,
        verified: true,
      },
    ],
  },
  {
    id: "kiama-shaping-bay",
    title: "Shape a handplane with a shaper who never sells online",
    city: "Kiama",
    country: "Australia",
    neighbourhood: "Bombo",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1400&q=85",
    category: "CRAFT · COASTAL",
    duration: "3 hrs",
    price: 79,
    maxPax: 2,
    joined: 0,
    blurb:
      "A backyard shaping bay behind the basalt quarry. Sand your own handplane, then test it in the bay out front.",
    story:
      "Learn foam, resin and the quiet obsessiveness of hand-shaping from someone who has shaped boards from this same shed for twenty years and only ever sells word-of-mouth.",
    hosts: [
      {
        id: "h9",
        name: "Ash",
        age: 44,
        image:
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85",
        tagline: "Shaper · quarry-town local",
        bio: "I have shaped boards out of this shed since I was nineteen. I still surf the same bay every morning.",
        languages: ["English"],
        badges: ["ID VERIFIED", "WORKSHOP VERIFIED"],
        certifications: [
          "Advanced Surf Coach Certified",
          "Workshop Safety Certified",
        ],
        rating: 4.98,
        verified: true,
      },
      {
        id: "h22",
        name: "Blake",
        age: 24,
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
        tagline: "Junior shaper · surf instructor",
        bio: "I learned to shape under Ash and now teach the handplane basics while he sands the bigger orders.",
        languages: ["English"],
        badges: ["ID VERIFIED", "WORKSHOP VERIFIED"],
        certifications: [
          "Surf Instructor Certified",
          "Working With Children Check",
          "First Aid Certified",
        ],
        rating: 4.85,
        verified: true,
      },
    ],
  },
  {
    id: "kyoto-ink",
    title: "Ink after dusk with a third-generation tattoo artist",
    city: "Kyoto",
    country: "Japan",
    neighbourhood: "Shimogyo",
    image:
      "https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=1400&q=85",
    category: "ART · NIGHT",
    duration: "2.5 hrs",
    price: 82,
    maxPax: 2,
    joined: 1,
    blurb:
      "Tea, sketchbooks and the stories hidden in old Japanese motifs — inside a working studio tourists usually walk past.",
    story:
      "Meet after the shutters come down. You will learn how motifs travel through generations, try hand-sketching a design and finish with tea at a tiny kissaten chosen by your host.",
    hosts: [
      {
        id: "h1",
        name: "Ren",
        age: 29,
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
        tagline: "Tattoo apprentice · vinyl obsessive",
        bio: "Born in Kyoto. I collect old record sleeves, draw every day and know the late-night shops that never appear in guidebooks.",
        languages: ["Japanese", "English"],
        badges: ["ID VERIFIED", "STUDIO VERIFIED", "FIRST AID"],
        certifications: [
          "Licensed Tattoo Apprentice",
          "Bloodborne Pathogens Certified",
          "First Aid Certified",
        ],
        rating: 4.98,
        verified: true,
      },
      {
        id: "h2",
        name: "Mio",
        age: 31,
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85",
        tagline: "Illustrator · neighbourhood archivist",
        bio: "I document disappearing signs and storefronts around Kyoto and turn them into little illustrated maps.",
        languages: ["Japanese", "English", "Korean"],
        badges: ["ID VERIFIED", "LOCAL CREATOR"],
        certifications: ["Certified Local Guide (Kyoto City)"],
        rating: 4.94,
        verified: true,
      },
    ],
  },
  {
    id: "osaka-ramen",
    title: "Midnight ramen crawl through three 8-seat counters",
    city: "Osaka",
    country: "Japan",
    neighbourhood: "Tenma",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1400&q=85",
    category: "FOOD · AFTER DARK",
    duration: "3 hrs",
    price: 64,
    maxPax: 3,
    joined: 2,
    blurb:
      "Skip famous queues. Eat where cooks know regulars by their orders and learn how Osaka talks through food.",
    story:
      "Three counters, three broths, one tiny station district. Your host handles ordering, etiquette and the stories behind each shop.",
    hosts: [
      {
        id: "h3",
        name: "Daichi",
        age: 27,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
        tagline: "Line cook · night cyclist",
        bio: "I work kitchens, ride everywhere and care deeply about broth. Ask me anything except where my favourite shop is before we match.",
        languages: ["Japanese", "English"],
        badges: ["ID VERIFIED", "FOOD HYGIENE"],
        certifications: [
          "Food Hygiene Certified",
          "Certified Line Cook (Level 2)",
        ],
        rating: 4.99,
        verified: true,
      },
    ],
  },
  {
    id: "oaxaca-kitchen",
    title: "Sunday mole in a family courtyard kitchen",
    city: "Oaxaca",
    country: "Mexico",
    neighbourhood: "Jalatlaco",
    image:
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1400&q=85",
    category: "FOOD · HOME",
    duration: "4 hrs",
    price: 58,
    maxPax: 3,
    joined: 0,
    blurb:
      "Toast, grind and taste your way through one family recipe, then eat together in the courtyard.",
    story:
      "This is not a restaurant class. It is a slow Sunday cook-up hosted in a family home, with ingredients bought that morning.",
    hosts: [
      {
        id: "h4",
        name: "Sofía",
        age: 34,
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
        tagline: "Ceramicist · home cook",
        bio: "My family has lived in Oaxaca for generations. I make clay cups, cook with my aunties and love introducing people properly — not quickly.",
        languages: ["Spanish", "English"],
        badges: ["ID VERIFIED", "HOME HOST VERIFIED", "FOOD HYGIENE"],
        certifications: [
          "Home Host Verified (Safety Inspection)",
          "Food Hygiene Certified",
        ],
        rating: 4.97,
        verified: true,
      },
    ],
  },
  {
    id: "sydney-ceramics",
    title: "Clay, coffee and back-lane studios in the Inner West",
    city: "Sydney",
    country: "Australia",
    neighbourhood: "Marrickville",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1400&q=85",
    category: "CRAFT · LOCAL",
    duration: "3 hrs",
    price: 72,
    maxPax: 3,
    joined: 1,
    blurb:
      "Throw a small cup, meet a working ceramicist and walk through the industrial pockets where Sydney makes things.",
    story:
      "Start with a flat white, walk to a shared studio and spend an hour on clay before a final stop at a tiny local bakery.",
    hosts: [
      {
        id: "h5",
        name: "Tahlia",
        age: 26,
        image:
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85",
        tagline: "Ceramicist · radio nerd",
        bio: "I grew up in Western Sydney and moved into the Inner West for the studios, music and chaos.",
        languages: ["English"],
        badges: ["ID VERIFIED", "WORKING WITH CHILDREN", "FIRST AID"],
        certifications: [
          "Cert IV Ceramics",
          "Working With Children Check",
          "First Aid Certified",
        ],
        rating: 4.95,
        verified: true,
      },
    ],
  },
  {
    id: "takayama-woodwork",
    title: "Carve a sake cup with a shrine carpenter's apprentice",
    city: "Takayama",
    country: "Japan",
    neighbourhood: "Sanmachi Suji",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1400&q=85",
    category: "CRAFT · HERITAGE",
    duration: "2.5 hrs",
    price: 70,
    maxPax: 2,
    joined: 0,
    blurb:
      "Learn the joinery tricks used on Takayama's shrines and floats, in a workshop still standing after five generations.",
    story:
      "Behind the old merchant houses, a carpentry family has kept shrine-building techniques alive for generations. Spend an afternoon learning basic joinery and carve a small sake cup to take home.",
    hosts: [
      {
        id: "h10",
        name: "Kenji",
        age: 41,
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
        tagline: "Shrine carpenter · woodworker",
        bio: "My family has repaired Takayama's floats for five generations. I teach the joinery most visitors never see up close.",
        languages: ["Japanese", "English"],
        badges: ["ID VERIFIED", "STUDIO VERIFIED"],
        certifications: [
          "Traditional Miyadaiku Carpentry Certification",
          "Workshop Safety Certified",
        ],
        rating: 4.97,
        verified: true,
      },
    ],
  },
  {
    id: "naoshima-fisherman-art",
    title: "Fishing at dawn, then a private look at an island artist's studio",
    city: "Naoshima",
    country: "Japan",
    neighbourhood: "Honmura",
    image:
      "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=1400&q=85",
    category: "ART · DAWN",
    duration: "3.5 hrs",
    price: 76,
    maxPax: 2,
    joined: 1,
    blurb:
      "Skip the museum queues. Go out on the water with a fisherman-turned-sculptor and see where island art actually starts.",
    story:
      "Naoshima is known for its museums, but this island's art scene grew out of its fishing village. Head out on a small boat at sunrise, then visit a working studio in a converted fisherman's house.",
    hosts: [
      {
        id: "h11",
        name: "Isamu",
        age: 56,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
        tagline: "Fisherman · sculptor",
        bio: "I fished these waters for thirty years before I started welding scrap into sculpture. Both are still who I am.",
        languages: ["Japanese"],
        badges: ["ID VERIFIED", "BOAT SAFETY"],
        certifications: [
          "Small Craft Boat License",
          "Maritime Safety Certified",
        ],
        rating: 4.95,
        verified: true,
      },
    ],
  },
  {
    id: "yufuin-onsen-kitchen",
    title: "Steam-cooked mountain vegetables at a family ryokan kitchen",
    city: "Yufuin",
    country: "Japan",
    neighbourhood: "Kawakami",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=85",
    category: "FOOD · HOME",
    duration: "3 hrs",
    price: 62,
    maxPax: 3,
    joined: 2,
    blurb:
      "Learn jigoku-mushi steam cooking from a ryokan family, using vegetables pulled straight from their own mountain garden.",
    story:
      "Long before Yufuin had cafés, families cooked over natural steam vents. Join a small ryokan's kitchen to harvest, prepare and steam a full mountain-vegetable meal the old way.",
    hosts: [
      {
        id: "h12",
        name: "Yuki",
        age: 37,
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85",
        tagline: "Ryokan cook · garden keeper",
        bio: "I grew up cooking over the same steam vents my grandmother used. I still grow everything we serve.",
        languages: ["Japanese", "English"],
        badges: ["ID VERIFIED", "FOOD HYGIENE"],
        certifications: [
          "Food Hygiene Certified",
          "Ryokan Hospitality Certified",
        ],
        rating: 4.98,
        verified: true,
      },
    ],
  },
  {
    id: "nimbin-permaculture",
    title: "Permaculture farm walk with a founding commune family",
    city: "Nimbin",
    country: "Australia",
    neighbourhood: "Tuntable Falls",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85",
    category: "CULTURE · RURAL",
    duration: "3 hrs",
    price: 0,
    maxPax: 4,
    joined: 1,
    blurb:
      "Nimbin's story is bigger than its main street. Walk one of Australia's oldest intentional communities with someone who grew up there.",
    story:
      "Long before Nimbin became a name tourists recognise, families built off-grid communities in these hills. Walk the food forests and hear what actually happened here, from someone raised on the land.",
    hosts: [
      {
        id: "h13",
        name: "River",
        age: 44,
        image:
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=85",
        tagline: "Farmer · second-generation commune kid",
        bio: "I was born in these hills. I still farm the same food forest my parents planted in the seventies.",
        languages: ["English"],
        badges: ["ID VERIFIED", "FARM SAFETY"],
        certifications: [
          "Permaculture Design Certificate",
          "Farm Safety Induction",
        ],
        rating: 4.9,
        verified: true,
      },
    ],
  },
  {
    id: "margaret-river-craft-brew",
    title: "Barrel-room tasting with a one-woman brewery behind the vineyards",
    city: "Margaret River",
    country: "Australia",
    neighbourhood: "Rosa Brook",
    image:
      "https://images.unsplash.com/photo-1436076863939-06870fe779c2?auto=format&fit=crop&w=1400&q=85",
    category: "FOOD · CRAFT",
    duration: "2 hrs",
    price: 65,
    maxPax: 3,
    joined: 0,
    blurb:
      "Everyone knows the wineries. Few know the tiny barrel-aged brewery running out of a converted dairy shed nearby.",
    story:
      "Skip the cellar-door coaches. Taste barrel-aged sours and farmhouse ales straight from the tank with the brewer who built the place herself, plank by plank.",
    hosts: [
      {
        id: "h14",
        name: "Georgia",
        age: 33,
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
        tagline: "Brewer · ex-vineyard hand",
        bio: "I worked vintage for six years before building my own brewery in an old dairy shed. Small batches, no distributor.",
        languages: ["English"],
        badges: ["ID VERIFIED", "FOOD HYGIENE"],
        certifications: [
          "Cert III Food Processing (Brewing)",
          "Responsible Service of Alcohol (RSA)",
        ],
        rating: 4.96,
        verified: true,
      },
    ],
  },
  {
    id: "matera-cave-bread",
    title: "Bake bread in a working cave oven with a Sassi family",
    city: "Matera",
    country: "Italy",
    neighbourhood: "Sasso Caveoso",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=85",
    category: "FOOD · HERITAGE",
    duration: "3 hrs",
    price: 60,
    maxPax: 3,
    joined: 2,
    blurb:
      "Matera's cave dwellings are famous for tourists to photograph. This one still bakes bread the way it has for centuries.",
    story:
      "Enter a real, lived-in sasso home and learn the wheat-stamping and wood-oven technique passed down through one family, then share the loaf warm with olive oil and stories about life in the caves.",
    hosts: [
      {
        id: "h15",
        name: "Rocco",
        age: 58,
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
        tagline: "Baker · Sassi resident",
        bio: "My family never left the caves when others did. I still bake bread the way my nonna taught me, in the same oven.",
        languages: ["Italian", "English"],
        badges: ["ID VERIFIED", "FOOD HYGIENE"],
        certifications: [
          "HACCP Food Safety Certified",
          "Traditional Wood-Oven Baking Certificate",
        ],
        rating: 4.99,
        verified: true,
      },
    ],
  },
  {
    id: "alberobello-trullo-stone",
    title: "Learn dry-stone trullo building from the family who repairs them",
    city: "Alberobello",
    country: "Italy",
    neighbourhood: "Rione Monti",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=85",
    category: "CRAFT · HERITAGE",
    duration: "2.5 hrs",
    price: 66,
    maxPax: 2,
    joined: 0,
    blurb:
      "Trulli look ancient and fragile, but this family has kept the dry-stone technique alive for generations, no mortar at all.",
    story:
      "Learn how trulli stay standing without mortar, try stacking stone yourself, and hear what it is actually like to live in one instead of just photograph it from the street.",
    hosts: [
      {
        id: "h16",
        name: "Vito",
        age: 49,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
        tagline: "Stonemason · trullo repairer",
        bio: "I have repaired trulli since I was a teenager, the same dry-stone way my grandfather taught me.",
        languages: ["Italian", "English"],
        badges: ["ID VERIFIED", "WORKSHOP VERIFIED"],
        certifications: [
          "Traditional Dry-Stone Masonry Certification",
          "Workshop Safety Certified",
        ],
        rating: 4.94,
        verified: true,
      },
    ],
  },
  {
    id: "orvieto-underground-wine",
    title: "Underground cellar tasting in Etruscan tunnels beneath the town",
    city: "Orvieto",
    country: "Italy",
    neighbourhood: "Centro Storico",
    image:
      "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=1400&q=85",
    category: "FOOD · NIGHT",
    duration: "2 hrs",
    price: 57,
    maxPax: 4,
    joined: 1,
    blurb:
      "Beneath the cathedral crowds, an Etruscan tunnel network still holds a family's wine cellar and centuries of tuff-cut caves.",
    story:
      "Descend into tunnels first dug by the Etruscans, now used by one family to age their wine at a constant natural temperature. Taste by candlelight and hear the tunnel's older, stranger history.",
    hosts: [
      {
        id: "h17",
        name: "Chiara",
        age: 39,
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85",
        tagline: "Winemaker · cave keeper",
        bio: "My family has aged wine in these tunnels for three generations. I know every turn in the dark.",
        languages: ["Italian", "English"],
        badges: ["ID VERIFIED", "FOOD HYGIENE"],
        certifications: [
          "Sommelier Certification (Level 2)",
          "Food Hygiene Certified",
        ],
        rating: 4.97,
        verified: true,
      },
    ],
  },
  {
    id: "kiama-coast-walk-local",
    title: "A local's honest walking tour of Kiama, blowhole included",
    city: "Kiama",
    country: "Australia",
    neighbourhood: "Kiama Town Centre",
    image:
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1400&q=85",
    category: "CULTURE · SIGHTSEEING",
    duration: "2 hrs",
    price: 0,
    maxPax: 6,
    joined: 3,
    blurb:
      "Yes, you will see the blowhole. But also the parts of town locals actually love, told by someone who grew up here.",
    story:
      "A relaxed group walk through Kiama with a local who skips the tour-script and tells it straight — including which lookouts are worth the walk, which cafés are actually good, and the town's dairy and quarrying history behind the postcard views.",
    hosts: [
      {
        id: "h18",
        name: "Mel",
        age: 35,
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
        tagline: "Kiama local · former tour guide",
        bio: "I grew up here and used to guide the big coach tours. Now I do it my way, smaller and more honest.",
        languages: ["English"],
        badges: ["ID VERIFIED", "TOUR GUIDE LICENSED", "FIRST AID"],
        certifications: [
          "NSW Tour Guide License",
          "Advanced First Aid",
          "Working With Children Check",
        ],
        rating: 4.92,
        verified: true,
      },
      {
        id: "h23",
        name: "Sam",
        age: 30,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
        tagline: "Local historian · Mel's walking partner",
        bio: "I run the local history Facebook page and know every old building's backstory. I tag-team the walks with Mel.",
        languages: ["English"],
        badges: ["ID VERIFIED", "TOUR GUIDE LICENSED"],
        certifications: ["NSW Tour Guide License", "First Aid Certified"],
        rating: 4.89,
        verified: true,
      },
    ],
  },
];

export const seedFirefly: FireflyResource[] = [
  {
    id: "WATER_143",
    name: "Community water point",
    type: "water",
    status: "available",
    updatedAt: Date.now() - 4 * 60 * 1000,
    reports: 7,
    confidence: 0.96,
    distanceKm: 0.4,
  },
  {
    id: "POWER_021",
    name: "Library charging hub",
    type: "power",
    status: "limited",
    updatedAt: Date.now() - 11 * 60 * 1000,
    reports: 4,
    confidence: 0.83,
    distanceKm: 0.7,
  },
  {
    id: "FIRST_009",
    name: "Pop-up first aid station",
    type: "firstaid",
    status: "available",
    updatedAt: Date.now() - 7 * 60 * 1000,
    reports: 5,
    confidence: 0.91,
    distanceKm: 1.1,
  },
  {
    id: "SHELTER_72",
    name: "Community safe centre",
    type: "shelter",
    status: "available",
    updatedAt: Date.now() - 16 * 60 * 1000,
    reports: 9,
    confidence: 0.94,
    distanceKm: 1.4,
  },
  {
    id: "NET_18",
    name: "Emergency Wi‑Fi point",
    type: "connectivity",
    status: "unavailable",
    updatedAt: Date.now() - 3 * 60 * 1000,
    reports: 11,
    confidence: 0.98,
    distanceKm: 1.8,
  },
];

export const badgeCatalog: BadgeType[] = [
  { emoji: "🍜", label: "Night Market Feast" },
  { emoji: "🏺", label: "Hands in Clay" },
  { emoji: "🌶️", label: "Spice Trail" },
  { emoji: "📸", label: "Street Photographer" },
  { emoji: "🌊", label: "Coastal Wander" },
  { emoji: "⛰️", label: "Mountain Trek" },
  { emoji: "🎨", label: "Local Artist" },
  { emoji: "🕯️", label: "Candlelit Evening" },
  { emoji: "🚲", label: "Two-Wheel Explorer" },
  { emoji: "🎭", label: "Festival Night" },
];

export const journalBadges: JournalBadge[] = [
  {
    id: "b1",
    emoji: "🍜",
    title: "After-hours Osaka",
    city: "Osaka",
    note: "Ren taught me to order from a ticket machine without panicking.",
    date: "18 AUG",
    accent: "#D96F4C",
    activityId: "osaka-ramen",
  },
  {
    id: "b2",
    emoji: "🏺",
    title: "Hands in Clay",
    city: "Sydney",
    note: "My cup is crooked. Keeping it forever.",
    date: "03 AUG",
    accent: "#526A58",
    activityId: "sydney-ceramics",
  },
  {
    id: "b3",
    emoji: "🌶️",
    title: "Courtyard Cook",
    city: "Oaxaca",
    note: "The smoked chilli was the whole point.",
    date: "19 JUL",
    accent: "#E8BD67",
    activityId: "oaxaca-kitchen",
  },
];
