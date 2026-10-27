import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { IconClose, IconSparkles } from '../icons';
import { CHANGELOG, formatReleaseDate, type Release } from '../../data/changelog';
import { markSeen, useLang, useUnseenUpdate } from '../../pwa/whatsNew';

const TAG_CLASS = {
  new: 'bg-brand-500',
  better: 'bg-brand-100',
  fix: 'bg-surface-3',
} as const;

export function ChangeList({ release, compact = false }: { release: Release; compact?: boolean }) {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <ul className={`flex flex-col ${compact ? 'gap-2' : 'gap-3'}`}>
      {release.changes.map((change) => (
        <li key={change.en} className={`flex items-start gap-3 text-ink leading-snug ${compact ? 'text-sm' : 'text-[15px]'}`}>
          <span
            className={`mt-0.5 shrink-0 rounded-md border-[1.5px] border-ink px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${TAG_CLASS[change.type]}`}
          >
            {t(`whatsNew.tag.${change.type}`)}
          </span>
          <span>{change[lang]}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Global "you were updated" toast + What's-new sheet, mounted once in
 * AppFrame. Visible only to returning users whose last-seen version is older
 * than this build's (see pwa/whatsNew.ts).
 */
export function WhatsNew() {
  const { t } = useTranslation();
  const lang = useLang();
  const unseen = useUnseenUpdate();
  const [sheetOpen, setSheetOpen] = useState(false);
  const onChangelog = useLocation().pathname === '/changelog';
  const latest = CHANGELOG[0];
  const short = latest.version.split('.').slice(0, 2).join('.');

  return (
    <>
      {unseen && !sheetOpen && !onChangelog && (
        <div
          role="status"
          className="fixed inset-x-3.5 bottom-[calc(env(safe-area-inset-bottom)+72px)] z-50 mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-ink-fill p-3.5 text-on-ink shadow-[0_12px_30px_-12px_rgba(16,34,26,0.6)] animate-fade-slide-up lg:bottom-6"
        >
          <span className="shrink-0 rounded-[10px] bg-brand-500 px-2 py-1 font-display text-[22px] font-black leading-none text-on-brand">
            {short}
          </span>
          <span className="min-w-0 flex-1">
            <strong className="block text-sm">{t('whatsNew.toastTitle', { version: latest.version })}</strong>
            <span className="block truncate text-xs text-on-ink-muted">{latest.changes[0][lang]}</span>
          </span>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="shrink-0 whitespace-nowrap rounded-full bg-brand-500 px-3 py-1.5 text-[13px] font-bold text-on-brand"
          >
            {t('whatsNew.toastCta')}
          </button>
          <button
            type="button"
            onClick={markSeen}
            aria-label={t('whatsNew.dismiss')}
            className="-mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-full opacity-70 hover:opacity-100"
          >
            <IconClose size={16} />
          </button>
        </div>
      )}

      {sheetOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(16,34,26,0.45)]"
          onClick={() => {
            setSheetOpen(false);
            markSeen();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="whats-new-title"
            className="mx-auto max-h-[86%] w-full max-w-md overflow-auto rounded-t-[24px] border-t-2 border-ink bg-surface px-5 pt-2.5 pb-[calc(env(safe-area-inset-bottom)+1.75rem)] animate-fade-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div aria-hidden className="mx-auto mb-4 h-[5px] w-10 rounded-full bg-line" />
            <div className="text-xs font-bold uppercase tracking-[0.08em] text-brand-700">{t('whatsNew.kicker')}</div>
            <h2 id="whats-new-title" className="mt-1 font-display text-[44px] font-black uppercase leading-[0.95] text-ink">
              {t('whatsNew.versionTitle', { version: short })}
            </h2>
            <div className="mb-5 text-[13px] text-ink-faint">{formatReleaseDate(latest.date, lang)}</div>
            <ChangeList release={latest} />
            <button
              type="button"
              onClick={() => {
                setSheetOpen(false);
                markSeen();
              }}
              className="mt-6 w-full rounded-[14px] border-2 border-ink bg-brand-500 p-3.5 font-bold text-on-brand shadow-[var(--shadow-hard)] transition-[transform,box-shadow] duration-100 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            >
              {t('whatsNew.gotIt')}
            </button>
            <Link
              to="/changelog"
              onClick={() => setSheetOpen(false)}
              className="mt-3.5 block text-center text-sm font-semibold text-brand-700"
            >
              {t('whatsNew.fullChangelog')}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

/** Launcher tile pointing at the changelog; shown only while notes are unread. */
export function WhatsNewCard({ className = '' }: { className?: string }) {
  const { t } = useTranslation();
  const lang = useLang();
  const unseen = useUnseenUpdate();
  if (!unseen) return null;
  const latest = CHANGELOG[0];
  return (
    <Link
      to="/changelog"
      className={`flex items-center gap-3 rounded-[15px] border-[1.5px] border-ink bg-surface p-3.5 shadow-[var(--shadow-card)] transition-colors hover:bg-brand-50/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${className}`}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[11px] bg-brand-100 text-brand-700">
        <IconSparkles size={22} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-label text-[15px] font-bold leading-tight text-ink">{t('whatsNew.kicker')}</span>
        <span className="block truncate text-xs text-ink-muted">{latest.changes[0][lang]}</span>
      </span>
      <span className="shrink-0 rounded-full border-[1.5px] border-ink bg-brand-500 px-2 py-0.5 text-[11px] font-bold uppercase text-on-brand">
        {t('whatsNew.tag.new')}
      </span>
    </Link>
  );
}

/** "Improv Toolbox v1.1.0 · Changelog" line under the launcher and More hub. */
export function VersionFooter({ className = '' }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <p className={`text-center text-xs text-ink-faint ${className}`}>
      {t('app.title')} v{__APP_VERSION__} ·{' '}
      <Link to="/changelog" className="font-semibold text-brand-700 underline underline-offset-4">
        {t('changelog.title')}
      </Link>
    </p>
  );
}
