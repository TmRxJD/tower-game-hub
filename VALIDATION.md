# Validation and scope

## Game and hub checks

- Hub: catalogue test verifies all six destinations, complete GIF structure, 960 × 540 dimensions, 160 frames and exactly eight seconds. Svelte/TypeScript and production build are checked separately.
- Hub browser: 320px and 1920px widths have no horizontal overflow. Desktop shows the requested six-game order in a 3-column, 2-row grid with no filters. All six animated GIF sources load even with OS reduced motion enabled; manual pause shows all six static posters and resume restores animation. Every game link opens a new tab with noopener noreferrer.
- Towerium: production build, 78 controller/playtest checks, fullscreen fallback/orientation browser check.
- Alto's Tower: production build, fullscreen fallback/orientation browser check, actual 320px portrait/568px landscape play.
- Powerstone: 53 tests, typecheck and build. Public publishing worktree was tested independently. Actual play/layout checks at 320 × 568, 568 × 320, 390 × 844 and 1920 × 1080.
- Inner Land Minesweeper: 35 current engine/planner tests; 24 complete seeded wins across three difficulties. Actual UI replay won in 117 moves, with Boss HP zero and no covered ground. Real phone taps were checked at every difficulty, including the dense Hard board.
- Impossible Tower: public build has an original synthesized soundtrack, no commercial recordings, and sanitized course data. A conservation check compares every gameplay field against the original authored courses. Actual hold-to-hop, progress, fullscreen fallback and controls were checked at four phone/desktop sizes; zero recording requests and zero page errors.

## Remaining legacy checks and review limits

The full Inner Land Minesweeper legacy suite reports **37 passing, 10 failing**. Nine failures belong to the old snapshot-bot balance harness: `expected 0 to be greater than 0.1`, `expected Infinity to be less than 50/66/90`, and `expected Infinity to be less than Infinity`. The separate unused MCTS win check reports `expected false to be true`. Those existing algorithms and balance thresholds were preserved. Pages explicitly runs the current engine and actual in-game planner suite, rather than these legacy alternatives.

Powerstone's fresh frozen dependency install reported `ERR_PNPM_ENOSPC`. Its existing installed dependencies passed all checks; its clean publication worktree also passed typecheck, all 53 tests and build.

Alto's private extracted-reference comparison is an optional `private-reference` Cargo feature. Public CI runs all remaining engine tests without publishing the private file.

Kritic file/JSON/YAML validation passed. Typed scores are unavailable: `Kev is off (kev.backend = "off")`. UX exploration reported `timed out awaiting tools/call after 300s`; a bounded rerun reached `deadline reached` before completing tasks; visual scoring reported `request (4184 tokens) exceeds the available context size (4096 tokens), try increasing it`. Direct browser checks cover the essential workflows. Automated accessibility checks found no violations on the hub HTML; their flags on raw GIF URLs concern browser-generated image documents, not hub markup.

The Bemerged public bundle was compared against local credential values without printing those values: zero credential matches and zero private filesystem imports. Security tooling flagged existing build-time dependency advisories and local development CLI shell-spawn patterns. Those CLI hosts are absent from the static Pages runtime; public builds use a separate configuration that never loads the private AI environment.
