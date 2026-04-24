// ============================================================
//  JOGA BONITO — DATA FILE
//
//  HOW TO UPDATE THE WEBSITE:
//  1. Edit this file in VS Code
//  2. Drop image files into the images/ folder if needed
//  3. In terminal:
//       git add .
//       git commit -m "what you changed"
//       git push
//  Website updates for EVERYONE in ~30 seconds. Forever. Free.
// ============================================================

const JB = {

  // ── TOURNAMENT INFO ──────────────────────────────────────
  tournament: {
    name:    "Joga Bonito",
    season:  "Season 1",
    venue:   "NIT Jalandhar",
    tagline: "Football Tournament of Mallus of NIT Jalandhar",
    // Put your logo at:  images/logo.png
    logo:    "images/logo.jpeg"
  },

  // ── ADMIN PASSWORD ───────────────────────────────────────
  adminPassword: "19@Admin",

  // ── FORMSPREE FORM ID ────────────────────────────────────
  // 1. Go to https://formspree.io → sign up free
  // 2. Create new form → copy the ID (e.g. "xpwzabcd")
  // 3. Paste it here
  formspreeId: "YOUR_FORM_ID",

  // ── WINNER ───────────────────────────────────────────────
  // After the final match, set teamId to the winning team's id.
  // Set showCelebration: true to show the banner + confetti.
  winner: {
    teamId: 0,
    showCelebration: false
  },

  // ── COMMENTS (homepage ticker) ───────────────────────────
  comments: [
    // { id: 1, name: "Arun K",   text: "Best tournament ever! 🔥" , date: "13/23/23" },
    // { id: 2, name: "Sreerag",  text: "FC Kerala all the way! 💚", date: "13/23/27" },
  ],

  // ── NEWS / STORIES ───────────────────────────────────────
  // img: "images/news/filename.jpg"  OR  "" for no image
  news: [
    {
      id: 1,
      title: "Tournament Kicks Off!",
      body:  "Joga Bonito Season 1 is officially underway at NIT Jalandhar!",
      emoji: "🏆",
      img:   "",
      date:""
    },
    // {
    //   id: 2,
    //   title: "Quarter Finals Confirmed",
    //   body:  "All four quarter final spots have been decided...",
    //   emoji: "⚽",
    //   img:   "images/news/qf.jpg"
    // },
  ],

  // ── TEAMS ────────────────────────────────────────────────
  // logo: "images/teams/filename.png"  OR  "" for no logo
  teams: [
    { id: 1, name: "Real Fighters",       logo: "images/teams/real_fighters.jpeg"    },
    { id: 2, name: "Malabar FC",   logo: "images/teams/malabar.png"   },
    { id: 3, name: "Al Nassar FC",     logo: "images/teams/al_nassar.png"        },
    { id: 4, name: "Gunners FC", logo: "images/teams/gunners.png" },
  ],

  // ── PLAYERS ──────────────────────────────────────────────
  // teamId   → must match an id in teams[] above
  // position → "Goalkeeper" | "Defender" | "Midfielder" | "Attacker"
  // captain  → true for exactly ONE player per team
  // photo    → "images/players/filename.jpg"  OR  ""
  // card     → "images/cards/filename.jpg"    OR  ""  (9:16 portrait card)
  // order    → controls display order (0, 1, 2, …)
players: [
  { id: 101, name: "Anshu", teamId: 1, position: "Goal Keeper", captain: false, photo: "images/players/anshu.png", card: "images/cards/anshu.png", order: 0 },
  { id: 102, name: "Haris", teamId: 1, position: "Midfielder", captain: false, photo: "images/players/haris.png", card: "images/cards/haris.png", order: 1 },
  { id: 103, name: "Irfan", teamId: 1, position: "Attaker", captain: false, photo: "images/players/irfan.png", card: "images/cards/irfan.png", order: 2 },
  { id: 104, name: "Johan", teamId: 1, position: "Defender", captain: false, photo: "images/players/johan.png", card: "images/cards/johan.png", order: 3 },
  { id: 105, name: "Nandkishor", teamId: 1, position: "Defender", captain: false, photo: "images/players/nandkishor.png", card: "images/cards/nandkishor.png", order: 4 },
  { id: 106, name: "Sanish", teamId: 1, position: "Midfielder", captain: false, photo: "images/players/sanish.png", card: "images/cards/sanish.png", order: 5 },
  { id: 107, name: "Shahal", teamId: 1, position: "Midfielder", captain: false, photo: "images/players/shahal.png", card: "images/cards/shahal.png", order: 6 },

  { id: 108, name: "Albin", teamId: 2, position: "Defender", captain: false, photo: "images/players/albin.png", card: "images/cards/albin.png", order: 7 },
  { id: 109, name: "Allen", teamId: 2, position: "Attaker", captain: false, photo: "images/players/allen.png", card: "images/cards/allen.png", order: 8 },
  { id: 110, name: "Anson", teamId: 2, position: "Midfielder", captain: false, photo: "images/players/anson.png", card: "images/cards/anson.png", order: 9 },
  { id: 111, name: "Aswin", teamId: 2, position: "Defender", captain: false, photo: "images/players/aswin.png", card: "images/cards/aswin.png", order: 10 },
  { id: 112, name: "Diljith", teamId: 2, position: "Midfielder", captain: false, photo: "images/players/diljith.png", card: "images/cards/diljith.png", order: 11 },
  { id: 113, name: "Fabiz", teamId: 2, position: "Midfielder", captain: false, photo: "images/players/fabiz.png", card: "images/cards/fabiz.png", order: 12 },

  { id: 114, name: "Adith", teamId: 3, position: "Attaker", captain: false, photo: "images/players/adith.png", card: "images/cards/adith.png", order: 13 },
  { id: 115, name: "Adithyan", teamId: 3, position: "Defender", captain: false, photo: "images/players/adithyan.png", card: "images/cards/adithyan.png", order: 14 },
  { id: 116, name: "Fahad", teamId: 3, position: "Midfielder", captain: false, photo: "images/players/fahad.png", card: "images/cards/fahad.png", order: 15 },
  { id: 117, name: "Rohith", teamId: 3, position: "Defender", captain: false, photo: "images/players/rohith.png", card: "images/cards/rohith.png", order: 16 },
  { id: 118, name: "Sam", teamId: 3, position: "Attaker", captain: false, photo: "images/players/sam.png", card: "images/cards/sam.png", order: 17 },
  { id: 119, name: "Shebeeb", teamId: 3, position: "Defender", captain: false, photo: "images/players/shebeeb.png", card: "images/cards/shebeeb.png", order: 18 },

  { id: 120, name: "Aakash", teamId: 4, position: "Goal Keeper", captain: false, photo: "images/players/aakash.png", card: "images/cards/aakash.png", order: 19 },
  { id: 121, name: "Aswin Murali", teamId: 4, position: "Defender", captain: false, photo: "images/players/aswin murali.png", card: "images/cards/aswin murali.png", order: 20 },
  { id: 122, name: "Devanand", teamId: 4, position: "Midfielder", captain: false, photo: "images/players/devanand.png", card: "images/cards/devanand.png", order: 21 },
  { id: 123, name: "Eren", teamId: 4, position: "Attaker", captain: false, photo: "images/players/eren.png", card: "images/cards/eren.png", order: 22 },
  { id: 124, name: "Hafees", teamId: 4, position: "Goal Keeper", captain: false, photo: "images/players/hafees.png", card: "images/cards/hafees.png", order: 23 },
  { id: 125, name: "Hari", teamId: 4, position: "Midfielder", captain: false, photo: "images/players/hari.png", card: "images/cards/hari.png", order: 24 },
  { id: 126, name: "Milind", teamId: 4, position: "Defender", captain: false, photo: "images/players/milind.png", card: "images/cards/milind.png", order: 25 }
],

  // ── MATCHES ──────────────────────────────────────────────
  // homeId / awayId  → must match team ids above
  // date             → "YYYY-MM-DD"
  // label            → "Group Stage" | "Quarter Final" | "Semi Final" | "Final" | ""
  // goals            → array of { playerId, teamId, og }
  //                    playerId: 0 = unknown scorer
  //                    og: true = own goal
  // cards            → array of { playerId, type }
  //                    type: "yellow" | "red" | "second-yellow"
  // isFinal          → true only for the championship match
  matches: [
    // {
    //   id: 1001,
    //   homeId: 1,  awayId: 2,
    //   date:  "2026-04-10",
    //   label: "Group Stage",
    //   homeScore: 2,  awayScore: 1,
    //   goals: [
    //     { playerId: 101, teamId: 1, og: false },
    //     { playerId: 101, teamId: 1, og: false },
    //     { playerId: 103, teamId: 1, og: true  },
    //   ],
    //   cards: [
    //     { playerId: 102, type: "yellow" },
    //   ],
    //   isFinal: false
    // },
  ],

  // ── FAN REVIEWS ──────────────────────────────────────────
  // You receive these from your Google Sheet (via Formspree).
  // Copy each row here to publish the analytics on the website.
  reviews: [
    // {
    //   id: 9001,
    //   reviewer:      "Arun K",
    //   formation:     "2-2-1",
    //   squad:         "Rahul M, Akhil S, Vishnu P, Sreerag, Lokesh, Arjun K",
    //   mvp:           "Rahul M",
    //   best_captain:  "FC Kerala",
    //   best_entertain:"Mallus United",
    //   luckiest:      "Cochin Strikers",
    //   unluckiest:    "Thrissur FC",
    //   improved:      "Thrissur FC",
    //   emerging:      "Sreerag",
    //   fav_player:    "Rahul M",
    //   best_gk:       "Vishnu P",
    //   skillful:      "Akhil S",
    //   team_rankings: "#1: FC Kerala, #2: Mallus United",
    //   comments:      "Amazing tournament, loved every match!",
    //   submittedAt:   "2026-04-10T14:30:00.000Z"
    // },
  ],

};
// end of data — do not remove this line