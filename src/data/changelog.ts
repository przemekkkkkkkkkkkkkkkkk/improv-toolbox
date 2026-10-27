import { LANG_META, type Lang } from '../languages';

export type ChangeType = 'new' | 'better' | 'fix';

export interface Release {
  /** Must match package.json "version" for the newest entry (enforced by a test). */
  version: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  changes: ({ type: ChangeType } & Record<Lang, string>)[];
}

/**
 * User-facing release notes, newest first. To ship a release: bump
 * package.json "version" and add an entry here. The first entry drives the
 * "What's new" toast/sheet; the full list renders on /changelog.
 */
export const CHANGELOG: Release[] = [
  {
    version: '1.1.0',
    date: '2026-10-27',
    changes: [
      {
        type: 'new',
        en: 'A short welcome tour for first-time visitors',
        pl: 'Krótki samouczek na start dla nowych osób',
        cs: 'Krátká úvodní prohlídka pro nové uživatele',
      },
      {
        type: 'new',
        en: "What's new screen and changelog, so you can see what changed",
        pl: 'Ekran „Co nowego” i historia zmian, żeby zobaczyć, co się zmieniło',
        cs: 'Obrazovka „Co je nového“ a historie změn, abyste viděli, co se změnilo',
      },
      {
        type: 'new',
        en: 'Contact form: send feedback or suggest a tool from inside the app',
        pl: 'Formularz kontaktowy: wyślij opinię lub zaproponuj narzędzie prosto z aplikacji',
        cs: 'Kontaktní formulář: pošlete zpětnou vazbu nebo navrhněte nástroj přímo z aplikace',
      },
      {
        type: 'better',
        en: 'The app now always updates to the latest version, even when installed on your home screen',
        pl: 'Aplikacja zawsze aktualizuje się do najnowszej wersji, także po dodaniu do ekranu głównego',
        cs: 'Aplikace se vždy aktualizuje na nejnovější verzi, i když je přidaná na plochu',
      },
    ],
  },
  {
    version: '1.0.0',
    date: '2026-07-13',
    changes: [
      {
        type: 'new',
        en: 'Improv Toolbox on the App Store',
        pl: 'Skrzynka Improwizatora w App Store',
        cs: 'Improv Toolbox v App Store',
      },
      {
        type: 'new',
        en: 'Switch between English and Polish in one tap',
        pl: 'Przełączanie między polskim a angielskim jednym dotknięciem',
        cs: 'Přepínání jazyka jedním klepnutím',
      },
      {
        type: 'new',
        en: 'Greenroom redesign and the new tool launcher',
        pl: 'Nowy wygląd Greenroom i ekran startowy z narzędziami',
        cs: 'Nový vzhled Greenroom a úvodní obrazovka s nástroji',
      },
    ],
  },
];

export function formatReleaseDate(date: string, lang: Lang, month: 'long' | 'short' = 'long'): string {
  return new Intl.DateTimeFormat(LANG_META[lang].locale.replace('_', '-'), {
    day: 'numeric',
    month,
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
}
