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
const TGS: PlaceKind[] = ['theater', 'group', 'school'];

// Curated, hand-checked list (links resolved 2026-10-28; additions source-checked 2026-10-29,
// see docs/research/improv-places-worldwide.md). Each site lists its own
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
  // Poland (additions 2026-10-29)
  { name: 'Teatr Komedii Impro', city: 'Łódź', country: 'PL', kinds: TGS, url: 'https://teatrkomediiimpro.pl' },
  { name: 'Scena IMPRO Teatru Nowego', city: 'Łódź', country: 'PL', kinds: ['theater'], url: 'https://nowy.pl/spektakle/scena_impro/' },
  { name: 'O!impro', city: 'Łódź', country: 'PL', kinds: GS, url: 'https://oimpro.pl' },
  { name: 'Zespół ds. Impro', city: 'Wrocław', country: 'PL', kinds: GS, url: 'https://www.zespoldsimpro.pl' },
  { name: 'Jesiotr – komedia z ikrą', city: 'Wrocław', country: 'PL', kinds: GS, url: 'https://www.komediazikra.pl' },
  { name: 'ZaŻarci', city: 'Wrocław', country: 'PL', kinds: ['group'], url: 'https://zazarci.pl' },
  { name: 'irga impro', city: 'Wrocław', country: 'PL', kinds: ['group'], url: 'https://irgaimpro.pl' },
  { name: 'Jakkolwiek', city: 'Kraków', country: 'PL', kinds: ['group'], url: 'https://jakkolwiek.pl' },
  { name: 'Szkoła Improwizacji AD HOC', city: 'Kraków', country: 'PL', kinds: ['school'], url: 'https://szkolaadhoc.pl' },
  { name: 'Comedy Lab', city: 'Kraków', country: 'PL', kinds: ['group'], url: 'https://comedylab.pl' },
  { name: 'Klub Komediowy', city: 'Warszawa', country: 'PL', kinds: ['theater'], url: 'https://komediowy.pl' },
  { name: 'Seniorwizacja', city: 'Warszawa', country: 'PL', kinds: GS, url: 'https://seniorwizacja.pl' },
  { name: 'Kolektyw TERAZ', city: 'Toruń', country: 'PL', kinds: ['group'], url: 'https://kolektywteraz.pl' },
  { name: 'Teatr Kameralny w Bydgoszczy', city: 'Bydgoszcz', country: 'PL', kinds: ['theater'], url: 'https://teatrkameralny.com' },
  { name: 'Kalokagathia Impro/Teatr Lab', city: 'Białystok', country: 'PL', kinds: GS, url: 'https://improteatrlab.pl' },
  { name: 'SzaFoFe', city: 'Gdańsk', country: 'PL', kinds: ['group'], url: 'https://szafofe.pl' },
  { name: 'Teatr Improwizacji UG', city: 'Gdańsk', country: 'PL', kinds: GS, url: 'https://ack.ug.edu.pl' },
  { name: 'Teatr Żelazny', city: 'Katowice', country: 'PL', kinds: ['theater'], url: 'https://www.teatrzelazny.pl' },
  // United Kingdom (outside London)
  { name: 'The Suggestibles', city: 'Newcastle', country: 'GB', kinds: ['group'], url: 'https://www.thesuggestibles.co.uk' },
  { name: 'Improv North', city: 'Manchester', country: 'GB', kinds: GS, url: 'https://www.improvnorth.com' },
  { name: 'ComedySportz Manchester', city: 'Manchester', country: 'GB', kinds: GS, url: 'https://www.comedysportz.co.uk' },
  { name: 'Glasgow Improv Theatre', city: 'Glasgow', country: 'GB', kinds: TGS, url: 'https://improvglasgow.co.uk' },
  // Europe (additions 2026-10-29)
  { name: 'Steife Brise', city: 'Hamburg', country: 'DE', kinds: GS, url: 'https://steife-brise.de' },
  { name: 'Theatersport Berlin', city: 'Berlin', country: 'DE', kinds: ['group'], url: 'https://www.theatersport-berlin.de' },
  { name: 'Isar 148', city: 'München', country: 'DE', kinds: ['group'], url: 'https://www.isar148.de' },
  { name: 'FastFood Theater', city: 'München', country: 'DE', kinds: GS, url: 'https://www.fastfood-theater.de' },
  { name: 'Emscherblut', city: 'Ruhrgebiet', country: 'DE', kinds: ['group'], url: 'https://emscherblut.de' },
  { name: 'easylaughs', city: 'Amsterdam', country: 'NL', kinds: GS, url: 'https://www.easylaughs.nl' },
  { name: 'Flock Theatre', city: 'Amsterdam', country: 'NL', kinds: GS, url: 'https://flock-theatre.com' },
  { name: 'Improv Utrecht', city: 'Utrecht', country: 'NL', kinds: GS, url: 'https://www.improvutrecht.nl' },
  { name: "Théâtre l'Improviste", city: 'Bruxelles', country: 'BE', kinds: TS, url: 'https://www.improviste.be' },
  { name: 'Swaajp Improtheater', city: 'Antwerpen', country: 'BE', kinds: GS, url: 'https://www.swaajp.be' },
  { name: 'Improvidence', city: 'Lyon', country: 'FR', kinds: TGS, url: 'https://improvidence.fr' },
  { name: 'Le Cours Toujours', city: 'Paris', country: 'FR', kinds: ['school'], url: 'https://www.lecourstoujours.com' },
  { name: 'Eddy Weans Improtheater', city: 'Zürich', country: 'CH', kinds: ['group'], url: 'https://www.eddyweans.ch' },
  { name: 'Renegade Saints', city: 'Genève', country: 'CH', kinds: GS, url: 'https://renegadesaints.ch' },
  { name: 'Sport vor Ort', city: 'Wien', country: 'AT', kinds: ['group'], url: 'https://www.sportvorort.at' },
  { name: 'Flying Turtle Productions', city: 'Dublin', country: 'IE', kinds: ['school'], url: 'https://flyingturtleproductions.com' },
  { name: 'Improv Comedy Copenhagen', city: 'København', country: 'DK', kinds: TS, url: 'https://improvcomedy.eu' },
  { name: 'Bergen Impro', city: 'Bergen', country: 'NO', kinds: GS, url: 'https://bergenimpro.no' },
  { name: 'Gbgimpro', city: 'Göteborg', country: 'SE', kinds: GS, url: 'https://www.gbgimpro.se' },
  { name: 'Stella Polaris', city: 'Helsinki', country: 'FI', kinds: GS, url: 'https://stella-polaris.fi' },
  { name: 'Impro Helsinki', city: 'Helsinki', country: 'FI', kinds: GS, url: 'https://www.improhelsinki.com' },
  { name: 'Improv Ísland', city: 'Reykjavík', country: 'IS', kinds: GS, url: 'https://www.improvisland.is' },
  { name: 'Improv Prague', city: 'Praha', country: 'CZ', kinds: GS, url: 'https://improvprague.cz' },
  { name: 'Bafni', city: 'Brno', country: 'CZ', kinds: GS, url: 'https://www.bafni.cz' },
  { name: 'Funnylicious Improv Theater', city: 'Bratislava', country: 'SK', kinds: TGS, url: 'https://funnylicious.eu' },
  { name: 'Impro Madrid', city: 'Madrid', country: 'ES', kinds: GS, url: 'https://www.impromadrid.com' },
  { name: 'Calambur Teatro', city: 'Madrid', country: 'ES', kinds: GS, url: 'https://calamburteatro.com' },
  { name: 'Improductivos', city: 'Sevilla', country: 'ES', kinds: GS, url: 'https://improductivos.com' },
  { name: 'VLC Playground', city: 'Valencia', country: 'ES', kinds: GS, url: 'https://www.vlcplayground.com' },
  { name: 'improBilbao', city: 'Bilbao', country: 'ES', kinds: GS, url: 'https://improbilbao.com' },
  { name: 'Cero Qoma (ImproVivencia)', city: 'Alicante', country: 'ES', kinds: GS, url: 'https://improvivencia.com' },
  { name: "MIRò – Match d'Improvvisazione Roma", city: 'Roma', country: 'IT', kinds: GS, url: 'https://matchimprovvisazioneroma.it' },
  { name: 'Compagnia SenSei', city: 'Roma', country: 'IT', kinds: ['group'], url: 'https://www.compagniasensei.it' },
  { name: 'i Bugiardini', city: 'Roma · Milano', country: 'IT', kinds: GS, url: 'https://www.bugiardini.it' },
  { name: 'Teatro a Molla', city: 'Bologna', country: 'IT', kinds: GS, url: 'https://www.teatroamolla.it' },
  { name: 'Quinta Tinta', city: 'Torino', country: 'IT', kinds: GS, url: 'https://www.quintatinta.it' },
  { name: 'Os Impromix', city: 'Lisboa', country: 'PT', kinds: GS, url: 'https://osimpromix.pt' },
  { name: 'Plataforma IMPROV', city: 'Barreiro', country: 'PT', kinds: ['school'], url: 'https://www.plataformaimprov.pt' },
  { name: 'Momentán Társulat', city: 'Budapest', country: 'HU', kinds: TGS, url: 'https://momentantarsulat.hu' },
  { name: 'Ruutu10', city: 'Tallinn · Tartu', country: 'EE', kinds: TGS, url: 'https://ruutu10.ee' },
  { name: 'Rahel Otsa Improkool', city: 'Tallinn', country: 'EE', kinds: ['school'], url: 'https://improkool.ee' },
  { name: 'Eesti Improteater', city: 'Tallinn', country: 'EE', kinds: ['group'], url: 'https://www.improteater.ee' },
  { name: 'Impro Bomzis', city: 'Rīga', country: 'LV', kinds: ['group'], url: 'https://improv.lv' },
  { name: 'Teatras Kitas Kampas', city: 'Vilnius', country: 'LT', kinds: GS, url: 'https://kitaskampas.lt' },
  { name: 'Майстерня Impro', city: 'Lviv', country: 'UA', kinds: ['school'], url: 'https://mk.improv.com.ua' },
  { name: 'Improteca', city: 'București', country: 'RO', kinds: TGS, url: 'https://improteca.ro' },
  { name: 'ShiZi Improv Theater', city: 'Sofia', country: 'BG', kinds: TGS, url: 'https://www.shizi.bg' },
  { name: 'HaHaHa Impro Theatre', city: 'Sofia', country: 'BG', kinds: GS, url: 'https://hahahaimpro.com' },
  { name: 'Improvizacijsko kazalište CeKaTe', city: 'Zagreb', country: 'HR', kinds: ['school'], url: 'https://cekate.hr/dogadjaji/dramske-radionice-za-djecu-i-odrasle/' },
  { name: 'Društvo IMPRO', city: 'Ljubljana', country: 'SI', kinds: GS, url: 'https://www.drustvoimpro.si' },
  { name: 'ImproVIBE', city: 'Athína', country: 'GR', kinds: TGS, url: 'https://www.improvibe.gr' },
  { name: 'istanbulimpro', city: 'İstanbul', country: 'TR', kinds: TGS, url: 'https://www.istanbulimpro.com' },
  // Oceania (additions 2026-10-29)
  { name: 'Improv Theatre Sydney', city: 'Sydney', country: 'AU', kinds: TGS, url: 'https://improvtheatresydney.com.au' },
  { name: 'Impro Australia', city: 'Sydney', country: 'AU', kinds: GS, url: 'https://improaustralia.com.au' },
  { name: 'The Improv Conspiracy', city: 'Melbourne', country: 'AU', kinds: TGS, url: 'https://improvconspiracy.com' },
  { name: 'Improv Queensland', city: 'Brisbane', country: 'AU', kinds: GS, url: 'https://improvqld.com.au' },
  { name: 'Impro ACT', city: 'Canberra', country: 'AU', kinds: GS, url: 'https://impro.com.au' },
  { name: 'Scared Scriptless (The Court Theatre)', city: 'Christchurch', country: 'NZ', kinds: ['theater', 'group'], url: 'https://courttheatre.org.nz' },
  // Latin America
  { name: 'Escuela Impro', city: 'Buenos Aires', country: 'AR', kinds: ['school'], url: 'https://impro.com.ar' },
  { name: 'La Chispa Escuela de Impro', city: 'Buenos Aires', country: 'AR', kinds: ['school'], url: 'https://lachispaimpro.com.ar' },
  { name: 'Liga Profesional de Improvisación', city: 'Buenos Aires', country: 'AR', kinds: GS, url: 'https://impro.ar' },
  { name: 'Taller de Improvisación Teatral', city: 'Buenos Aires', country: 'AR', kinds: ['school'], url: 'https://www.tallerdeimpro.com' },
  { name: 'La Impro Lucha', city: 'Ciudad de México', country: 'MX', kinds: ['group'], url: 'https://laimprolucha.com' },
  { name: 'Antropofocus', city: 'Curitiba', country: 'BR', kinds: ['group'], url: 'https://www.antropofocus.com.br' },
  { name: 'Acción Impro', city: 'Medellín', country: 'CO', kinds: TGS, url: 'https://accionimpro.com.co' },
  // Asia & Africa
  { name: 'Improvazilla', city: 'Tokyo', country: 'JP', kinds: GS, url: 'https://www.improvazilla.com' },
  { name: 'Pirates of Tokyo Bay', city: 'Tokyo', country: 'JP', kinds: ['group'], url: 'https://www.piratesoftokyobay.com' },
  { name: 'Seoul City Improv', city: 'Seoul', country: 'KR', kinds: ['school'], url: 'https://www.seoulcityimprov.com' },
];
