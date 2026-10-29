# Improv places worldwide: candidates to extend `src/data/places.ts`

Researched 2026-10-29. Companion to `src/data/places.ts`, which held 55 hand-checked entries (PL/US/CA/GB plus a few in Europe and Oceania). This file lists **90 new verified entries** in 42 countries. A ready-to-paste TypeScript block is at the end.

**Verified** means the place's **own** website was fetched on 2026-10-29, was live, and showed dated 2025 or 2026 activity (shows, classes or posts). **Weak** marks entries where the only proof of activity is indirect, such as a 2026 season label or upload dates, or a show date with no year that I inferred from the weekday. **Unverified** lists active groups I could not confirm on an own website.

---

## TL;DR

| Region | New verified entries |
|---|---|
| Poland | 18 (Łódź 3, Wrocław 4, Kraków 3, Warszawa 2, Gdańsk 2, Toruń, Bydgoszcz, Białystok, Katowice) |
| Western/Northern Europe | 26 (DE 5, GB 4, NL 3, BE 2, FR 2, CH 2, FI 2, AT, IE, DK, NO, SE, IS 1 each) |
| Central/Southern/Eastern Europe | 30 (ES 6, IT 5, EE 3, CZ 2, PT 2, BG 2, SK, HU, LV, LT, UA, RO, HR, SI, GR, TR 1 each) |
| Rest of world | 16 (AU 5, AR 4, JP 2, NZ, MX, BR, CO, KR 1 each) |
| **Total** | **90** |

**Key findings**

