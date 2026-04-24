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
    { id: 2, name: "Mallus United",   logo: "images/teams/mallus-united.png"   },
    { id: 3, name: "Thrissur FC",     logo: "images/teams/thrissur.png"        },
    { id: 4, name: "Cochin Strikers", logo: "images/teams/cochin-strikers.png" },
  ],

  // ── PLAYERS ──────────────────────────────────────────────
  // teamId   → must match an id in teams[] above
  // position → "Goalkeeper" | "Defender" | "Midfielder" | "Attacker"
  // captain  → true for exactly ONE player per team
  // photo    → "images/players/filename.jpg"  OR  ""
  // card     → "images/cards/filename.jpg"    OR  ""  (9:16 portrait card)
  // order    → controls display order (0, 1, 2, …)
  players: [
        {
          id: 101,
          name: "Fahad",
          teamId: 1,
          position: "Midfielder",
          captain: true,
          photo: "images/players/fahad.jpg",
          card: "images/cards/fahad.jpg",
          order: 0
        }
    // {
    //   id: 102, name: "Akhil S",   teamId: 1,
    //   position: "Midfielder", captain: false,
    //   photo: "images/players/akhil.jpg",
    //   card:  "",
    //   order: 1
    // },
    // {
    //   id: 103, name: "Vishnu P",  teamId: 2,
    //   position: "Goalkeeper", captain: true,
    //   photo: "images/players/vishnu.jpg",
    //   card:  "images/cards/vishnu-card.jpg",
    //   order: 2
    // },
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