// ============================================================
//  JOGA BONITO — DATA FILE
//  Edit this file → git add . → git commit -m "msg" → git push
//  Website updates for EVERYONE in ~30 seconds. Free. Forever.
// ============================================================

const JB = {

  // ── TOURNAMENT INFO ──────────────────────────────────────
  tournament: {
    name:    "Joga Bonito",
    season:  "Season 1",
    venue:   "NIT Jalandhar",
    tagline: "Football Tournament of Mallus of NIT Jalandhar",
    logo:    "images/logo.png",         // nav + hero logo
    // External links for hero badges (replace # with real URLs)
    venueLink:   "#",
    mallusLink:  "#",
    auctionLink: "#",
  },

  // ── ADMIN PASSWORD ───────────────────────────────────────
  adminPassword: "19@Admin",

  // ── FORMSPREE FORM ID ────────────────────────────────────
  // SETUP STEPS:
  // 1. Go to https://formspree.io → sign up free (use Gmail)
  // 2. Click "+ New Form" → name it "Joga Bonito Review" → Create
  // 3. You'll see your endpoint: https://formspree.io/f/xpwzabcd
  //    Copy the ID part only: "xpwzabcd"
  // 4. Paste it below
  // 5. In Formspree dashboard → your form → Integrations → Google Sheets → Connect
  // 6. git push → test by submitting one review
  formspreeId: "mvzdlbqd",

  // ── WINNER ───────────────────────────────────────────────
  winner: {
    teamId: 0,             // set to winning team's id after final
    showCelebration: false // set true to show banner + confetti
  },

  // ── USER ACCOUNTS (for form login) ───────────────────────
  // usertype: "p" = player, "s" = sponsor, "f" = fan
  // name shown in form automatically from username
  // Players are auto-added from the players array below.
  // Add sponsors and fans here manually:
  users: [
    // SPONSORS — add below:
    // { username: "sponsor1", password: "pass123", usertype: "s", displayName: "Kerala Spices Co." },
    // { username: "reliance",  password: "pass456", usertype: "s", displayName: "Reliance Foundation" },

    // FANS — add below:
    // { username: "arunk",    password: "fan001",  usertype: "f", displayName: "Arun K" },
    // { username: "sreerag",  password: "fan002",  usertype: "f", displayName: "Sreerag M" },
  ],

  // ── COMMENTS (homepage ticker) ───────────────────────────
// { id: 1, name: "Arun K",   text: "Best tournament ever! 🔥" },
// { id: 2, name: "Sreerag",  text: "FC Kerala all the way! 💚" },
  comments: [
      { id: 1, name: "Mammootty", text:"Real Fighters 🔥" },
      { id: 2, name: "Modi", text: "Desh vasiyoooom Al Nassar hamara bahuth Achaa team he" },
      { id: 3, name: "Anushka Sharma", text: "Final was intense ⚽" },
      { id: 4, name: "Trump", text: "hai Mwolooo jada aano??!!"}
  ],

  // ── NEWS / STORIES ───────────────────────────────────────
  news: [
      {
        id: 1,
        title: "Milestone 1: Auction Announced",
        body:  "Joga Bonito Season 1 begins its journey with the official auction announcement. Planned with clear vision by Mallus of NITJ, this marks the first step towards building strong teams and uniting the Malayali community. Four teams will compete in the inaugural season, with overwhelming response and registrations from across the community. The stage is set for something unique.",
        emoji: "⚡",
        img:   "images/news/auction_poster.png",
        date:  "2025-12-13"
      },
      {
        id: 2,
        title: "Milestone 1: Auction Announced",
        body:  "Joga Bonito Season 1 begins its journey with the official auction announcement. Planned with clear vision by Mallus of NITJ, this marks the first step towards building strong teams and uniting the Malayali community. Four teams will compete in the inaugural season, with overwhelming response and registrations from across the community. The stage is set for something unique.",
        emoji: "⚡",
        img:   "images/news/auction_event.png",
        date:  "2025-12-13"
      },
      {
        id: 16,
        title: "Top Buys",
        body:  "Joga Bonito Season 1 begins its journey with the official auction announcement. Planned with clear vision by Mallus of NITJ, this marks the first step towards building strong teams and uniting the Malayali community. Four teams will compete in the inaugural season, with overwhelming response and registrations from across the community. The stage is set for something unique.",
        emoji: "⚡",
        img:   "images/news/auc_players.png",
        date:  "2025-12-13"
      },
      {
        id: 12,
        title: "Team Captain",
        body:  "Joga Bonito Season 1 begins its journey with the official auction announcement. Planned with clear vision by Mallus of NITJ, this marks the first step towards building strong teams and uniting the Malayali community. Four teams will compete in the inaugural season, with overwhelming response and registrations from across the community. The stage is set for something unique.",
        emoji: "⚡",
        img:   "images/news/auc_13.png",
        date:  "2025-12-13"
      },
      {
        id: 13,
        title: "Team Captain",
        body:  "Joga Bonito Season 1 begins its journey with the official auction announcement. Planned with clear vision by Mallus of NITJ, this marks the first step towards building strong teams and uniting the Malayali community. Four teams will compete in the inaugural season, with overwhelming response and registrations from across the community. The stage is set for something unique.",
        emoji: "⚡",
        img:   "images/news/auc_12.png",
        date:  "2025-12-13"
      },
      {
        id: 14,
        title: "Team Captain",
        body:  "Joga Bonito Season 1 begins its journey with the official auction announcement. Planned with clear vision by Mallus of NITJ, this marks the first step towards building strong teams and uniting the Malayali community. Four teams will compete in the inaugural season, with overwhelming response and registrations from across the community. The stage is set for something unique.",
        emoji: "⚡",
        img:   "images/news/auc_11.png",
        date:  "2025-12-13"
      },
      {
        id: 15,
        title: "Team Captain",
        body:  "Joga Bonito Season 1 begins its journey with the official auction announcement. Planned with clear vision by Mallus of NITJ, this marks the first step towards building strong teams and uniting the Malayali community. Four teams will compete in the inaugural season, with overwhelming response and registrations from across the community. The stage is set for something unique.",
        emoji: "⚡",
        img:   "images/news/auc_10.png",
        date:  "2025-12-13"
      },
      {
        id: 3,
        title: "Auction Bids",
        body:  "Joga Bonito Season 1 begins its journey with the official auction announcement. Planned with clear vision by Mallus of NITJ, this marks the first step towards building strong teams and uniting the Malayali community. Four teams will compete in the inaugural season, with overwhelming response and registrations from across the community. The stage is set for something unique.",
        emoji: "⚡",
        img:   "images/news/auc_3.png",
        date:  "2025-12-13"
      },
      {
        id: 4,
        title: "Auction Bids",
        body:  "Joga Bonito Season 1 begins its journey with the official auction announcement. Planned with clear vision by Mallus of NITJ, this marks the first step towards building strong teams and uniting the Malayali community. Four teams will compete in the inaugural season, with overwhelming response and registrations from across the community. The stage is set for something unique.",
        emoji: "⚡",
        img:   "images/news/auc_2.png",
        date:  "2025-12-13"
      },
      {
        id: 5,
        title: "Auction Bids",
        body:  "Joga Bonito Season 1 begins its journey with the official auction announcement. Planned with clear vision by Mallus of NITJ, this marks the first step towards building strong teams and uniting the Malayali community. Four teams will compete in the inaugural season, with overwhelming response and registrations from across the community. The stage is set for something unique.",
        emoji: "⚡",
        img:   "images/news/auc_1.png",
        date:  "2025-12-13"
      },
            {
        id: 6,
        title: "Auction Bids",
        body:  "Joga Bonito Season 1 begins its journey with the official auction announcement. Planned with clear vision by Mallus of NITJ, this marks the first step towards building strong teams and uniting the Malayali community. Four teams will compete in the inaugural season, with overwhelming response and registrations from across the community. The stage is set for something unique.",
        emoji: "⚡",
        img:   "images/news/auc_4.png",
        date:  "2025-12-13"
      },
      {
        id: 7,
        title: "Auction Bids",
        body:  "Joga Bonito Season 1 begins its journey with the official auction announcement. Planned with clear vision by Mallus of NITJ, this marks the first step towards building strong teams and uniting the Malayali community. Four teams will compete in the inaugural season, with overwhelming response and registrations from across the community. The stage is set for something unique.",
        emoji: "⚡",
        img:   "images/news/auc_5.png",
        date:  "2025-12-13"
      },
            {
        id: 8,
        title: "Auction Bids",
        body:  "Joga Bonito Season 1 begins its journey with the official auction announcement. Planned with clear vision by Mallus of NITJ, this marks the first step towards building strong teams and uniting the Malayali community. Four teams will compete in the inaugural season, with overwhelming response and registrations from across the community. The stage is set for something unique.",
        emoji: "⚡",
        img:   "images/news/auc_6.png",
        date:  "2025-12-13"
      },
      {
        id: 9,
        title: "Auction Bids",
        body:  "Joga Bonito Season 1 begins its journey with the official auction announcement. Planned with clear vision by Mallus of NITJ, this marks the first step towards building strong teams and uniting the Malayali community. Four teams will compete in the inaugural season, with overwhelming response and registrations from across the community. The stage is set for something unique.",
        emoji: "⚡",
        img:   "images/news/auc_7.png",
        date:  "2025-12-13"
      },
      {
        id: 10,
        title: "Auction Bids",
        body:  "Joga Bonito Season 1 begins its journey with the official auction announcement. Planned with clear vision by Mallus of NITJ, this marks the first step towards building strong teams and uniting the Malayali community. Four teams will compete in the inaugural season, with overwhelming response and registrations from across the community. The stage is set for something unique.",
        emoji: "⚡",
        img:   "images/news/auc_8.png",
        date:  "2025-12-13"
      },
      {
        id: 11,
        title: "Auction Bids",
        body:  "Joga Bonito Season 1 begins its journey with the official auction announcement. Planned with clear vision by Mallus of NITJ, this marks the first step towards building strong teams and uniting the Malayali community. Four teams will compete in the inaugural season, with overwhelming response and registrations from across the community. The stage is set for something unique.",
        emoji: "⚡",
        img:   "images/news/auc_9.png",
        date:  "2025-12-13"
      },
    // {
    //   id: 2,
    //   title: "Quarter Finals Confirmed",
    //   body:  "All four QF spots decided after a thrilling group stage!",
    //   emoji: "⚽",
    //   img:   "images/news/qf.png",
    //   date:  "April 20, 2026"
    // },
  ],

  // ── EVENTS (homepage carousel) ───────────────────────────
  // Each event = one large photo with caption
  // img: "images/events/filename.png"
    // { id: 1, img: "images/events/opening.png",  caption: "Opening Ceremony",      date: "April 1" },
    // { id: 2, img: "images/events/match1.png",   caption: "Group Stage Match Day 1", date: "April 5" },
    // { id: 3, img: "images/events/auction.png",  caption: "Player Auction Night",   date: "March 28" },
  events: [
    {
      id: 1,
      title: "Official Partner",
      subtitle: "Supports",
      img: "images/events/event1.png"
    },
    {
      id: 2,
      title: "Auction Announcement",
      subtitle: "poster",
      img: "images/events/event2.png"
    },
    {
      id: 3,
      title: "Auction Day",
      subtitle: "Auction Night",
      img: "images/events/event3.png"
    },
    {
      id: 4,
      title: "Team Captains",
      subtitle: "Fahad - Hari - Haris - Aswin",
      img: "images/events/event4.png"
    },
    {
      id: 5,
      title: "Top Buyers",
      subtitle: "Top 5 Buyers",
      img: "images/events/event5.png"
    }
  ],

  // ── SPONSORS ─────────────────────────────────────────────
  // photo: "images/sponsors/filename.png" OR "" for initial avatar
  
    // { id: 1, name: "Kerala Spices Co.",   photo: "images/sponsors/kerala-spices.png",  role: "Title Sponsor",     message: "Proud to support Joga Bonito Season 1!" },
    // { id: 2, name: "Reliance Foundation", photo: "images/sponsors/reliance.png",       role: "Gold Sponsor",      message: "Football unites us all!" },
    // { id: 3, name: "NIT Canteen",         photo: "",                                   role: "Refreshment Partner", message: "Fuelling the players!" },
  
  sponsors: [
    {
    id: 1,
    name: "Reman Sir (Thampanoor)",
    photo: "images/sponsors/reman.png",
    role: "Main Sponsor",
    message: "remansir illayirunnenkil🥹 🔥"
  },
  {
    id: 2,
    name: "Malabar Masala",
    photo: "images/sponsors/cafe.png",
    role: "Food Partner",
    message: "Fueling players with energy with masala⚽"
  },
  {
    id: 3,
    name: "Tutic ELeran",
    photo: "images/sponsors/tutic.png",
    role: "Support Partner",
    message: "Educational Partner"
  },
  {
    id:4,
    name: "Lakshyechi",
    photo: "images/sponsors/lakshya.png",
    role: "Primary sponsor",
    message: "Lakshyechi njngalde aishwaryam"
  }
  ],

  // ── TEAMS ────────────────────────────────────────────────
  teams: [
    { id: 1, name: "Real Fighters",  logo: "images/teams/real_fighters.png" },
    { id: 2, name: "Malabar FC",     logo: "images/teams/malabar.png"       },
    { id: 3, name: "Al Nassar FC",   logo: "images/teams/al_nassar.png"     },
    { id: 4, name: "Gunners FC",     logo: "images/teams/gunners.png"       },
  ],

  // ── PLAYERS ──────────────────────────────────────────────
  // teamId   → must match an id in teams[] above
  // position → "Goalkeeper" | "Defender" | "Midfielder" | "Attacker"
  // captain  → true for exactly ONE player per team
  // photo    → "images/players/filename.png"  OR  ""
  // card     → "images/cards/filename.png"    OR  ""  (9:16 ratio)
  // order    → display order in cards carousel (0, 1, 2 …)
  // username → login username for this player (auto-links to user account)
  // password → login password
  // performance → extra details shown on Players page
  players: [
    {
      id: 101, name: "Anshu", teamId: 1, position: "Goalkeeper", captain: false,
      photo: "images/players/anshu.png", card: "images/cards/anshu.png", order: 0,
      username: "anshu", password: "19@anshu",
      performance: { jerseyNumber: 1, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 102, name: "Haris", teamId: 1, position: "Midfielder", captain: true,
      photo: "images/players/haris.png", card: "images/cards/haris.png", order: 1,
      username: "haris", password: "19@haris",
      performance: { jerseyNumber: 7, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 103, name: "Irfan", teamId: 1, position: "Attacker", captain: false,
      photo: "images/players/irfan.png", card: "images/cards/irfan.png", order: 2,
      username: "irfan", password: "19@irfan",
      performance: { jerseyNumber: 9, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 104, name: "Johan", teamId: 1, position: "Defender", captain: false,
      photo: "images/players/johan.png", card: "images/cards/johan.png", order: 3,
      username: "johan", password: "19@johan",
      performance: { jerseyNumber: 4, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 105, name: "Nandkishor", teamId: 1, position: "Defender", captain: false,
      photo: "images/players/nandkishor.png", card: "images/cards/nandkishor.png", order: 4,
      username: "nandkishor", password: "19@nandkishor",
      performance: { jerseyNumber: 5, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 106, name: "Sanish", teamId: 1, position: "Midfielder", captain: false,
      photo: "images/players/sanish.png", card: "images/cards/sanish.png", order: 5,
      username: "sanish", password: "19@sanish",
      performance: { jerseyNumber: 8, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 107, name: "Shahal", teamId: 1, position: "Midfielder", captain: false,
      photo: "images/players/shahal.png", card: "images/cards/shahal.png", order: 6,
      username: "shahal", password: "19@shahal",
      performance: { jerseyNumber: 11, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 108, name: "Albin", teamId: 2, position: "Defender", captain: false,
      photo: "images/players/albin.png", card: "images/cards/albin.png", order: 7,
      username: "albin", password: "19@albin",
      performance: { jerseyNumber: 3, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 109, name: "Allen", teamId: 2, position: "Attacker", captain: false,
      photo: "images/players/allen.png", card: "images/cards/allen.png", order: 8,
      username: "allen", password: "19@allen",
      performance: { jerseyNumber: 10, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 110, name: "Anson", teamId: 2, position: "Midfielder", captain: false,
      photo: "images/players/anson.png", card: "images/cards/anson.png", order: 9,
      username: "anson", password: "19@anson",
      performance: { jerseyNumber: 6, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 111, name: "Aswin", teamId: 2, position: "Defender", captain: true,
      photo: "images/players/aswin.png", card: "images/cards/aswin.png", order: 10,
      username: "aswin", password: "19@aswin",
      performance: { jerseyNumber: 2, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 112, name: "Diljith", teamId: 2, position: "Midfielder", captain: false,
      photo: "images/players/diljith.png", card: "images/cards/diljith.png", order: 11,
      username: "diljith", password: "19@diljith",
      performance: { jerseyNumber: 8, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 113, name: "Fabiz", teamId: 2, position: "Midfielder", captain: false,
      photo: "images/players/fabiz.png", card: "images/cards/fabiz.png", order: 12,
      username: "fabiz", password: "19@fabiz",
      performance: { jerseyNumber: 14, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 114, name: "Adith", teamId: 3, position: "Attacker", captain: false,
      photo: "images/players/adith.png", card: "images/cards/adith.png", order: 13,
      username: "adith", password: "19@adith",
      performance: { jerseyNumber: 9, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 115, name: "Adithyan", teamId: 3, position: "Defender", captain: false,
      photo: "images/players/adithyan.png", card: "images/cards/adithyan.png", order: 14,
      username: "adithyan", password: "19@adithyan",
      performance: { jerseyNumber: 5, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 116, name: "Fahad", teamId: 3, position: "Midfielder", captain: true,
      photo: "images/players/fahad.png", card: "images/cards/fahad.png", order: 15,
      username: "fahad", password: "19@fahad",
      performance: { jerseyNumber: 7, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 117, name: "Rohith", teamId: 3, position: "Defender", captain: false,
      photo: "images/players/rohith.png", card: "images/cards/rohith.png", order: 16,
      username: "rohith", password: "19@rohith",
      performance: { jerseyNumber: 4, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 118, name: "Sam", teamId: 3, position: "Attacker", captain: false,
      photo: "images/players/sam.png", card: "images/cards/sam.png", order: 17,
      username: "sam", password: "19@sam",
      performance: { jerseyNumber: 10, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 119, name: "Shebeeb", teamId: 3, position: "Defender", captain: false,
      photo: "images/players/shebeeb.png", card: "images/cards/shebeeb.png", order: 18,
      username: "shebeeb", password: "19@shebeeb",
      performance: { jerseyNumber: 3, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 120, name: "Aakash", teamId: 4, position: "Goalkeeper", captain: false,
      photo: "images/players/aakash.png", card: "images/cards/aakash.png", order: 19,
      username: "aakash", password: "19@aakash",
      performance: { jerseyNumber: 1, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 121, name: "Aswin Murali", teamId: 4, position: "Defender", captain: false,
      photo: "images/players/aswin_murali.png", card: "images/cards/aswin_murali.png", order: 20,
      username: "aswinmurali", password: "19@aswinmurali",
      performance: { jerseyNumber: 2, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 122, name: "Devanand", teamId: 4, position: "Midfielder", captain: false,
      photo: "images/players/devanand.png", card: "images/cards/devanand.png", order: 21,
      username: "devanand", password: "19@devanand",
      performance: { jerseyNumber: 6, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 123, name: "Eren", teamId: 4, position: "Attacker", captain: false,
      photo: "images/players/eren.png", card: "images/cards/eren.png", order: 22,
      username: "eren", password: "19@eren",
      performance: { jerseyNumber: 9, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 124, name: "Hafees", teamId: 4, position: "Goalkeeper", captain: false,
      photo: "images/players/hafees.png", card: "images/cards/hafees.png", order: 23,
      username: "hafees", password: "19@hafees",
      performance: { jerseyNumber: 12, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 125, name: "Hari", teamId: 4, position: "Midfielder", captain: true,
      photo: "images/players/hari.png", card: "images/cards/hari.png", order: 24,
      username: "hari", password: "19@hari",
      performance: { jerseyNumber: 8, appearances: 0, cleanSheets: 0, note: "" }
    },
    {
      id: 126, name: "Milind", teamId: 4, position: "Defender", captain: false,
      photo: "images/players/milind.png", card: "images/cards/milind.png", order: 25,
      username: "milind", password: "19@milind",
      performance: { jerseyNumber: 5, appearances: 0, cleanSheets: 0, note: "" }
    },
  ],

// ── MATCHES ──────────────────────────────────────────────
// goals → { playerId, teamId, og, assistId }
//   assistId: player id of assister, or 0 for no assist
//   og: true = own goal (shows red ball, listed under scorer's team opponent side)
// cards → { playerId, type }  type: "yellow"|"red"|"second-yellow"
// time  → "HH:MM" kick-off time string e.g. "16:30"

matches: [
  {
    id: 1,
    homeId: 2,
    awayId: 1,
    date: "2026-01-26 18:00",

    homeScore: 0,
    awayScore: 1,

    goals: [
      { playerId: 102, teamId: 1, assistId: 101 } // Haris, assist Anshu
    ],

    cards: [],

    isFinal: false
  },

  {
    id: 2,
    homeId: 3,
    awayId: 4,
    date: "2026-01-28 18:00",

    homeScore: 3,
    awayScore: 0,

    goals: [
      { playerId: 116, teamId: 3, assistId: 0 },       // Fahad
      { playerId: 114, teamId: 3, assistId: 115 },     // Adith, assist Adithyan
      { playerId: 125, teamId: 4, og: true }           // Hari own goal
    ],

    cards: [],

    isFinal: false
  },

  {
    id: 10,
    homeId: 1,
    awayId: 3,
    date: "date not mentioned",

    homeScore: 1,
    awayScore: 1,

    goals: [
      { playerId: 107, teamId: 1, assistId: 0 },
      { playerId: 116, teamId: 3, assistId: 0 }
    ],

    cards: [
      { playerId: 107, teamId: 1, type: "yellow" },
      { playerId: 116, teamId: 3, type: "yellow" }
    ],

    isFinal: false
  },

  {
    id: 11,
    homeId: 2,
    awayId: 4,
    date: "date not mentioned",

    homeScore: 1,
    awayScore: 0,

    goals: [
      { playerId: 113, teamId: 2, assistId: 110 }
    ],

    cards: [],

    isFinal: false
  },

  {
    id: 12,
    homeId: 2,
    awayId: 3,
    date: "date not mentioned",

    homeScore: 1,
    awayScore: 0,

    goals: [
      { playerId: 115, teamId: 3, og: true }
    ],

    cards: [
      { playerId: 112, teamId: 2, type: "yellow" }
    ],

    isFinal: false
  },

  {
    id: 13,
    homeId: 1,
    awayId: 4,
    date: "date not mentioned",

    homeScore: 0,
    awayScore: 1,

    goals: [
      { playerId: 123, teamId: 4, assistId: 0 }
    ],

    cards: [
      { playerId: 126, teamId: 4, type: "yellow" }
    ],

    isFinal: false
  },

  {
    id: 14,
    homeId: 1,
    awayId: 2,
    date: "date not mentioned",

    homeScore: 0,
    awayScore: 0,

    goals: [],

    cards: [],

    isFinal: false
  },

  {
    id: 15,
    homeId: 1,
    awayId: 3,
    date: "date not mentioned",

    homeScore: 0,
    awayScore: 0,

    goals: [],

    cards: [],

    isFinal: false
  },

  {
    id: 16,
    homeId: 2,
    awayId: 3,
    date: "date not mentioned",

    homeScore: 0,
    awayScore: 0,

    goals: [],

    cards: [],

    isFinal: false
  },

  {
    id: 17,
    homeId: 2,
    awayId: 4,
    date: "date not mentioned",

    homeScore: 1,
    awayScore: 0,

    goals: [
      { playerId: 113, teamId: 2, assistId: 0 }
    ],

    cards: [
      { playerId: 121, teamId: 4, type: "yellow" }
    ],

    isFinal: false
  },

  {
    id: 18,
    homeId: 4,
    awayId: 1,
    date: "2026-04-03 18:30",

    homeScore: 3,
    awayScore: 0,

    goals: [
      { playerId: 123, teamId: 4, assistId: 126 },
      { playerId: 123, teamId: 4, assistId: 125 },
      { playerId: 123, teamId: 4, assistId: 125 }
    ],

    cards: [
      { playerId: 103, teamId: 1, type: "yellow" }
    ],

    isFinal: false
  },

  {
    id: 19,
    homeId: 3,
    awayId: 4,
    date: "2026-04-04 18:30",

    homeScore: 0,
    awayScore: 0,

    goals: [],

    cards: [],

    isFinal: false
  },

  {
    id: 20,
    homeId: 3, // Al Nassar FC
    awayId: 2, // Malabar FC
    date: "2026-04-18 19:00",

    homeScore: 2,
    awayScore: 0,

    goals: [
      { playerId: 115, teamId: 3 }, // Adithyan ⚽
      { playerId: 116, teamId: 3 }  // Fahad ⚽
    ],

    cards: [],

    isFinal: true,

    note: "🏆 FINAL — Al Nassar FC crowned champions"
  }
],

  // ── FAN REVIEWS ──────────────────────────────────────────
  // Paste rows from Google Sheet here to publish analytics.
  reviews: [
    // {
    //   id: 9001,
    //   reviewer:        "Haris",
    //   formation:       "2-2-1",
    //   squad:           "Anshu, Haris, Irfan, Johan, Nandkishor, Sanish",
    //   mvp:             "Irfan",
    //   best_attacker:   "Irfan",
    //   best_defender:   "Johan",
    //   best_gk:         "Anshu",
    //   most_agile:      "Sanish",
    //   best_captain:    "Real Fighters",
    //   best_entertain:  "Malabar FC",
    //   luckiest:        "Gunners FC",
    //   unluckiest:      "Al Nassar FC",
    //   improved:        "Al Nassar FC",
    //   emerging:        "Eren",
    //   fav_player:      "Haris",
    //   skillful:        "Fabiz",
    //   team_rankings:   "#1: Real Fighters | #2: Malabar FC",
    //   fav_rankings:    "#1: Real Fighters | #2: Gunners FC",
    //   fair_rankings:   "#1: Malabar FC | #2: Al Nassar FC",
    //   feedback:        "Great tournament organisation!",
    //   comments:        "Loved every moment, keep it up!",
    //   committee_auction: 4,
    //   committee_dates:   5,
    //   committee_inform:  4,
    //   committee_ground:  3,
    //   committee_arrange: 4,
    //   committee_fair:    5,
    //   committee_ref:     3,
    //   committee_site:    4,
    //   committee_fans:    4,
    //   committee_sponsor: 5,
    //   committee_trophy:  5,
    //   committee_post:    4,
    //   committee_note:    "Everything was well managed!",
    //   submittedAt:       "2026-04-10T14:30:00.000Z"
    // },
  ],

};
// end of data — do not remove this line