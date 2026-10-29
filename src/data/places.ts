/**
 * theater = a venue with a regular show schedule
 * group   = an ensemble / troupe you go to see perform (may play many venues)
 * school  = a training program you can sign up for
 * A place can be several (most US/UK theaters also run a school).
 */
export type PlaceKind = 'theater' | 'group' | 'school';

export interface ImprovPlace {
  name: string;
  city: string;
  /** ISO 3166-1 alpha-2; display name comes from Intl.DisplayNames. */
  country: string;
  kinds: PlaceKind[];
  url: string;
}

const TS: PlaceKind[] = ['theater', 'school'];
const GS: PlaceKind[] = ['group', 'school'];

// Curated, hand-checked list (links resolved 2026-10-28). Each site lists its own
// current shows and classes — we link out instead of mirroring schedules.
export const IMPROV_PLACES: ImprovPlace[] = [
  // Poland
  { name: 'Klancyk', city: 'Warszawa', country: 'PL', kinds: ['group'], url: 'https://klancyk.pl' },
  { name: 'Impro KRK', city: 'Kraków', country: 'PL', kinds: ['group'], url: 'https://improkrk.pl' },
  { name: 'Grupa AD HOC', city: 'Kraków', country: 'PL', kinds: ['group'], url: 'https://grupaadhoc.pl' },
  { name: 'Resort Komedii', city: 'Warszawa', country: 'PL', kinds: ['theater'], url: 'https://resortkomedii.pl' },
  { name: 'Szkoła Impro', city: 'Warszawa', country: 'PL', kinds: ['school'], url: 'https://szkolaimpro.pl' },
  { name: 'i.Eksploracje', city: 'Kraków', country: 'PL', kinds: ['school'], url: 'https://www.ieksploracje.pl/kursimprowizacji' },
  { name: 'Impro Silesia', city: 'Katowice', country: 'PL', kinds: ['school'], url: 'https://www.improsilesia.pl' },
  { name: 'Akademia Improwizacji', city: 'Wrocław · Gdańsk', country: 'PL', kinds: ['school'], url: 'https://akademiaimprowizacji.pl' },
  // United States
  { name: 'Upright Citizens Brigade', city: 'Los Angeles', country: 'US', kinds: TS, url: 'https://ucbcomedy.com' },
  { name: 'The Groundlings', city: 'Los Angeles', country: 'US', kinds: TS, url: 'https://www.groundlings.com' },
  { name: 'Impro Theatre', city: 'Los Angeles', country: 'US', kinds: GS, url: 'https://www.improtheatre.com' },
  { name: 'iO Theater', city: 'Chicago', country: 'US', kinds: TS, url: 'https://ioimprov.com' },
  { name: 'The Second City', city: 'Chicago', country: 'US', kinds: TS, url: 'https://www.secondcity.com' },
  { name: 'The Annoyance Theatre', city: 'Chicago', country: 'US', kinds: TS, url: 'https://www.theannoyance.com' },
  { name: 'Magnet Theater', city: 'New York', country: 'US', kinds: TS, url: 'https://magnettheater.com' },
  { name: 'Brooklyn Comedy Collective', city: 'New York', country: 'US', kinds: TS, url: 'https://www.brooklyncc.com' },
  { name: 'Improv Asylum', city: 'Boston', country: 'US', kinds: TS, url: 'https://improvasylum.com' },
  { name: 'Philly Improv Theater', city: 'Philadelphia', country: 'US', kinds: TS, url: 'https://phillyimprovtheater.com' },
  { name: 'Washington Improv Theater', city: 'Washington, D.C.', country: 'US', kinds: TS, url: 'https://witdc.org' },
  { name: 'BATS Improv', city: 'San Francisco', country: 'US', kinds: TS, url: 'https://www.improv.org' },
  { name: 'Unexpected Productions', city: 'Seattle', country: 'US', kinds: TS, url: 'https://www.unexpectedproductions.org' },
  { name: 'The Hideout Theatre', city: 'Austin', country: 'US', kinds: TS, url: 'https://www.hideouttheatre.com' },
  { name: "Dad's Garage", city: 'Atlanta', country: 'US', kinds: TS, url: 'https://www.dadsgarage.com' },
  { name: 'Villain Theater', city: 'Miami', country: 'US', kinds: TS, url: 'https://www.villaintheater.com' },
  { name: 'ComedySportz', city: 'Many cities', country: 'US', kinds: GS, url: 'https://www.comedysportz.com' },
  // Canada
  { name: 'Loose Moose Theatre', city: 'Calgary', country: 'CA', kinds: TS, url: 'https://www.loosemoose.com' },
  { name: 'Bad Dog Theatre', city: 'Toronto', country: 'CA', kinds: TS, url: 'https://baddogtheatre.com' },
  { name: 'Rapid Fire Theatre', city: 'Edmonton', country: 'CA', kinds: TS, url: 'https://rapidfiretheatre.com' },
  { name: 'Vancouver TheatreSports', city: 'Vancouver', country: 'CA', kinds: TS, url: 'https://vtsl.com' },
  { name: 'Montreal Improv', city: 'Montréal', country: 'CA', kinds: TS, url: 'https://www.montrealimprov.com' },
  { name: "Ligue nationale d'improvisation", city: 'Montréal', country: 'CA', kinds: ['group'], url: 'https://www.lni.ca' },
  // United Kingdom
  { name: 'The Free Association', city: 'London', country: 'GB', kinds: TS, url: 'https://www.thefreeassociation.co.uk' },
  { name: 'Hoopla Impro', city: 'London', country: 'GB', kinds: TS, url: 'https://www.hooplaimpro.com' },
  { name: 'The Nursery Theatre', city: 'London', country: 'GB', kinds: TS, url: 'https://thenurserytheatre.com' },
  { name: 'Blanche Improv', city: 'London', country: 'GB', kinds: ['school'], url: 'https://www.blancheimprov.com' },
  { name: 'The Comedy Store Players', city: 'London', country: 'GB', kinds: ['group'], url: 'https://thecomedystore.co.uk' },
  { name: 'Showstopper! The Improvised Musical', city: 'London', country: 'GB', kinds: ['group'], url: 'https://www.theshowstoppers.org' },
  { name: 'The Maydays', city: 'Brighton', country: 'GB', kinds: GS, url: 'https://www.themaydays.co.uk' },
  // Europe
  { name: 'Die Gorillas', city: 'Berlin', country: 'DE', kinds: ['group'], url: 'https://www.die-gorillas.de' },
  { name: 'Comedy Café Berlin', city: 'Berlin', country: 'DE', kinds: TS, url: 'https://www.comedycafeberlin.com' },
  { name: 'Act Attack', city: 'Berlin', country: 'DE', kinds: ['school'], url: 'https://actattacktheater.com' },
  { name: 'Springmaus', city: 'Bonn', country: 'DE', kinds: ['theater'], url: 'https://www.springmaus-theater.de' },
  { name: 'Boom Chicago', city: 'Amsterdam', country: 'NL', kinds: TS, url: 'https://boomchicago.nl' },
  { name: 'Det Andre Teatret', city: 'Oslo', country: 'NO', kinds: TS, url: 'https://detandreteatret.no' },
  { name: 'Stockholms Improvisationsteater', city: 'Stockholm', country: 'SE', kinds: TS, url: 'http://www.impro.a.se' },
  { name: 'IMPRO Barcelona', city: 'Barcelona', country: 'ES', kinds: TS, url: 'https://improbarcelona.com' },
  { name: 'Teatribù', city: 'Milano', country: 'IT', kinds: GS, url: 'https://teatribu.it' },
  // Oceania
  { name: 'Impro Melbourne', city: 'Melbourne', country: 'AU', kinds: GS, url: 'https://www.impromelbourne.com.au' },
  { name: 'Wellington Improvisation Troupe', city: 'Wellington', country: 'NZ', kinds: GS, url: 'https://wit.org.nz' },
];
