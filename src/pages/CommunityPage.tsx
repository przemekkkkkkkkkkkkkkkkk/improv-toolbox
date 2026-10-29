import { useMemo, useRef, useState, type ComponentType, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { IMPROV_PLACES, type ImprovPlace, type PlaceKind } from '../data/places';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { IconArrowRight, IconChevronDown, IconMain, IconSchool, IconUsers } from '../components/icons';
import type { IconProps } from '../components/icons/createIcon';
import { getContactFormEndpoint } from '../utils/contactForm';
import { IS_NATIVE_BUILD } from '../native/platform';

const KINDS: PlaceKind[] = ['theater', 'group', 'school'];
const KIND_ICON: Record<PlaceKind, ComponentType<IconProps>> = {
  theater: IconMain,
  group: IconUsers,
  school: IconSchool,
};
/** Language → home country, listed first. */
const HOME_COUNTRY: Record<string, string> = { pl: 'PL', en: 'US', cs: 'CZ' };
const INPUT_CLASS =
  'w-full rounded-[var(--radius-md)] border-2 border-line bg-surface px-4 py-2.5 text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none';

type Listing = ImprovPlace & { countryName: string };
/** A suggestion carries a free-text country name instead of an ISO code. */
type Suggestion = Omit<ImprovPlace, 'country'> & { countryName: string };

/** Case- and diacritic-insensitive ("lodz" finds "Łódź"). */
function fold(text: string) {
  return text.normalize('NFD').replace(/\p{M}/gu, '').replace(/ł/g, 'l').replace(/Ł/g, 'L').toLowerCase();
}

function mapsUrl(place: Pick<ImprovPlace, 'name' | 'city'>) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name}, ${place.city}`)}`;
}

