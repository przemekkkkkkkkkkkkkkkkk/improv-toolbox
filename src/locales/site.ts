import en from './en/translation.json';
import pl from './pl/translation.json';

// The Site build's one language. VITE_BUILD_LANG is statically replaced, so the
// ternary folds and the other locale is tree-shaken out (mirrors BUILD_LANG,
// which defaults to Polish). The native build imports both locales directly.
const SITE_TRANSLATION = import.meta.env.VITE_BUILD_LANG === 'en' ? en : pl;

export default SITE_TRANSLATION;
