'use client';

import { useEffect, useState } from 'react';

type Hours = Record<string, { open?: string; close?: string } | null>;

const DAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function parseHHMM(s: string): number | null {
  const m = /^(\d{1,2}):(\d{2})/.exec(s.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (Number.isNaN(h) || Number.isNaN(min)) return null;
  return h * 60 + min;
}

function getVancouverNow(): { dayKey: string; minutes: number } {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Vancouver',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const parts = fmt.formatToParts(new Date());
  const weekday = parts.find((p) => p.type === 'weekday')?.value.toLowerCase() ?? 'monday';
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '0');
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');
  return { dayKey: weekday, minutes: (hour % 24) * 60 + minute };
}

function computeStatus(hours: Hours): { open: boolean; label: string } | null {
  if (!hours || typeof hours !== 'object') return null;
  const { dayKey, minutes } = getVancouverNow();
  const today = hours[dayKey];
  if (!today || !today.open || !today.close) return { open: false, label: 'Closed today' };
  const openMin = parseHHMM(today.open);
  const closeMin = parseHHMM(today.close);
  if (openMin == null || closeMin == null) return null;

  const overnight = closeMin <= openMin;
  const isOpen = overnight
    ? minutes >= openMin || minutes < closeMin
    : minutes >= openMin && minutes < closeMin;

  if (isOpen) {
    return { open: true, label: `Open now · until ${today.close}` };
  }
  if (minutes < openMin) {
    return { open: false, label: `Closed · opens ${today.open}` };
  }
  const tomorrowIdx = (DAY_KEYS.indexOf(dayKey) + 1) % 7;
  const tomorrow = hours[DAY_KEYS[tomorrowIdx]];
  if (tomorrow?.open) {
    return { open: false, label: `Closed · opens ${tomorrow.open} tomorrow` };
  }
  return { open: false, label: 'Closed' };
}

export default function OpenStatusBadge({ hours }: { hours: Hours | null | undefined }) {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    if (!hours) return;
    setStatus(computeStatus(hours));
    const id = setInterval(() => setStatus(computeStatus(hours)), 60_000);
    return () => clearInterval(id);
  }, [hours]);

  if (!status) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-2.5 py-1 border ${
        status.open
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : 'bg-slate-100 text-slate-600 border-slate-200'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${status.open ? 'bg-emerald-500' : 'bg-slate-400'}`}
      />
      {status.label}
    </span>
  );
}
