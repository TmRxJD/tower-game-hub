# Validation and scope

## Game and hub checks

- Hub: catalogue test verifies all six destinations, complete GIF structure, 960 × 540 dimensions, 160 frames and exactly eight seconds. Svelte/TypeScript and production build are checked separately.
- Hub browser: 320px and 1920px widths have no horizontal overflow. Desktop shows the requested six-game order in a 3-column, 2-row grid with no filters. All six animated preview sources load even with OS reduced motion enabled; manual pause shows all six static posters and resume restores animation. Every game link opens a new tab with noopener noreferrer.
- Towerium: production build, 78 controller/playtest checks, fullscreen fallback/orientation browser check.
- Alto's Tower: 118 local Rust tests passed; clean public GitHub Actions build and deployment passed after completing the coupled course-generation source changes. Production build, fullscreen fallback/orientation browser check, actual 320px portrait/568px landscape play.
- Powerstone: 53 tests, typecheck and build. Public publishing worktree was tested independently. Actual play/layout checks at 320 × 568, 568 × 320, 390 × 844 and 1920 × 1080.
- Inner Land Minesweeper: 35 current engine/planner tests; 24 complete seeded wins across three difficulties. Actual UI replay won in 117 moves, with Boss HP zero and no covered ground. Real phone taps were checked at every difficulty, including the dense Hard board.
- Impossible Tower: 51 Rust tests passed in the isolated public export; public build has an original synthesized soundtrack, no commercial recordings, and sanitized course data. A conservation check compares every gameplay field against the original authored courses. Actual hold-to-hop, progress, fullscreen fallback and controls were checked at four phone/desktop sizes; zero recording requests and zero page errors.

All seven sites (six games and the hub) have successful GitHub Pages deployments. Live HTML and matching JavaScript, CSS and WASM assets were checked. The hub catalogue links to each game.

The latest hub update reuses all nine background artworks from the canonical TheTowerSDK site, randomly choosing a different one on refresh when storage is available. The SDK Tower icon and Creator Code JDEVO webstore link appear in the header and footer. Labels use 13px system text and descriptions use 14px text; separate GIF links were removed. Direct browser checks confirmed refresh changes, the requested game order, zero horizontal overflow at 320px, and the creator link/icon. Automated checks on the updated hub found zero accessibility violations, runtime errors, or failed requests; external-link interactions were skipped by that tool and are covered by the direct game launch checks above.

## Remaining legacy checks and review limits

The full Inner Land Minesweeper legacy suite reports **37 passing, 10 failing**. Nine failures belong to the old snapshot-bot balance harness: `expected 0 to be greater than 0.1`, `expected Infinity to be less than 50/66/90`, and `expected Infinity to be less than Infinity`. The separate unused MCTS win check reports `expected false to be true`. Those existing algorithms and balance thresholds were preserved. Pages explicitly runs the current engine and actual in-game planner suite, rather than these legacy alternatives.

Powerstone's fresh frozen dependency install reported `ERR_PNPM_ENOSPC`. Its existing installed dependencies passed all checks; its clean publication worktree also passed typecheck, all 53 tests and build.

Alto's private extracted-reference comparison is an optional `private-reference` Cargo feature. Public CI runs all remaining engine tests without publishing the private file.

Kritic file/JSON/YAML validation passed. Typed scores are unavailable: `Kev is off (kev.backend = "off")`. Earlier UX exploration hit a deadline or action cap; after removing a redundant home-screen task, the final deterministic UX review passed with no hard failures and confirmed pause in one action. Novice model exploration was skipped. The final background/font update received visual scores from 7/10 to 9/10 and approval after an initial scoring request exceeded the available context. Direct browser checks cover the essential workflows. Automated accessibility checks found no violations on the hub HTML; their flags on raw GIF URLs concern browser-generated image documents, not hub markup.

The Bemerged public bundle was compared against local credential values without printing those values: zero credential matches and zero private filesystem imports. Security tooling flagged existing build-time dependency advisories and local development CLI shell-spawn patterns. Those CLI hosts are absent from the static Pages runtime; public builds use a separate configuration that never loads the private AI environment.
