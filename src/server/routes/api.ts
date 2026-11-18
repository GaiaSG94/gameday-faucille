import { Hono } from 'hono';
import { context, redis, reddit } from '@devvit/web/server';
import { dayKeyUTC, generateField, scoreFor } from '../../shared/puzzle';
import type { Context } from 'hono';
import type { ErrorResponse } from '../../shared/api';

export const api = new Hono();

const DAY_MS = 24 * 60 * 60 * 1000;

const yesterdayKeyUTC = (): string => dayKeyUTC(new Date(Date.now() - DAY_MS));

const readStreak = async (username: string): Promise<number> => {
  const [streakRaw, lastDayRaw] = await Promise.all([
    redis.get(`streak:${username}`),
    redis.get(`lastday:${username}`),
  ]);
  const streak = streakRaw ? parseInt(streakRaw, 10) : 0;
  return lastDayRaw === yesterdayKeyUTC() ? streak : 0;
};

const error = (c: Context, message: string): Response =>
  c.json<ErrorResponse>({ status: 'error', message }, 400);

const handleInit = async (c: Context): Promise<Response> => {
  const { postId } = context;
  if (!postId) return error(c, 'postId is required');
  try {
    const username = (await reddit.getCurrentUsername()) ?? 'anonymous';
    const day = dayKeyUTC();
    const field = generateField(day);
    const [solvedRaw, streak] = await Promise.all([
      redis.get(`solved:${username}:${day}`),
      readStreak(username),
    ]);
    return c.json({
      type: 'init',
      day,
      username,
      streak,
      solvedToday: solvedRaw === '1',
      startedAt: Date.now(),
      field,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    return error(c, `init failed: ${message}`);
  }
};

const handleSubmit = async (c: Context): Promise<Response> => {
  const { postId } = context;
  if (!postId) return error(c, 'postId is required');
  const body = await c.req.json<{ cuts?: number; misses?: number; elapsedMs?: number }>();
  const day = dayKeyUTC();
  const field = generateField(day);
  const cuts = typeof body.cuts === 'number' ? body.cuts : 0;
  const misses = typeof body.misses === 'number' ? body.misses : 0;
  const score = scoreFor(cuts, misses, field.quota);
  const won = cuts >= field.quota;
  const elapsedMs = typeof body.elapsedMs === 'number' ? body.elapsedMs : 0;
  let streak = 0;
  if (won) {
    const username = (await reddit.getCurrentUsername()) ?? 'anonymous';
    streak = (await readStreak(username)) + 1;
    await Promise.all([
      redis.set(`streak:${username}`, String(streak)),
      redis.set(`lastday:${username}`, day),
      redis.set(`solved:${username}:${day}`, '1'),
    ]);
  }
  return c.json({ type: 'submit', won, score, streak, elapsedMs, cuts, misses });
};

api.get('/init', handleInit);
api.post('/submit', handleSubmit);
