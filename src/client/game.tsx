import './index.css';

import { useCallback, useEffect, useRef, useState } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { stemProgress, stemsInWindow } from '../shared/puzzle';
import type { Field } from '../shared/puzzle';

type Init = {
  day: string;
  username: string;
  streak: number;
  solvedToday: boolean;
  startedAt: number;
  field: Field;
};

type Result = { won: boolean; score: number; streak: number; cuts: number; misses: number };

const App = () => {
  const [init, setInit] = useState<Init | null>(null);
  const [phase, setPhase] = useState<'ready' | 'run' | 'done'>('ready');
  const [now, setNow] = useState(0);
  const [cuts, setCuts] = useState(0);
  const [misses, setMisses] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef(0);
  const cutIds = useRef(new Set<number>());

  const submit = useCallback(
    async (cutCount: number, missCount: number, elapsed: number) => {
      try {
        const res = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cuts: cutCount, misses: missCount, elapsedMs: Math.round(elapsed) }),
        });
        const data = await res.json();
        if (data.status === 'error') throw new Error(data.message);
        setResult(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'submit failed');
      }
    },
    []
  );

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/init');
      const data = await res.json();
      if (data.status === 'error') throw new Error(data.message);
      setInit(data);
      setPhase('ready');
      setCuts(0);
      setMisses(0);
      setResult(null);
      cutIds.current = new Set<number>();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'load failed');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (phase !== 'run' || !init) return;
    let raf = 0;
    const step = (): void => {
      const elapsed = performance.now() - startedAt.current;
      setNow(elapsed);
      let missed = 0;
      for (const stem of init.field.stems) {
        const id = stem.atMs;
        if (cutIds.current.has(id)) continue;
        if (stemProgress(stem, elapsed) >= 1) {
          cutIds.current.add(id);
          missed++;
        }
      }
      if (missed > 0) setMisses((m) => m + missed);
      if (elapsed >= init.field.durationMs) {
        setPhase('done');
        void submit(cuts, misses + missed, elapsed);
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [phase, init, cuts, misses, submit]);

  const slice = (lane: number) => {
    if (phase !== 'run' || !init) return;
    const candidates = stemsInWindow(init.field, now).filter((stem) => stem.lane === lane);
    const target = candidates[0];
    if (!target) return;
    cutIds.current.add(target.atMs);
    setCuts((c) => c + 1);
  };

  const start = () => {
    startedAt.current = performance.now();
    cutIds.current = new Set<number>();
    setCuts(0);
    setMisses(0);
    setNow(0);
    setPhase('run');
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f0f6ef] text-[#25402c]">
        <p>{error}</p>
      </div>
    );
  }
  if (!init) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f0f6ef] text-[#7ba287]">
        <p className="animate-pulse">Wading to the reeds…</p>
      </div>
    );
  }

  const field = init.field;
  const seconds = Math.floor(now / 1000);
  const clock = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const visible = field.stems.filter((stem) => stemProgress(stem, now) > 0 && stemProgress(stem, now) < 1);

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 bg-[#f0f6ef] px-4 py-6 text-[#25402c]">
      <header className="flex w-full max-w-md items-center justify-between">
        <h1 className="text-xl font-black tracking-[0.3em] text-[#2f7d4f]">FAUCILLE</h1>
        <div className="text-sm font-semibold text-[#7ba287]">
          <span className="mr-3">{clock}</span>
          <span>🔥 {result ? result.streak : init.streak}</span>
        </div>
      </header>
      <p className="max-w-md text-center text-[13px] leading-snug text-[#7ba287]">
        Reeds rise over the pond. Tap a lane to cut the reed before it touches the water.
        {field.quota} cuts to fill today's basket.
      </p>
      <div className="flex w-full max-w-md gap-2">
        {Array.from({ length: field.lanes }, (_, lane) => (
          <button
            key={lane}
            onClick={() => slice(lane)}
            className="flex h-52 flex-1 flex-col items-center justify-end gap-1 rounded-xl border-2 border-[#bcd9c6] bg-[#e2f0e6] pb-2"
            aria-label={`lane ${lane + 1}`}
          >
            {visible
              .filter((stem) => stem.lane === lane)
              .map((stem) => (
                <span
                  key={stem.atMs}
                  className="absolute mb-10 h-8 w-1.5 rounded-t bg-[#2f7d4f]"
                  style={{ transform: `translateY(${-stemProgress(stem, now) * 160}px)` }}
                />
              ))}
            <span className="h-2 w-full rounded bg-[#7fbfa0]" />
          </button>
        ))}
      </div>
      <div className="flex w-full max-w-md justify-between text-xs font-semibold text-[#7ba287]">
        <span>cut {cuts} / {field.quota}</span>
        <span>missed {misses}</span>
      </div>
      {phase === 'ready' && (
        <button
          onClick={start}
          className="w-full max-w-md rounded-full bg-[#2f7d4f] py-3 text-base font-black uppercase tracking-widest text-white"
        >
          Enter the reeds
        </button>
      )}
      {phase === 'done' && result && (
        <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-xl border-2 border-[#bcd9c6] bg-[#e2f0e6] p-5 text-center">
          <p className="text-2xl font-black tracking-widest">
            {result.won ? 'BASKET FULL' : `SCORE ${result.score}`}
          </p>
          <p className="text-sm text-[#7ba287]">
            {result.won
              ? `${result.cuts} stems cut — streak 🔥 ${result.streak}. New reeds tomorrow.`
              : `${result.cuts} cut, ${result.misses} in the water. The quota was ${field.quota}.`}
          </p>
          <button
            onClick={() => setPhase('ready')}
            className="rounded-full border-2 border-[#2f7d4f] px-6 py-2 text-sm font-bold uppercase tracking-widest text-[#2f7d4f]"
          >
            Back to the pond
          </button>
        </div>
      )}
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
