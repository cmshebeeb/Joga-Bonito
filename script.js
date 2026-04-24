// ============================================================
//  JOGA BONITO — SCRIPT.JS
//  All JavaScript logic for the tournament website.
//  Reads all data from data.js (JB object).
// ============================================================

/* ────────────────────────────────────────────────────────────
   STATE
──────────────────────────────────────────────────────────── */
let currentUser    = null;   // logged-in user object
let currentPage    = 'home';
let currentSeason  = 1;
let carouselIndex  = 0;
let carouselTotal  = 0;
let carouselTimer  = null;
let storyIndex     = 0;
let storyTimer     = null;
let confettiAnim   = null;

// Ranking drag state
let dragRankState  = {};

/* ────────────────────────────────────────────────────────────
   INIT
──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initStoriesCarousel();
  initPlayerCards();
  initGraphs();
  initSponsors();
  initEvents();
  initComments();
  initTeamsPage();
  initMatchesPage();
  initTablePage();
  initStatsPage();
  initReviewForm();
  initAdminPanel();
  initWinner();
  initFormspreeStatus();
  checkSavedLogin();
  initCardDrag();
  closeSeasonDropdownOnOutsideClick();
});

/* ────────────────────────────────────────────────────────────
   NAVIGATION
──────────────────────────────────────────────────────────── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const el = document.getElementById('page-' + id);
  if (el) el.classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(b => {
    if (b.getAttribute('onclick') && b.getAttribute('onclick').includes("'" + id + "'")) {
      b.classList.add('active');
    }
  });

  currentPage = id;
  window.scrollTo(0, 0);

  // Lazy initialise pages that need it when first visited
  if (id === 'review') renderReviewPage();
  if (id === 'players') renderPlayersPage();
  if (id === 'admin')   renderAdminReviews();
}

/* ────────────────────────────────────────────────────────────
   HERO
──────────────────────────────────────────────────────────── */
function initHero() {
  const t = JB.tournament;

  // Logo in hero
  if (t.logo) {
    const area = document.getElementById('logoArea');
    if (area) {
      area.innerHTML = `<img src="${t.logo}" alt="${t.name}"
        style="width:100%;height:100%;object-fit:cover;border-radius:50%;"
        onerror="this.outerHTML='<span style=font-size:28px;>⚽</span>'">`;
    }
  }

  document.getElementById('heroSeason').textContent  = t.season + ' · ' + t.venue;
  document.getElementById('heroTagline').textContent = t.tagline;

  // Badge links
  const vl = document.getElementById('heroBadgeVenue');
  const ml = document.getElementById('heroBadgeMallus');
  const al = document.getElementById('heroBadgeAuction');
  if (vl) vl.href = t.venueLink   || '#';
  if (ml) ml.href = t.mallusLink  || '#';
  if (al) al.href = t.auctionLink || '#';
}

/* ────────────────────────────────────────────────────────────
   SEASON SELECTOR
──────────────────────────────────────────────────────────── */
function toggleSeasonDropdown() {
  document.getElementById('seasonDropdown').classList.toggle('show');
}

function selectSeason(n) {
  currentSeason = n;
  document.getElementById('seasonDropdown').classList.remove('show');

  const btn = document.getElementById('seasonSelectBtn');
  if (btn) btn.innerHTML = (n === 1 ? '⚽ Season 1' : '🆕 Season 2') + ' <span style="font-size:10px;">▼</span>';

  document.querySelectorAll('.season-option').forEach((o, i) => {
    o.classList.toggle('active', i + 1 === n);
  });

  document.getElementById('season1Content').style.display = n === 1 ? '' : 'none';
  document.getElementById('season2Content').style.display = n === 2 ? '' : 'none';
}

function closeSeasonDropdownOnOutsideClick() {
  document.addEventListener('click', e => {
    const wrap = document.querySelector('.season-badge-wrap');
    if (wrap && !wrap.contains(e.target)) {
      document.getElementById('seasonDropdown').classList.remove('show');
    }
  });
}

/* ────────────────────────────────────────────────────────────
   NEWS / STORIES
──────────────────────────────────────────────────────────── */
function initStoriesCarousel() {
  const container = document.getElementById('storiesContainer');
  if (!container) return;
  const news = JB.news || [];
  if (!news.length) return;

  container.innerHTML = news.map((n, i) => `
    <div class="story-card" onclick="openStory(${i})">
      <div class="story-bg">
        ${n.img ? `<img src="${n.img}" alt="${n.title}" onerror="this.style.display='none'">` : `<span>${n.emoji || '📰'}</span>`}
      </div>
      <div class="story-overlay"><h3>${n.title}</h3></div>
    </div>`).join('');
}

function openStory(idx) {
  const news = JB.news || [];
  storyIndex = idx;
  renderStoryModal(news);
  document.getElementById('storyModal').classList.add('show');
  startStoryTimer(news);
}

function renderStoryModal(news) {
  const n  = news[storyIndex];
  const prog = document.getElementById('storyProgress');
  if (prog) prog.innerHTML = news.map((_, i) => `<div class="story-seg ${i < storyIndex ? 'done' : i === storyIndex ? 'act' : ''}"></div>`).join('');

  const img = document.getElementById('storyFullImg');
  if (img) {
    img.innerHTML = n.img
      ? `<img src="${n.img}" alt="${n.title}" style="width:100%;height:100%;object-fit:cover;" onerror="this.textContent='${n.emoji || '📰'}'">` 
      : `<span>${n.emoji || '📰'}</span>`;
  }
  document.getElementById('storyFullTitle').textContent = n.title;
  document.getElementById('storyFullBody').textContent  = n.body;
}

function startStoryTimer(news) {
  clearInterval(storyTimer);
  storyTimer = setInterval(() => {
    if (storyIndex < news.length - 1) {
      storyIndex++;
      renderStoryModal(news);
    } else {
      clearInterval(storyTimer);
      closeModal('storyModal');
    }
  }, 4000);
}

/* ────────────────────────────────────────────────────────────
   PLAYER CARDS CAROUSEL
──────────────────────────────────────────────────────────── */
function initPlayerCards() {
  const section = document.getElementById('playerCardsSection');
  const track   = document.getElementById('cardsTrack');
  if (!section || !track) return;

  const players = [...JB.players].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  if (!players.length) return;

  section.style.display = '';

  // Duplicate for infinite scroll
  const render = (arr) => arr.map(p => {
    const hasCard = p.card && p.card.trim();
    const hasPhoto = p.photo && p.photo.trim();
    const cap = p.captain ? '<span class="cap-c">C</span>' : '';

    if (hasCard) {
      return `<div class="pc-item" onclick="openPlayerCard(${p.id})">
        <img class="pc-card-img" src="${p.card}" alt="${p.name}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
        <div class="pc-placeholder" style="display:none;">
          ${hasPhoto ? `<img src="${p.photo}" onerror="this.style.display='none'">` : `<div class="pc-icon">⚽</div>`}
          <p>${p.name}</p>
        </div>
        <div class="pc-name">${p.name}${cap}</div>
        <div class="pc-pos">${p.position}</div>
      </div>`;
    } else {
      return `<div class="pc-item" onclick="openPlayerCard(${p.id})">
        <div class="pc-placeholder">
          ${hasPhoto ? `<img src="${p.photo}" onerror="this.outerHTML='<div class=pc-icon>⚽</div>'">` : `<div class="pc-icon">⚽</div>`}
          <p>${p.name}${p.captain ? ' (C)' : ''}</p>
        </div>
        <div class="pc-name">${p.name}${cap}</div>
        <div class="pc-pos">${p.position}</div>
      </div>`;
    }
  }).join('');

  track.innerHTML = render(players) + render(players); // duplicate for seamless loop
}

function openPlayerCard(playerId) {
  const p = JB.players.find(x => x.id === playerId);
  if (!p) return;
  const team = JB.teams.find(t => t.id === p.teamId);

  const content = document.getElementById('pcModalContent');
  const hasCard  = p.card && p.card.trim();
  const hasPhoto = p.photo && p.photo.trim();

  let html = '';
  if (hasCard) {
    html += `<img class="pcm-img" src="${p.card}" alt="${p.name}"
      onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
      <div class="pcm-placeholder" style="display:none;">
        ${hasPhoto ? `<img src="${p.photo}" onerror="this.style.display='none'">` : `<div class="pcm-icon">⚽</div>`}
      </div>`;
  } else {
    html += `<div class="pcm-placeholder">
      ${hasPhoto ? `<img src="${p.photo}" onerror="this.outerHTML='<div class=pcm-icon>⚽</div>'">` : `<div class="pcm-icon">⚽</div>`}
    </div>`;
  }

  html += `<div class="pcm-info">
    <div class="pcm-name">${p.name}${p.captain ? ' <span class="cap-c">C</span>' : ''}</div>
    <div class="pcm-sub">${p.position} · ${team ? team.name : ''}${p.performance?.jerseyNumber ? ' · #' + p.performance.jerseyNumber : ''}</div>
  </div>`;

  content.innerHTML = html;
  document.getElementById('pcModal').classList.add('show');
}

