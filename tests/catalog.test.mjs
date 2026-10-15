import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const games = JSON.parse(readFileSync(new URL('../src/games.json', import.meta.url)));
function gifTiming(bytes) {
  let cursor = 13;
  if (bytes[10] & 128) cursor += 3 * (1 << ((bytes[10] & 7) + 1));
  let frames = 0, hundredths = 0, complete = false;
  const skipBlocks = () => { while (bytes[cursor]) { cursor += bytes[cursor] + 1; assert.ok(cursor < bytes.length, 'Truncated GIF block'); } cursor++; };
  while (cursor < bytes.length) {
    const marker = bytes[cursor++];
    if (marker === 0x3b) { complete = true; break; }
    if (marker === 0x21) {
      const label = bytes[cursor++];
      if (label === 0xf9) hundredths += bytes.readUInt16LE(cursor + 2);
      skipBlocks();
    } else if (marker === 0x2c) {
      frames++;
      const packed = bytes[cursor + 8];
      cursor += 9;
      if (packed & 128) cursor += 3 * (1 << ((packed & 7) + 1));
      cursor++;
      skipBlocks();
    } else assert.fail(`Unexpected GIF block ${marker}`);
  }
  assert.ok(complete, 'GIF must end with its trailer');
  return { frames, seconds: hundredths / 100 };
}
test('catalogue preserves the requested three rows and honest preview readiness', () => {
  assert.deepEqual(games.map(game => game.id), ['towerium', 'the-impossible-tower', 'altos-tower', 'boom-boom-tower', 'cointraptions', 'orble', 'bemerged', 'inner-land-minesweeper', 'powerstone']);
  assert.equal(new Set(games.map(g => g.id)).size, 9);
  assert.equal(new Set(games.filter(g => g.url).map(g => g.url)).size, 9);
  assert.equal(games.filter(g => g.playable).length, 6);
  assert.deepEqual(games.filter(g => !g.previewReady).map(g => g.id), ['boom-boom-tower', 'cointraptions', 'orble']);
  for (const game of games) {
    assert.ok(game.description.length > 50);
    assert.equal(typeof game.previewReady, 'boolean');
    assert.equal(typeof game.playable, 'boolean');
    assert.equal(new URL(game.url).protocol, 'https:');
    assert.equal(new URL(game.url).pathname.endsWith('/about/'), game.playable, 'Released games open their matching information pages; development sites stay at their own roots');
    if (!game.previewReady) {
      assert.equal(game.playable, false, 'A development information site is not a playable game');
      continue;
    }
    assert.equal(new URL(game.url).protocol, 'https:');
    const gif = new URL(`../public/previews/${game.id}.gif`, import.meta.url);
    assert.ok(existsSync(gif), `Missing ${game.id} GIF`);
    const bytes = readFileSync(gif);
    assert.match(bytes.subarray(0, 6).toString(), /^GIF8[79]a$/);
    assert.equal(bytes.readUInt16LE(6), 960);
    assert.equal(bytes.readUInt16LE(8), 540);
    assert.deepEqual(gifTiming(bytes), { frames: 160, seconds: 8 });
    assert.ok(existsSync(new URL(`../public/previews/${game.id}.webp`, import.meta.url)));
  }
});

const backgrounds = JSON.parse(readFileSync(new URL('../src/backgrounds.json', import.meta.url)));
test('every random background and creator icon is a complete shipped WebP', () => {
  assert.equal(backgrounds.length, 9);
  assert.equal(new Set(backgrounds).size, backgrounds.length);
  for (const path of [...backgrounds.map(name => `backgrounds/${name}`), 'tower-logo.webp']) {
    const bytes = readFileSync(new URL(`../public/${path}`, import.meta.url));
    assert.equal(bytes.subarray(0, 4).toString(), 'RIFF');
    assert.equal(bytes.subarray(8, 12).toString(), 'WEBP');
    assert.equal(bytes.readUInt32LE(4) + 8, bytes.length);
  }
});
