# Tower Arcade

A Svelte 5 / Vite hub for six independent Tower-inspired games. This repository only presents the collection and opens the games in new tabs; each game lives and deploys in its own repository.

## Develop

Use Node 22 or newer. Run `npm ci`, then `npm run dev`. The local site is `http://127.0.0.1:5198/tower-game-hub/`.

`npm test` checks catalogue destinations and preview assets. `npm run build` checks Svelte and TypeScript and creates the static site. GitHub Actions publishes `dist/` to Pages on pushes to `main`.

## Previews

Every game includes an eight-second, 960 × 540, 20 fps GIF of actual browser gameplay, a static WebP poster, and an optional compact animated WebP rendition. The hub uses compact renditions where they reduce transfer size, while the **8s GIF** link always opens the GIF. Pause controls and the system reduced-motion preference use static posters. Images reserve their dimensions and off-screen previews load lazily.

`public/previews/provenance.json` records capture sources and trim windows. Original recordings and temporary capture tooling are excluded from this repository. Previews come from built-in autoplay or normal controls in the same game engine used for play, without fabricated game scenes.

Game descriptions and destinations are maintained in `src/games.json`. The hub has no account, API keys, analytics, embedded games, or backend.