/* ────────────────────────────────────────────────────────────
   CARD DRAG (manual drag on carousel)
──────────────────────────────────────────────────────────── */
function initCardDrag() {
  const wrap  = document.getElementById('cardsTrackWrap');
  const track = document.getElementById('cardsTrack');
  if (!wrap || !track) return;

  let isDragging = false, startX = 0, scrollStart = 0;

  const getX = e => e.touches ? e.touches[0].clientX : e.clientX;

  wrap.addEventListener('mousedown',  startDrag);
  wrap.addEventListener('touchstart', startDrag, { passive: true });
  wrap.addEventListener('mousemove',  doDrag);
  wrap.addEventListener('touchmove',  doDrag, { passive: true });
  wrap.addEventListener('mouseup',    endDrag);
  wrap.addEventListener('touchend',   endDrag);
  wrap.addEventListener('mouseleave', endDrag);

  function startDrag(e) {
    isDragging  = true;
    startX      = getX(e);
    scrollStart = wrap.scrollLeft || 0;
    track.classList.remove('animating');
    wrap.classList.add('dragging');
  }

  function doDrag(e) {
    if (!isDragging) return;
    const dx = getX(e) - startX;
    wrap.scrollLeft = scrollStart - dx;
  }

  function endDrag() {
    isDragging = false;
    wrap.classList.remove('dragging');
    // Resume CSS animation only if no scroll offset — simpler: just leave off during session
    // Users can re-load if they want the auto-slide back
  }

  // Make cardsTrackWrap overflow-x scroll
  wrap.style.overflowX = 'auto';
  wrap.style.scrollbarWidth = 'none';
}

/* ────────────────────────────────────────────────────────────
   GRAPHS / LIVE STATS
──────────────────────────────────────────────────────────── */
let charts = {};

function initGraphs() {
  const section = document.getElementById('graphsSection');
  const matches = JB.matches || [];
  if (!matches.length) return;
  section.style.display = '';
  drawGraphs();
}

function drawGraphs() {
  const matches = JB.matches || [];
  const teams   = JB.teams || [];
  const players = JB.players || [];

  // ── Points table ──
  const standing = buildStandings(matches, teams);
  destroyChart('chartPts');
  charts['chartPts'] = new Chart(document.getElementById('chartPts'), {
    type: 'bar',
    data: {
      labels: standing.map(s => teams.find(t => t.id === s.teamId)?.name || ''),
      datasets: [{ label: 'Points', data: standing.map(s => s.pts),
        backgroundColor: '#16a34a', borderRadius: 6 }]
    },
    options: barOpts()
  });

  // ── Top Scorers ──
  const scorerMap = {};
  matches.forEach(m => (m.goals || []).filter(g => !g.og).forEach(g => {
    scorerMap[g.playerId] = (scorerMap[g.playerId] || 0) + 1;
  }));
  const topScorers = Object.entries(scorerMap).sort((a, b) => b[1] - a[1]).slice(0, 8);

  destroyChart('chartScorers');
  charts['chartScorers'] = new Chart(document.getElementById('chartScorers'), {
    type: 'bar',
    data: {
      labels: topScorers.map(([id]) => players.find(p => p.id == id)?.name || '?'),
      datasets: [{ label: 'Goals', data: topScorers.map(([, v]) => v),
        backgroundColor: '#d97706', borderRadius: 6 }]
    },
    options: barOpts()
  });

  // ── Top Assisters ──
  const assistMap = {};
  matches.forEach(m => (m.goals || []).filter(g => g.assistId && g.assistId !== 0).forEach(g => {
    assistMap[g.assistId] = (assistMap[g.assistId] || 0) + 1;
  }));
  const topAssists = Object.entries(assistMap).sort((a, b) => b[1] - a[1]).slice(0, 8);

  destroyChart('chartAssists');
  charts['chartAssists'] = new Chart(document.getElementById('chartAssists'), {
    type: 'bar',
    data: {
      labels: topAssists.map(([id]) => players.find(p => p.id == id)?.name || '?'),
      datasets: [{ label: 'Assists', data: topAssists.map(([, v]) => v),
        backgroundColor: '#7c3aed', borderRadius: 6 }]
    },
    options: barOpts()
  });

  // ── Goals by Team ──
  const goalsByTeam = {};
  teams.forEach(t => goalsByTeam[t.id] = 0);
  matches.forEach(m => (m.goals || []).forEach(g => {
    if (!g.og) goalsByTeam[g.teamId] = (goalsByTeam[g.teamId] || 0) + 1;
  }));

  destroyChart('chartGoals');
  charts['chartGoals'] = new Chart(document.getElementById('chartGoals'), {
    type: 'doughnut',
    data: {
      labels: teams.map(t => t.name),
      datasets: [{ data: teams.map(t => goalsByTeam[t.id] || 0),
        backgroundColor: ['#16a34a','#d97706','#dc2626','#7c3aed'] }]
    },
    options: { plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }, maintainAspectRatio: false }
  });

  // ── Yellow Cards ──
  const ycMap = {};
  matches.forEach(m => (m.cards || []).filter(c => c.type === 'yellow' || c.type === 'second-yellow').forEach(c => {
    ycMap[c.playerId] = (ycMap[c.playerId] || 0) + 1;
  }));
  const topYellow = Object.entries(ycMap).sort((a, b) => b[1] - a[1]).slice(0, 8);

  destroyChart('chartCards');
  charts['chartCards'] = new Chart(document.getElementById('chartCards'), {
    type: 'bar',
    data: {
      labels: topYellow.map(([id]) => players.find(p => p.id == id)?.name || '?'),
      datasets: [{ label: 'Yellow Cards', data: topYellow.map(([, v]) => v),
        backgroundColor: '#facc15', borderRadius: 6 }]
    },
    options: barOpts()
  });
}

function destroyChart(id) {
  if (charts[id]) { charts[id].destroy(); delete charts[id]; }
}

function barOpts() {
  return {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { precision: 0, font: { size: 10 } }, grid: { color: '#f1f5f9' } },
      x: { ticks: { font: { size: 10 } }, grid: { display: false } }
    }
  };
}

/* ────────────────────────────────────────────────────────────
   SPONSORS
──────────────────────────────────────────────────────────── */
function initSponsors() {
  const section = document.getElementById('sponsorsSection');
  const grid    = document.getElementById('sponsorsGrid');
  if (!section || !grid) return;

  const sponsors = JB.sponsors || [];
  if (!sponsors.length) return;
  section.style.display = '';

  grid.innerHTML = sponsors.map(s => {
    const initials = s.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const avatar   = s.photo
      ? `<div class="sponsor-avatar"><img src="${s.photo}" alt="${s.name}" onerror="this.parentNode.textContent='${initials}'"></div>`
      : `<div class="sponsor-avatar">${initials}</div>`;
    return `<div class="sponsor-card" onclick="openSponsorModal(${s.id})">
      ${avatar}
      <div>
        <div class="sponsor-name">${s.name}</div>
        <div class="sponsor-role">${s.role || 'Sponsor'}</div>
      </div>
    </div>`;
  }).join('');
}

function openSponsorModal(sponsorId) {
  const s = (JB.sponsors || []).find(x => x.id === sponsorId);
  if (!s) return;

  const initials = s.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const flowers  = '🌸🌺🌹🌻🌼💐🌷';

  document.getElementById('sponsorModalContent').innerHTML = `
    <div class="sponsor-modal-confetti">${flowers}</div>
    ${s.photo ? `<img src="${s.photo}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid var(--gold);margin-bottom:10px;" onerror="this.style.display='none'">` : ''}
    <div class="sponsor-modal-name">${s.name}</div>
    <div class="sponsor-modal-role">${s.role || 'Sponsor'}</div>
    <div class="sponsor-modal-msg">"${s.message || 'Thank you for your generous support!'}"</div>
    <p style="font-size:14px;color:var(--text2);margin-top:14px;line-height:1.7;">
      Thanks for sponsoring the tournament — without your support, we couldn't make all of this possible. 
      The entire committee salutes your generosity! 🙏
    </p>
    <div class="sponsor-flowers">${flowers}</div>`;

  document.getElementById('sponsorModal').classList.add('show');
}

