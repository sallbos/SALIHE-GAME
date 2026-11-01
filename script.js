/* ============================================================
   SALEH GAMING — script.js
   Main navigation, game launcher, PWA, filtering
   ============================================================ */

'use strict';

// ── Game Data ──────────────────────────────────────────────────
const GAMES = [
  {
    id: 'snake',
    title: 'Snake',
    emoji: '🐍',
    tags: ['classic'],
    desc: 'Classic snake game. Eat food, grow longer, avoid walls and yourself!',
    instructions: '🎮 Desktop: Arrow Keys / WASD to move. 📱 Mobile: Swipe to change direction. Eat the food to grow. Avoid hitting walls and your own tail!',
    bg: 'game-bg-snake'
  },
  {
    id: '2048',
    title: '2048',
    emoji: '🔢',
    tags: ['puzzle'],
    desc: 'Slide tiles, combine matching numbers, and reach 2048!',
    instructions: '🎮 Desktop: Arrow Keys to slide tiles. 📱 Mobile: Swipe to slide. Combine equal numbers to double them. Reach 2048 to win!',
    bg: 'game-bg-2048'
  },
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    emoji: '❌',
    tags: ['classic', 'strategy'],
    desc: 'Play against a smart AI opponent. Get 3 in a row to win!',
    instructions: '🎮 Click / Tap any empty cell to place your X. The AI plays O. Get 3 in a row — horizontal, vertical, or diagonal — to win! You go first.',
    bg: 'game-bg-tictactoe'
  },
  {
    id: 'memory',
    title: 'Memory Cards',
    emoji: '🃏',
    tags: ['puzzle'],
    desc: 'Flip cards and find matching pairs. Test your memory!',
    instructions: '🎮 Click / Tap cards to flip them. Find all matching pairs. Try to complete the board in as few moves as possible! Cards hide again after a brief delay if they don\'t match.',
    bg: 'game-bg-memory'
  },
  {
    id: 'space-shooter',
    title: 'Space Shooter',
    emoji: '🚀',
    tags: ['arcade', 'action'],
    desc: 'Defend Earth! Shoot enemy ships in this arcade space shooter.',
    instructions: '🎮 Desktop: ← → Arrow Keys / A D to move. Space to shoot. 📱 Mobile: Tap left/right side to move, tap center to shoot. Destroy enemies before they reach you!',
    bg: 'game-bg-spaceshooter'
  },
  {
    id: 'flappy',
    title: 'Flappy Wing',
    emoji: '🐦',
    tags: ['arcade'],
    desc: 'Tap to fly! Navigate through endless pipes in this reflex game.',
    instructions: '🎮 Desktop: Press Space / Click to flap. 📱 Mobile: Tap anywhere to flap wings. Fly through the gaps between pipes. Don\'t hit the pipes or ground!',
    bg: 'game-bg-flappy'
  },
  {
    id: 'racing',
    title: 'Car Racing',
    emoji: '🏎️',
    tags: ['arcade', 'action'],
    desc: 'Dodge traffic at high speed on an infinite highway!',
    instructions: '🎮 Desktop: ← → Arrow Keys / A D to steer. 📱 Mobile: Tap left/right buttons. Dodge incoming cars and trucks. Your speed increases over time!',
    bg: 'game-bg-racing'
  },
  {
    id: 'zombie',
    title: 'Zombie Survival',
    emoji: '🧟',
    tags: ['action', 'arcade'],
    desc: '2D zombie survival! Survive endless waves of the undead.',
    instructions: '🎮 Desktop: WASD to move. Mouse to aim and shoot. 📱 Mobile: Joystick buttons to move, tap enemies to shoot. Survive as many waves as possible!',
    bg: 'game-bg-zombie'
  },
  {
    id: 'chess',
    title: 'Chess',
    emoji: '♟️',
    tags: ['strategy'],
    desc: 'Play a full chess game against a smart computer opponent.',
    instructions: '🎮 Click a piece to select it, then click a highlighted square to move. Play as White against the computer (Black). Standard chess rules apply!',
    bg: 'game-bg-chess'
  },
  {
    id: 'bubble',
    title: 'Bubble Shooter',
    emoji: '🫧',
    tags: ['puzzle', 'arcade'],
    desc: 'Aim and shoot bubbles to pop clusters of matching colors!',
    instructions: '🎮 Desktop: Move mouse to aim, click to shoot. 📱 Mobile: Tap to aim and shoot. Match 3 or more bubbles of the same color to pop them. Clear the board to win!',
    bg: 'game-bg-bubble'
  }
];

// ── State ──────────────────────────────────────────────────────
let currentGame = null;
let currentFilter = 'all';
let deferredInstallPrompt = null;

