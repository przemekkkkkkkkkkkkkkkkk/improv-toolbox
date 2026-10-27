import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useTranslation } from 'react-i18next';

const KEY = 'introSeen';

/** Steps point at launcher elements; a step with no target (or a hidden one) shows centred. */
const STEPS = [
  { id: 'welcome', target: null },
  { id: 'search', target: '[data-intro="search"]' },
  { id: 'tile', target: '[data-tool-card-zone="all"]' },
  { id: 'favorite', target: '[data-tool-card-zone="all"] [data-testid^="favorite-"]' },
] as const;

const PAD = 8;
const listeners = new Set<() => void>();

function readSeen(): boolean {
  try {
    return localStorage.getItem(KEY) !== null;
  } catch {
    return true; // storage blocked: skip the tour rather than show it every visit
  }
}

function markSeen(): void {
  try {
    localStorage.setItem(KEY, '1');
  } catch {
    /* storage blocked */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => void listeners.delete(listener);
}

function visibleRect(selector: string | null): DOMRect | null {
  const el = selector ? document.querySelector(selector) : null;
  const rect = el?.getBoundingClientRect();
  return rect && rect.width > 0 && rect.height > 0 ? rect : null;
}

/** First-run spotlight tour over the launcher. Shown once, then remembered in localStorage. */
export function AppIntro() {
  const { t } = useTranslation();
  // Server snapshot = seen, so the prerendered launcher never contains the tour.
  const open = !useSyncExternalStore(subscribe, readSeen, () => true);
  const [i, setI] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const step = STEPS[i];
  const last = i === STEPS.length - 1;

  useLayoutEffect(() => {
    if (!open) return;
    if (step.target) document.querySelector(step.target)?.scrollIntoView({ block: 'center' });
    const measure = () => setRect(visibleRect(step.target));
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [open, step.target]);

  useEffect(() => {
    if (!open) return;
    nextRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && markSeen();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, i]);

  if (!open) return null;

  // Card sits under the spotlight when the target is in the top half, otherwise near the bottom.
  const cardPos = !rect
    ? { top: '50%', translate: '-50% -50%' }
    : rect.bottom < window.innerHeight * 0.55
      ? { top: Math.min(rect.bottom + 22, window.innerHeight - 270) }
      : { bottom: 'calc(env(safe-area-inset-bottom) + 96px)' };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-intro-title"
      aria-describedby="app-intro-body"
      className="fixed inset-0 z-[60]"
    >
      <div
        aria-hidden
        className="pointer-events-none fixed rounded-[16px] transition-all duration-300 ease-[var(--ease-out)]"
        style={
          rect
            ? {
                left: rect.left - PAD,
                top: rect.top - PAD,
                width: rect.width + PAD * 2,
                height: rect.height + PAD * 2,
                boxShadow: '0 0 0 3px var(--color-brand-500), 0 0 0 9999px rgba(16,34,26,0.72)',
              }
            : { inset: 0, boxShadow: 'inset 0 0 0 9999px rgba(16,34,26,0.72)' }
        }
      />
      <div
        key={i}
        className="fixed left-1/2 w-[min(92vw,380px)] -translate-x-1/2 animate-fade-in rounded-[16px] border-[1.5px] border-ink bg-surface p-5 text-ink shadow-[var(--shadow-hard)]"
        style={cardPos}
      >
        <p className="font-display text-[12px] font-bold uppercase tracking-[0.14em] text-brand-700">
          {t('intro.progress', { current: i + 1, total: STEPS.length })}
        </p>
        <h2 id="app-intro-title" className="mt-1 font-display text-[30px] font-black leading-none">
          {t(`intro.${step.id}.title`)}
        </h2>
        <p id="app-intro-body" className="mt-2 text-[15px] leading-relaxed text-ink-muted">
          {t(`intro.${step.id}.body`)}
        </p>
        <div className="mt-4 flex items-center gap-3">
          {!last && (
            <button onClick={markSeen} className="text-[14px] font-semibold text-ink-muted cursor-pointer hover:text-ink">
              {t('intro.skip')}
            </button>
          )}
          <button
            ref={nextRef}
            onClick={() => (last ? markSeen() : setI(i + 1))}
            className="ml-auto rounded-[11px] border-[1.5px] border-ink bg-brand-500 px-4 py-2 font-label font-bold text-ink shadow-[var(--shadow-hard)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-[transform,box-shadow] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink"
          >
            {last ? t('intro.done') : t('intro.next')}
          </button>
        </div>
      </div>
    </div>
  );
}
