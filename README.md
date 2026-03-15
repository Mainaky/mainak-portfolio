# Mainak Roy — Cinematic Portfolio

Dark cinematic portfolio built with **React 18** (no Tailwind needed — uses inline styles for portability).

## 🚀 Run Locally

```bash
# 1. Enter the folder
cd mainak-cinematic

# 2. Install
npm install

# 3. Start
npm start
# Opens at http://localhost:3000
```

## 📦 Build for Production

```bash
npm run build
# Output in /build folder — ready to deploy
```

---

## 🌐 Deploy FREE on Vercel (recommended)

1. Push this folder to a **GitHub repository**
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Framework: **Create React App** (auto-detected)
4. Click **Deploy** — live URL in ~60 seconds!

---

## 🌐 Deploy on GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json "scripts":
#   "predeploy": "npm run build",
#   "deploy": "gh-pages -d build"

# Add to package.json root:
#   "homepage": "https://Mainaky.github.io/portfolio"

npm run deploy
# Live at: https://Mainaky.github.io/portfolio
```

---

## 📁 Project Structure

```
src/
├── App.jsx                  ← Full portfolio (Hero, About, Skills, Projects, Experience, Contact)
├── index.js                 ← Entry point
├── index.css                ← Global resets + keyframe animations
├── data.js                  ← ALL content (edit this to update anything!)
└── components/
    ├── SkillBar.jsx          ← Animated scroll-triggered skill bars
    └── ProjectShowcase.jsx   ← Cinematic countdown + project reveal overlay
```

## ✏️ To Edit Your Content

Everything is in **`src/data.js`**:
- `SKILLS` — skill names, levels, categories
- `PROJECTS` — titles, descriptions, GitHub links, tech stack
- `EXPERIENCE` — work/research experience
- `ABOUT_CARDS` — education/status info cards
- `SOCIAL` — GitHub, LinkedIn, Email links

## ✨ Features

- 🎬 **Cinematic Project Showcase** — 3-2-1 countdown → animated project cards with left/right alternating layout
- 📊 **Animated Skill Bars** — scroll-triggered fill animations per category
- 🌑 **Dark theme** with purple/teal gradient accents
- 📱 **Fully responsive** — mobile hamburger menu
- ✉️ **Contact form** with sent confirmation state
- 🔗 **All GitHub links** open in new tab