// ── PWA Install ────────────────────────────────────────────────
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const btn = document.getElementById('installBtn');
  if (btn) btn.style.display = 'inline-flex';
});

function installPWA() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.then(() => {
    deferredInstallPrompt = null;
    const btn = document.getElementById('installBtn');
    if (btn) btn.style.display = 'none';
  });
}

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(() => {});
  });
}

// ── Navigation ─────────────────────────────────────────────────
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (id === 'games') renderGamesGrid();
}

function closeMobileMenu() {
  document.getElementById('nav-links').classList.remove('open');
}

// Hamburger
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});

// ── Render Games Grid ──────────────────────────────────────────
function renderGamesGrid() {
  const query  = (document.getElementById('searchInput').value || '').toLowerCase();
  const grid   = document.getElementById('gamesGrid');
  const noRes  = document.getElementById('noResults');

  const filtered = GAMES.filter(g => {
    const matchSearch = g.title.toLowerCase().includes(query) || g.desc.toLowerCase().includes(query);
    const matchFilter = currentFilter === 'all' || g.tags.includes(currentFilter);
    return matchSearch && matchFilter;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noRes.classList.remove('hidden');
    return;
  }
  noRes.classList.add('hidden');
  grid.innerHTML = filtered.map(g => gameCardHTML(g)).join('');
}

function gameCardHTML(g) {
  const tagsHTML = g.tags.map(t => `<span class="tag tag-${t}">${t}</span>`).join('');
  return `
    <div class="game-card" onclick="launchGame('${g.id}')">
      <div class="game-card-thumb ${g.bg}">
        <span style="position:relative;z-index:1;font-size:4rem">${g.emoji}</span>
      </div>
      <div class="game-card-body">
        <div class="game-card-tags">${tagsHTML}</div>
        <h3>${g.title}</h3>
        <p>${g.desc}</p>
        <button class="game-card-play">🎮 PLAY NOW</button>
      </div>
    </div>`;
}

function filterGames() { renderGamesGrid(); }

function setFilter(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGamesGrid();
}

// ── Game Launcher ──────────────────────────────────────────────
function launchGame(gameId) {
  const game = GAMES.find(g => g.id === gameId);
  if (!game) return;
  currentGame = gameId;

  document.getElementById('playerTitle').textContent = `${game.emoji} ${game.title}`;
  document.getElementById('playerInstructions').innerHTML = `<strong>How to Play:</strong> ${game.instructions}`;

  const frame = document.getElementById('playerFrame');
  frame.className = `player-frame ${game.bg}`;
  frame.innerHTML = '';

  // Load the game in an iframe
  const iframe = document.createElement('iframe');
  iframe.src = `games/${gameId}.html`;
  iframe.title = game.title;
  iframe.allow = 'fullscreen';
  iframe.style.cssText = 'width:100%;height:100%;border:none;min-height:560px;display:block;';
  frame.appendChild(iframe);

  showSection('player');
}

function exitGame() {
  currentGame = null;
  const frame = document.getElementById('playerFrame');
  frame.innerHTML = '';
  showSection('games');
}

function restartCurrentGame() {
  if (!currentGame) return;
  const iframe = document.querySelector('#playerFrame iframe');
  if (iframe) {
    iframe.src = iframe.src; // reload
  }
}

function toggleFullscreen() {
  const frame = document.getElementById('playerFrame');
  const iframe = frame.querySelector('iframe');
  const el = iframe || frame;
  if (!document.fullscreenElement) {
    el.requestFullscreen && el.requestFullscreen();
  } else {
    document.exitFullscreen && document.exitFullscreen();
  }
}

// ── Contact Form ───────────────────────────────────────────────
function handleContact(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  // Basic validation
  const name    = document.getElementById('cName').value.trim();
  const email   = document.getElementById('cEmail').value.trim();
  const subject = document.getElementById('cSubject').value.trim();
  const message = document.getElementById('cMessage').value.trim();

  if (!name || !email || !subject || !message) {
    showToast('⚠️ Please fill in all fields.');
    return;
  }
  if (!email.includes('@')) {
    showToast('⚠️ Please enter a valid email.');
    return;
  }

  // In local dev, show success. On Netlify, the form action handles it.
  form.classList.add('hidden');
  success.classList.remove('hidden');
}

function resetContactForm() {
  document.getElementById('contactForm').reset();
  document.getElementById('contactForm').classList.remove('hidden');
  document.getElementById('formSuccess').classList.add('hidden');
}

// ── Toast ──────────────────────────────────────────────────────
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  showSection('home');
  renderGamesGrid();

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 20) {
      nav.style.background = 'rgba(10,10,15,0.98)';
    } else {
      nav.style.background = 'rgba(10,10,15,0.92)';
    }
  });
});
