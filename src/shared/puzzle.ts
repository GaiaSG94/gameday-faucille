export type Stem = { lane: number; atMs: number; fallMs: number };

export type Field = {
  day: string;
  lanes: number;
  stems: Stem[];
  durationMs: number;
  quota: number;
};

export const LANES = 4;
export const ROUND_MS = 60000;

export const dayKeyUTC = (now: Date = new Date()): string => now.toISOString().slice(0, 10);

export const dailySeed = (day: string): number => {
  let hash = 2166136261;
  const input = 'faucille:' + day;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

export const mulberry32 = (seed: number): (() => number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const generateField = (day: string): Field => {
  const rand = mulberry32(dailySeed(day));
  const stems: Stem[] = [];
  let at = 800;
  while (at < ROUND_MS - 1200) {
    stems.push({
      lane: Math.floor(rand() * LANES),
      atMs: Math.round(at),
      fallMs: 1600 + rand() * 1400,
    });
    at += 700 + rand() * 1100;
  }
  return { day, lanes: LANES, stems, durationMs: ROUND_MS, quota: 12 };
};

export const stemProgress = (stem: Stem, nowMs: number): number => {
  if (nowMs < stem.atMs) return 0;
  return Math.min(1, (nowMs - stem.atMs) / stem.fallMs);
};

export const stemCutWindow = (stem: Stem, nowMs: number): boolean => {
  const progress = stemProgress(stem, nowMs);
  return progress > 0.25 && progress < 0.95;
};

export const stemsInWindow = (field: Field, nowMs: number): Stem[] =>
  field.stems.filter((stem) => stemCutWindow(stem, nowMs));

export const scoreFor = (cuts: number, misses: number, quota: number): number =>
  Math.max(0, cuts * 10 - misses * 25 + (cuts >= quota ? 50 : 0));
