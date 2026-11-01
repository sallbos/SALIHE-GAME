# ⚡ SALEH GAMING — Browser Gaming Platform

**By Saleh Abdelqayoum Bachikh** · Game Developer & Cybersecurity Specialist

A premium, fully responsive browser gaming platform featuring **10 handcrafted HTML5 games**. No downloads, no accounts — just open and play.

---

## 🎮 Games Included

| # | Game | Genre | Controls |
|---|------|-------|----------|
| 1 | Snake | Classic | Arrow keys / Swipe |
| 2 | 2048 | Puzzle | Arrow keys / Swipe |
| 3 | Tic Tac Toe | Strategy | Click / Tap |
| 4 | Memory Cards | Puzzle | Click / Tap |
| 5 | Space Shooter | Arcade | Arrow keys + Space / Touch |
| 6 | Flappy Wing | Arcade | Space / Tap |
| 7 | Car Racing | Arcade | Arrow keys / On-screen buttons |
| 8 | Zombie Survival | Action | WASD + Mouse / Touch joystick |
| 9 | Chess | Strategy | Click / Tap |
| 10 | Bubble Shooter | Puzzle | Mouse / Tap |

---

## 🚀 Deploy to Netlify

1. **Drag & Drop:** Go to [netlify.com](https://netlify.com) → New Site → Drag the project folder
2. **Publish directory:** `.` (root — `index.html` is in the root)
3. **No build command needed**
4. **Done!** Your site is live.

### One-click via Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir .
```

---

## 📁 Project Structure

```
/
├── index.html          # Main app shell
├── style.css           # Global styles
├── script.js           # Navigation + game launcher
├── manifest.json       # PWA manifest
├── service-worker.js   # Offline caching
├── offline.html        # Offline fallback page
├── netlify.toml        # Netlify config
├── _headers            # Security & cache headers
├── README.md
├── games/
│   ├── snake.html
│   ├── 2048.html
│   ├── tictactoe.html
│   ├── memory.html
│   ├── space-shooter.html
│   ├── flappy.html
│   ├── racing.html
│   ├── zombie.html
│   ├── chess.html
│   └── bubble.html
└── assets/
    ├── icons/          # PWA icons (72–512px)
    └── images/
```

---

## 📱 PWA Features

- **Installable** on Android, iOS, and desktop
- **Offline support** — cached games work without internet
- **Standalone mode** — runs like a native app
- **Custom icons** at all sizes

---

## 🛠 Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Animations, Grid, Flexbox, Custom Properties
- **Vanilla JavaScript** — Zero frameworks
- **HTML5 Canvas** — Game rendering
- **Web APIs:** localStorage, Fullscreen, Service Worker, PWA

---

## 📧 Contact

**Saleh Abdelqayoum Bachikh**  
Game Developer & Cybersecurity Specialist  
📧 [salehebachike@gmail.com](mailto:salehebachike@gmail.com)

---

© 2024 SALEH GAMING · All rights reserved