function withProtocol(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export function CommunityPage() {
  const { t, i18n } = useTranslation();
  const [kind, setKind] = useState<PlaceKind>('theater');
  const [country, setCountry] = useState('');
  const [query, setQuery] = useState('');
  const [adding, setAdding] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const noticeRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const lang = i18n.language.split('-')[0];
  const names = useMemo(() => new Intl.DisplayNames([lang], { type: 'region' }), [lang]);

  const all: Listing[] = useMemo(() => {
    const home = HOME_COUNTRY[lang];
    const collator = new Intl.Collator(lang, { sensitivity: 'base' });
    return IMPROV_PLACES.map((p) => ({ ...p, countryName: names.of(p.country) ?? p.country })).sort(
      (a, b) =>
        Number(b.country === home) - Number(a.country === home) ||
        collator.compare(a.countryName, b.countryName) ||
        collator.compare(a.city, b.city) ||
        collator.compare(a.name, b.name),
    );
  }, [names, lang]);

  const ofKind = all.filter((p) => p.kinds.includes(kind));
  const q = fold(query.trim());
  const matching = q ? ofKind.filter((p) => fold(`${p.name} ${p.city} ${p.countryName}`).includes(q)) : ofKind;
  // Countries come from the search results (already sorted), so the menu never offers an empty country.
  const countryCounts = new Map<string, number>();
  for (const p of matching) countryCounts.set(p.countryName, (countryCounts.get(p.countryName) ?? 0) + 1);
  const activeCountry = countryCounts.has(country) ? country : '';
  const groups = [...countryCounts.keys()]
    .filter((c) => !activeCountry || c === activeCountry)
    .map((c) => ({ country: c, places: matching.filter((p) => p.countryName === c) }));

  function openForm() {
    setNotice('');
    setAdding(true);
    // Wait for the form to mount, then bring it into view (the bottom card opens it too).
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
    });
  }

  /** Sends the place to the maintainer's inbox (same Formspree form as Contact). */
  async function sendSuggestion(place: Suggestion): Promise<boolean> {
    const endpoint = getContactFormEndpoint();
    if (!endpoint || !navigator.onLine) return false;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: 'Community place suggestion',
          _subject: `Improv Toolbox place: ${place.name} (${place.city})`,
          message: [
            `Name: ${place.name}`,
            `Kinds: ${place.kinds.join(', ')}`,
            `City: ${place.city}`,
            `Country: ${place.countryName}`,
            `Website: ${place.url}`,
          ].join('\n'),
          language: i18n.language,
          source: IS_NATIVE_BUILD ? 'native-app' : 'website',
        }),
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async function submitPlace(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (key: string) => String(form.get(key) ?? '').trim();
    const kinds = KINDS.filter((k) => form.get(k));
    const place: Suggestion = {
      name: get('name'),
      city: get('city'),
      countryName: get('country'),
      url: withProtocol(get('url')),
      kinds: kinds.length ? kinds : [kind],
    };
    setError('');
    setSending(true);
    const ok = await sendSuggestion(place);
    setSending(false);
    // On failure the form stays open with everything typed, so nothing is lost.
    if (!ok) {
      setError(t('community.notice.failed'));
      return;
    }
    setAdding(false);
    setNotice(t('community.notice.sent', { name: place.name }));
    requestAnimationFrame(() => noticeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  return (
    <PageContainer feature="community">
      <div className="space-y-5">
        <PageHeader feature="community" title={t('community.title')} subtitle={t('community.subtitle')}
          action={!adding && <Button size="sm" onClick={openForm}>{t('community.addShort')}</Button>}
        />

        {adding && (
          <form
            ref={formRef}
            onSubmit={submitPlace}
            className="space-y-3 p-4 rounded-[var(--radius-lg)] bg-surface border-2 border-ink shadow-[var(--shadow-hard)]"
          >
            <h2 className="font-display text-2xl font-extrabold text-ink leading-none">{t('community.form.title')}</h2>
            <fieldset className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink">
              <legend className="sr-only">{t('community.form.kinds')}</legend>
              {KINDS.map((k) => (
                <label key={k} className="flex items-center gap-2 font-semibold">
                  <input type="checkbox" name={k} defaultChecked={k === kind} className="h-4 w-4 accent-[var(--color-brand-500)]" />
                  {t(`community.kinds.${k}.one`)}
                </label>
              ))}
            </fieldset>
            <input name="name" required maxLength={120} placeholder={t('community.form.name')} aria-label={t('community.form.name')} className={INPUT_CLASS} />
            <div className="grid grid-cols-2 gap-3">
              <input name="city" required maxLength={80} placeholder={t('community.form.city')} aria-label={t('community.form.city')} className={INPUT_CLASS} />
              <input
                name="country"
                required
                maxLength={80}
                list="community-countries"
                autoComplete="off"
                placeholder={t('community.form.country')}
                aria-label={t('community.form.country')}
                className={`${INPUT_CLASS} [&::-webkit-calendar-picker-indicator]:hidden`}
              />
              <datalist id="community-countries">
                {[...new Set(all.map((p) => p.countryName))].map((c) => <option key={c} value={c} />)}
              </datalist>
            </div>
            <input name="url" required type="text" inputMode="url" autoCapitalize="off" maxLength={300} placeholder="www.example.com" aria-label={t('community.form.url')} className={INPUT_CLASS} />
            <p className="text-xs text-ink-muted">{t('community.form.note')}</p>
            {error && <p role="alert" className="text-sm font-semibold text-red-700">{error}</p>}
            <div className="flex gap-2">
              <Button type="submit" disabled={sending}>{t(sending ? 'community.form.sending' : 'community.form.send')}</Button>
              <Button type="button" variant="ghost" onClick={() => { setAdding(false); setError(''); }}>{t('community.form.cancel')}</Button>
            </div>
          </form>
        )}

        {notice && (
          <p ref={noticeRef} role="status" className="p-3 rounded-[var(--radius-md)] bg-brand-100 text-sm font-semibold text-ink">{notice}</p>
        )}

        {/* Section switcher — three distinct directories, not one mixed list. */}
        <div role="tablist" aria-label={t('community.title')} className="grid grid-cols-3 gap-2.5">
          {KINDS.map((k) => {
            const Icon = KIND_ICON[k];
            const active = k === kind;
            const count = all.filter((p) => p.kinds.includes(k)).length;
            return (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setKind(k)}
                className={`flex flex-col items-start gap-2 p-3 rounded-[var(--radius-lg)] border-2 text-left cursor-pointer transition-[background-color,border-color,box-shadow,transform] duration-150 ease-[var(--ease-out)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 lg:p-4 ${
                  active
                    ? 'bg-brand-500 border-ink shadow-[var(--shadow-hard)]'
                    : 'bg-surface border-line hover:border-ink'
                }`}
              >
                <span
                  className={`grid place-items-center w-9 h-9 rounded-[var(--radius-sm)] ${
                    active ? 'bg-ink-fill text-brand-500' : 'bg-brand-50 text-brand-700'
                  }`}
                >
                  <Icon size={21} />
                </span>
                <span className="font-label font-extrabold text-ink text-sm leading-tight lg:text-base">
                  {t(`community.kinds.${k}.title`)}
                </span>
                <span className={`text-xs leading-none ${active ? 'text-ink' : 'text-ink-muted'}`}>
                  {t('community.count', { count })}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-sm text-ink-muted -mt-1">{t(`community.kinds.${kind}.desc`)}</p>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('community.search')}
            aria-label={t('community.search')}
            className={INPUT_CLASS}
          />
          <label className="relative block">
            <select
              value={activeCountry}
              onChange={(e) => setCountry(e.target.value)}
              aria-label={t('community.country')}
              className={`${INPUT_CLASS} appearance-none truncate pr-10 font-semibold cursor-pointer`}
            >
              <option value="">{t('community.allCountries')}</option>
              {[...countryCounts].map(([c, n]) => (
                <option key={c} value={c}>{`${c} (${n})`}</option>
              ))}
            </select>
            <IconChevronDown size={18} aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
          </label>
        </div>

        {groups.map((g) => (
          <section key={g.country} aria-label={g.country}>
            <h2 className="mb-2.5 flex items-baseline gap-2 font-display text-[1.6rem] font-extrabold leading-none text-ink">
              {g.country}
              <span className="font-sans text-sm font-semibold text-ink-faint">{g.places.length}</span>
              <span aria-hidden className="h-0.5 flex-1 self-center rounded-full bg-ink/15" />
            </h2>
            <ul className="space-y-2.5">
              {g.places.map((p) => (
                <PlaceCard key={`${p.url}:${p.name}`} place={p} kind={kind} />
              ))}
            </ul>
          </section>
        ))}

        {groups.length === 0 && <p className="py-6 text-center text-ink-muted">{t('community.empty')}</p>}

        <div className="p-4 rounded-[var(--radius-lg)] border border-brand-200 bg-brand-50 space-y-3 lg:p-5">
          <p className="font-label font-extrabold text-ink">{t('community.missing.title')}</p>
          <p className="text-sm text-ink-muted -mt-2">{t('community.missing.desc')}</p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={openForm}>{t('community.add')}</Button>
            <Button size="sm" variant="secondary" onClick={() => window.open('https://www.google.com/maps/search/improv', '_blank', 'noopener')}>
              {t('community.missing.maps')}
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

function PlaceCard({ place, kind }: { place: Listing; kind: PlaceKind }) {
  const { t } = useTranslation();
  const Icon = KIND_ICON[kind];
  const also = place.kinds.filter((k) => k !== kind);

  return (
    <li>
      <a
        href={place.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 p-3.5 rounded-[var(--radius-lg)] bg-surface border border-line shadow-[var(--shadow-card)] hover:bg-brand-50/80 hover:border-brand-200 transition-colors lg:p-4"
      >
        <span className="grid place-items-center w-11 h-11 shrink-0 rounded-[var(--radius-md)] bg-brand-50 text-brand-700 group-hover:bg-brand-100">
          <Icon size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-label font-extrabold text-ink leading-tight break-words">{place.name}</div>
          <div className="text-sm text-ink-muted mt-0.5">{place.city}</div>
          {also.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {also.map((k) => (
                <Badge key={k} color="feature" className="text-[10px] uppercase tracking-wide px-1.5 py-0.5">
                  {t('community.also', { kind: t(`community.kinds.${k}.one`) })}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <IconArrowRight size={20} className="shrink-0 text-brand-700 transition-transform group-hover:translate-x-0.5" />
      </a>
      <a
        href={mapsUrl(place)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('community.onMapOf', { name: place.name })}
        className="mt-1 ml-auto block w-fit text-xs font-semibold text-brand-700 underline underline-offset-4 hover:text-ink"
      >
        {t('community.onMap')}
      </a>
    </li>
  );
}
