import assert from 'node:assert/strict';
import { test } from 'node:test';

import { dailySeed, generateField, scoreFor, stemCutWindow, stemProgress, stemsInWindow } from './puzzle.ts';

test('seed deterministe', () => {
  assert.equal(dailySeed('2026-12-01'), dailySeed('2026-12-01'));
});

test('le champ du jour est deterministe', () => {
  const a = generateField('2026-12-01');
  const b = generateField('2026-12-01');
  assert.deepEqual(a.stems, b.stems);
  assert.equal(a.quota, b.quota);
});

test('une tige hors de la fenetre ne se coupe pas', () => {
  const field = generateField('2026-12-01');
  const stem = field.stems[0] ?? { lane: 0, atMs: 1000, fallMs: 2000 };
  assert.equal(stemCutWindow(stem, stem.atMs), false);
  assert.equal(stemCutWindow(stem, stem.atMs + stem.fallMs + 10), false);
  assert.equal(stemCutWindow(stem, stem.atMs + stem.fallMs * 0.5), true);
});

test('la progression est bornee', () => {
  const stem = { lane: 1, atMs: 500, fallMs: 1500 };
  assert.equal(stemProgress(stem, 0), 0);
  assert.equal(stemProgress(stem, 99999), 1);
});

test('les tiges coupables sont celles du moment', () => {
  const field = generateField('2026-12-02');
  const first = field.stems[0];
  if (!first) return;
  const ready = stemsInWindow(field, first.atMs + first.fallMs * 0.5);
  assert.ok(ready.some((s) => s.atMs === first.atMs));
});

test('le score penalise les tiges manquées', () => {
  assert.ok(scoreFor(12, 0, 12) > scoreFor(5, 0, 12));
  assert.ok(scoreFor(5, 4, 12) < scoreFor(5, 0, 12));
});
