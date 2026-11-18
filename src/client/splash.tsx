import './index.css';

import { context, requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#f0f6ef] px-6 text-center text-[#25402c]">
      <div className="text-3xl">🌾</div>
      <h1 className="text-3xl font-black tracking-[0.3em] text-[#2f7d4f]">FAUCILLE</h1>
      <p className="max-w-[240px] text-[13px] leading-snug text-[#7ba287]">
        Cut the reeds before they reach the water. Hi {context.username ?? 'baker'}.
      </p>
      <button
        onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
        className="mt-2 rounded-full bg-[#2f7d4f] px-8 py-2.5 text-sm font-black uppercase tracking-widest text-white transition-transform active:scale-[0.98]"
      >
        Wade in
      </button>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
