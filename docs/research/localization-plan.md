# Localization plan: new languages under improv-toolbox.com/{lang}

Researched 2026-10-27. Scope: tooling and workflow for humor transcreation, the technical setup for `/de`, `/es`, etc., and language priority. Repo facts come from the working tree on that date. Every external claim links to a source. Anything I could not confirm is marked **unverified**.

## TL;DR: recommended plan

1. **Stay on Crowdin.** It is already wired up through `crowdin.yml` and `.github/workflows/crowdin.yml`. Add target languages in the Crowdin project and connect **your own Anthropic key** as the AI provider. Crowdin supports Anthropic as a system provider with BYO keys ([Crowdin AI](https://support.crowdin.com/crowdin-ai/)).
2. **Attach intent per key with `crowdin context download/upload`.** i18next JSON cannot carry descriptions ([Crowdin store: i18next JSON](https://store.crowdin.com/i18next-json)). Download the context JSONL, have an LLM write a 1–3 sentence `ai_context` for each key (what the joke does, whether it is a pun, whether it can be replaced), then upload it ([CLI context download](https://crowdin.github.io/crowdin-cli/commands/crowdin-context-download)).
3. **Add a glossary for the ~600 canon improv terms** (Freeze, Zip Zap Zop, Harold) and **one style guide per language** (register, du/tu, gender-neutral phrasing, "transcreate, don't translate"). Crowdin's Basic prompt mode can inject the glossary, TM, style guides, neighbouring strings, file context and screenshots, and string context, key and max length are included by default ([Crowdin AI](https://support.crowdin.com/crowdin-ai/)).
4. **AI pre-translate, then have a native improviser proofread.** Proofreaders can translate and approve ([Crowdin roles](https://support.crowdin.com/roles/)). Run the comedy keys first in batches, filtered by label or file.
5. **Turn on QA checks as errors** for placeholders, length and ICU/plurals, and as a warning for the AI-powered check ([Crowdin QA checks](https://support.crowdin.com/project-settings/qa-checks/)).
6. **Technical: one build per language with `basename: '/de'` and Vite `base: '/de/'`, merged into the EN Vercel output.** This keeps ADR 0001's baked-language model untouched. Add a `/de/(.*)` SPA-fallback rewrite before the catch-all, and give each language its own manifest (`id`/`scope`/`start_url` = `/de/`) and its own SW at `/de/sw.js`. Exclude `/de/` from the root SW.
7. **Fix the paths that break** (checklist below). The most dangerous one is `/version.json`, which would put DE clients in a permanent "stale build" reload loop.
8. **Replace Polish slash forms** (`Myślałem/am`, 111 occurrences) with gender-neutral rewrites or i18next `context`, and use plural suffixes. Do this before inviting translators, because slash forms will propagate into every gendered language.
9. **Native:** switch to lazy-loaded locales (`i18next-resources-to-backend` plus dynamic `import()`), add `CFBundleLocalizations` and per-language `InfoPlist.strings`, and add the new App Store Connect localizations.
10. **Order: DE → FR → ES → IT → NL → PT-BR → SV.** Confidence is low to medium (see Q3). Check the site's own Search Console and Vercel country data before committing past language #2.

---

## Q1. Translation workflow and tooling for humor transcreation

### Crowdin (current tool): verified capabilities

| Need | Finding | Source |
|---|---|---|
| LLM providers | System providers include OpenAI, Azure OpenAI, Gemini, Mistral, **Anthropic**, xAI, DeepSeek and others. You can **"Use your own API keys"** or Crowdin's managed service, which is paid from a balance. | [Crowdin AI](https://support.crowdin.com/crowdin-ai/) |
| Custom prompts | Prompt types are Auto-Translation & AI Suggestion, QA check, and Advisor string-context review. Modes are Basic, Advanced, and External. Basic mode can add the glossary, TM suggestions, style guides, other-language translations, previous/next strings, file context, AI file context, screenshots, and project description. String context, key and max length are included by default. | [Crowdin AI](https://support.crowdin.com/crowdin-ai/) |
| Spend control | Daily or monthly limits per account or user. Custom providers have no pricing data and do not count toward limits. | [Crowdin AI](https://support.crowdin.com/crowdin-ai/) |
| Per-key context with i18next JSON | The format supports plurals. The supported contextual information is **"Screenshots, In-Context"** only, with no descriptions or custom attributes. | [store.crowdin.com/i18next-json](https://store.crowdin.com/i18next-json) |
| Context from outside the file | `crowdin context download` exports JSONL with fields `id, key, text, file, context, ai_context`. You fill in `ai_context` and run `crowdin context upload`. AI context is stored separately and never overwrites manual context. Filters: `--file`, `--label`, `--status empty\|ai\|manual`, `--croql`. | [crowdin context](https://crowdin.github.io/crowdin-cli/commands/crowdin-context), [download](https://crowdin.github.io/crowdin-cli/commands/crowdin-context-download) |
| Glossary | Terms with description, part of speech, and concepts with a **Translatable** toggle. | [Crowdin glossary](https://support.crowdin.com/glossary/) |
| Screenshots | Manual tagging, auto-tag (text recognition), Tag All. The page does not cover CLI/API upload. | [Crowdin screenshots](https://support.crowdin.com/screenshots/) |
| In-context | A one-line JS snippet plus a pseudo-language that you add as an extra app language. It needs CSP rules. | [In-Context](https://support.crowdin.com/in-context-localization/) |
| Proofreading | The Proofreader role can translate and approve. | [Crowdin roles](https://support.crowdin.com/roles/) |
| QA | Checks include placeholders mismatch, length (per-string max length), ICU syntax, consistent terminology (glossary), and an AI-powered check. Each check can be set to Error, which blocks saving, or Warning. The AI check is always a warning. | [QA checks](https://support.crowdin.com/project-settings/qa-checks/) |
| Path placeholders | `%two_letters_code%`, `%locale%` (`pt-BR`), and `languages_mapping`. | [Configuration file](https://support.crowdin.com/developer/configuration-file/) |
| Open-source license | Free. The 9 criteria include an OSI license, public source, **"You do not have any commercial products related to the open-source project"**, ≥3 months of work, and an **"active community of collaborators."** Conditions: join the beta group and contribute to the Global TM. | [OSS request form](https://crowdin.com/page/open-source-project-setup-request) |
| Paid pricing | The pricing page names plans ("Crowdin", "Crowdin Enterprise"; "Team" in the FAQ) and defines hosted words as words × target languages, but **shows no prices** in fetchable text. **Unverified.** | [crowdin.com/pricing](https://crowdin.com/pricing) |

**Risk for the OSS license (unverified until Crowdin answers):** the repo is MIT (`LICENSE`) and the first commit is dated 2026-07-06, so the ≥3-month criterion is met. However, `scripts/setup-revenuecat.mjs` (a tip jar) may conflict with the "no commercial products" criterion. "Active community of collaborators" is probably not met yet. The form does not say whether AI usage is covered, so assume BYO-key LLM costs are yours.

### Alternatives (brief)

| Tool | Relevant facts | Source |
|---|---|---|
| **DeepL API** | `formality` (`more/less/prefer_*`, only for some target languages), `glossary_id`, a free `context` parameter that is not billed, `custom_instructions` (up to 10 × 300 chars), and `style_id`. Good for UI strings. It is an MT engine, not a workflow tool. | [DeepL translate API](https://developers.deepl.com/docs/api-reference/translate) |
| **Tolgee** | Free cloud tier with 30k words and 3 seats. Paid plans €58, €133 and €373 per month (annual). Self-hosted open-source use is free. The AI translator takes a custom prompt, project description and language notes. Key descriptions are passed to DeepL as context. | [Tolgee pricing](https://tolgee.io/pricing), [Tolgee MT docs](https://docs.tolgee.io/platform/translation_process/machine_translation) |
| **Lokalise** | $149, $379 and $1,049 per month. No free or OSS plan listed, only a 14-day trial. | [Lokalise pricing](https://lokalise.com/pricing) |
| **Phrase** | Software UI/UX plan at 525/month (annual). No free tier or OSS program listed. | [Phrase pricing](https://phrase.com/pricing/) |

Conclusion: Crowdin is already integrated, accepts an Anthropic key, has a context-enrichment CLI built for LLM agents, and offers a possible free OSS license. Switching tools buys nothing here. Lokalise and Phrase cost too much for a free app. Tolgee is the only credible fallback if the OSS license is refused and paid Crowdin is too expensive.

### Best-practice sources

- Android: "describe the context in which the string is used… What is this string for?… Where is this in the UI?" Mark non-translatable spans ([Android localization](https://developer.android.com/guide/topics/resources/localization)).
- Microsoft Style Guide: "Avoid idioms, colloquial expressions, and culture-specific references… hard to localize" ([MS writing tips](https://learn.microsoft.com/en-us/style-guide/global-communications/writing-tips)). For this app the jokes *are* the content, so the conclusion is to label them as transcreation units, not to remove them.
- Apple HIG: "write with accessibility and localization in mind, avoiding jargon and gendered terminology" ([Apple HIG Writing](https://developer.apple.com/design/human-interface-guidelines/writing)). This supports removing the PL slash forms.
- **Unverified / not found:** a primary-source standard (W3C, ISO) specific to *humor transcreation*. I found none, and I did not cite blog summaries.

### Recommended pipeline

1. **Tag the content classes.** Split `translation.json` into namespaces, or tag keys with Crowdin labels: `ui`, `canon-term` (~600), `facts` (~76), `comedy` (~1,300). Separate files are the simplest route, because `crowdin context download --file` and Crowdin file context work per file without any label API. (Whether `crowdin.yml` can auto-assign labels on upload is **unverified**.)
2. **Context.** Run `crowdin context download --status empty`. An LLM reads the key, the EN text and the PL text (PL is a second human-written reference) and writes `ai_context`, for example: *"First-line prompt shown on a big card; must be a playable, absurd opening line an actor says aloud; pun on 'X' can be replaced by any local pun; ≤90 chars."* Then run `crowdin context upload`.
3. **Glossary.** Load the canon improv terms. For each language, decide whether the term stays in English (many European scenes use English game names; **unverified per language**, ask the reviewer) or uses an established local name.
4. **Style guide per language.** Register (DE *du*, FR *tu*?), gender-neutral phrasing, and these rules: keep `{{placeholders}}`, respect max length, and for `comedy` keys transcreate for function, not wording.
5. **Prompt strategy (Advanced mode, Anthropic key).** Inject the style guide, glossary, previous/next strings and file context (all supported per [Crowdin AI](https://support.crowdin.com/crowdin-ai/)). For comedy keys the instruction is: "Keep the comedic mechanism (absurdity / pun / status reversal) and the playability for an improviser; replace culture-bound references with local equivalents; never explain the joke." Add an AI QA-check prompt: "Is this funny and playable for a native improviser? Flag literal translations."
6. **Review.** One native-speaker improviser per language as Proofreader. They approve the `comedy` and `canon-term` files first, and UI strings can ship on AI plus a light review. The existing GitHub Action opens PRs, so merge only approved strings. Whether the action can be limited to approved-only downloads is **unverified**: check the `crowdin/github-action` export options.

---

## Q2. Technical

### (a) Serving `/de`, `/es` on improv-toolbox.com

**Facts from React Router docs and source:**
- `basename`: "The React Router app basename. Defaults to "/"" ([RR config](https://reactrouter.com/api/framework-conventions/react-router.config.ts)).
- In dev, `basename` must begin with Vite `base` ([plugin.ts](https://github.com/remix-run/react-router/blob/main/packages/react-router-dev/vite/plugin.ts)).
- Prerender requests are built as `${reactRouterConfig.basename}${prerenderPath}/`, and the HTML is written to `${pathname}/index.html`. So prerendered pages land in `build/client/de/...`. Paths in `prerender()` stay **basename-relative**.
- The source comment says **"SPA fallback is written to root regardless of basename"**: `build/client/__spa-fallback.html`, renamed to `index.html` if `/` is not prerendered ([plugin.ts](https://github.com/remix-run/react-router/blob/main/packages/react-router-dev/vite/plugin.ts); [pre-rendering docs](https://github.com/remix-run/react-router/blob/main/docs/how-to/pre-rendering.md)).
- Vite `base` changes asset *URLs* to `/de/assets/...`, but the emitted files still sit in `build/client/assets/`. A merge step therefore has to move `assets/` and `__spa-fallback.html` under `de/`. This file layout is inferred from how Vite works and is **unverified by a test build**.

**Facts from Vercel:**
- The filesystem takes precedence over rewrites: "precedence is given to the filesystem prior to rewrites being applied" ([vercel.json](https://vercel.com/docs/project-configuration/vercel-json)). Prerendered `/de/warmups/x/index.html` therefore wins automatically.
- Rewrite **ordering (first match wins) is not stated** in the [rewrites docs](https://vercel.com/docs/routing/rewrites). **Unverified.** To avoid depending on it, make the catch-all exclude the prefixes, for example `"source": "/((?!de/|es/).*)"` → `/__spa-fallback.html`, alongside `"/de/(.*)"` → `/de/__spa-fallback.html`. The negative-lookahead pattern appears in Vercel's own UK example ([rewrites](https://vercel.com/docs/routing/rewrites)).

**Options:**

| | A. Per-language builds, merged (recommended) | B. Single EN build, `/:lang?` segment |
|---|---|---|
| i18n model | Unchanged (`BUILD_LANG` baked, ADR 0001) | Rewrite: runtime language from URL, all locales loadable on web, language resolved during prerender |
| Bundle | Each language ships only its own JSON | Must lazy-load (~180 KB per locale) |
| Routes | Unchanged; `prerender()` unchanged (basename-relative) | Every route under `:lang?`; prerender list × languages |
| Cost | N × build time; one merge script; duplicate JS per language | More code, new class of bugs (language mismatch at hydration) |
| PWA/SW | One SW per prefix (clean scopes) | One SW, but per-language precache needs splitting anyway |

**Recommendation: A.** It is the smallest diff that fits the existing architecture. `build:de` = `VITE_BUILD_LANG=de` + `basename`/`base` read from an env var. A `scripts/merge-lang-builds.mjs` script copies the DE output into `build/client/de/`, then the SW is generated per directory. RR `<Link to="/privacy">` and `navigate('/x')` resolve against basename (standard RR behaviour; spot-check after build), so they **do not** break. Only raw strings break (checklist below).

**Repo paths that break under a `/de` basename** (from grep of `src/`, `scripts/`, `public/`):
- `src/pwa/registerSW.ts:36` `register('/sw.js')` registers the root SW, whose scope `/` covers `/de/` and serves the **EN** shell.
- `src/pwa/registerSW.ts:65` `fetch('/version.json')`. `vite.config.ts:14-33` writes one id per build, so a DE client compares itself against EN's id, decides it is always stale, and hits a **reload loop**. Use `import.meta.env.BASE_URL + 'version.json'`.
- `src/root.tsx:74-77,111` favicon, icon.svg, pwa-192, manifest and apple-touch-icon hrefs. Icons can stay root-shared, but the manifest must become `/de/manifest.de.webmanifest` or `/manifest.de.webmanifest` with a `/de/` scope.
- `src/hooks/useSoundscape.ts:6-13` `/sounds/*.mp3`. **Keep these root-absolute on purpose** (shared 61 MB, don't duplicate) and exclude `public/sounds` from non-EN copies.
- `src/components/layout/HeaderControls.tsx:44-46` builds the switch URL from `window.location.pathname`, which includes `/de`. Switching DE→EN would go to `improv-toolbox.com/de/...`. Use the basename-stripped `useLocation().pathname`.
- `src/components/layout/HeaderControls.tsx` `useOneTapLanguage = SUPPORTED_LANGS.length === 2`. With more than 2 languages this needs a picker.
- `src/seo/config.ts` `SITE_ORIGINS` needs `de: 'https://www.improv-toolbox.com/de'`. `canonicalUrl`/`hreflangLinks` then work by concatenation.
- `src/languages.ts` `SUPPORTED_LANGS`, `LANG_META`.
- `src/i18n.ts` `RESOURCES` (static imports of every locale).
- `public/manifest.*.webmanifest` needs a new file per language.
- `scripts/generate-sw.mjs` needs `navigateFallback` per directory, plus root `navigateFallbackDenylist`/`globIgnores` for `de/**`.
- `vercel.json` needs rewrites and `headers` for `/de/sw.js`, `/de/version.json` and `/de/assets/(.*)`.
- `package.json` build scripts.
- `crowdin.yml` `%two_letters_code%` collides for `pt-BR` vs `pt`. Use `languages_mapping` or `%locale%` ([config file](https://support.crowdin.com/developer/configuration-file/)).

### (b) hreflang across a separate domain plus subpaths

- "Alternate URLs do not need to be in the same domain." "Each language version must list itself as well as all other language versions." "If two pages don't both point to each other, the tags will be ignored." Use ISO 639-1 (plus optional ISO 3166-1 region). `x-default` is the fallback ([Google: localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)).
- Subdirectories on a gTLD are "Easy to set up / Low maintenance (same host)". **Don't** auto-redirect by guessed language or IP ([Google: multi-regional sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)).
- Effect on the repo: `hreflangLinks()` already emits all `SUPPORTED_LANGS` plus x-default, so it works once `SITE_ORIGINS.de` contains the path prefix. The PL build must be redeployed whenever a language is added, because its pages must list `/de/` too.

### (c) PWA: manifests and service workers

- `scope` is prefix-matched, so use a trailing slash (`/de/`). `start_url` must be inside `scope`. If absent, scope defaults to the start_url directory ([MDN scope](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/scope)).
- `id` defaults to `start_url`. Apps with the same `id` replace each other, so give each language a unique `id` (`/de/`) ([MDN id](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/id)). `public/manifest.en.webmanifest` has no `id` today, so its derived id is `/`. That is fine, and it should stay that way so existing installs are not orphaned.
- SW default scope is the script's directory, so `/de/sw.js` → `/de/`. "The browser will associate the document with the matching registration that has the most specific scope… It is generally safer not to define registrations that have overlapping scopes" ([MDN register](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register)).
- **Decision: one SW per language prefix.** The root EN SW overlaps `/de/`. A user who has only the EN SW and opens `/de/x` would get EN's `navigateFallback`. Fix this in `scripts/generate-sw.mjs` with `navigateFallbackDenylist` (which "takes precedence" over the allowlist) and with `globIgnores` for `de/**` ([workbox-build](https://developer.chrome.com/docs/workbox/modules/workbox-build)). Whether the DE SW needs `modifyURLPrefix` for correct precache URLs is **unverified**: test it.

### (d) Capacitor / native

- Lazy locales: `i18next.use(resourcesToBackend((lng, ns) => import(\`./locales/${lng}/${ns}.json\`)))` ([i18next: add or load translations](https://www.i18next.com/how-to/add-or-load-translations)). Vite splits each locale into its own chunk, which is bundled locally on native. Init becomes async, so rely on react-i18next Suspense or await init. Note that `resolveInitialLang()` in `src/native/lang.ts` already runs synchronously.
- iOS: `CFBundleLocalizations` is "The localizations handled manually by your app" ([Apple](https://developer.apple.com/documentation/bundleresources/information-property-list/cfbundlelocalizations)). That fits a WebView app with JS-side strings. **The repo has none today.** `ios/App/App/Info.plist` has only `CFBundleDevelopmentRegion=en`, `knownRegions = (en, Base)`, and no `*.lproj`/`InfoPlist.strings`. ADR 0003's localized home-screen name ("Skrzynka Impro") therefore appears **not implemented**. Exactly how iOS uses `CFBundleLocalizations` (per-app language list, App Store "Languages" field) is **unverified**, because Apple's page is abstract-only.
- App Store Connect offers German, Spanish (Spain and Mexico), French, French (Canada), Portuguese (Brazil and Portugal), Italian, Dutch and Swedish listings. The shown language depends on the storefront, device settings and the localizations you added ([App Store localizations](https://developer.apple.com/help/app-store-connect/reference/app-information/app-store-localizations)).

### (e) Plurals and gender instead of slash forms

- i18next v4 JSON uses `_zero/_one/_two/_few/_many/_other` suffixes via `Intl.PluralRules`. Context and plural combine as `key_male_one`, called with `t('friend', { context: 'male', count })` ([i18next context](https://www.i18next.com/translation-function/context), [JSON format](https://www.i18next.com/misc/json-format)).
- CLDR cardinal categories: **pl** one/few/many/other; **de** one/other; **es, fr, pt, it** one/many/other ([CLDR plural rules](https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html)). Crowdin i18next JSON supports plurals ([Crowdin store](https://store.crowdin.com/i18next-json)).
- The app has no user gender to pass as `context`, so slash forms in content prompts (`Myślałem/am`) cannot be resolved at runtime. **Rewrite them gender-neutrally** (for example an impersonal or 2nd-person construction), and keep `context` only where the UI really knows the gender. Apple HIG also advises avoiding gendered terminology ([Apple HIG Writing](https://developer.apple.com/design/human-interface-guidelines/writing)). The style guide must forbid slash forms in every language.

---

## Q3. Language priority by improv-scene size

| Evidence | Finding | Source |
|---|---|---|
| improwiki group directory (1,425 groups) | Germany 546, USA 152, France 131, Switzerland 75, UK 66, Netherlands 55, Austria 55, Italy 54, Belgium 28, Canada 26, Spain 26, Poland 13, Sweden 8, Brazil 6, Portugal 5, Mexico 1, Argentina 3 | [improwiki list](https://improwiki.com/en/list_of_improv_groups_worldwide) |
| ITI (Theatresports) | "over 90 companies, schools and Universities from 22 countries"; countries not listed | [impro.global](https://impro.global/about-us/more-iti) |
| AIN | Membership counted in "hundreds"; no per-country data; 2026 conference in Rimini, Italy | [AIN about](https://www.appliedimprovisationnetwork.org/about) |
| Match d'impro (LNI) | Format from Montréal in 1977; spread to France, Belgium, Switzerland, Italy, Argentina | [Canadian Encyclopedia: LNI](https://thecanadianencyclopedia.ca/en/article/ligue-nationale-dimprovisation) |

**Caveats:** improwiki is German-founded, so DACH is over-represented and Latin America and Brazil are almost certainly under-counted. I found no primary festival-per-country dataset. **Google Trends was not fetched (unverified).** The app's own **App Store territory and Search Console country data are not public. Check App Store Connect → Analytics, Search Console → Countries, and Vercel Analytics before language #3.**

**Suggested order:**
1. **DE**: confidence medium. It leads by a wide margin, the margin survives the bias discount, and one translation also covers AT and CH.
2. **FR**: medium. Second-largest in Europe, plus Belgium, Switzerland and Québec through the match d'impro tradition.
3. **ES**: low to medium. Spain is small in the data, but the Latin American scene is likely under-counted (unverified).
4. **IT**: low to medium. 54 groups, and it hosts AIN 2026.
5. **NL**: low. 55 groups plus Flanders, though Dutch improvisers likely use English widely (unverified).
6. **PT-BR**: low. Thin data, large speaker base (speaker counts not fetched, so unverified).
7. **SV**: low. 8 groups.

---

## Repo changes required (checklist)

- [ ] `src/languages.ts`: add languages to `SUPPORTED_LANGS` and `LANG_META`.
- [ ] `src/seo/config.ts`: `SITE_ORIGINS.de = 'https://www.improv-toolbox.com/de'`, SEO strings per language.
- [ ] `react-router.config.ts`: `basename` from env (for example `VITE_BASENAME`), `/` for EN/PL.
- [ ] `vite.config.ts`: `base` from the same env; `version.json` stays per build.
- [ ] `src/pwa/registerSW.ts`: use `BASE_URL` for `sw.js` and `version.json`.
- [ ] `src/root.tsx`: manifest href per language. Icons may stay root.
- [ ] `public/manifest.de.webmanifest` (and others): `id`/`scope`/`start_url` = `/de/`.
- [ ] `scripts/generate-sw.mjs`: run per output dir. Root SW denylists and ignores `/de/`, and each prefix gets its own `navigateFallback`.
- [ ] New `scripts/merge-lang-builds.mjs`: copy each language build into `build/client/{lang}/`, skipping `sounds/`.
- [ ] `package.json`: `build:de` and the combined EN-domain build command.
- [ ] `vercel.json`: per-prefix SPA rewrites, a catch-all that excludes prefixes, and cache headers for `/{lang}/sw.js`, `/{lang}/version.json` and `/{lang}/assets/`.
- [ ] `src/components/layout/HeaderControls.tsx`: basename-stripped path, and a picker for more than 2 languages.
- [ ] `src/i18n.ts`: lazy locale loading for native (`i18next-resources-to-backend` is a new dependency); the web stays single-locale.
- [ ] `src/native/lang.ts`: device-locale resolution already generic via `resolveSupportedLanguageTag`. Verify `pt-BR` handling, because base `pt` would match both.
- [ ] `src/locales/pl/translation.json`: remove the 111 slash forms. Add `_one/_few/_many/_other` where counts are interpolated.
- [ ] `src/locales/en/translation.json`: optionally split into namespaces (`ui`, `canon`, `comedy`, `facts`) so per-file context and labels work.
- [ ] `crowdin.yml`: add `languages_mapping` or `%locale%` for `pt-BR`. Add files if namespaces are split.
- [ ] `.github/workflows/crowdin.yml`: consider exporting only approved translations (option unverified).
- [ ] `ios/App/App/Info.plist`: `CFBundleLocalizations`. Add `*.lproj/InfoPlist.strings` for the display name. Update `knownRegions` in `ios/App/App.xcodeproj/project.pbxproj`.
- [ ] `docs/adr/`: new ADR, "new languages as path prefixes on improv-toolbox.com, one build per language", amending 0001.

## Open questions / unverified

- Vercel rewrite evaluation order is not documented, so avoid depending on it with the lookahead catch-all. Confirm on a preview deploy.
- The exact build layout with Vite `base` plus RR `basename` (assets dir, fallback location after merge) needs one test build.
- Workbox precache URL prefix for a sub-directory SW (`modifyURLPrefix` needed?).
- Crowdin paid prices and whether the OSS license would be granted, given the tip-jar and community criteria. Whether OSS covers AI spend.
- Whether `crowdin.yml` can auto-assign labels, and whether the GitHub Action can download approved-only strings.
- How iOS and the App Store use `CFBundleLocalizations` beyond Apple's one-line abstract.
- Google Trends and speaker-population data for the priority order. The app's own country analytics.
- Whether DE, NL and other scenes use English game names (glossary policy). Ask the native reviewers.
- Whether one Vercel project serves the EN domain and another the PL domain. Inferred from `build:en`/`build:pl`, not checked in the dashboard.

## Sources

- Crowdin AI: https://support.crowdin.com/crowdin-ai/
- Crowdin i18next JSON: https://store.crowdin.com/i18next-json
- Crowdin CLI context: https://crowdin.github.io/crowdin-cli/commands/crowdin-context, https://crowdin.github.io/crowdin-cli/commands/crowdin-context-download
- Crowdin QA checks: https://support.crowdin.com/project-settings/qa-checks/
- Crowdin glossary: https://support.crowdin.com/glossary/
- Crowdin screenshots: https://support.crowdin.com/screenshots/
- Crowdin In-Context: https://support.crowdin.com/in-context-localization/
- Crowdin roles: https://support.crowdin.com/roles/
- Crowdin configuration file: https://support.crowdin.com/developer/configuration-file/
- Crowdin pricing: https://crowdin.com/pricing
- Crowdin OSS request: https://crowdin.com/page/open-source-project-setup-request
- DeepL API translate: https://developers.deepl.com/docs/api-reference/translate
- Tolgee pricing / MT: https://tolgee.io/pricing, https://docs.tolgee.io/platform/translation_process/machine_translation
- Lokalise pricing: https://lokalise.com/pricing
- Phrase pricing: https://phrase.com/pricing/
- Android localization: https://developer.android.com/guide/topics/resources/localization
- Microsoft Style Guide: https://learn.microsoft.com/en-us/style-guide/global-communications/writing-tips
- Apple HIG Writing: https://developer.apple.com/design/human-interface-guidelines/writing
- React Router config: https://reactrouter.com/api/framework-conventions/react-router.config.ts
- React Router plugin source: https://github.com/remix-run/react-router/blob/main/packages/react-router-dev/vite/plugin.ts
- React Router pre-rendering: https://github.com/remix-run/react-router/blob/main/docs/how-to/pre-rendering.md
- Vercel vercel.json: https://vercel.com/docs/project-configuration/vercel-json
- Vercel rewrites: https://vercel.com/docs/routing/rewrites
- Google hreflang: https://developers.google.com/search/docs/specialty/international/localized-versions
- Google multi-regional: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- MDN manifest scope / id: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/scope, https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/id
- MDN SW register: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register
- workbox-build: https://developer.chrome.com/docs/workbox/modules/workbox-build
- i18next: https://www.i18next.com/how-to/add-or-load-translations, https://www.i18next.com/translation-function/context, https://www.i18next.com/misc/json-format
- CLDR plural rules: https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html
- Apple CFBundleLocalizations: https://developer.apple.com/documentation/bundleresources/information-property-list/cfbundlelocalizations
- App Store localizations: https://developer.apple.com/help/app-store-connect/reference/app-information/app-store-localizations
- improwiki groups: https://improwiki.com/en/list_of_improv_groups_worldwide
- ITI: https://impro.global/about-us/more-iti
- AIN: https://www.appliedimprovisationnetwork.org/about
- LNI: https://thecanadianencyclopedia.ca/en/article/ligue-nationale-dimprovisation
