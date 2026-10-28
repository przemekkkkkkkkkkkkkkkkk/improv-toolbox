# Humor transcreation method for new languages

Researched 2026-10-27. Companion to `localization-plan.md`, which covers the technical setup and language order; its Crowdin workflow is superseded. This file covers **method only**: how to produce funny, playable and culturally right content per language without a TMS.

Every external claim cites a source. Primary sources are preferred: papers, first-party company pages, standards bodies, and practitioners. **Unverified** marks anything I could not confirm. "Judgment" marks a recommendation that the evidence does not settle.

Repo fact: `src/locales/en/translation.json` and `pl` now have **2,374** leaf keys each, not 2,341. Top-level namespaces include `prompts`, `suggestions`, `character`, `variants`, `constraints`, `monologue`, `spine`, `warmups`, `formats`, `glossary`, `principles` and `facts`.

---

## TL;DR: the method

**Core idea.** Treat the comedy seeds as **copywriting from a brief**, which is what transcreation means in the trade body's definition ([ITI Code](#s-iti)). An LLM drafts several options per item. A **native improviser picks and rewrites**. The owner writes the intent for each item, since the owner is the only person who knows why the EN and PL versions are funny. Puns and culture-bound items are expected to be replaced, not translated.

### 1. Split the 2,374 keys into four tracks

