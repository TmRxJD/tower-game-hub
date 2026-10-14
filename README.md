# Tower Arcade

A Svelte 5 / Vite hub for nine independent Tower-inspired mini games (six playable, three coming-soon card templates). This repository only presents the collection and opens the games in new tabs; each game lives and deploys in its own repository.

## Develop

Use Node 22 or newer. Run `npm ci`, then `npm run dev`. The local site is `http://127.0.0.1:5198/tower-game-hub/`.

`npm test` checks catalogue destinations and preview assets. `npm run build` checks Svelte and TypeScript and creates the static site. GitHub Actions publishes `dist/` to Pages on pushes to `main`.

## Previews

Each of the six released games includes an eight-second, 960 × 540, 20 fps GIF of actual browser gameplay, a static WebP poster, and an optional compact animated WebP rendition. The hub uses compact animated renditions where they reduce transfer size; clicking a preview opens its game. Previews autoplay by default. The pause button switches all six to static posters. Images reserve their dimensions and off-screen previews load lazily.

`public/previews/provenance.json` records capture sources and trim windows. Original recordings and temporary capture tooling are excluded from this repository. Previews come from built-in autoplay or normal controls in the same game engine used for play, without fabricated game scenes.

Game descriptions and destinations are maintained in `src/games.json`. The hub has no account, API keys, analytics, embedded games, or backend.

## SDK site artwork and support

The nine backgrounds and Tower icon are reused from the canonical [TheTowerSDK site](https://tmrxjd.github.io/TheTowerSDK/) (`site/static/hero-art.webp`, `feature-1.webp` through `feature-8.webp`, and `tower-logo.webp`). One background is chosen randomly on each page load, excluding the previous choice when session storage is available. A dark overlay keeps the collection readable.

The header and footer reproduce the SDK site's Creator Code **JDEVO** link to the [The Tower webstore](https://store.techtreegames.com/thetower/).

## Upcoming card templates

The desktop middle row is Boom Boom Tower, Cointraptions (The Incredible Tower), then Orble (Towergle). Their descriptions and controls come from their current local source. These games have no verified public Pages destinations yet, so `url` is `null` and their launch actions say **Coming soon**.

Their `previewReady` fields are `false`: the hub renders a static, code-based preview placeholder and does not request missing media. No videos or GIFs were captured for these templates. To enable a release, replace `url` with its verified public HTTPS destination. When an actual eight-second gameplay GIF and poster are ready, add the preview assets under the game's catalogue ID and set `previewReady` to `true` (the existing compact animated WebP convention also applies).
