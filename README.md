# Faucille

A daily dexterity game for Reddit, built on [Devvit Web](https://developers.reddit.com/).

Reeds keep rising over the pond. Tap a lane to cut the reed before it touches the
water - the stems, their lanes and their fall speed are generated from the day,
so everyone plays the same field. Cut the daily quota to fill the basket and
extend your streak; reeds that reach the water cost you points.

## How to play

1. Tap Enter the reeds to start the 60 second round.
2. Watch the four lanes and tap the lane where a reed is high enough to cut.
3. Reach the quota (12 cuts) to win the day.

One pond per day, the same for everyone; streaks stored per user in Redis.

## Stack

- React 19 + Tailwind 4 + Vite (client inside a Reddit post), requestAnimationFrame loop
- Hono server on Devvit (`/api/init`, `/api/submit`), Redis persistence
- Deterministic daily field generation (UTC seed), unit-tested

## Development

```bash
npm install
npm run dev
npm test
npm run type-check
npm run build
```

## Submission (Reddit's Game of the Day Hackathon)

- App listing: `developers.reddit.com/apps/gameday-faucille` (private until judging ends)
- Demo post: public test subreddit, post running the game