| Track | Keys (approx.) | Method | Who |
|---|---|---|---|
| **A. UI strings** | ~365 | Plain translation: LLM plus glossary plus a register rule (du/tu/tú). One in-app pass by a native speaker. | LLM, then native reviewer |
| **B. Canon improv terms** (game names, formats, glossary, principles) | ~600 | **Terminology research, not translation.** Each name gets one of KEEP-EN / LOCAL-CANON / HYBRID ("Freeze – Zamroź!" is the PL hybrid already in the repo). Descriptions and tips are translated normally. | Native improviser decides names. LLM translates descriptions. |
| **C. History facts** | ~76 | Translate, keep names and dates exact, fact-check. Optionally add 3–5 local-scene facts (e.g. FR: Montreal LNI match format, 1977 ([MEM Montréal](#s-lni))). | LLM, then owner fact-check |
| **D. Comedy and creative seeds** | ~1,300 | **Transcreation pipeline**, steps 2–7 below. | LLM drafts, native improviser selects and writes, owner sets intent |

### 2. Build the artefacts once per language before translating any seeds

1. **Creative brief** (1 page). Audience: amateur improvisers reading aloud on stage. Register: du/tu, spoken, short. Rules: every item must be **sayable in one breath**, **playable** (it gives a scene a want, conflict or image), gender-neutral or with both forms, and must avoid references younger players won't know. This mirrors the brief-first step in transcreation ([ITI Code](#s-iti)).
2. **Glossary** for Track B, with a decision and evidence for each term, e.g. "Freeze: KEEP-EN, improwiki DE lists *Freeze* with *Einfrieren* as an alternative".
3. **Intent notes** for each Track D item: function, joke mechanism, and class (step 3). Write them once in English and reuse them for all languages, the way Netflix "pivot" templates carry annotations for jokes and puns into every target language ([Netflix template guide](#s-netflix-tpl)).
4. **Variant sheet** per language: item → 3 options → back-translation → rationale → chosen option → playtest score.

### 3. Classify every Track D item (LLM drafts, owner confirms in bulk)

Use Zabalbeascoa's joke types ([Téllez Quirós 2023](#s-tellez)) collapsed into three classes. Name the GTVH knowledge resource that carries the joke ([Asimakoulas 2004](#s-asim)).

| Class | Test | Action | Expected strategy |
|---|---|---|---|
| **U: universal** | Funny with no knowledge of US or PL culture and no wordplay. Example: "Laughs one second too late." | **Translate idiomatically.** Change only the language. | Same joke ([Zabalbeascoa via Téllez Quirós](#s-tellez)) |
| **C: culture-bound** | Depends on a reference, institution, brand, holiday or job that is local to EN or PL. | Keep it if the reference exists locally (e.g. an official film title). Otherwise **replace the reference and keep the script opposition and the target**. | Same type, different joke (Pixar broccoli → green peppers ([Docter via Slashfilm](#s-insideout))) |
| **L: language-bound** | Pun, rhyme, sound joke, double meaning. | **Pun → new pun** in the target language. If that fails, use a different device (alliteration, rhyme). If that fails, **drop the item and write a new local item**. Never translate literally. | Delabastita strategies 1, 4, 5 and 8 ([Jing 2010](#s-jing)) |

**Shortcut: use the Polish version as a classifier.** Where the native PL version clearly departs from the EN one, a human adapter already judged the item culture- or language-bound. Where PL is literal, the item is probably U. (Judgment.)

### 4. Generate variants (LLM)

For each C and L item, and each U item the critic flags, produce **3 options** with a back-translation and a one-line rationale each:
- (a) close
- (b) adapted
- (c) free rewrite that keeps the intent

ITI's code tells transcreators to brainstorm, shortlist, and "provide back translation and rationales for each submitted option", with "at least two options: one bolder and the other safer" ([ITI Code](#s-iti)).

Prompt with: the brief, the glossary, the intent note, **both EN and PL**, and a native-improviser persona. A pre-translation analysis step ("what is the joke, what makes it work") helps: MAPS ([He et al. 2024](#s-maps)), step-by-step translation ([Briakou et al. 2024](#s-briakou)) and humour decomposition ([Su et al. 2025](#s-hdm)).

### 5. Run an LLM critic pass to filter, not to pick the winner

A separate prompt flags MQM-style errors (unnatural phrasing, wrong register, gender, literal pun, unknown reference) and drops broken options ([GEMBA-MQM](#s-gemba)). **Do not let the LLM pick the funniest option.** In the CHI 2024 creative-writing study, no LLM judge correlated positively with expert judges ([Chakrabarty et al.](#s-ttcw)).

### 6. Native improviser selects and writes

They pick one of the 3 options, rewrite it, or replace the item. Budget about one paid session per 150–200 items. (Judgment, **unverified** throughput.) They also **write new local items**. Jackbox shipped translated prompts **plus 100 extra prompts per new language** ([Jackbox](#s-jb-ql2i)) and said full localization needs "comedic writers who can skillfully create new content specific to each language and culture" ([Jackbox dev, Steam 2019](#s-jb-steam)). Target **+5–10% native-only items** per category. (Judgment, scaled from Jackbox's +100.)

### 7. Playtest, ship, listen

- Read a stratified sample of about 60 items aloud in a real warmup with 4–8 local improvisers.
- Score each item 0–3 for "would play it" and 0–3 for "funny", the same 0–3 funniness scale as SemEval-2020 Task 7 ([Hossain et al.](#s-semeval)).
- Use best-worst picks for choosing between variants, which is more reliable than rating scales ([Kiritchenko & Mohammad 2017](#s-bws)).
- Ship, then add an in-app "this one doesn't work" button on seed cards and rewrite the worst-reported items monthly.

### Rewrite from scratch or adapt from EN+PL?

**Adapt from EN+PL by default, and rewrite the minority that fails.** No source gives a portable replace ratio:
- Jackbox: translated base plus new local prompts ([Jackbox](#s-jb-ql2i)).
- CAH Australia: "Adapted from the original American edition" ([CAH](#s-cah)). One fan blog claims about 15% unique content; **unverified**.
- Game localisation: localisers get "carte blanche to modify, adapt, and remove any cultural references, puns" ([Mangiron & O'Hagan 2006](#s-mangiron)).

Working estimate, to be **measured in the DE pilot** from the step-3 classification:
- about 70–80% U (translate)
- 10–20% C (adapt)
- 5–10% L (replace)
- plus 5–10% new native items

(Judgment.)

---

## Q1. Humor translation theory → decision procedure

- **GTVH (Attardo & Raskin).** A joke is described by six knowledge resources: script opposition (SO), logical mechanism (LM), situation (SI), target (TA), narrative strategy (NS) and language (LA). They are hierarchical: the higher the level at which two jokes differ, the less similar they are. An ideal translated joke keeps SO, LM, SI, TA and NS and changes only LA ([Asimakoulas 2004, Meta](#s-asim), summarising Attardo 2002, *The Translator* 8(2):173–194). The usual paraphrase of Attardo's rule is "differ at the lowest level necessary". Its exact wording is **unverified**.
  - **Method use:** an intent note records the SO and the target. Variants may change situation and language, and must keep SO and TA.
  - **Limit:** GTVH works for discrete jokes but is weaker for non-joke humour ([Valis, GUPEA](#s-valis)). A reception study found that translations identical in GTVH terms were rated differently by readers ([EJHR 2022](#s-ejhr)). So GTVH guides the work, and only playtesting validates it.
- **Skopos / functionalism.** The purpose of the target text decides the method. Nord adds **loyalty** to the source author's intentions ([Nord 2018](#s-nord)). Here the skopos is *"an improviser can read this aloud and start a good scene"*, not fidelity to the EN wording. Loyalty means keeping the owner's comedic intent, which is why the intent note exists.
- **Delabastita (wordplay).** He lists nine strategies: pun→similar pun; pun→non-pun keeping both senses; pun→non-pun keeping one sense; pun→related device (repetition, alliteration, rhyme, irony); pun→zero; literal rendering; non-pun→pun; a pun created from nothing; editorial explanation ([Jing 2010, JoSTrans](#s-jing), citing Delabastita 1996:134).
  - **Method use for L items:** try 1, then 4, then 5 combined with 8. That last combination is "drop it and write a new local item". Editorial footnotes are useless on stage.
- **Zabalbeascoa.** His seven joke types: international, binational, national-cultural/institutional, national sense of humour, language-dependent, visual, complex. Translation solutions run from same joke, same type, any joke and compensation down to maiming ([Téllez Quirós 2023](#s-tellez), citing Zabalbeascoa 1996, 2005). The U/C/L classes above are these types collapsed.
- **Chiaro.** Strategies for verbally expressed humour (VEH): leave it unchanged, replace it with target-language VEH, replace it with an idiom, or ignore it. She calls VEH translation "notoriously hard" (via secondary citations: [Uni Ljubljana e-book](#s-chiaro)). Her primary text is **unverified**.

## Q2. Transcreation practice

- **ITI Transcreation Code of Practice (Aug 2026)** ([ITI](#s-iti)), from the UK trade body, is the best first-party description.
  - Definition: "combines translation, copywriting and intercultural consultancy".
  - Six steps: (1) agree a brief and run a cross-cultural audit; (2) research; (3) produce: "Brainstorm as many options as possible", shortlist, refine, "Provide back translation and rationales for each submitted option"; (4) feedback, "common practice is two rounds"; (5) sign-off; (6) keep records.
  - Recommends "at least two options: one bolder and the other safer".
  - Says "Not all translators can provide transcreation": it needs copywriting skill as well as translation skill. This supports hiring **improvisers who write**, not general translators.
  - Pricing is like copywriting (per project or hour), not per word.
  - It argues against GenAI for ad transcreation (quality, IP, creativity). Its scope is advertising, which explicitly excludes literary and game texts, so it does not cover this project directly.
- **Netflix.** Subtitle templates must annotate "cultural references", "slang", "jokes" and "puns and plays on words". These are "not optional". When jokes are lost in a pivot template, Netflix wants "explanations and a literal translation in the annotations" ([Netflix template guide](#s-netflix-tpl)). Its German guide asks translators to "match the tone of the original content, while remaining relevant to the target audience" ([Netflix DE guide](#s-netflix-de)). → Our intent notes are exactly these annotations.
- **ISO 17100:2015.** Lists transcreation only in **Annex F, "Non-exhaustive list of value added services"**. It sets no process for it ([iTeh ISO 17100 sample](#s-iso)). Raw MT plus post-editing is out of scope. → No ISO standard defines a transcreation process.
- **Academic.** Pedersen (2014, *Cultus* 7:57–71) compares provider claims with translation-studies concepts ([Academia record](#s-pedersen)). Game localisation is described as "transcreation, rather than just translation", with fidelity to the experience rather than the text ([Mangiron & O'Hagan 2006](#s-mangiron)).

## Q3. Real-world analogues

| Case | What they did | Source |
|---|---|---|
| **Jackbox, Quiplash 2 InterLASHional** (2020; FR, IT, DE, ES) | Original prompts localized, **plus 100 extra prompts per language** | [Jackbox blog](#s-jb-ql2i) |
| **Jackbox**, developer FAQ (2019) | Wanted games "fully localized". The blocker was "finding comedic writers who can skillfully create new content specific to each language and culture". | [Steam dev post](#s-jb-steam) |
| **Jackbox**, job posting (2021) | International Games Lead to partner with localization shops to "localize our content while maintaining its unique style and humor" | [Game Developer](#s-jb-job) |
| **Jackbox Party Pack 9** (EFIGS) | "fully translated these games in every way – from the settings menus to the end credit songs" | [Jackbox language pack](#s-jb-lp) |
| **Jackbox, PT-BR** (2023) | "brand-new content completely translocalized". A search snippet of the patch post mentions hiring regional localization experts and swapping NFL questions for Brazilian football. That post's URL did not resolve, so this is **unverified**. | [Jackbox Brazil](#s-jb-br) |
| **Cards Against Humanity Australia** | "Adapted from the original American edition", 600 cards. Who adapted it and how many cards were replaced: **unverified**. | [CAH product page](#s-cah) |
| **Asterix (Anthea Bell)** | Puns are the hard part. Where French jokes don't carry, she writes new British ones. "it's no good doing it literally because then it's not funny anymore." Invented names (Getafix, Dogmatix). | [Gardner interview](#s-bell1), [Connexion](#s-bell2) |
| **Pixar, *Inside Out*** (Japan) | Broccoli swapped for green peppers, because "In Japan, broccoli is not considered gross". They asked Japanese kids what they found gross. Hockey → soccer in some markets. | [Slashfilm, quoting Docter](#s-insideout) |
| **Disney, *Zootopia*** | News-anchor animal changed per market: moose (US/CA), koala (AU), panda (CN), tanuki (JP), jaguar (BR) | [Mental Floss](#s-zootopia) |
| **Game localisation (Final Fantasy)** | Translators get "carte blanche" on references and puns, and may add new jokes | [Mangiron & O'Hagan](#s-mangiron) |
| **Duolingo** | Writers prioritise the learning objective but are encouraged toward humour. Localization aims for content that feels "locally relevant". | [Duolingo blog](#s-duo) |
| Codenames, Taboo, Spaceteam | Per-language word lists exist (Codenames is in about 45 languages). How the lists were built: **unverified**. | [Expats.cz](#s-codenames) |

**Pattern:** universal content is translated, references are swapped for local equivalents that serve the same function, and every successful case adds **new native material** written by local comedic writers. Nobody publishes a replace ratio.

## Q4. LLMs on humor and creative translation: evidence

**Failures, with numbers**
- **Puns, EN→FR (CLEF JOKER 2026, Task 2)** ([Ermakova et al.](#s-joker)):
  - Best team: **44%** success (meaning *and* wordplay kept); 82% contained wordplay; 48% kept the meaning.
  - Across all 948 manually rated outputs: 43% contained wordplay and **27%** were fully successful.
  - Top error: "loss of the original pun or cultural reference" (316), then literal translation (180).
  - There is a trade-off: the most creative system lost meaning, and the most faithful one rarely recreated wordplay.
  - BLEU did not predict success (ρ = −0.08). The 2025 winner, a multi-agent system with phonetic-semantic embeddings, reached about 77% valid.
- **Cultural nuance, 7 LLMs × 15 languages, 5 native raters each** ([Van Doren et al. 2026](#s-appen)):
  - Mean full-text score 1.68/3 (GPT-5 2.10).
  - **Puns 1.45/3** and idioms 1.65/3, versus holidays 2.20/3.
  - Idioms were the most likely to be left untranslated.
- **Comedy quality:** 20 professional comedians called LLM output "bland and biased comedy tropes", "cruise ship comedy material from the 1950s, but a bit less racist". Safety tuning flattened the material ([Mirowski et al., FAccT 2024](#s-robot)).
- **Creative writing:** LLM stories were 3–10× less likely to pass expert creativity tests, and **no LLM judge positively correlated with the experts** ([Chakrabarty et al., CHI 2024](#s-ttcw)).

**What helps**
- **Analyse before translating.** MAPS extracts keywords, topics and examples, then picks the best output with quality estimation, with fewer MQM errors ([He et al., TACL 2024](#s-maps)). Step-by-step research → draft → refine → proofread gave large gains, with research plus refinement contributing most ([Briakou et al., WMT 2024](#s-briakou)). A follow-up found no clear evidence that the decomposition itself causes the gains ([Wu et al. 2025](#s-briakou2)). Humour Decomposition (chain-of-thought plus humour theory) reports +7.75% humour; it is an arXiv preprint and the venue is **unverified** ([Su et al. 2025](#s-hdm)).
- **Generate several, then select.** N-best reranking with quality estimation beats single-output decoding on automatic and human scores ([Fernandes et al., NAACL 2022](#s-qad)). JOKER's top systems used multi-candidate generate-and-judge pipelines and model ensembles ([JOKER 2026](#s-joker)).
- **Multi-agent role play.** TransAgents (translator, localization specialist, editor, proofreader roles) was preferred by human readers over human references for literary text despite lower BLEU ([Wu et al., TACL 2025](#s-transagents)). Translate → reflect → improve is "sometimes competitive with, but also sometimes worse than" commercial MT on BLEU ([Ng, translation-agent](#s-ng)).
- **MQM-style LLM error flagging** works as quality estimation (GEMBA-MQM, WMT 2023) ([Kocmi & Federmann](#s-gemba)). Use it for the error filter in step 5, not for funniness.
- **Editing beats generating.** LLMs are "impressively good" at controlled humour edits ("unfunning") as judged by humans ([Horvitz et al., ACL 2024](#s-unfun)). That suggests the LLM should draft and edit, and the human should judge the comedy. (Inference.)

**Implication:** let the LLM translate U items and draft options for C and L items. Every C and L item needs a native human choice. Expect at most about 40% of LLM pun attempts to be usable. The JOKER best system reached 44% with an ensemble, and only for EN→FR.

## Q5. Improv naming conventions by language

| Term | DE | FR | ES / IT / NL / PT | Source |
|---|---|---|---|---|
| Zip Zap Zop | "Zipp Zapp Zopp (auch Zip Zap Zop oder Zipp - Zapp geschrieben)" | "Zip Zap Zop (aussi écrit Zip Zap Zoop ou Zip Zap Zoom)" | Pages exist under the slug `zip-zap-zop` | [improwiki DE](#s-iw-zip-de), [FR](#s-iw-zip-fr), [EN with language links](#s-iw-zip-en) |
| Freeze Tag | Title "Freeze Tag"; also Freeze, Einfrieren, Kettenimpro, Abklatschen | "Freeze Tag"; also Chaîne d'impro, Tape | ES: also Cadena de impro, Toca y entra. IT: "Freeze Tag" | [improwiki DE](#s-iw-fz-de), [FR](#s-iw-fz-fr), [ES](#s-iw-fz-es), [IT](#s-iw-fz-it) |
| Harold | `harold` slug in all 11 languages | same | same | [improwiki EN](#s-iw-harold) |
| French match format | n/a | Native francophone tradition (LNI, Montreal 1977): impro *comparée* / *mixte*; categories *chantée*, *rimée*, *sans paroles*, *à la manière de…* | n/a | [MEM Montréal](#s-lni) |
| Johnstone's *Impro* | *Improvisation und Theater*, Alexander Verlag, Berlin, tr. Petra Schreyer (since 1993) | French edition 2026, tr. Argy & Jane | ES: *Impro: improvisación y el teatro*, Cuatro Vientos, Chile | [Uni Wien](#s-johnstone-de), [Mollat](#s-johnstone-fr), [UNSAM](#s-johnstone-es) |

**Caveats**
- improwiki's non-English pages appear to be translated from the English pages: the opening lines are parallel ("Freeze Tag ist im Grunde Adrenalin in Kunstform"). They show that **English names are understood**, not that local troupes use them on stage.
- The PL file already mixes approaches: "Freeze – Zamroź!" is a hybrid, "Tak, i..." is localized, "Otwarcie Harolda" localizes the description and keeps the name.
- **Unverified**: what DE, IT, NL and PT schools actually call games in class.
- **Rule for Track B:** keep the EN name when local sources use it. Use a local canon name where one exists (FR match vocabulary). Use HYBRID ("Freeze – Einfrieren!") when a beginner needs the meaning. The native improviser makes the call for each term.

## Q6. Evaluation on a small budget

- **Native improviser review.** Use the selection step itself. ITI recommends two feedback rounds as standard ([ITI](#s-iti)).
- **Playtest scale.**
  - 0–3 funniness, as used for 15k+ edited headlines in SemEval-2020 Task 7 ([Hossain et al.](#s-semeval)). Add a separate 0–3 "playable" score, since a seed can be unfunny and still start a great scene.
  - Use 4–5 raters per item. The Appen benchmark used 5 native raters per language ([Van Doren et al.](#s-appen)).
- **Best-worst scaling** for choosing between variants. It is more reliable than rating scales for the same annotation effort ([Kiritchenko & Mohammad, ACL 2017](#s-bws)). Show 4 variants and ask for the best and the worst.
- **Don't use LLM-as-judge for funniness** ([Chakrabarty et al.](#s-ttcw)) or BLEU ([JOKER](#s-joker)).
- **In-app signals.** A "doesn't work" flag on seed cards, plus a reroll-rate proxy: items skipped immediately are suspect. A/B tests between variants are possible but slow at low traffic. Prefer flags. (Judgment; no source.)

---

## Worked example: German

DE outputs are illustrative LLM drafts. They need native improviser review.

| # | Item (EN / PL) | Class and reasoning | Decision | DE output (back-translation) |
|---|---|---|---|---|
| 1 | Pop-culture first line: "I know what you did last summer." / "Wiem, co zrobiłeś/aś zeszłego lata." | C, but the reference exists in DE: the film was released as *Ich weiß, was du letzten Sommer getan hast* ([prisma.de](#s-ikwydls)). SO is threat versus everyday line. | Keep the reference and use the official title wording. Use the du-form, which is also gender-neutral, so no slash form. | „Ich weiß, was du letzten Sommer getan hast." (= official title) |
| 2 | Pun (title prompt, constructed example): "Lord of the Fries" | L. Fries/rings is an English sound pun. Literal "Herr der Pommes" keeps the reference and loses the pun. | Delabastita 1 (new pun): keep the *Herr der Ringe* frame and find a food that contains "Ringe". | „Der Herr der Zwiebelringe" (Lord of the Onion Rings) |
| 3 | Culture-bound occupation (constructed example): "Mall Santa" | C. The US mall-Santa institution is weak in DE. SO: enforced festive cheer versus a grim job. | Replace the job and keep SO and TA. | „Glühweinverkäufer:in auf dem Weihnachtsmarkt" (Christmas-market mulled-wine seller). The gender colon follows the brief. |
| 4 | Universal quirk: "Laughs one second too late" / "Śmieje się sekundę za późno" | U. A timing joke with no culture or wordplay. EN and PL are literal matches, which confirms U. | Translate. | „Lacht immer eine Sekunde zu spät" |
| 5 | Canon game: "Zip Zap Zop" | Track B. improwiki DE lists "Zipp Zapp Zopp" and the "Zip Zap Zop" spelling. | KEEP-EN spelling (matches the in-game calls). Glossary note: "auch: Zipp Zapp Zopp". | „Zip Zap Zop" |
| 6 | UI: "Tap the stage to draw again" / "Dotknij sceny, aby losować ponownie" | Track A | Translate. Register: du. | „Tippe auf die Bühne, um neu zu ziehen" |

Each item also gets an intent note, e.g. #3: *"Function: gives an occupation that forces cheerful behaviour over misery. Keep: forced cheer vs. grim reality; seasonal. Free: the actual job."*

---

## Open questions and unverified points

- **Replace ratio:** nobody publishes one. The 70–80 / 10–20 / 5–10 split is a hypothesis to measure on DE.
- **Jackbox:** who wrote the FIGS prompts (in-house, an agency, or local comedians) and what share of base prompts was rewritten rather than translated: **unverified**. The PT-BR "localization experts in the region / Brazilian football" wording came from a search snippet of a URL that did not resolve.
- **CAH:** the UK and Canada editions and the "15% unique" claim: **unverified**.
- **Codenames, Taboo, Spaceteam:** how their word lists were localized: **unverified**.
- **Local game names:** what DE, IT, NL and PT improv schools actually say in class. improwiki's translated pages are weak evidence. Ask the native improviser and check two or three local school curricula per language.
- **Attardo 2002:** exact wording of the "lowest level" rule, and Chiaro's primary taxonomy: **unverified** (secondary sources only).
- **Su et al. 2025 (HDM):** venue **unverified** (arXiv only).
- **Native improviser cost and throughput** per language: no data.

## Sources

- <a id="s-iti"></a>Ho, M. (2026). *Transcreation Code of Practice*. Institute of Translation and Interpreting. https://www.iti.org.uk/resource/transcreation-code-of-practice-august-2026.html (PDF: https://www.iti.org.uk/asset/D11A54A2%2DF7A9%2D4F0A%2DA7F43055B23D5345/)
- <a id="s-netflix-tpl"></a>Netflix, Subtitle Template Timed Text Style Guide. https://partnerhelp.netflixstudios.com/hc/en-us/articles/219375728
- <a id="s-netflix-de"></a>Netflix, German Timed Text Style Guide. https://partnerhelp.netflixstudios.com/hc/en-us/articles/217351587
- <a id="s-iso"></a>ISO 17100:2015 sample (Annex F). https://cdn.standards.iteh.ai/samples/59149/e4d013e55e06445488dcc2f7ef7f3d6f/ISO-17100-2015.pdf ; catalogue https://standards.iteh.ai/catalog/standards/iso/cf5bd16c-e75c-4511-95a1-3c45f745c9ef/iso-17100-2015
- <a id="s-pedersen"></a>Pedersen, D. (2014). Exploring the concept of transcreation. *Cultus* 7:57–71. https://asb.academia.edu/DanielPedersen/Papers
- <a id="s-mangiron"></a>Mangiron, C. & O'Hagan, M. (2006). Game localisation: unleashing imagination with "restricted" translation. *JoSTrans* 6:10–21. https://www.jostrans.org/article/view/7269
- <a id="s-asim"></a>Asimakoulas, D. (2004). Towards a model of describing humour translation. *Meta* 49(4):822–842. https://erudit.org/en/revue/meta/2004/v49/n4/009784ar.html
- <a id="s-valis"></a>Valis, H. GTVH applied to Swedish subtitles of *Torrente* (GUPEA). https://gupea.ub.gu.se/handle/2077/37159
- <a id="s-ejhr"></a>Translating humorous literature from Vietnamese into Italian: humour reception. *European Journal of Humour Research*. https://w.europeanjournalofhumour.org/ejhr/article/view/615
- <a id="s-nord"></a>Nord, C. (2018). Skopos theory and functionalism in the new millennium. https://nhh.no/contentassets/376741f9c58c47fc97c79347b063ff6a/nord_2018_skopos-theory-and-functionalism-in-the-new-millenium.pdf
- <a id="s-jing"></a>Jing, H. (2010). The translation of English and Chinese puns from the perspective of relevance theory. *JoSTrans* 13:81–99 (lists Delabastita 1996's nine strategies). https://doi.org/10.26034/cm.jostrans.2010.608
- <a id="s-tellez"></a>Téllez Quirós, J. (2023). Traducción del humor y cultura: *The Big Bang Theory*. *Revista de Lenguas Modernas* 37 (Zabalbeascoa 1996/2005 taxonomy). https://doi.org/10.15517/RLM.V0I37.47745
- <a id="s-chiaro"></a>Chiaro strategy summaries (secondary), Uni Ljubljana e-book. https://ebooks.uni-lj.si/ZalozbaUL/catalog/download/545/891/9563?inline=1 ; Chiaro 2006, *JoSTrans* 6:198–208, https://jostrans.soap2.ch/issue06/cv_chiaro.php
- <a id="s-jb-ql2i"></a>Jackbox Games, "Quiplash 2 InterLASHional is coming soon". https://jackboxgames.com/quiplash-2-interlashional-is-coming-soon-to-steam-xbox-one-ps4-and-nintendo-switch/
- <a id="s-jb-steam"></a>Jackbox Games developer reply, Steam, 1 Oct 2019. https://steamcommunity.com/app/1005300/discussions/0/1630790506917138218
- <a id="s-jb-job"></a>Game Developer, "Jackbox Games seeks an International Games Lead" (Mar 2021). https://www.gamedeveloper.com/business/get-a-job-jackbox-games-seeks-an-international-games-lead
- <a id="s-jb-lp"></a>Jackbox Games, The Jackbox Language Pack. https://www.jackboxgames.com/the-jackbox-language-pack/
- <a id="s-jb-br"></a>Jackbox Games, "Jackbox Games is coming to Brazil". https://www.jackboxgames.com/blog/jackbox-games-is-coming-to-brazil
- <a id="s-cah"></a>Cards Against Humanity, Australian Edition. https://cardsagainsthumanity.com/products/cards-against-humanity-australian-edition
- <a id="s-bell1"></a>Gardner, A. Interview with Anthea Bell. https://anthonygardner.co.uk/interviews/anthea_bell.html
- <a id="s-bell2"></a>Connexion, "Making Asterix funny in English". https://www.connexionfrance.com/news/making-asterix-funny-in-english/616259
- <a id="s-insideout"></a>Slashfilm, "Why Inside Out changed so many scenes for its overseas release" (quotes Docter). https://slashfilm.com/727914/why-inside-out-changed-so-many-scenes-for-its-overseas-release
- <a id="s-zootopia"></a>Mental Floss, "Zootopia has different news anchors in different countries". https://mentalfloss.com/article/76784/zootopia-has-different-news-anchors-different-countries
- <a id="s-duo"></a>Duolingo blog: https://blog.duolingo.com/how-silly-sentences-can-help-you-learn ; https://blog.duolingo.com/how-duolingo-keeps-its-spanish-localization-inclusive-2
- <a id="s-codenames"></a>Expats.cz on Codenames' 10th anniversary. https://www.expats.cz/czech-news/article/this-czech-board-game-has-outsold-kingdom-come-and-turns-10-with-a-new-edition
- <a id="s-joker"></a>Ermakova, L. et al. (2026). Overview of the CLEF 2026 JOKER Task 2: Pun Translation from English to French. CEUR-WS Vol-4283. https://ceur-ws.org/Vol-4283/paper303.pdf
- <a id="s-appen"></a>Van Doren, M. et al. (2026). "Be My Cheese?": Cultural Nuance Benchmarking for Machine Translation in Multilingual LLMs. arXiv:2602.04729. https://arxiv.org/abs/2602.04729v1
- <a id="s-robot"></a>Mirowski, P. et al. (2024). A Robot Walks into a Bar. FAccT '24. https://arxiv.org/abs/2405.20956
- <a id="s-ttcw"></a>Chakrabarty, T. et al. (2024). Art or Artifice? CHI '24. https://arxiv.org/abs/2309.14556v2
- <a id="s-maps"></a>He, Z. et al. (2024). Exploring Human-Like Translation Strategy with LLMs (MAPS). TACL 12. https://aclanthology.org/2024.tacl-1.13
- <a id="s-briakou"></a>Briakou, E. et al. (2024). Translating Step-by-Step. WMT 2024. https://aclanthology.org/2024.wmt-1.123
- <a id="s-briakou2"></a>Wu, Aycock & Monz (2025). Please Translate Again. arXiv:2506.04521. https://arxiv.org/html/2506.04521v2
- <a id="s-hdm"></a>Su, Y. et al. (2025). Psychology-Driven Enhancement of Humour Translation. arXiv:2507.09259. https://arxiv.org/abs/2507.09259v1
- <a id="s-qad"></a>Fernandes, P. et al. (2022). Quality-Aware Decoding for NMT. NAACL 2022. https://aclanthology.org/2022.naacl-main.100/
- <a id="s-transagents"></a>Wu, M. et al. (Perhaps) Beyond Human Translation (TransAgents). TACL 13 (2025). https://arxiv.org/abs/2405.11804v1
- <a id="s-ng"></a>Ng, A. et al. translation-agent (GitHub README). https://github.com/andrewyng/translation-agent
- <a id="s-gemba"></a>Kocmi, T. & Federmann, C. (2023). GEMBA-MQM. WMT 2023. https://aclanthology.org/2023.wmt-1.64
- <a id="s-unfun"></a>Horvitz, Z. et al. (2024). Getting Serious about Humor. ACL 2024. https://aclanthology.org/2024.acl-short.76
- <a id="s-pun2pun"></a>Ma, Y. R. et al. (2025). Pun2Pun. ACL 2025 SRW (zh–en; no numbers in the abstract). https://aclanthology.org/2025.acl-srw.23
- <a id="s-semeval"></a>Hossain, N. et al. (2020). SemEval-2020 Task 7: Assessing Humor in Edited News Headlines. https://aclanthology.org/2020.semeval-1.98
- <a id="s-bws"></a>Kiritchenko, S. & Mohammad, S. (2017). Best-Worst Scaling More Reliable than Rating Scales. ACL 2017. https://aclanthology.org/P17-2074/
- <a id="s-iw-zip-en"></a>improwiki, zip zap zoop (EN, with language links). https://improwiki.com/en/wiki/zip-zap-zoop
- <a id="s-iw-zip-de"></a>improwiki DE, Zipp - Zapp. https://improwiki.com/de/wiki/zipp---zapp
- <a id="s-iw-zip-fr"></a>improwiki FR, zip-zap-zoom. https://improwiki.com/fr/wiki/zip-zap-zoom
- <a id="s-iw-fz-de"></a>improwiki DE, Freeze Tag. https://improwiki.com/de/wiki/freeze-tag
- <a id="s-iw-fz-fr"></a>improwiki FR, Freeze Tag. https://improwiki.com/fr/wiki/freeze-tag
- <a id="s-iw-fz-es"></a>improwiki ES, Freeze Tag. https://improwiki.com/es/wiki/freeze-tag
- <a id="s-iw-fz-it"></a>improwiki IT, Freeze Tag. https://improwiki.com/it/wiki/freeze-tag
- <a id="s-iw-harold"></a>improwiki, Harold. https://improwiki.com/en/wiki/harold
- <a id="s-lni"></a>Centre des mémoires montréalaises, "La Ligue nationale d'improvisation". https://ville.montreal.qc.ca/memoiresdesmontrealais/la-ligue-nationale-dimprovisation-quand-le-hockey-rencontre-le-theatre
- <a id="s-johnstone-de"></a>Uni Wien bibliography, Johnstone, *Improvisation und Theater*. https://germanistik.univie.ac.at/fileadmin/user_upload/fd_zentrum_deutsch/Kommentierte_Bibliografie/Johnstone_Improvisation_und_Theater.pdf
- <a id="s-johnstone-fr"></a>Mollat, Johnstone, *Impro: improvisation et théâtre* (2026). https://www.mollat.com/livres/3446918/keith-johnstone-impro-improvisation-et-theatre
- <a id="s-johnstone-es"></a>UNSAM catalogue, *Impro: improvisación y el teatro*. https://buscador.unsam.edu.ar/Record/68146/Details
- <a id="s-ikwydls"></a>prisma.de, *Ich weiß, was du letzten Sommer getan hast* (1997). https://www.prisma.de/filme/Ich-weiss-was-du-letzten-Sommer-getan-hast,371636