/* ────────────────────────────────────────────────────────────
   EVENTS CAROUSEL
──────────────────────────────────────────────────────────── */
function initEvents() {
  const section = document.getElementById('eventsSection');
  const slides  = document.getElementById('eventsSlides');
  const dots    = document.getElementById('carouselDots');
  if (!section || !slides) return;

  const events = JB.events || [];
  if (!events.length) return;
  section.style.display = '';
  carouselTotal = events.length;

  slides.innerHTML = events.map(ev => `
    <div class="event-slide">
      <img src="${ev.img}" alt="${ev.caption || ''}"
        onerror="this.style.display='none';this.parentNode.style.background='var(--bg)'">
      <div class="event-caption">
        <h3>${ev.caption || ''}</h3>
        ${ev.date ? `<p>📅 ${ev.date}</p>` : ''}
      </div>
    </div>`).join('');

  if (dots) {
    dots.innerHTML = events.map((_, i) =>
      `<button class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></button>`
    ).join('');
  }

  // Carousel drag
  const carousel = document.getElementById('eventsCarousel');
  if (carousel) {
    let dragStart = 0, dragging = false;
    carousel.addEventListener('mousedown', e => { dragging = true; dragStart = e.clientX; });
    carousel.addEventListener('touchstart', e => { dragging = true; dragStart = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('mouseup', e => { if (dragging) { const dx = e.clientX - dragStart; carouselMove(dx < -40 ? 1 : dx > 40 ? -1 : 0); dragging = false; } });
    carousel.addEventListener('touchend', e => { if (dragging) { const dx = e.changedTouches[0].clientX - dragStart; carouselMove(dx < -40 ? 1 : dx > 40 ? -1 : 0); dragging = false; } });
  }

  startCarouselTimer();
}

function carouselMove(dir) {
  if (carouselTotal === 0) return;
  carouselIndex = (carouselIndex + dir + carouselTotal) % carouselTotal;
  goToSlide(carouselIndex);
}

function goToSlide(idx) {
  carouselIndex = idx;
  const slides = document.getElementById('eventsSlides');
  if (slides) slides.style.transform = `translateX(-${idx * 100}%)`;
  document.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
  startCarouselTimer();
}

function startCarouselTimer() {
  clearInterval(carouselTimer);
  if (carouselTotal > 1) {
    carouselTimer = setInterval(() => carouselMove(1), 5000);
  }
}

/* ────────────────────────────────────────────────────────────
   COMMENTS SLIDER
──────────────────────────────────────────────────────────── */
function initComments() {
  const section = document.getElementById('commentSection');
  const track   = document.getElementById('sliderTrack');
  if (!section || !track) return;

  const comments = JB.comments || [];
  if (!comments.length) return;
  section.style.display = '';

  const renderChip = c => `
    <div class="comment-chip">
      <div class="cc-av">${c.name.charAt(0).toUpperCase()}</div>
      <span class="cc-name">${c.name}</span>
      <span class="cc-text">${c.text}</span>
    </div>`;

  const doubled = [...comments, ...comments];
  track.innerHTML = doubled.map(renderChip).join('');
}

/* ────────────────────────────────────────────────────────────
   TEAMS PAGE
──────────────────────────────────────────────────────────── */
function initTeamsPage() {
  const grid = document.getElementById('teamsGrid');
  if (!grid) return;

  grid.innerHTML = JB.teams.map(t => `
    <div class="team-card" onclick="openTeamModal(${t.id})">
      <img class="tc-logo" src="${t.logo}" alt="${t.name}"
        onerror="this.outerHTML='<div style=width:56px;height:56px;border-radius:50%;background:var(--gl);display:flex;align-items:center;justify-content:center;font-size:24px;margin:0 auto 8px;>⚽</div>'">
      <div style="font-weight:700;font-size:14px;">${t.name}</div>
      <div style="font-size:12px;color:var(--muted);margin-top:3px;">${JB.players.filter(p => p.teamId === t.id).length} players</div>
    </div>`).join('');
}

function openTeamModal(teamId) {
  const team    = JB.teams.find(t => t.id === teamId);
  const players = JB.players.filter(p => p.teamId === teamId).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  if (!team) return;

  const stats = buildTeamStats(teamId);

  let html = `
    <div style="text-align:center;margin-bottom:18px;">
      <img src="${team.logo}" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:2px solid var(--border);margin-bottom:8px;"
        onerror="this.style.display='none'">
      <div style="font-family:'Bebas Neue';font-size:26px;letter-spacing:1px;">${team.name}</div>
    </div>
    <div class="pstats-grid" style="margin-bottom:16px;">
      <div class="pstat-box"><div class="pstat-val">${stats.played}</div><div class="pstat-lbl">Played</div></div>
      <div class="pstat-box"><div class="pstat-val">${stats.won}</div><div class="pstat-lbl">Won</div></div>
      <div class="pstat-box"><div class="pstat-val">${stats.drawn}</div><div class="pstat-lbl">Drawn</div></div>
      <div class="pstat-box"><div class="pstat-val">${stats.lost}</div><div class="pstat-lbl">Lost</div></div>
      <div class="pstat-box"><div class="pstat-val">${stats.gf}</div><div class="pstat-lbl">Goals For</div></div>
      <div class="pstat-box"><div class="pstat-val">${stats.ga}</div><div class="pstat-lbl">Goals Against</div></div>
    </div>
    <div style="font-weight:700;font-size:14px;margin-bottom:10px;">Squad</div>`;

  html += players.map(p => {
    const goals   = countPlayerGoals(p.id);
    const assists = countPlayerAssists(p.id);
    return `<div class="player-row" onclick="closeModal('teamModal');openPlayerStatsModal(${p.id})">
      ${p.photo ? `<img src="${p.photo}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:1px solid var(--border);" onerror="this.style.display='none'">` : `<div style="width:36px;height:36px;border-radius:50%;background:var(--gl);display:flex;align-items:center;justify-content:center;">⚽</div>`}
      <div style="flex:1;">
        <div style="font-weight:700;font-size:13px;">${p.name}${p.captain ? ' <span class="cap-c">C</span>' : ''}</div>
        <div style="font-size:11px;color:var(--muted);">${p.position}</div>
      </div>
      <div style="font-size:11px;color:var(--muted);text-align:right;">
        ${goals > 0 ? `⚽ ${goals}` : ''}${assists > 0 ? ` 🎯 ${assists}` : ''}
      </div>
      ${p.performance?.jerseyNumber ? `<span class="plc-jersey">#${p.performance.jerseyNumber}</span>` : ''}
    </div>`;
  }).join('');

  document.getElementById('teamModalContent').innerHTML = html;
  document.getElementById('teamModal').classList.add('show');
}

/* ────────────────────────────────────────────────────────────
   MATCHES PAGE
──────────────────────────────────────────────────────────── */
function initMatchesPage() {
  const list = document.getElementById('matchesList');
  if (!list) return;
  renderMatchesList();
}

function renderMatchesList() {
  const list    = document.getElementById('matchesList');
  const matches = JB.matches || [];
  const teams   = JB.teams || [];

  if (!matches.length) {
    list.innerHTML = `<div style="text-align:center;padding:40px;color:var(--muted);">No matches yet. Check back soon!</div>`;
    return;
  }

  list.innerHTML = [...matches].reverse().map(m => {
    const home    = teams.find(t => t.id === m.homeId);
    const away    = teams.find(t => t.id === m.awayId);
    const dateStr = m.date ? new Date(m.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

    return `<div class="match-card ${m.isFinal ? 'final-match' : ''}">
      ${m.isFinal ? `<div style="text-align:center;margin-bottom:6px;"><span class="badge-gold">🏆 FINAL</span></div>` : ''}
      <div style="text-align:center;font-size:11px;color:var(--muted);margin-bottom:10px;">
        ${m.label ? m.label + ' · ' : ''}${dateStr}${m.time ? ' · ' + m.time : ''}
      </div>
      <div class="match-teams">
        <div class="match-team">
          <img class="team-logo-sm" style="width:44px;height:44px;" src="${home?.logo || ''}" alt="${home?.name || ''}" onerror="this.style.display='none'">
          <div class="match-team-name">${home?.name || 'TBD'}</div>
        </div>
        <div class="match-score">
          ${m.homeScore ?? '—'}&nbsp;–&nbsp;${m.awayScore ?? '—'}
        </div>
        <div class="match-team">
          <img class="team-logo-sm" style="width:44px;height:44px;" src="${away?.logo || ''}" alt="${away?.name || ''}" onerror="this.style.display='none'">
          <div class="match-team-name">${away?.name || 'TBD'}</div>
        </div>
      </div>
      ${(m.goals && m.goals.length) ? `<div class="goal-list" style="justify-content:center;margin-top:10px;">
        ${m.goals.map(g => {
          const scorer = JB.players.find(p => p.id === g.playerId);
          return `<span class="goal-badge">${g.og ? '🔴' : '⚽'} ${scorer?.name || '?'}${g.og ? ' (OG)' : ''}</span>`;
        }).join('')}
      </div>` : ''}
      <div style="text-align:center;margin-top:12px;">
        <button class="btn btn-outline btn-sm" onclick="openMatchDetail(${m.id})">See Match Details</button>
      </div>
    </div>`;
  }).join('');
}

function openMatchDetail(matchId) {
  const m    = (JB.matches || []).find(x => x.id === matchId);
  if (!m) return;
  const home = JB.teams.find(t => t.id === m.homeId);
  const away = JB.teams.find(t => t.id === m.awayId);
  const dateStr = m.date ? new Date(m.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

  const homeGoals  = (m.goals || []).filter(g => g.teamId === m.homeId);
  const awayGoals  = (m.goals || []).filter(g => g.teamId === m.awayId);
  const homeCards  = (m.cards || []).filter(c => JB.players.find(p => p.id === c.playerId)?.teamId === m.homeId);
  const awayCards  = (m.cards || []).filter(c => JB.players.find(p => p.id === c.playerId)?.teamId === m.awayId);

  const goalRows = (goals, side) => goals.map(g => {
    const scorer   = JB.players.find(p => p.id === g.playerId);
    const assister = g.assistId ? JB.players.find(p => p.id === g.assistId) : null;
    const isOG     = g.og;
    // For OG: if home scores OG, it goes to away side display visually (credited to away)
    const alignSide = side; // We keep it under the team section regardless
    return `<div class="match-goal-row">
      ${scorer?.photo
        ? `<img class="match-goal-photo" src="${scorer.photo}" alt="${scorer?.name}" onerror="this.style.display='none'">`
        : `<div style="width:36px;height:36px;border-radius:50%;background:var(--gl);display:flex;align-items:center;justify-content:center;flex-shrink:0;">${isOG ? '🔴' : '⚽'}</div>`}
      <div class="match-goal-info">
        <div class="match-goal-name">${isOG ? '🔴' : '⚽'} ${scorer?.name || '?'}${isOG ? ' <span style="font-size:11px;color:var(--red);">(Own Goal)</span>' : ''}</div>
        ${assister ? `<div class="match-goal-sub">🎯 Assist: ${assister.name}
          ${assister.photo ? `<img src="${assister.photo}" style="width:18px;height:18px;border-radius:50%;object-fit:cover;vertical-align:middle;margin-left:4px;" onerror="this.style.display='none'">` : ''}
        </div>` : ''}
      </div>
    </div>`;
  }).join('');

  const cardRows = (cards) => cards.map(c => {
    const player = JB.players.find(p => p.id === c.playerId);
    const isRed  = c.type === 'red' || c.type === 'second-yellow';
    return `<div class="match-card-row">
      ${player?.photo
        ? `<img style="width:30px;height:30px;border-radius:50%;object-fit:cover;" src="${player.photo}" alt="${player?.name}" onerror="this.style.display='none'">`
        : `<div style="width:30px;height:30px;border-radius:50%;background:var(--bg);display:flex;align-items:center;justify-content:center;">${isRed ? '🟥' : '🟨'}</div>`}
      <span style="font-size:13px;">${isRed ? '🟥' : '🟨'} ${player?.name || '?'}${c.type === 'second-yellow' ? ' (2nd Yellow)' : ''}</span>
    </div>`;
  }).join('');

  const teamSection = (team, goals, cards, score) => `
    <div class="match-detail-team-header">
      ${team?.logo ? `<img class="match-detail-team-logo" src="${team.logo}" alt="${team?.name}" onerror="this.style.display='none'">` : ''}
      <div class="match-detail-team-name">${team?.name || 'TBD'}</div>
      <div style="margin-left:auto;font-family:'Bebas Neue';font-size:32px;color:var(--green);">${score ?? '—'}</div>
    </div>
    ${goals.length ? `<div style="margin-bottom:10px;">${goalRows(goals, team?.id)}</div>` : ''}
    ${cards.length ? `<div>${cardRows(cards)}</div>` : ''}`;

  document.getElementById('matchDetailContent').innerHTML = `
    <div style="text-align:center;margin-bottom:16px;">
      <div style="font-family:'Bebas Neue';font-size:22px;letter-spacing:1px;">Match Details</div>
      <div style="font-size:12px;color:var(--muted);">${m.label ? m.label + ' · ' : ''}${dateStr}${m.time ? ' · ' + m.time : ''}</div>
      ${m.isFinal ? `<span class="badge-gold" style="margin-top:5px;display:inline-block;">🏆 FINAL</span>` : ''}
    </div>
    ${teamSection(home, homeGoals, homeCards, m.homeScore)}
    <div style="border-top:2px solid var(--border);margin:16px 0;"></div>
    ${teamSection(away, awayGoals, awayCards, m.awayScore)}`;

  document.getElementById('matchDetailModal').classList.add('show');
}

/* ────────────────────────────────────────────────────────────
   POINTS TABLE
──────────────────────────────────────────────────────────── */
function initTablePage() {
  renderPointsTable();
}

function renderPointsTable() {
  const body = document.getElementById('pointsBody');
  if (!body) return;

  const standing = buildStandings(JB.matches || [], JB.teams || []);

  body.innerHTML = standing.map((s, i) => {
    const team = JB.teams.find(t => t.id === s.teamId);
    const cls  = i === 0 ? 'pos-1' : i === 1 ? 'pos-2' : i === 2 ? 'pos-3' : '';
    return `<tr>
      <td class="${cls}">${i + 1}</td>
      <td>
        <div style="display:flex;align-items:center;gap:8px;">
          <img class="team-logo-sm" src="${team?.logo || ''}" alt="" onerror="this.style.display='none'">
          <span style="font-weight:600;">${team?.name || ''}</span>
        </div>
      </td>
      <td>${s.played}</td><td>${s.won}</td><td>${s.drawn}</td><td>${s.lost}</td>
      <td>${s.gf}</td><td>${s.ga}</td>
      <td style="color:${s.gf - s.ga >= 0 ? 'var(--green)' : 'var(--red)'};">${s.gf - s.ga > 0 ? '+' : ''}${s.gf - s.ga}</td>
      <td style="font-weight:800;color:var(--green);">${s.pts}</td>
    </tr>`;
  }).join('');
}

function buildStandings(matches, teams) {
  const map = {};
  teams.forEach(t => map[t.id] = { teamId: t.id, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, pts: 0 });

  matches.forEach(m => {
    if (m.homeScore == null || m.awayScore == null) return;
    const h = map[m.homeId], a = map[m.awayId];
    if (!h || !a) return;
    h.played++; a.played++;
    h.gf += m.homeScore; h.ga += m.awayScore;
    a.gf += m.awayScore; a.ga += m.homeScore;
    if (m.homeScore > m.awayScore)      { h.won++; h.pts += 3; a.lost++; }
    else if (m.homeScore < m.awayScore) { a.won++; a.pts += 3; h.lost++; }
    else                                { h.drawn++; h.pts++; a.drawn++; a.pts++; }
  });

  return Object.values(map).sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf);
}

function buildTeamStats(teamId) {
  const matches = JB.matches || [];
  const s = { played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0 };
  matches.forEach(m => {
    if (m.homeScore == null) return;
    const isHome = m.homeId === teamId, isAway = m.awayId === teamId;
    if (!isHome && !isAway) return;
    s.played++;
    const myScore  = isHome ? m.homeScore : m.awayScore;
    const oppScore = isHome ? m.awayScore : m.homeScore;
    s.gf += myScore; s.ga += oppScore;
    if (myScore > oppScore) s.won++;
    else if (myScore < oppScore) s.lost++;
    else s.drawn++;
  });
  return s;
}

/* ────────────────────────────────────────────────────────────
   STATS PAGE
──────────────────────────────────────────────────────────── */
function initStatsPage() {
  renderStatsPage();
}

function renderStatsPage() {
  renderTopScorers();
  renderTopAssisters();
  renderCardsTable();
  renderAttackDefence();
}

function renderTopScorers() {
  const el = document.getElementById('topScorers');
  if (!el) return;
  const scorerMap = {};
  (JB.matches || []).forEach(m => (m.goals || []).filter(g => !g.og).forEach(g => {
    scorerMap[g.playerId] = (scorerMap[g.playerId] || 0) + 1;
  }));
  const sorted = Object.entries(scorerMap).sort((a, b) => b[1] - a[1]);
  if (!sorted.length) { el.innerHTML = `<div style="color:var(--muted);font-size:13px;">No goals yet.</div>`; return; }

  el.innerHTML = sorted.map(([id, cnt], i) => {
    const p    = JB.players.find(x => x.id == id);
    const team = JB.teams.find(t => t.id === p?.teamId);
    return `<div class="stat-row" onclick="openPlayerStatsModal(${id})">
      <div class="stat-rank">${i + 1}</div>
      ${p?.photo ? `<img class="player-photo-sm" src="${p.photo}" onerror="this.style.display='none'">` : `<div style="width:30px;height:30px;border-radius:50%;background:var(--gl);display:flex;align-items:center;justify-content:center;">⚽</div>`}
      <div class="stat-info">
        <div class="stat-name">${p?.name || '?'}</div>
        <div class="stat-meta">${p?.position || ''} · 
          ${team?.logo ? `<img class="team-logo-sm" src="${team.logo}" style="width:14px;height:14px;" onerror="this.style.display='none'">` : ''} ${team?.name || ''}
        </div>
      </div>
      <div class="stat-count">⚽ ${cnt}</div>
    </div>`;
  }).join('');
}

function renderTopAssisters() {
  const el = document.getElementById('topAssisters');
  if (!el) return;
  const assistMap = {};
  (JB.matches || []).forEach(m => (m.goals || []).filter(g => g.assistId && g.assistId !== 0).forEach(g => {
    assistMap[g.assistId] = (assistMap[g.assistId] || 0) + 1;
  }));
  const sorted = Object.entries(assistMap).sort((a, b) => b[1] - a[1]);
  if (!sorted.length) { el.innerHTML = `<div style="color:var(--muted);font-size:13px;">No assists yet.</div>`; return; }

  el.innerHTML = sorted.map(([id, cnt], i) => {
    const p    = JB.players.find(x => x.id == id);
    const team = JB.teams.find(t => t.id === p?.teamId);
    return `<div class="stat-row" onclick="openPlayerStatsModal(${id})">
      <div class="stat-rank">${i + 1}</div>
      ${p?.photo ? `<img class="player-photo-sm" src="${p.photo}" onerror="this.style.display='none'">` : `<div style="width:30px;height:30px;border-radius:50%;background:var(--gl);display:flex;align-items:center;justify-content:center;">🎯</div>`}
      <div class="stat-info">
        <div class="stat-name">${p?.name || '?'}</div>
        <div class="stat-meta">${p?.position || ''} · ${team?.name || ''}</div>
      </div>
      <div class="stat-count">🎯 ${cnt}</div>
    </div>`;
  }).join('');
}

function renderCardsTable() {
  const tbody = document.getElementById('cardsTable');
  if (!tbody) return;

  const cardMap = {};
  (JB.matches || []).forEach(m => (m.cards || []).forEach(c => {
    if (!cardMap[c.playerId]) cardMap[c.playerId] = { yellow: 0, red: 0 };
    if (c.type === 'yellow')                           cardMap[c.playerId].yellow++;
    else if (c.type === 'red')                         cardMap[c.playerId].red++;
    else if (c.type === 'second-yellow') { cardMap[c.playerId].yellow++; cardMap[c.playerId].red++; }
  }));

  const rows = Object.entries(cardMap).filter(([, v]) => v.yellow > 0 || v.red > 0);
  if (!rows.length) { tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:var(--muted);">No cards issued yet.</td></tr>`; return; }

  tbody.innerHTML = rows.map(([id, v]) => {
    const p    = JB.players.find(x => x.id == id);
    const team = JB.teams.find(t => t.id === p?.teamId);
    return `<tr>
      <td>
        <div style="display:flex;align-items:center;gap:7px;">
          ${p?.photo ? `<img class="player-photo-xs" src="${p.photo}" onerror="this.style.display='none'">` : ''}
          <span style="font-weight:600;">${p?.name || '?'}</span>
        </div>
      </td>
      <td>
        <div style="display:flex;align-items:center;gap:5px;">
          ${team?.logo ? `<img class="team-logo-sm" src="${team.logo}" onerror="this.style.display='none'">` : ''}
          ${team?.name || ''}
        </div>
      </td>
      <td>${v.yellow > 0 ? `<span class="card-y-dot"></span>${v.yellow}` : '—'}</td>
      <td>${v.red    > 0 ? `<span class="card-r-dot"></span>${v.red}`    : '—'}</td>
    </tr>`;
  }).join('');
}

function renderAttackDefence() {
  const atkBody = document.getElementById('bestAttack');
  const defBody = document.getElementById('bestDefence');

  const standing = buildStandings(JB.matches || [], JB.teams || []);

  if (atkBody) {
    const sorted = [...standing].sort((a, b) => b.gf - a.gf);
    atkBody.innerHTML = sorted.map((s, i) => {
      const t = JB.teams.find(x => x.id === s.teamId);
      return `<tr>
        <td>${i + 1}</td>
        <td><div style="display:flex;align-items:center;gap:6px;">
          ${t?.logo ? `<img class="team-logo-sm" src="${t.logo}" onerror="this.style.display='none'">` : ''}
          ${t?.name || ''}
        </div></td>
        <td style="font-weight:700;">${s.gf}</td>
      </tr>`;
    }).join('');
  }

  if (defBody) {
    const sorted = [...standing].sort((a, b) => a.ga - b.ga);
    defBody.innerHTML = sorted.map((s, i) => {
      const t = JB.teams.find(x => x.id === s.teamId);
      return `<tr>
        <td>${i + 1}</td>
        <td><div style="display:flex;align-items:center;gap:6px;">
          ${t?.logo ? `<img class="team-logo-sm" src="${t.logo}" onerror="this.style.display='none'">` : ''}
          ${t?.name || ''}
        </div></td>
        <td style="font-weight:700;">${s.ga}</td>
      </tr>`;
    }).join('');
  }
}

/* ────────────────────────────────────────────────────────────
   PLAYER STATS MODAL
──────────────────────────────────────────────────────────── */
function openPlayerStatsModal(playerId) {
  const p = JB.players.find(x => x.id == playerId);
  if (!p) return;
  const team    = JB.teams.find(t => t.id === p.teamId);
  const goals   = countPlayerGoals(p.id);
  const assists = countPlayerAssists(p.id);
  const yc      = countPlayerCards(p.id, 'yellow');
  const rc      = countPlayerCards(p.id, 'red');
  const perf    = p.performance || {};

  document.getElementById('statsModalContent').innerHTML = `
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
      ${p.photo ? `<img src="${p.photo}" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid var(--green);" onerror="this.style.display='none'">` : `<div style="width:64px;height:64px;border-radius:50%;background:var(--gl);display:flex;align-items:center;justify-content:center;font-size:28px;">⚽</div>`}
      <div>
        <div style="font-family:'Bebas Neue';font-size:22px;letter-spacing:1px;">${p.name}${p.captain ? ' <span class="cap-c">C</span>' : ''}</div>
        <div style="font-size:12px;color:var(--muted);">${p.position}
          ${perf.jerseyNumber ? ' · #' + perf.jerseyNumber : ''}
        </div>
        <div style="display:flex;align-items:center;gap:5px;margin-top:3px;">
          ${team?.logo ? `<img style="width:18px;height:18px;border-radius:50%;object-fit:cover;" src="${team.logo}" onerror="this.style.display='none'">` : ''}
          <span style="font-size:12px;font-weight:600;">${team?.name || ''}</span>
        </div>
      </div>
    </div>
    <div class="pstats-grid">
      <div class="pstat-box"><div class="pstat-val">${perf.appearances || 0}</div><div class="pstat-lbl">Appearances</div></div>
      <div class="pstat-box"><div class="pstat-val">${goals}</div><div class="pstat-lbl">Goals ⚽</div></div>
      <div class="pstat-box"><div class="pstat-val">${assists}</div><div class="pstat-lbl">Assists 🎯</div></div>
      <div class="pstat-box"><div class="pstat-val">${yc}</div><div class="pstat-lbl">Yellow 🟨</div></div>
      <div class="pstat-box"><div class="pstat-val">${rc}</div><div class="pstat-lbl">Red 🟥</div></div>
      ${p.position === 'Goalkeeper' ? `<div class="pstat-box"><div class="pstat-val">${perf.cleanSheets || 0}</div><div class="pstat-lbl">Clean Sheets</div></div>` : ''}
    </div>
    ${perf.note ? `<div style="margin-top:12px;padding:10px;background:var(--bg);border-radius:8px;font-size:13px;color:var(--text2);">📝 ${perf.note}</div>` : ''}`;

  document.getElementById('statsModal').classList.add('show');
}

function countPlayerGoals(id) {
  let c = 0;
  (JB.matches || []).forEach(m => (m.goals || []).forEach(g => { if (g.playerId === id && !g.og) c++; }));
  return c;
}

function countPlayerAssists(id) {
  let c = 0;
  (JB.matches || []).forEach(m => (m.goals || []).forEach(g => { if (g.assistId === id) c++; }));
  return c;
}

function countPlayerCards(id, type) {
  let c = 0;
  (JB.matches || []).forEach(m => (m.cards || []).forEach(card => {
    if (card.playerId === id) {
      if (type === 'yellow' && (card.type === 'yellow' || card.type === 'second-yellow')) c++;
      if (type === 'red'    && (card.type === 'red'    || card.type === 'second-yellow')) c++;
    }
  }));
  return c;
}

/* ────────────────────────────────────────────────────────────
   PLAYERS PAGE
──────────────────────────────────────────────────────────── */
function renderPlayersPage() {
  const container = document.getElementById('playersListContent');
  if (!container) return;

  let html = `<div class="players-list">`;

  JB.teams.forEach(team => {
    const teamPlayers = JB.players
      .filter(p => p.teamId === team.id)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (!teamPlayers.length) return;

    html += `<div class="players-team-section">
      <div class="players-team-header">
        ${team.logo ? `<img src="${team.logo}" alt="${team.name}" onerror="this.style.display='none'">` : ''}
        <h3>${team.name}</h3>
      </div>`;

    teamPlayers.forEach(p => {
      const goals   = countPlayerGoals(p.id);
      const assists = countPlayerAssists(p.id);
      const yc      = countPlayerCards(p.id, 'yellow');
      const rc      = countPlayerCards(p.id, 'red');
      const perf    = p.performance || {};

      html += `<div class="player-list-card" onclick="openPlayerStatsModal(${p.id})">
        ${p.photo
          ? `<img class="plc-photo" src="${p.photo}" alt="${p.name}" onerror="this.outerHTML='<div class=plc-photo style=background:var(--gl);display:flex;align-items:center;justify-content:center;>⚽</div>'">`
          : `<div class="plc-photo" style="background:var(--gl);display:flex;align-items:center;justify-content:center;font-size:20px;">⚽</div>`}
        <div class="plc-info">
          <div class="plc-name">${p.name}${p.captain ? ' <span class="cap-c">C</span>' : ''}</div>
          <div class="plc-pos">${p.position}</div>
          <div class="plc-stats">
            <div class="plc-stat"><span>Apps</span><span>${perf.appearances || 0}</span></div>
            ${goals   > 0 ? `<div class="plc-stat"><span>⚽</span><span>${goals}</span></div>` : ''}
            ${assists > 0 ? `<div class="plc-stat"><span>🎯</span><span>${assists}</span></div>` : ''}
            ${yc      > 0 ? `<div class="plc-stat"><span>🟨</span><span>${yc}</span></div>` : ''}
            ${rc      > 0 ? `<div class="plc-stat"><span>🟥</span><span>${rc}</span></div>` : ''}
          </div>
        </div>
        ${perf.jerseyNumber ? `<span class="plc-jersey">#${perf.jerseyNumber}</span>` : ''}
      </div>`;
    });

    html += `</div>`;
  });

  html += `</div>`;
  container.innerHTML = html;
}

/* ────────────────────────────────────────────────────────────
   LOGIN — USER
──────────────────────────────────────────────────────────── */
function getAllUsers() {
  // Build full user list: players (auto) + manual users array
  const manual = JB.users || [];
  const playerUsers = JB.players.map(p => ({
    username:    p.username,
    password:    p.password,
    usertype:    'p',
    displayName: p.name,
    playerId:    p.id
  }));
  return [...playerUsers, ...manual];
}

function openUserLogin() {
  document.getElementById('userLoginOverlay').classList.add('show');
  document.getElementById('ulUsername').value = '';
  document.getElementById('ulPassword').value = '';
  document.getElementById('ulErr').style.display = 'none';
  setTimeout(() => document.getElementById('ulUsername').focus(), 100);
}

function closeUserLoginOverlay(e) {
  if (e && e.target !== document.getElementById('userLoginOverlay')) return;
  document.getElementById('userLoginOverlay').classList.remove('show');
}

function userLogin() {
  const username = document.getElementById('ulUsername').value.trim().toLowerCase();
  const password = document.getElementById('ulPassword').value;
  const users    = getAllUsers();
  const user     = users.find(u => u.username.toLowerCase() === username && u.password === password);

  if (!user) {
    document.getElementById('ulErr').style.display = 'block';
    return;
  }

  currentUser = user;
  localStorage.setItem('jb_user', JSON.stringify({ username: user.username, password: user.password }));

  document.getElementById('userLoginOverlay').classList.remove('show');
  document.getElementById('ulErr').style.display = 'none';

  updateLoginUI();
  showToast(`Welcome, ${user.displayName}! 👋`);
  renderKeycardSection();
}

function userLogout() {
  currentUser = null;
  localStorage.removeItem('jb_user');
  updateLoginUI();
  renderKeycardSection();
  closeModal('profileModal');
  showToast('Logged out.');
}

function checkSavedLogin() {
  try {
    const saved = localStorage.getItem('jb_user');
    if (!saved) return;
    const { username, password } = JSON.parse(saved);
    const users = getAllUsers();
    const user  = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
    if (user) {
      currentUser = user;
      updateLoginUI();
      renderKeycardSection();
    }
  } catch {}
}

function updateLoginUI() {
  const profileBtn   = document.getElementById('profileBtn');
  const loginNavBtn  = document.getElementById('loginNavBtn');
  const profileImg   = document.getElementById('profileBtnImg');
  const profileInit  = document.getElementById('profileBtnInitial');

  if (currentUser) {
    profileBtn.style.display  = 'flex';
    loginNavBtn.style.display = 'none';

    // Find player photo
    const player = currentUser.playerId ? JB.players.find(p => p.id === currentUser.playerId) : null;
    if (player?.photo) {
      profileImg.src = player.photo;
      profileImg.style.display = 'block';
      profileInit.textContent  = '';
    } else {
      profileImg.style.display  = 'none';
      profileInit.textContent   = (currentUser.displayName || currentUser.username).charAt(0).toUpperCase();
    }
  } else {
    profileBtn.style.display  = 'none';
    loginNavBtn.style.display = '';
  }
}

/* ────────────────────────────────────────────────────────────
   PROFILE MODAL
──────────────────────────────────────────────────────────── */
function openProfileModal() {
  if (!currentUser) { openUserLogin(); return; }
  const player = currentUser.playerId ? JB.players.find(p => p.id === currentUser.playerId) : null;
  const team   = player ? JB.teams.find(t => t.id === player.teamId) : null;

  let html = `<div style="text-align:center;margin-bottom:16px;">
    ${player?.photo ? `<img src="${player.photo}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid var(--green);margin-bottom:8px;" onerror="this.style.display='none'">` : `<div style="width:80px;height:80px;border-radius:50%;background:var(--gl);display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 8px;">👤</div>`}
    <div style="font-family:'Bebas Neue';font-size:22px;letter-spacing:1px;">${currentUser.displayName}</div>
    <div style="font-size:12px;color:var(--muted);">${currentUser.usertype === 'p' ? 'Player' : currentUser.usertype === 's' ? 'Sponsor' : 'Fan'}</div>
    ${team ? `<div style="display:flex;align-items:center;gap:6px;justify-content:center;margin-top:5px;">
      ${team.logo ? `<img style="width:20px;height:20px;border-radius:50%;" src="${team.logo}" onerror="this.style.display='none'">` : ''}
      <span style="font-size:13px;font-weight:600;">${team.name}</span>
    </div>` : ''}
  </div>`;

  if (player) {
    const goals   = countPlayerGoals(player.id);
    const assists = countPlayerAssists(player.id);
    const yc      = countPlayerCards(player.id, 'yellow');
    const rc      = countPlayerCards(player.id, 'red');
    const perf    = player.performance || {};
    html += `<div class="pstats-grid" style="margin-bottom:14px;">
      <div class="pstat-box"><div class="pstat-val">${perf.appearances || 0}</div><div class="pstat-lbl">Apps</div></div>
      <div class="pstat-box"><div class="pstat-val">${goals}</div><div class="pstat-lbl">Goals ⚽</div></div>
      <div class="pstat-box"><div class="pstat-val">${assists}</div><div class="pstat-lbl">Assists 🎯</div></div>
      <div class="pstat-box"><div class="pstat-val">${yc}</div><div class="pstat-lbl">Yellow 🟨</div></div>
    </div>`;
  }

  html += `<button class="btn btn-outline btn-full" onclick="userLogout()" style="margin-top:6px;">Logout</button>`;

  document.getElementById('profileModalContent').innerHTML = html;
  document.getElementById('profileModal').classList.add('show');
}

/* ────────────────────────────────────────────────────────────
   KEYCARD SECTION (home page, post-login)
──────────────────────────────────────────────────────────── */
function renderKeycardSection() {
  // Insert or update keycard section in home page
  let kc = document.getElementById('keycardSection');
  if (!kc) {
    kc = document.createElement('div');
    kc.id = 'keycardSection';
    kc.className = 'keycard-section';
    // Insert after hero
    const hero = document.querySelector('.hero');
    if (hero && hero.parentNode) hero.parentNode.insertBefore(kc, hero.nextSibling);
  }

  if (!currentUser) { kc.innerHTML = ''; return; }

  if (currentUser.usertype === 's') {
    // Sponsor keycard
    const sponsor = (JB.sponsors || []).find(s =>
      s.name.toLowerCase().replace(/\s/g, '') === currentUser.username.toLowerCase() ||
      currentUser.displayName.toLowerCase().includes(s.name.toLowerCase().split(' ')[0].toLowerCase())
    );
    kc.innerHTML = `<button class="keycard-btn sponsor-keycard-btn" onclick="openSponsorKeycard()">
      <span class="kc-icon">🗝️</span>
      A message for you, ${currentUser.displayName} ✨
    </button>`;
  } else if (currentUser.usertype === 'p') {
    kc.innerHTML = `<button class="keycard-btn" onclick="openPlayerKeycard()">
      <span class="kc-icon">🗝️</span>
      See how fans voted for you, ${currentUser.displayName} 🌟
    </button>`;
  } else {
    kc.innerHTML = '';
  }
}

function openSponsorKeycard() {
  const content = `<div class="keycard-modal-inner">
    <div style="font-size:48px;margin-bottom:10px;">🌸🏆🌸</div>
    <div class="kc-title">Thank You, ${currentUser.displayName}!</div>
    <p style="font-size:14px;color:var(--text2);margin-top:10px;line-height:1.7;">
      Your sponsorship made Joga Bonito Season 1 possible. Without your generous support,
      none of this would have happened. The entire committee, all the players, and every fan
      is deeply grateful for you. 🙏
    </p>
    <div style="font-size:28px;margin-top:16px;">🌺🌹🌻🌼💐🌷🌸</div>
    <p style="font-size:13px;color:var(--green);font-weight:700;margin-top:10px;">The committee salutes you! ⭐</p>
  </div>`;
  showKeycardPopup(content);
}

function openPlayerKeycard() {
  const playerId = currentUser.playerId;
  const reviews  = JB.reviews || [];
  if (!reviews.length) {
    showKeycardPopup(`<div class="keycard-modal-inner"><div class="kc-title">Hi ${currentUser.displayName}! 👋</div><p style="margin-top:12px;color:var(--muted);">No fan votes yet. Check back after reviews are published!</p></div>`);
    return;
  }

  const playerName = currentUser.displayName;
  const total      = reviews.length;

  const voteQuestions = [
    { key: 'mvp',           label: 'Tournament MVP' },
    { key: 'best_attacker', label: 'Best Attacker' },
    { key: 'best_defender', label: 'Best Defender' },
    { key: 'best_gk',       label: 'Best Goalkeeper' },
    { key: 'most_agile',    label: 'Most Agile' },
    { key: 'skillful',      label: 'Most Skillful' },
    { key: 'emerging',      label: 'Best Emerging Player' },
    { key: 'fav_player',    label: 'Fan Favourite' },
  ];

  const rows = voteQuestions.map(q => {
    const cnt = reviews.filter(r => r[q.key] === playerName).length;
    if (cnt === 0) return null;
    const pct = Math.round((cnt / total) * 100);
    return `<div class="kc-vote-row">
      <span class="kc-vote-label">${q.label}</span>
      <span class="kc-vote-pct">${pct}%</span>
    </div>`;
  }).filter(Boolean).join('');

  const content = `<div class="keycard-modal-inner">
    <div class="kc-title">Your Fan Votes 🌟</div>
    <p style="font-size:12px;color:var(--muted);margin-bottom:12px;">Based on ${total} fan review${total > 1 ? 's' : ''}.</p>
    ${rows || `<p style="color:var(--muted);font-size:13px;">No one has voted for you yet — keep playing great! ⚽</p>`}
  </div>`;

  showKeycardPopup(content);
}

function showKeycardPopup(content) {
  document.getElementById('statsModalContent').innerHTML = content;
  document.getElementById('statsModal').classList.add('show');
}

/* ────────────────────────────────────────────────────────────
   REVIEW FORM
──────────────────────────────────────────────────────────── */
function initReviewForm() {
  populatePlayerSelects();
  buildTeamRankings();
  buildCommitteeStars();
}

function renderReviewPage() {
  const wall       = document.getElementById('reviewLoginWall');
  const editNotice = document.getElementById('editNotice');
  const formCard   = document.getElementById('reviewFormCard');
  const successBox = document.getElementById('reviewSuccess');

  if (!currentUser) {
    wall.style.display     = 'block';
    formCard.style.display = 'none';
    editNotice.style.display = 'none';
    return;
  }

  wall.style.display = 'none';
  successBox.style.display = 'none';
  formCard.style.display = '';

  // Auto-fill name (read-only)
  document.getElementById('reviewerName').value     = currentUser.displayName;
  document.getElementById('hiddenSubmittedBy').value = currentUser.username;

  // Check if already submitted → show edit notice
  const already = (JB.reviews || []).find(r => r.reviewer === currentUser.displayName);
  editNotice.style.display = already ? 'flex' : 'none';

  // Pre-fill existing values if editing
  if (already) prefillForm(already);
}

function prefillForm(review) {
  const set = (id, val) => { const el = document.getElementById(id); if (el && val) el.value = val; };
  set('q_mvp', review.mvp);
  set('q_best_gk', review.best_gk);
  set('q_best_attacker', review.best_attacker);
  set('q_best_defender', review.best_defender);
  set('q_most_agile', review.most_agile);
  set('q_skillful', review.skillful);
  set('q_emerging', review.emerging);
  set('q_fav_player', review.fav_player);
  set('q_best_captain', review.best_captain);
  set('q_best_entertain', review.best_entertain);
  set('q_luckiest', review.luckiest);
  set('q_unluckiest', review.unluckiest);
  set('q_improved', review.improved);
  set('q_feedback', review.feedback);
  set('q_comments', review.comments);
  set('q_committee_note', review.committee_note);

  // Committee stars
  const keys = ['auction','dates','inform','ground','arrange','fair','ref','site','fans','sponsor','trophy','post'];
  keys.forEach(k => {
    const val = review['committee_' + k];
    if (val) setStarRating('comm_' + k, val);
  });
}

function populatePlayerSelects() {
  const playerNames = JB.players.map(p => p.name);
  const teamNames   = JB.teams.map(t => t.name);
  const captains    = JB.players.filter(p => p.captain);

  const playerSelectIds = ['q_mvp','q_best_gk','q_best_attacker','q_best_defender',
                           'q_most_agile','q_skillful','q_emerging','q_fav_player'];

  const captainSelectIds = ['q_best_captain'];
  const teamSelectIds    = ['q_best_entertain','q_luckiest','q_unluckiest','q_improved'];

  playerSelectIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `<option value="">— Select —</option>` +
      playerNames.map(n => `<option value="${n}">${n}</option>`).join('');
  });

  captainSelectIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `<option value="">— Select —</option>` +
      captains.map(p => {
        const team = JB.teams.find(t => t.id === p.teamId);
        return `<option value="${team?.name || p.name}">${team?.name || p.name} (${p.name})</option>`;
      }).join('');
  });

  teamSelectIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `<option value="">— Select —</option>` +
      teamNames.map(n => `<option value="${n}">${n}</option>`).join('');
  });
}

/* ── Formation & Player Slots ── */
let selectedFormation = null;
let slotValues = [];

function selFm(el, fm) {
  document.querySelectorAll('.formation-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  selectedFormation = fm;
  document.getElementById('fmInput').value = fm;
  buildPlayerSlots(fm);
}

function buildPlayerSlots(fm) {
  const container = document.getElementById('playerSlots');
  if (!container) return;

  const [d, m, a] = fm.split('-').map(Number);
  const slots = [
    { label: '🧤 Goalkeeper', count: 1 },
    ...Array(d).fill({ label: '🛡️ Defender', count: 1 }),
    ...Array(m).fill({ label: '🎯 Midfielder', count: 1 }),
    ...Array(a).fill({ label: '⚽ Attacker', count: 1 }),
  ];

  container.innerHTML = slots.map((s, i) => `
    <div class="form-group">
      <div class="slot-label">${s.label}</div>
      <select id="slot_${i}" onchange="updateSquad()">
        <option value="">— Select Player —</option>
        ${JB.players.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
      </select>
    </div>`).join('');

  // Remove already-selected from other slots on change
  container.querySelectorAll('select').forEach(sel => {
    sel.addEventListener('change', () => refreshSlotOptions());
  });
}

function refreshSlotOptions() {
  const selects = Array.from(document.querySelectorAll('[id^="slot_"]'));
  const chosen  = selects.map(s => s.value).filter(Boolean);

  selects.forEach(sel => {
    const current = sel.value;
    sel.innerHTML = `<option value="">— Select Player —</option>` +
      JB.players
        .filter(p => !chosen.includes(p.name) || p.name === current)
        .map(p => `<option value="${p.name}" ${p.name === current ? 'selected' : ''}>${p.name}</option>`)
        .join('');
  });

  updateSquad();
}

function updateSquad() {
  const selects = Array.from(document.querySelectorAll('[id^="slot_"]'));
  const squad   = selects.map(s => s.value).filter(Boolean).join(', ');
  const inp     = document.getElementById('squadInput');
  if (inp) inp.value = squad;
}

/* ── Team Rankings (drag & drop) ── */
function buildTeamRankings() {
  buildRankList('teamRankings',   'rankInput',     'Overall');
  buildRankList('favTeamRankings','favRankInput',  'Fan Favourite');
  buildRankList('fairPlayRankings','fairRankInput','Fair Play');
}

function buildRankList(containerId, inputId, type) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const teams = [...JB.teams];
  dragRankState[containerId] = teams.map(t => t.name);

  container.innerHTML = teams.map((t, i) => `
    <div class="ranking-row" id="rr_${containerId}_${i}">
      <span class="rank-label">#${i + 1}</span>
      <select onchange="updateRankOrder('${containerId}','${inputId}',${i},this.value)">
        ${teams.map(tt => `<option value="${tt.name}" ${tt.name === t.name ? 'selected' : ''}>${tt.name}</option>`).join('')}
      </select>
    </div>`).join('');

  updateRankInput(containerId, inputId);
}

function updateRankOrder(containerId, inputId, idx, val) {
  dragRankState[containerId][idx] = val;
  updateRankInput(containerId, inputId);
}

function updateRankInput(containerId, inputId) {
  const inp = document.getElementById(inputId);
  if (!inp) return;
  const ranks = dragRankState[containerId] || [];
  inp.value = ranks.map((name, i) => `#${i + 1}: ${name}`).join(' | ');
}

/* ── Committee Stars ── */
const committeeItems = [
  { key: 'auction', label: 'Auction Setup' },
  { key: 'dates',   label: 'Managing Dates' },
  { key: 'inform',  label: 'Informing Matches' },
  { key: 'ground',  label: 'Setting Ground' },
  { key: 'arrange', label: 'Arrangement of Things' },
  { key: 'fair',    label: 'Fairness (No Bias?)' },
  { key: 'ref',     label: 'Refereeing' },
  { key: 'site',    label: 'Tournament Site' },
  { key: 'fans',    label: 'Fan Engagement' },
  { key: 'sponsor', label: 'Sponsorships' },
  { key: 'trophy',  label: 'Trophies & Medals' },
  { key: 'post',    label: 'Post-Tournament Programs' },
];

const starRatings = {};

function buildCommitteeStars() {
  const container = document.getElementById('committeeStars');
  if (!container) return;

  container.innerHTML = committeeItems.map(item => `
    <div class="star-group">
      <label>${item.label}</label>
      <div class="stars" id="stars_comm_${item.key}">
        ${[1,2,3,4,5].map(n => `<span class="star" data-val="${n}" onclick="setStarRating('comm_${item.key}',${n})">★</span>`).join('')}
      </div>
      <input type="hidden" name="committee_${item.key}" id="comm_${item.key}" value="0">
    </div>`).join('');

  // Star hover effects
  document.querySelectorAll('.stars').forEach(group => {
    group.addEventListener('mouseleave', () => {
      const id  = group.id.replace('stars_', '');
      const val = starRatings[id] || 0;
      updateStarDisplay(group.id, val);
    });
    group.querySelectorAll('.star').forEach(star => {
      star.addEventListener('mouseenter', () => {
        const n = parseInt(star.dataset.val);
        group.querySelectorAll('.star').forEach((s, i) => s.classList.toggle('active', i < n));
      });
    });
  });
}

function setStarRating(key, val) {
  starRatings[key] = val;
  const inp = document.getElementById(key);
  if (inp) inp.value = val;
  updateStarDisplay('stars_' + key, val);
}

function updateStarDisplay(groupId, val) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll('.star').forEach((s, i) => s.classList.toggle('active', i < val));
}

/* ── Form Submit ── */
async function handleSubmit(e) {
  e.preventDefault();

  if (!currentUser) { openUserLogin(); return; }

  const formspreeId = JB.formspreeId;
  if (!formspreeId || formspreeId === 'YOUR_FORM_ID') {
    showToast('⚠️ Set formspreeId in data.js first! See Admin → Form Setup', true);
    return;
  }

  const form     = document.getElementById('reviewForm');
  const formData = new FormData(form);
  const action   = `https://formspree.io/f/${formspreeId}`;

  try {
    const resp = await fetch(action, {
      method: 'POST',
      body:   formData,
      headers: { 'Accept': 'application/json' }
    });

    if (resp.ok) {
      showSuccessAnimation();
    } else {
      showToast('Submission failed. Please try again.', true);
    }
  } catch {
    showToast('Network error. Please try again.', true);
  }
}

function showSuccessAnimation() {
  document.getElementById('reviewFormCard').style.display = 'none';
  const box     = document.getElementById('reviewSuccess');
  const nameEl  = document.getElementById('successName');
  const confetti= document.getElementById('successConfetti');

  nameEl.textContent  = `Thank You, ${currentUser?.displayName || 'Friend'}! 🎉`;
  box.style.display   = 'block';

  // Confetti
  confetti.innerHTML = '';
  const colors = ['#16a34a','#d97706','#dc2626','#7c3aed','#facc15','#0ea5e9'];
  for (let i = 0; i < 30; i++) {
    const piece = document.createElement('div');
    piece.className = 's-conf-piece';
    piece.style.left       = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.8 + 's';
    piece.style.width  = (6 + Math.random() * 8) + 'px';
    piece.style.height = (6 + Math.random() * 8) + 'px';
    confetti.appendChild(piece);
  }
}

function openReview() {
  document.getElementById('liveOverlay').classList.remove('show');
  showPage('review');
}

/* ────────────────────────────────────────────────────────────
   ADMIN
──────────────────────────────────────────────────────────── */
function adminLogin() {
  const pass = document.getElementById('adminPass').value;
  if (pass === JB.adminPassword) {
    showPage('admin');
    renderAdminReviews();
    renderAnalytics();
    document.getElementById('adminPass').value = '';
    document.getElementById('loginErr').style.display = 'none';
  } else {
    document.getElementById('loginErr').style.display = 'block';
  }
}

function adminLogout() {
  showPage('home');
}

function switchAdmin(tab, e) {
  document.querySelectorAll('.atab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
  if (e) e.currentTarget.classList.add('active');
  document.getElementById('panel-' + tab).classList.add('active');
  if (tab === 'reviews-admin') renderAdminReviews();
  if (tab === 'analytics')     renderAnalytics();
}

function initAdminPanel() {
  renderAdminReviews();
}

function renderAdminReviews() {
  const list    = document.getElementById('reviewsAdminList');
  if (!list) return;
  const reviews = JB.reviews || [];

  if (!reviews.length) {
    list.innerHTML = `<div style="color:var(--muted);font-size:13px;padding:10px 0;">No reviews in data.js yet.</div>`;
    return;
  }

  list.innerHTML = reviews.map(r => `
    <div class="guide-box" style="margin-bottom:10px;">
      <div style="font-weight:700;">${r.reviewer} 
        <span style="font-size:11px;color:var(--muted);font-weight:400;">— ${r.submittedAt ? new Date(r.submittedAt).toLocaleDateString() : ''}</span>
      </div>
      <div style="font-size:12px;color:var(--text2);margin-top:4px;">
        MVP: ${r.mvp || '—'} · Best Attacker: ${r.best_attacker || '—'} · Best GK: ${r.best_gk || '—'}
      </div>
      ${r.feedback ? `<div style="font-size:12px;color:var(--muted);margin-top:4px;font-style:italic;">"${r.feedback}"</div>` : ''}
    </div>`).join('');
}

function renderAnalytics() {
  const content = document.getElementById('analyticsContent');
  if (!content) return;
  const reviews = JB.reviews || [];

  if (!reviews.length) {
    content.innerHTML = `<div style="color:var(--muted);font-size:13px;">No reviews yet.</div>`;
    return;
  }

  const total = reviews.length;

  const questions = [
    { key: 'mvp',           label: 'Tournament MVP' },
    { key: 'best_attacker', label: 'Best Attacker' },
    { key: 'best_defender', label: 'Best Defender' },
    { key: 'best_gk',       label: 'Best Goalkeeper' },
    { key: 'most_agile',    label: 'Most Agile' },
    { key: 'skillful',      label: 'Most Skillful' },
    { key: 'emerging',      label: 'Best Emerging' },
    { key: 'fav_player',    label: 'Fan Favourite Player' },
    { key: 'best_captain',  label: 'Best Captain\'s Team' },
    { key: 'best_entertain',label: 'Best Entertainment' },
    { key: 'luckiest',      label: 'Luckiest Team' },
    { key: 'unluckiest',    label: 'Unluckiest Team' },
    { key: 'improved',      label: 'Most Improved' },
  ];

  const avgCommittee = () => {
    const keys = ['auction','dates','inform','ground','arrange','fair','ref','site','fans','sponsor','trophy','post'];
    return keys.map(k => {
      const vals = reviews.map(r => r['committee_' + k]).filter(v => v && v > 0);
      const avg  = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : 'N/A';
      const label = committeeItems.find(i => i.key === k)?.label || k;
      return `<div class="comm-rating-row">
        <span class="comm-rating-label">${label}</span>
        <span class="comm-stars-display">${avg !== 'N/A' ? '★'.repeat(Math.round(Number(avg))) + ' ' + avg : 'N/A'}</span>
      </div>`;
    }).join('');
  };

  const voteBlocks = questions.map(q => {
    const map = {};
    reviews.forEach(r => { if (r[q.key]) map[r[q.key]] = (map[r[q.key]] || 0) + 1; });
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
    if (!sorted.length) return '';
    return `<div class="analytics-card">
      <h4>${q.label}</h4>
      ${sorted.map(([name, cnt]) => `
        <div class="vote-row">
          <span class="vote-label">${name}</span>
          <div class="vote-bar-wrap"><div class="vote-bar" style="width:${Math.round(cnt/total*100)}%"></div></div>
          <span class="vote-count">${cnt}</span>
        </div>`).join('')}
    </div>`;
  }).filter(Boolean).join('');

  content.innerHTML = `
    <div style="font-size:13px;color:var(--muted);margin-bottom:14px;">Total reviews: <strong>${total}</strong></div>
    <div class="analytics-grid">${voteBlocks}</div>
    <div class="card" style="margin-top:20px;">
      <div style="font-weight:700;font-size:14px;margin-bottom:12px;">⭐ Committee Ratings (Average)</div>
      ${avgCommittee()}
    </div>`;
}

function initFormspreeStatus() {
  const el = document.getElementById('formspreeStatus');
  if (!el) return;
  if (JB.formspreeId && JB.formspreeId !== 'YOUR_FORM_ID') {
    el.innerHTML = `<div style="background:#dcfce7;border:1px solid #86efac;border-radius:8px;padding:10px 14px;font-size:13px;color:#166534;">✅ Formspree ID is set: <strong>${JB.formspreeId}</strong></div>`;
  } else {
    el.innerHTML = `<div style="background:#fee2e2;border:1px solid #fca5a5;border-radius:8px;padding:10px 14px;font-size:13px;color:#991b1b;">⚠️ formspreeId is not set. Follow the steps above.</div>`;
  }
}

/* ────────────────────────────────────────────────────────────
   WINNER
──────────────────────────────────────────────────────────── */
function initWinner() {
  const w = JB.winner;
  if (!w || !w.teamId) return;

  const team = JB.teams.find(t => t.id === w.teamId);
  if (!team) return;

  // Banner
  const banner = document.getElementById('winnerBanner');
  if (banner) {
    banner.classList.add('show');
    document.getElementById('winnerBannerText').textContent = `🏆 CHAMPIONS — ${team.name} — 🏆`;
  }

  if (w.showCelebration) {
    document.getElementById('winnerTeamName').textContent = team.name;
    document.getElementById('winnerOverlay').classList.add('show');
    startConfetti();
  }
}

function closeWinner() {
  document.getElementById('winnerOverlay').classList.remove('show');
  if (confettiAnim) cancelAnimationFrame(confettiAnim);
}

function startConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors  = ['#16a34a','#d97706','#facc15','#dc2626','#7c3aed','#0ea5e9'];
  const pieces  = Array.from({ length: 120 }, () => ({
    x:   Math.random() * canvas.width,
    y:   Math.random() * canvas.height - canvas.height,
    vx:  (Math.random() - 0.5) * 3,
    vy:  1 + Math.random() * 3,
    r:   4 + Math.random() * 8,
    col: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * 360,
    vr:  (Math.random() - 0.5) * 5
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.col;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.5);
      ctx.restore();
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
    });
    confettiAnim = requestAnimationFrame(draw);
  }
  draw();
}

/* ────────────────────────────────────────────────────────────
   LIVE POPUP
──────────────────────────────────────────────────────────── */
function openLivePopup() {
  document.getElementById('liveOverlay').classList.add('show');
}

function closeLivePopup(e) {
  if (e && e.target !== document.getElementById('liveOverlay')) return;
  document.getElementById('liveOverlay').classList.remove('show');
}

function openS2() {
  document.getElementById('liveOverlay').classList.remove('show');
  document.getElementById('s2Overlay').classList.add('show');
}

function closeS2(e) {
  if (e && e.target !== document.getElementById('s2Overlay')) return;
  document.getElementById('s2Overlay').classList.remove('show');
}

/* ────────────────────────────────────────────────────────────
   MODALS
──────────────────────────────────────────────────────────── */
function closeModal(id, e) {
  if (e && e.target !== document.getElementById(id)) return;
  document.getElementById(id).classList.remove('show');
  if (id === 'storyModal') clearInterval(storyTimer);
}

/* ────────────────────────────────────────────────────────────
   TOAST
──────────────────────────────────────────────────────────── */
function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className   = 'toast show' + (isError ? ' error' : '');
  setTimeout(() => { toast.className = 'toast'; }, 3500);
}

/* ────────────────────────────────────────────────────────────
   KEYBOARD SHORTCUTS
──────────────────────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['liveOverlay','userLoginOverlay','s2Overlay'].forEach(id => {
      document.getElementById(id)?.classList.remove('show');
    });
    ['storyModal','teamModal','pcModal','statsModal','matchDetailModal','sponsorModal','profileModal'].forEach(id => {
      closeModal(id);
    });
  }
});