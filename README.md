# The Developer's Guild — 3D Fantasy RPG Portfolio

An anime-inspired fantasy RPG developer portfolio built with React, Three.js, React Three Fiber, Drei, Framer Motion, and Tailwind CSS.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```
## Project structure

```text
src/
  App.jsx       Main page, sections, project data, and modal
  main.jsx      React entry point
  styles.css    Theme, layout, responsive styling
index.html
vite.config.js
package.json
```

## 3D scene

The hero scene is built from procedural Three.js geometry, so no external 3D model files are required. It includes a floating island, trees, a small guild tower, stars, particles, lighting, and gentle auto-rotation. Visitors can drag to rotate the scene.
