# Mainak Roy — Portfolio

A responsive, single-page portfolio for Mainak Roy, an AI/ML Engineer and Data Science undergraduate at NIIT University. Built with React 18 and Create React App, with a dark navy visual system, soft blue-violet lighting, glass panels, animated role text, and a flip-card profile badge.

## Run locally

```bash
npm install
npm start
```

The development server opens at `http://localhost:3000`.

## Production build

```bash
npm run build
```

Create React App writes the deployable site to `build/`. The project can be imported into Vercel with the standard Create React App build settings.

## Portfolio sections

- **About:** profile, education, coursework, and focus areas.
- **Skills:** programming/data, machine learning, agentic AI, web/backend, and cloud/data platforms.
- **Projects:** eight entries covering the original portfolio work and projects from the supplied resumes. NeuroSeg combines the existing brain-tumor project with its expanded resume details.
- **Experience:** GSPL software engineering internship, ISRO hackathon, ICICV research, and campus leadership.
- **Highlights:** publication, hackathon, certification, and leadership.
- **Contact:** EmailJS contact form, email link, GitHub, and LinkedIn.

## Main files

```text
src/
├── App.jsx                 # Page layout, navigation, profile card, form, and sections
├── data.js                 # Project, skill, education, experience, and link content
├── index.css               # Responsive design system and animations
├── index.js                # React entry point
└── components/
    ├── ProjectShowcase.jsx # Cinematic showcase component retained from the original site
    └── SkillBar.jsx        # Original animated skill bar component retained from the original site
```
