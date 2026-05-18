'use client';

import { useState } from 'react';
import ChatUI from './ChatUI';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 z-50 sm:w-[400px] h-[min(500px,calc(100dvh-6rem))] bg-slate-50 rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-700 px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏔️</span>
              <h3 className="text-white text-sm font-bold">Sea to Sky Trip Planner</h3>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors text-lg leading-none"
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>

          {/* Chat Body */}
          <ChatUI variant="widget" />
        </div>
      )}

      {/* Floating Bubble */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 sm:right-6 z-50 w-14 h-14 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
        aria-label={open ? 'Close trip planner' : 'Open trip planner'}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