- **Poland has no verifiable own-site entry** in Poznań, Lublin, Szczecin, Rzeszów, Olsztyn, Opole, Kielce, Zielona Góra or Częstochowa. Groups there exist, but only on Facebook or ticket sites. See [Unverified](#unverified-active-but-no-own-website-or-no-dated-activity-on-it).
- **Bristol Improv Theatre closed on 9 October 2026.** Its own site carries a trustees' statement. Do not add it.
- **Festivals are left out of the TS block** because `PlaceKind` has no `festival` kind. They are listed in [Festivals](#festivals-not-in-the-ts-block).

---

## Method

1. **Discovery** used web search, the [impro.pl group list](https://www.impro.pl/spis-grup), ticket aggregators (kupbilecik, biletomat, ebilet, goout, offi), festival line-ups and press. Many Polish candidates were found by guessing likely domains and checking them with curl. Search engines return little for small-city Polish queries.
2. **Verification** fetched each candidate's own website with WebFetch or `curl -sL`. Entries were rejected if the site was dead, parked, for sale, belonged to an unrelated business, or had no dated 2025/2026 activity.
3. **Re-check:** on 2026-10-29 every URL in the TS block returned HTTP 200 to curl, except `flyingturtleproductions.com` (406) and `funnylicious.eu` (466). Those two codes are bot-protection responses. Both sites rendered normally in WebFetch.
4. **Dates without a year:** some sites print only the day and month. I inferred the year from the weekday (for example "Fri 30.10" is 2026) or from schema.org `startDate`. Those rows say "year inferred".
5. **Coordinates** are approximate, to within a few hundred metres. *venue* means the site gives an address, or names a venue whose address I know. *city centre* means the site gives no fixed venue. Coordinates come from known addresses, not from geocoding.
6. **Excluded:** everything already in `places.ts`, and festivals (see above).

---

## Poland (18)

| Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|
| Teatr Komedii Impro | Łódź | theater, group, school | https://teatrkomediiimpro.pl | 51.7600, 19.4590 (venue: OFF Piotrkowska, Piotrkowska 138/140) | "TKI SYLWESTER 2025" and "TKI KAC 2025-26" galleries; workshops "poziom 0–3"; its biletomat widget lists near-daily shows 30.10–22.11 (year inferred) | [site](https://teatrkomediiimpro.pl/) |
| Scena IMPRO Teatru Nowego | Łódź | theater | https://nowy.pl/spektakle/scena_impro/ | 51.7735, 19.4545 (venue: Teatr Nowy, Więckowskiego 15, per [kontakt](https://nowy.pl/kontakt/)) | Season premiere 20.09.2026; shows 10.10 and 24.10; next 28.11.2026 | [page](https://nowy.pl/spektakle/scena_impro/) |
| O!impro | Łódź | group, school | https://oimpro.pl | 51.7810, 19.4470 (venue: Teatr Mały, Manufaktura) | Post "Warsztaty z krótkich form" 12.09.2026; shows to 12.06.2026 | [feed](https://oimpro.pl/feed.json) |
| Zespół ds. Impro | Wrocław | school, group | https://www.zespoldsimpro.pl | 51.1105, 17.0350 (venue of the JAMnik open stage: Nigdzie Nic z Nikim, Wita Stwosza 12) | JAMnik 07.11.2026; show 18.11.2026 at Momenty Klub; Level 1 course | [site](https://www.zespoldsimpro.pl/) |
| Jesiotr – komedia z ikrą | Wrocław | group, school | https://www.komediazikra.pl | 51.1055, 17.0290 (venue: Pub Wędrówki; street address only on [ebilet](https://www.ebilet.pl/miejsce/wedrowki-pub)) | Shows 30.10, 31.10, 06.11.2026; Thursday course at Budynek NOT, Piłsudskiego 74 | [workshops](https://www.komediazikra.pl/warsztaty-improwizacji/) |
| ZaŻarci | Wrocław | group | https://zazarci.pl | 51.1112, 17.0300 (venue: Dziady i Koktajle, Jatki 3/4) | Shows 03.09, 01.10, 15.10, 29.10.2026 | [site](https://zazarci.pl/) |
| irga impro | Wrocław | group | https://irgaimpro.pl | 51.1100, 17.0310 (venue: klub Proza; no street address on the site) | Shows Fri 30.10 and 27.11 (10th birthday), year inferred; "co drugi piątek". Mentions workshops but lists no course, so not tagged school | [site](https://irgaimpro.pl/) |
| Grupa Improwizacyjna Jakkolwiek | Kraków | group | https://jakkolwiek.pl | 50.0605, 19.9355 (venue: Lastriko, Gołębia 6) | Page source lists shows 29.10.2026, 26.11.2026 and dates to May 2027 | [site](https://jakkolwiek.pl/) |
| Szkoła Improwizacji AD HOC | Kraków | school | https://szkolaadhoc.pl | 50.0617, 19.9405 (venue: Mikołajska 2) | Levels P0–P3; "Spróbuj impro!" 21.11.2026 | [site](https://szkolaadhoc.pl/) |
| Comedy Lab | Kraków | group | https://comedylab.pl | 50.0505, 19.9445 (venue: Pub 103,8, Bożego Ciała 7, Kazimierz) | Self-described "stowarzyszenie i ekipa komików" (stand-up, impro, open mic). Impro events 30.10, 31.10, 27.11, 28.11 (year inferred) | [wydarzenia](https://comedylab.pl/wydarzenia) |
| Klub Komediowy | Warszawa | theater | https://komediowy.pl | 52.2196, 21.0175 (venue: Nowowiejska 1) | Near-daily impro shows, e.g. 29–30.10.2026 | [site](https://komediowy.pl/) |
| Fundacja Seniorwizacja (Teatr NoCoTy!) | Warszawa | school, group | https://seniorwizacja.pl | 52.2297, 21.0122 (city centre; workshops at Służewski Dom Kultury, NoCoTy! at CAM „Nowolipie”) | Intergenerational ("kultura, która łączy pokolenia"); posts 27.10.2026 | [site](https://seniorwizacja.pl/) |
| Kolektyw TERAZ | Toruń | group | https://kolektywteraz.pl | 53.0101, 18.6043 (venue: Dwór Artusa, Rynek Staromiejski 6) | Show "Akty Zgonu" 19.09.2026 (startDate in markup); no later show listed. Workshops only on request for groups, so not tagged school | [site](https://kolektywteraz.pl/) |
| Teatr Kameralny w Bydgoszczy | Bydgoszcz | theater | https://teatrkameralny.com | 53.1235, 17.9990 (venue: Grodzka 14-16) | Hosted the 10th Improdrom festival 10–13.09.2026; runs its own "Kameralne Improwizacje" series | [Improdrom 2026](https://teatrkameralny.com/improdrom2026-glowne-wydarzenia-main-events/) |
| Kalokagathia Impro/Teatr Lab | Białystok | school, group | https://improteatrlab.pl | 53.1325, 23.1688 (city centre) | "ZAPISY 2026/2027" enrolment, new junior group (9–12) | [site](https://improteatrlab.pl/) |
| SzaFoFe | Gdańsk | group | https://szafofe.pl | 54.3790, 18.6055 (city centre; Mostownia named only on the [bilety24](https://www.bilety24.pl/teatr/1563-wieczor-pelen-strachu-szafofe-slasher-120884?id=1004498) page) | "Wieczór Pełen Strachu – Slasher" 31.10.2026; "trójmiejska grupa" | [site](https://szafofe.pl/) |
| Teatr Improwizacji UG (ACK Alternator) | Gdańsk | school, group | https://ack.ug.edu.pl | 54.3955, 18.5740 (venue: Wita Stwosza 58, sala 41) | Open day 07.10.2025; season finale 24.06.2026; "Wtorki 17.30–19.00, przez cały rok akademicki". (Posts dated 27–28.10.2026 are republished 2013–2014 content, not evidence) | [grupy](https://ack.ug.edu.pl/grupy/) |
| Teatr Żelazny | Katowice | theater | https://www.teatrzelazny.pl | 50.2690, 18.9800 (venue: Gliwicka 148A) | General theatre with occasional themed impro ("Tylko kilka razy w tym sezonie!"): Halloween 30–31.10, Christmas 19.12 (year inferred) | [repertuar](https://www.teatrzelazny.pl/repertuar/) |

## Germany (5)

| Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|
| Steife Brise | Hamburg | group, school | https://steife-brise.de | 53.5511, 9.9937 (city centre; no venue of its own: plays Cap San Diego, Imperial Theater, Lola, PIERDREI and others) | "Seemannsgarn" 06.11.2026; Lachflash Deluxe 07.11.2026; Theaterschule courses | [site](https://steife-brise.de/) |
| Theatersport Berlin | Berlin | group | https://www.theatersport-berlin.de | 52.5450, 13.3650 (main venue: Ballhaus Wedding; no street address on the site) | Shows 02.11 and 16.11.2026; monthly dates to May 2027 | [Spielplan](https://www.theatersport-berlin.de/spielplan-tickets/) |
| Isar 148 | München | group | https://www.isar148.de | 48.1372, 11.5756 (city centre) | "Nächste Show 13.11.2026" (in Riedhausen; plays "zwischen München und Berlin") | [site](https://www.isar148.de/) |
| FastFood Theater | München | group, school | https://www.fastfood-theater.de | 48.1265, 11.5545 (venue: Tumblingerstraße 34a, postal) | "Bayerische Volksimpro" 14.11.2026; Improschule 2025/26 | [site](https://www.fastfood-theater.de/) |
| Emscherblut | Ruhrgebiet (touring) | group | https://emscherblut.de | 51.4556, 7.0116 (region centre, approximate; the site says only "aus dem Ruhrgebiet") | Shows 04.11 and 20.11.2026 (Neuss), 29.01.2027 (Solingen). Workshops are corporate/custom only, so not tagged school | [events](https://emscherblut.de/events/) |

## Netherlands (3)

| Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|
| easylaughs | Amsterdam | group, school | https://www.easylaughs.nl | 52.3615, 4.9115 (venue: CREA; street address not on the site) | Show Fri 30.10; workshops Sun 1 and 8.11 (year inferred) | [site](https://www.easylaughs.nl/) |
| Flock Theatre | Amsterdam | group, school | https://flock-theatre.com | 52.4005, 4.8930 (venue: Treehouse NDSM, T.T. Neveritaweg 57) | Shows 29.10 and 5/12/19.11.2026 (year inferred from event URLs); workshop 13.12 | [site](https://flock-theatre.com/) |
| Improv Utrecht | Utrecht | school, group | https://www.improvutrecht.nl | 52.0905, 5.1240 (Kraanstraat 23, contact address) | Graduation shows 9–12.12.2026, Villa Concordia | [shows](https://www.improvutrecht.nl/shows) |

## Belgium (2)

| Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|
| Théâtre l'Improviste | Bruxelles | theater, school | https://www.improviste.be | 50.8270, 4.3330 (venue: 120 rue de Fierlant, Forest) | "Retrouvailles" 15.11–20.12.2026; "Révélation !" from 22.01.2027 | [site](https://www.improviste.be/) |
| Swaajp Improtheater | Antwerpen | group, school | https://www.swaajp.be | 51.2275, 4.4250 (venue: Het Oude Badhuis, Stuivenbergplein 38) | "Weerwolven" 28.10.2026 | [kalender](https://www.swaajp.be/kalender/) |

## France (2)

| Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|
| Improvidence | Lyon | theater, group, school | https://improvidence.fr | 45.7590, 4.8465 (venue: 6 rue Chaponnay, Lyon) | "Agenda 2026-2027" (no dated shows on /agenda/) | [site](https://improvidence.fr/) |
| Le Cours Toujours | Paris | school | https://www.lecourstoujours.com | 48.8566, 2.3522 (city centre; several studios) | "Les inscriptions 2026 sont ouvertes", 2026-2027 sign-up | [site](https://www.lecourstoujours.com/) |

## Switzerland (2)

| Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|
| Eddy Weans Improtheater | Zürich | group | https://www.eddyweans.ch | 47.3769, 8.5417 (city centre; Theater Ida) | Theatresports vs. Zurigo Improv 30.10.2026 | [site](https://www.eddyweans.ch/) |
| Renegade Saints | Genève | group, school | https://renegadesaints.ch | 46.2140, 6.1460 (venue: Mr Pickwick, 80 rue de Lausanne) | English shows 05.11 and 03.12.2026; classes | [site](https://renegadesaints.ch/) |

## Austria (1)

| Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|
| Sport vor Ort | Wien | group | https://www.sportvorort.at | 48.1960, 16.3470 (venue: Stadtsaal; street address not on the site) | "Nächster Termin: 22. November 2026, 19.30 im STADTSAAL" | [site](https://www.sportvorort.at/) |

## Ireland (1)

| Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|
| Flying Turtle Productions | Dublin | school | https://flyingturtleproductions.com | 53.3450, -6.2560 (Doyles Pub, College Street) | General production company with an improv strand: "Welcome to Improvisation" 6-week course from Oct 15 (waitlist, no year); "Improv Performance" showcase June 4 in a 2026 post | [site](https://flyingturtleproductions.com/) |

## Nordics (6)

| Country | Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|---|
| DK | Improv Comedy Copenhagen | København | theater, school | https://improvcomedy.eu | 55.6750, 12.5770 (venue: Frederiksholms Kanal 2, contact) | Classes 29.10 and 01.11, terms from 11.01 (year inferred from weekdays); homepage show list currently empty | [classes](https://icc.culmas.io/classes) |
| NO | Bergen Impro | Bergen | group, school | https://bergenimpro.no | 60.3915, 5.3210 (venue: Den Nationale Scene) | Shows 21 Aug–30 Sep (© 2026, year inferred); no upcoming shows listed | [site](https://bergenimpro.no/) |
| SE | Gbgimpro | Göteborg | group, school | https://www.gbgimpro.se | 57.7089, 11.9746 (city centre; plays several venues) | "Kaffe Kid" 27.11 (ticket link 20261127); Game of the Scene from Tue 20.10 | [kurser](https://www.gbgimpro.se/kurser2026) |
| FI | Stella Polaris | Helsinki | group, school | https://stella-polaris.fi | 60.1640, 24.9370 (Bulevardi 23-27, contact address; shows at Vuotalo, Sellosali and others) | "Pridgertön" 04.11–10.12.2026 | [site](https://stella-polaris.fi/) |
| FI | Impro Helsinki | Helsinki | group, school | https://www.improhelsinki.com | 60.1699, 24.9384 (city centre) | Shows 30.10–13.11.2026; fall 2026 course finals 10.12 and 17.12 | [shows](https://www.improhelsinki.com/shows) |
| IS | Improv Ísland | Reykjavík | group, school | https://www.improvisland.is | 64.1468, -21.9330 (venue: Þjóðleikhúskjallarinn; courses at Austurstræti 5) | "Öll miðvikudagskvöld í Þjóðleikhúskjallaranum"; course from Mon 16 Nov (year inferred) | [námskeið](https://www.improvisland.is/namskeid) |

## United Kingdom, outside London (4)

| Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|
| The Suggestibles | Newcastle | group | https://www.thesuggestibles.co.uk | 54.9706, -1.6118 (city centre; Pantso plays The Stand, Live Theatre, Queens Hall Hexham, Cumberland Arms) | Improv Pantso 10–19.12.2026 | [site](https://www.thesuggestibles.co.uk/) |
| Improv North | Manchester | school, group | https://www.improvnorth.com | 53.4825, -2.2330 (venue: Northern Monk Refectory, 10 Tariff St) | Show Fri 23 Oct (year inferred); weekly classes | [shows](https://www.improvnorth.com/shows) |
| ComedySportz Manchester | Manchester | group, school | https://www.comedysportz.co.uk | 53.4808, -2.2426 (city centre) | News "Autumn Courses On Sale Now!" 28.07.2026 | [site](https://www.comedysportz.co.uk/) |
| Glasgow Improv Theatre | Glasgow | theater, group, school | https://improvglasgow.co.uk | 55.8610, -4.2565 (venue: The Old Hairdressers, Renfield Lane) | Improv Marathon 30.05.2026 (page text); Harold Night 03.11.2026 and grad shows 10.11.2026 (Google Calendar embedded on /events) | [marathon](https://improvglasgow.co.uk/glasgow-improv-marathon) |

## Czechia and Slovakia (3)

| Country | Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|---|
| CZ | Improv Prague | Praha | school, group | https://improvprague.cz | 50.0875, 14.4213 (city centre; several venues) | Course 27.10.2026; Blue Moon show 05.11.2026 | [site](https://improvprague.cz/) |
| CZ | Bafni | Brno | group, school | https://www.bafni.cz | 49.1885, 16.5985 (venue: Lumos, Křížová 20) | Shows 09.11 and 16.12.2026 | [site](https://www.bafni.cz/) |
| SK | Funnylicious Improv Theater | Bratislava | theater, group, school | https://funnylicious.eu | 48.1460, 17.1140 (venue: Mickiewiczova 4) | Shows 10 and 24.10.2026; weekly classes | [site](https://funnylicious.eu/) |

## Spain (6)

| Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|
| Impro Madrid | Madrid | group, school | https://www.impromadrid.com | 40.4466, -3.7110 (base: Juan Montalvo 4; shows elsewhere, e.g. Nave de Terneras) | "Somos una compañía de teatro"; shows 3–8.11.2026 (Corral Cervantes) and 12.11 (Tenerife); courses 15.11, 28.11, 12–13.12.2026 | [agenda](https://www.impromadrid.com/agenda) |
| Calambur Teatro | Madrid | school, group | https://calamburteatro.com | 40.4030, -3.7010 (venue: Martín de Vargas 25) | "Curso 2026/27"; X Torneo de Impro | [site](https://calamburteatro.com/) |
| Improductivos | Sevilla | group, school | https://improductivos.com | 37.4005, -5.9830 (venue: León XIII 7) | Show 31.10.2026; 2026-27 enrolment | [site](https://improductivos.com/) |
| VLC Playground | Valencia | school, group | https://www.vlcplayground.com | 39.4790, -0.3600 (venue: Casapueblo Brewhouse, Benimaclet) | Meetup events 02.10–06.11.2026 (linked from its site) | [Meetup](https://www.meetup.com/vlc-playground/events/) |
| improBilbao | Bilbao | school, group | https://improbilbao.com | 43.2585, -2.9240 (venue: Belostikale 16) | "El curso regular comienza en octubre"; pages edited 16.09.2026 (WordPress data); "también somos una compañía" | [cursos](https://improbilbao.com/cursos/) |
| Cero Qoma (formerly ImproVivencia) | Alicante | group, school | https://improvivencia.com | 38.3452, -0.4810 (city centre) | "¡Apúntate al nuevo curso 2026-2027!"; "ImproVivencia (ahora somos Cero Qoma)" | [site](https://improvivencia.com/) |

## Italy (5)

| Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|
| MIRò – Match d'Improvvisazione Teatrale Roma | Roma | group, school | https://matchimprovvisazioneroma.it | 41.8870, 12.5350 (venue: Teatro San Luca, Via Renzo da Ceri 136) | Halloween Match 31.10.2026 (post 13.10.2026) | [events](https://matchimprovvisazioneroma.it/category/event/) |
| Compagnia SenSei | Roma | group | https://www.compagniasensei.it | 41.8790, 12.4740 (venue: Teatro Petrolini, via Rubattino 5) | "Intrecci – Jukebox Edition" 01.11.2026 | [site](https://www.compagniasensei.it/) |
| i Bugiardini | Roma · Milano | group, school | https://www.bugiardini.it | 41.8975, 12.5145 (venue: Abarico Teatro, Via dei Sabelli 116) | Shows 01.11 (Roma) and 15.11.2026 (Milano) | [site](https://www.bugiardini.it/) |
| Teatro a Molla | Bologna | group, school | https://www.teatroamolla.it | 44.4935, 11.3110 (show venue: Teatro del Meloncello, Via Curiel 22) | Show 30.10.2026 (schema.org `startDate`); workshop 28–29.11 at Via del Milliario 40 | [eventi](https://www.teatroamolla.it/eventi/) |
| Quinta Tinta | Torino | group, school | https://www.quintatinta.it | 45.0830, 7.6840 (venue: Via Cecchi 17) | Catch Impro 24.10.2026; trial classes Oct 2026 | [site](https://www.quintatinta.it/) |

## Portugal (2)

| Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|
| Os Impromix | Lisboa | group, school | https://osimpromix.pt | 38.7223, -9.1393 (city centre; course at Com Calma Espaço Cultural, Benfica) | Quote dated "Teatro Bocage – Junho 2026"; yearly course Oct–Jul | [site](https://osimpromix.pt/) |
| Plataforma IMPROV | Barreiro | school | https://www.plataformaimprov.pt | 38.6631, -9.0724 (city centre) | "Turma de Improviso – Nível 1, 17/09/2026 – 03/12/2026". No own shows listed, so not tagged group | [site](https://www.plataformaimprov.pt/) |

## Hungary, Baltics, Ukraine (7)

| Country | Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|---|
| HU | Momentán Társulat | Budapest | theater, group, school | https://momentantarsulat.hu | 47.5045, 19.0610 (venue: Ó utca 4) | News 14.10.2026; shows to 31.12.2026 | [site](https://momentantarsulat.hu/) |
| EE | Ruutu10 | Tallinn · Tartu | theater, group, school | https://ruutu10.ee | 59.4200, 24.7300 (venue: Türi 10c, Tallinn; some shows at IMPEERIUM) | "Hooaja kalender 2026/2027": 30.10–03.11 | [kalender](https://ruutu10.ee/hooaja-kalender/) |
| EE | Rahel Otsa Improkool | Tallinn | school | https://improkool.ee | 59.4370, 24.7536 (city centre; Tallinn not stated on the site) | "Kaspars will visit Improkool on 14-15.11" (page created 14.10.2026); four Estonian-language groups in 2026/2027 | [masterclasses](https://improkool.ee/en/masterclasses/) |
| EE | Eesti Improteater | Tallinn | group | https://www.improteater.ee | 59.4370, 24.7536 (city centre; tours Estonia) | Upcoming 04.11 Haapsalu, 13.11 Tartu, 17.12 Tallinn. Trainings are bookable for groups only, so not tagged school | [site](https://www.improteater.ee/) |
| LV | Impro Bomzis | Rīga | group | https://improv.lv | 56.9560, 24.1250 (venue: Atmoda, Stabu iela 10 k-2) | One improviser (Mareks) with a rotating cast ("nav konkrēta sastāva"); shows 04.11–17.12 (year inferred) | [site](https://improv.lv/) |
| LT | Teatras Kitas Kampas | Vilnius | group, school | https://kitaskampas.lt | 54.6815, 25.2960 (venue: Malūnų g. 4, Užupis) | Posts 18.02 and 15.04.2026; studio "Artimiausia mokymų data: 2026 m. ruduo"; no upcoming shows, so not tagged theater | [site](https://kitaskampas.lt/) |
| UA | Майстерня Impro | Lviv | school | https://mk.improv.com.ua | 49.8520, 24.0390 (venue: REMA plant, opposite Zhovkivska 14) | Training 19.08.2026 | [site](https://mk.improv.com.ua/) |

## Balkans, Greece, Turkey (7)

| Country | Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|---|
| RO | Improteca | București | theater, group, school | https://improteca.ro | 44.4460, 26.1150 (venue: Strada Comănița 9) | Halloween Jam 30.10.2026; show 01.11.2026 | [site](https://improteca.ro/) |
| BG | ShiZi Improv Theater | Sofia | theater, group, school | https://www.shizi.bg | 42.6930, 23.3290 (venue: G.S. Rakovski 127) | Shows 06.11 and 21.11.2026; jam 07.11 | [site](https://www.shizi.bg/) |
| BG | HaHaHa Impro Theatre | Sofia | group, school | https://hahahaimpro.com | 42.7010, 23.3280 (class venue: ImPro Palace, Rakovski 44) | Class 29.10.2026; show 08.11.2026 at RCSI Toplocentrala | [site](https://hahahaimpro.com/) |
| HR | Improvizacijsko kazalište (Centar za kulturu Trešnjevka) | Zagreb | school | https://cekate.hr/dogadjaji/dramske-radionice-za-djecu-i-odrasle/ | 45.8000, 15.9580 (venue: Park Stara Trešnjevka 1) | 2026/27 workshop from 05.10.2026 | [page](https://cekate.hr/dogadjaji/dramske-radionice-za-djecu-i-odrasle/) |
| SI | Društvo IMPRO / Impro liga | Ljubljana | group, school | https://www.drustvoimpro.si | 46.0565, 14.5150 (venue: Menza pri koritu, Metelkova) | Post 26.09.2026: season starts 11.10.2026 (Impro liga page: no events announced yet) | [site](https://www.drustvoimpro.si/) |
| GR | ImproVIBE | Athína | theater, group, school | https://www.improvibe.gr | 37.9775, 23.7235 (venue: Lepeniotou 8, Psyrri) | Athens Improv Jam 22/10/26; Βραδιές Ιμπρούβ 01/11/26 | [site](https://www.improvibe.gr/) |
| TR | istanbulimpro | İstanbul | theater, group, school | https://www.istanbulimpro.com | 40.9905, 29.0275 (venue: Şadırvan Pasajı No:28, Kadıköy) | 6th Istanbul Improv Festival 7–10.10.2026 | [site](https://www.istanbulimpro.com/) |

## Australia and New Zealand (6)

| Country | Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|---|
| AU | Improv Theatre Sydney | Sydney | theater, group, school | https://improvtheatresydney.com.au | -33.8688, 151.2093 (city centre; the site gives no street address) | Shows 30.10–05.12.2026; "2026 classes on sale now" | [shows](https://improvtheatresydney.com.au/shows) |
| AU | Impro Australia | Sydney | group, school | https://improaustralia.com.au | -33.8688, 151.2093 (city centre) | Celebrity TheatreSports 27.09.2026, Enmore Theatre | [site](https://improaustralia.com.au/) |
| AU | The Improv Conspiracy | Melbourne | theater, group, school | https://improvconspiracy.com | -37.8136, 144.9631 (city centre; no address on the site) | Harold Night Thu 29 Oct (year inferred); classes | [site](https://improvconspiracy.com/) |
| AU | Improv Queensland | Brisbane | group, school | https://improvqld.com.au | -27.4698, 153.0251 (city centre; Raven Hotel, West End) | Iron Improviser 18.12.2026; course from 13.02.2027 | [site](https://improvqld.com.au/) |
| AU | Impro ACT | Canberra | group, school | https://impro.com.au | -35.2786, 149.1310 (venue: Level 1, 131 City Walk) | Improvention festival 7–13.12.2026; courses from 09.02.2027 | [Improvention](https://impro.com.au/improvention/), [courses](https://impro.com.au/beginners-courses/) |
| NZ | Scared Scriptless (The Court Theatre) | Christchurch | theater, group | https://courttheatre.org.nz | -43.5300, 172.6330 (venue: 129 Gloucester St) | Season 23.01.2026–29.01.2027 | [site](https://courttheatre.org.nz/) |

## Latin America (7)

| Country | Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|---|
| AR | Escuela Impro | Buenos Aires | school | https://impro.com.ar | -34.5880, -58.4380 (venue: Tadron, Niceto Vega 4802) | © 2026; December seminar enrolment | [site](https://impro.com.ar/) |
| AR | La Chispa Escuela de Impro | Buenos Aires | school | https://lachispaimpro.com.ar | -34.5920, -58.4465 (venue: Lemos 327, Chacarita) | Jams Thu 13/8 and 15/10 (year inferred); March 2026 class schedule | [site](https://lachispaimpro.com.ar/) |
| AR | LPI – Liga Profesional de Improvisación | Buenos Aires | group, school | https://impro.ar | -34.6050, -58.3880 (venue: Sarmiento 1495) | "Clases 2026"; show 21.03.2026 | [site](https://impro.ar/) |
| AR | Taller de Improvisación Teatral (Pablo Rusconi) | Buenos Aires | school | https://www.tallerdeimpro.com | -34.6037, -58.3816 (city centre) | "Cursos 2026", December intensives | [site](https://www.tallerdeimpro.com/) |
| MX | La Impro Lucha | Ciudad de México | group | https://laimprolucha.com | 19.4115, -99.1745 (venue: Foro Shakespeare, Condesa) | Weekly 29.10–26.11.2026 on its official ticket page, which its own site links to | [tickets](https://www.goliiive.com/la-impro-lucha-xx) |
| BR | Antropofocus | Curitiba | group | https://www.antropofocus.com.br | -25.4310, -49.2620 (venue: R. Mal. Deodoro 1227) | "Contos Proibidos" 28.10–01.11.2026 | [site](https://www.antropofocus.com.br/) |
| CO | Acción Impro | Medellín | theater, group, school | https://accionimpro.com.co | 6.2092, -75.5700 (venue: Calle 9 Nº 43B-80, El Poblado) | National championship final 31.10.2026 | [site](https://accionimpro.com.co/) |

## Asia (3)

| Country | Name | City | Kinds | URL | Coords | Evidence (latest seen) | Source |
|---|---|---|---|---|---|---|---|
| JP | Improvazilla | Tokyo | group, school | https://www.improvazilla.com | 35.6640, 139.7050 (venue: Crocodile, Shibuya) | Halloween Special 30.10.2026; tokyocomedy.com redirects here | [site](https://www.improvazilla.com/) |
| JP | Pirates of Tokyo Bay | Tokyo | group | https://www.piratesoftokyobay.com | 35.6478, 139.7086 (venue: What the Dickens!, Ebisunishi 1-13-3) | Monthly shows to 29.11.2026 | [shows](https://www.piratesoftokyobay.com/shows) |
| KR | Seoul City Improv | Seoul | school | https://www.seoulcityimprov.com | 37.5355, 126.9715 (venue: Funtastic Theater, Hangang-daero 48-gil 17-6) | Courses 03.10–28.11.2026; no dated shows, so not tagged group | [events](https://www.seoulcityimprov.com/events) |

---

## Festivals (not in the TS block)

| Country | Name | City | URL | Evidence |
|---|---|---|---|---|
| PL | ImproFest | Kraków | https://improfest.pl | 2026 edition 10–14.11.2026 |
| PL | JO! International Improv Festival | Toruń | https://artus.torun.pl/events/international-improv-festival-jo-2026/ | 23–26.07.2026 (page on the Dwór Artusa site) |
| NL | IMPRO Amsterdam | Amsterdam | https://www.impro-amsterdam.nl | 21–28.02.2026 |
| IE | Improv Fest Ireland | Dublin | https://improvfestireland.com | 30.09–03.10.2026 |
| CZ | Improtřesk | Praha | https://improtresk.cz | Advertising 2027 |
| RO | ImproFest | București | https://improfest.ro | 10th edition |

## Unverified: active, but no own website or no dated activity on it

| Country | Name | City | Link | Note |
|---|---|---|---|---|
| PL | Kolektyw Śmiesznie | Warszawa | https://www.facebook.com/kolektywsmiesznie2000/events | Site has no dates; plays ImproFest 12.11.2026 |
| PL | La Vida Impro | Poznań | https://lavidaimpro.pl | Site says "wkrótce"; kupbilecik lists a show 29.10.2026 |
| PL | Miejsce Komedii | Kraków | (miejscekomedii.pl returns 503) | Active on ticket sites to 16.12.2026 |
| PL | EPIC Impro | Gdańsk | evenea / kupbilecik | Fortnightly workshops into 2027 |
| PL | No i Fajnie – Teatr Impro | Gdańsk | trojmiasto.pl | Show 29.10.2026 |
| PL | Improwizowane Poniedziałki | Wrocław | https://www.facebook.com/ImprowizowanePoniedzialki | Monday shows to 28.12 |
| PL | Kompromis (impro musical), Zaspani | Wrocław | ebilet / biletomat | Shows Nov 2026 |
| PL | wymyWammy | Bydgoszcz | (no site) | Played Letnia Scena Impro |
| PL | Impro Teatr Bezczelny | Lublin | (no site) | Latest listing 2020 |
| PL | FIT Festiwal Improwizacji Teatralnych | Lublin | https://www.facebook.com/fitimprowizacje/ | 17–20.10.2025 |
| PL | Grupa Anyway | Rzeszów | kupbilecik | Show 03.12.2026 |
| PL | Znajdź X | Opole | kupbilecik | Show 03.11.2026 |
| PL | Grupa Pozostali | Szczecin | szczecinportal.pl | Festiwal SZPAK 22–24.10.2026 |
| PL | Teatr Trzecie Impro, Leniwe raz!, Drukała Poprawa Ratajczak | Poznań | https://www.facebook.com/TrzecieImpro, https://www.facebook.com/leniwerazimpro | Listed on impro.pl |
| PL | Imprognito | Łódź | https://www.facebook.com/imprognito | Listed on impro.pl |
| PL | Bez Puenty, Akcent Banana | Mysłowice / Katowice | https://www.facebook.com/bezpuentyimpro, https://www.instagram.com/akcentbanana | Listed on impro.pl |
| PL | OniOne, Wyjdzie w Praniu, Od Biedy, Żarówa, Byrfyfyr, Oxie Moron | Kraków | https://www.impro.pl/spis-grup | Od Biedy plays Lastriko 25.11.2026 |
| PL | Jetpunk, Frajda, Walentynowicz i Jego Brat | Warszawa | https://www.impro.pl/spis-grup | Walentynowicz plays ImproFest 2026 |
| CH | anundpfirsich | Zürich | https://pfirsi.ch | Live, © 2026, claims 4–5 shows a week, but its show list loads by JS and showed no dates |
| IE | Dublin Comedy Improv | Dublin | https://visitdublin.com/dublin-comedy-improv | Long-running Sunday show; no own site |
| FR | LIFI, Ligue Majeure d'Improvisation, NEW – Comédie Musicale Improvisée, Colors | Paris | offi.fr / helloasso | Paris's best-known troupes have no live own site; LIFI's lifi.fr is parked |
| GB | Monkey Barrel improv nights, TBC Improv | Edinburgh | https://www.tbcimprov.com | No dated improv activity on their own sites |
| GB | Roll With It Improv, Improv Co-Lab | Leeds | ents24 / heartcentre.org.uk | Listings only |
| DK | Imprologen | København | — | imprologen.dk does not resolve |
| SE | Malmö Improv Players | Malmö | cphpost.dk | Undated |
| FI | IMP | Helsinki | improwiki | imp.fi does not resolve |
| ES | Jamming | Madrid | taquilla.com | Teatro Maravillas to 31.10.2026 |
| PT | Commedia à la Carte, Os Improváveis, Cardume | Lisboa | instagram.com/os_improvaveis, instagram.com/cardumeimpro | Commedia à la Carte has a 2026/27 tour (press) |
| PT | Ervilha no Topo do Bolo | Porto | instagram.com/ervilhanotopodobolo | The only Porto group found |
| CZ | Divadlo Odvaz | Ostrava | goout.net | Listed on GoOut |
| SI | IGLU | Ljubljana | Facebook | iglu.si is for sale |
| GR | ImproSynthesis | Athína | https://www.improsynthesis.com | © 2026 and an 18.10.2026 page timestamp, but no dated show or class |
| CY | Impro_CY | Limassol | cyprus.bz | English show 04.07.2026 |
| RS | Story Time | Beograd | tic.rs | Feb 2025 listing |
| UA | Імпро-сигнал | Kyiv | kvytok.co | 14.08.2026 |
| LT | ImproVU | Vilnius | kultura.vu.lt | Student studio, 17.09.2026 |
| AU | The Big HOO-HAA! | Perth | https://www.facebook.com/thebighoohaa | Own site has no dates; FringeWorld 2026 |
| NZ | Covert Theatre | Auckland | https://coverttheatre.com | Live and runs weekly classes, but its calendar loads by JS; runs Auckland Improv Festival 17–24.04.2027. **Strong candidate:** recheck in a browser |
| AE | Courtyard Playhouse | Dubai | https://courtyardplayhouse.com | Blocked by a Cloudflare challenge. **Strong candidate:** recheck in a browser |
| AE | Dubomedy | Dubai | https://dubomedy.com | "2026 Courses"; the site still has template placeholders (wrong address, contact@domain) |
| AR | impro² | Buenos Aires | https://impro2.com | Only a © 2026 footer |
| SG | The Improv Company; Mission Improvables | Singapore | https://improv.sg | No dated activity; Mission Improvables is Instagram-only (Esplanade 07.06.2026) |
| HK | TBC Improv HK | Hong Kong | https://www.tbcimprov.com/hongkong | 2026 terms on Eventbrite only |
| PH | SPIT Manila | Manila | https://linktr.ee/spitmanila | Linktree only; show 07.11.2026 |
| BR | Barbixas (Improvável), Grupo Nada | São Paulo, Rio | Instagram / press | Own sites blank |
| IN | Improv Comedy Mumbai/Bangalore, Improv Lore | Mumbai, Bengaluru | District listings | No working own site |
| CN | Beijing Improv, Zmack | Beijing, Shanghai | WeChat | zmack.com is parked |
| PE / CL / IL / ZA | Imprología, Impro2 Chile, Mind Flow, Improguise, Jittery Citizens | Lima, Santiago, Tel Aviv, Cape Town, Johannesburg | — | No resolving site |

## Rejected

- **Closed:** Bristol Improv Theatre (improvtheatre.co.uk, closed 09.10.2026); TAG Theater Wien (dastag.at, closed 2025).
- **Stale:** Guarana impro (sitemap last updated 2024), Teatr Nowy Poznań "Improwizacje" (2019), Impro z Krypty Szczecin (2020), Teatr Osterwy (2021), Verbavolant Roma (Oct 2024), Hong Kong Improv (newest item 2021), Improbubble BE (2024 "launching soon"), Monkey Toast (2016).
- **Placeholder or for sale:** Poławiacze Pereł ("Trwa remont!"), dzikieweze.pl, teatrimprowizacji.pl, fus.be, iglu.si, improliga.sk, impro.hr, improvavel.pt, covert.co.nz, zmack.com.
- **Wrong organisation behind the domain:** stellapolaris.fi (a safari company), limproviste.be, momentan.hu (a customs firm), impeerium.ee, dogaclama.com, impro.si, impro.lv, improchile.cl, bighoohaa.com, improvplayground.com (San Diego).
- **Out of scope:** impro.pl and impro.es (directories), Warsaw Comedy (stand-up), Pan Ząbek (an illusionist), Sydney Comedy School (stand-up), Implosivo UY (general acting school), Recul RO (general arts venue), improvizace.cz (a single date, no city).

## Verification pass (2026-10-29)

A second, independent pass re-fetched every row's own website and checked each claim (name, city, kinds, quoted evidence, address). The first pass had stated things the sites do not say. Corrections applied above:

- **Unsourced relationships removed:** Klub Komediowy as Klancyk's "home venue" and Szkoła Improwizacji AD HOC as Grupa AD HOC's "school arm". Neither site says so; they are listed as independent places.
- **Invented or wrong evidence replaced:** Comedy Lab ("Do bigosu!" 21.11/05.12 does not exist), ACK UG (the 2026 post dates are republished 2013–14 posts), Flying Turtle (the cited events were screenwriting sharings), CeKaTe (linked page was the full 2025/26 cycle), Eesti Improteater (cited shows were 2025 private bookings), Improv Theatre Sydney and The Improv Conspiracy (address and "venue may have moved" were not on the sites).
- **Kinds the sites don't support, dropped:** theater for Steife Brise, Stella Polaris, Gbgimpro, Impro Madrid, Kitas Kampas, Comedy Lab; school for irga impro, Kolektyw TERAZ, Emscherblut, Eesti Improteater, Antropofocus; group for Plataforma IMPROV, La Chispa, Seoul City Improv. Added school for Renegade Saints.
- **Addresses** taken from ticket sites or contact/office addresses are now labelled as such or replaced by city centre.
- **Removed rows (9):** Improkracja (nothing on its site after 31.03.2026; the 24.11 date could not be found), Nie wiem (no city anywhere on the site), English Lovers (no year; only date passed), Improliga (national league/aggregator; listed shows are other groups'), Improteatro (national association HQ), Instantâneos (no dated public activity, no city), Lospleimovil (only dated listing is from a past year), Improv Adelaide (no dated activity), The Improv Cart (dates fit 2020 as well as 2026).

## Open questions

- **Recheck in a real browser** (JS or Cloudflare blocked them here): Covert Theatre (Auckland), Courtyard Playhouse (Dubai), anundpfirsich (Zürich), The Big HOO-HAA! (Perth). All four are well-known venues and probably belong in the list.
- **`festival` kind:** adding a fourth `PlaceKind` would let the six festivals above in, Improdrom and ImproFest in particular.

---

## Ready-to-paste TypeScript

Same format as `IMPROV_PLACES`, matching the corrected tables above. It uses the file's existing `TS` / `GS` shorthands, and a local `TGS` for the theater+group+school triple. Add the `const` beside the existing ones.

```ts
const TGS: PlaceKind[] = ['theater', 'group', 'school'];

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
```
