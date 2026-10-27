import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { ChangeList } from '../components/whatsNew/WhatsNew';
import { CHANGELOG, formatReleaseDate } from '../data/changelog';
import { markSeen, useLang } from '../pwa/whatsNew';
import { checkForUpdate } from '../pwa/registerSW';
import { IS_NATIVE_BUILD } from '../native/platform';

type Status = 'idle' | 'checking' | 'current' | 'updating' | 'failed';

export function ChangelogPage() {
  const { t } = useTranslation();
  const lang = useLang();
  const [status, setStatus] = useState<Status>('idle');

  // Reading the changelog counts as having seen this version's notes.
  useEffect(markSeen, []);

  const check = async () => {
    setStatus('checking');
    setStatus(await checkForUpdate());
  };

  return (
    <PageContainer feature="more">
      <div>
        <PageHeader title={t('changelog.title')} subtitle={t('changelog.subtitle')} />

        <dl className="mb-8 rounded-[var(--radius-lg)] border border-line bg-surface px-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between border-b border-line py-3 text-sm">
            <dt className="text-ink-muted">{t('changelog.version')}</dt>
            <dd className="font-bold tabular-nums text-ink">{__APP_VERSION__}</dd>
          </div>
          <div className="flex items-center justify-between border-b border-line py-3 text-sm">
            <dt className="text-ink-muted">{t('changelog.build')}</dt>
            <dd className="font-bold tabular-nums text-ink">{__BUILD_ID__}</dd>
          </div>
          {/* The App updates through the store; only the Site can self-update. */}
          {!IS_NATIVE_BUILD && (
            <div className="flex items-center justify-between gap-3 py-3 text-sm">
              <dt className="text-ink-muted">{t('changelog.status')}</dt>
              <dd className="flex items-center gap-3">
                <span aria-live="polite" className={status === 'failed' ? 'text-ink-muted' : 'font-bold text-brand-700'}>
                  {status !== 'idle' && t(`changelog.check.${status}`)}
                </span>
                <button
                  type="button"
                  onClick={check}
                  disabled={status === 'checking' || status === 'updating'}
                  className="rounded-full border-2 border-ink bg-brand-500 px-3 py-1 text-xs font-bold text-on-brand disabled:opacity-60"
                >
                  {t('changelog.check.button')}
                </button>
              </dd>
            </div>
          )}
        </dl>

        <ol>
          {CHANGELOG.map((release, i) => (
            <li key={release.version} className="relative border-l-[3px] border-line pb-7 pl-5 last:pb-0">
              <span
                aria-hidden
                className={`absolute -left-[8px] top-1.5 h-[13px] w-[13px] rounded-full border-2 border-ink ${
                  release.version === __APP_VERSION__ ? 'bg-brand-500' : 'bg-surface'
                }`}
              />
              <h2 className="mb-2.5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-display text-[28px] font-extrabold leading-none text-ink">
                {release.version}
                <span className="font-sans text-[13px] font-medium text-ink-faint">
                  {formatReleaseDate(release.date, lang, 'short')}
                </span>
                {i === 0 && release.version === __APP_VERSION__ && (
                  <span className="rounded-md bg-ink-fill px-1.5 py-0.5 font-sans text-[10px] font-extrabold uppercase tracking-wide text-on-ink">
                    {t('changelog.current')}
                  </span>
                )}
              </h2>
              <ChangeList release={release} compact />
            </li>
          ))}
        </ol>
      </div>
    </PageContainer>
  );
}
