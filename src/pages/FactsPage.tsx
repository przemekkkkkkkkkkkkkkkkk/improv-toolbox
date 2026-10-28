import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useFacts } from '../hooks/useFacts';
import { usePrinciples } from '../hooks/usePrinciples';
import { PageContainer } from '../components/layout/PageContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Chip } from '../components/ui/Chip';
import { EmptyState } from '../components/ui/EmptyState';
import { IconArrowLeft, IconArrowRight, IconFacts } from '../components/icons';
import { GLOSSARY_TERMS } from '../data/glossary';
import { GENRE_CARDS } from '../data/genres';
import { GenreGlyph } from '../theme/genreIcons';
import type { FactCategory, GlossaryCategory, PrincipleCategory } from '../types';

const FACT_CATEGORIES: Array<{ value: FactCategory | 'all'; labelKey: string }> = [
  { value: 'all',       labelKey: 'facts.allCategories' },
  { value: 'history',   labelKey: 'facts.categories.history' },
  { value: 'technique', labelKey: 'facts.categories.technique' },
  { value: 'tips',      labelKey: 'facts.categories.tips' },
  { value: 'famous',    labelKey: 'facts.categories.famous' },
];

const GLOSS_CATEGORIES: Array<{ value: GlossaryCategory | 'all'; labelKey: string }> = [
  { value: 'all',        labelKey: 'glossary.allCategories' },
  { value: 'foundation', labelKey: 'glossary.categories.foundation' },
  { value: 'longform',   labelKey: 'glossary.categories.longform' },
  { value: 'editing',    labelKey: 'glossary.categories.editing' },
  { value: 'stagecraft', labelKey: 'glossary.categories.stagecraft' },
];

const PRINCIPLE_CATEGORIES: Array<{ value: PrincipleCategory | 'all'; labelKey: string }> = [
  { value: 'all',        labelKey: 'principles.allCategories' },
  { value: 'foundation', labelKey: 'principles.categories.foundation' },
  { value: 'character',  labelKey: 'principles.categories.character' },
  { value: 'status',     labelKey: 'principles.categories.status' },
  { value: 'editing',    labelKey: 'principles.categories.editing' },
  { value: 'ensemble',   labelKey: 'principles.categories.ensemble' },
  { value: 'stagecraft', labelKey: 'principles.categories.stagecraft' },
];

const SECTIONS = [
  { id: 'facts',      labelKey: 'facts.tabFacts' },
  { id: 'principles', labelKey: 'facts.tabPrinciples' },
  { id: 'genres',     labelKey: 'facts.tabGenres' },
  { id: 'glossary',   labelKey: 'facts.tabGlossary' },
] as const;

type Section = (typeof SECTIONS)[number]['id'];

export function FactsPage() {
  const { t } = useTranslation();
  const { currentFact, index, total, categoryFilter, next, prev, setFilter } = useFacts();
  const principles = usePrinciples();
  const [section, setSection] = useState<Section>('facts');
  const [genreId, setGenreId] = useState(GENRE_CARDS[0].id);
  const genre = GENRE_CARDS.find((g) => g.id === genreId) ?? GENRE_CARDS[0];
  const [glossSearch, setGlossSearch] = useState('');
  const [glossCat, setGlossCat] = useState<GlossaryCategory | 'all'>('all');


  const filteredGlossary = useMemo(() => {
    const q = glossSearch.toLowerCase();
    return GLOSSARY_TERMS
      .filter((term) => glossCat === 'all' || term.category === glossCat)
      .filter((term) => {
        if (!q) return true;
        const name = t(term.termKey).toLowerCase();
        const def = t(term.definitionKey).toLowerCase();
        return name.includes(q) || def.includes(q);
      })
      .sort((a, b) => t(a.termKey).localeCompare(t(b.termKey)));
  }, [glossSearch, glossCat, t]);

  return (
    <PageContainer feature="facts">
      <div>
        <PageHeader feature="facts" title={t('facts.title')} subtitle={t('facts.subtitle')} />

        {/* Section tab switcher */}
        <div className="flex gap-1 p-1 bg-surface-2 border border-line rounded-[var(--radius-md)] mb-5">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`flex-1 min-w-0 py-2 text-sm font-semibold rounded-[var(--radius-sm)] transition-colors cursor-pointer truncate ${
                section === s.id ? 'bg-surface text-ink shadow-[var(--shadow-card)]' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {t(s.labelKey)}
            </button>
          ))}
        </div>

        {section === 'facts' && (
          <>
            {/* Category filter */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {FACT_CATEGORIES.map((cat) => (
                <Chip key={cat.value} active={categoryFilter === cat.value} onClick={() => setFilter(cat.value)}>
                  {t(cat.labelKey)}
                </Chip>
              ))}
            </div>

            {/* Fact card */}
            <Card className="p-6 mb-4 animate-fade-slide-up" key={currentFact.id}>
              <div className="flex items-center gap-2 mb-4">
                <Badge color="feature">
                  {t(`facts.categories.${currentFact.category}`)}
                </Badge>
                <span className="text-xs text-ink-muted ml-auto tabular-nums">
                  {index + 1} / {total}
                </span>
              </div>

              <p className="text-ink leading-relaxed text-base text-pretty">
                {t(currentFact.textKey)}
              </p>

              {currentFact.sourceKey && (
                <p className="mt-4 pt-3 border-t border-line text-xs text-ink-muted italic">
                  {t(currentFact.sourceKey)}
                </p>
              )}
            </Card>

            {/* Navigation */}
            <div className="flex gap-3">
              <Button variant="secondary" size="md" onClick={prev} className="flex-1" disabled={total <= 1}>
                <IconArrowLeft size={16} />
                {t('facts.prevFact')}
              </Button>
              <Button size="md" onClick={next} className="flex-1" disabled={total <= 1}>
                {t('facts.nextFact')}
                <IconArrowRight size={16} />
              </Button>
            </div>
          </>
        )}

        {section === 'principles' && (
          <>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {PRINCIPLE_CATEGORIES.map((c) => (
                <Chip key={c.value} active={principles.categoryFilter === c.value} onClick={() => principles.setFilter(c.value)}>
                  {t(c.labelKey)}
                </Chip>
              ))}
            </div>

            <Card className="p-6 mb-4 animate-fade-slide-up" key={principles.current.id}>
              <div className="flex items-center gap-2 mb-4">
                <Badge color="feature">
                  {t(`principles.categories.${principles.current.category}`)}
                </Badge>
                <span className="text-xs text-ink-muted ml-auto tabular-nums">
                  {principles.index + 1} / {principles.total}
                </span>
              </div>
              <h2 className="font-display text-2xl font-semibold text-ink leading-tight text-balance">
                {t(principles.current.nameKey)}
              </h2>
              <p className="mt-3 text-ink leading-relaxed text-base text-pretty">{t(principles.current.textKey)}</p>
              {principles.current.exampleKey && (
                <p className="mt-4 pt-3 border-t border-line text-sm text-ink-muted italic leading-relaxed">
                  {t('principles.exampleLabel')}: {t(principles.current.exampleKey)}
                </p>
              )}
            </Card>

            <div className="flex gap-3">
              <Button variant="secondary" size="md" onClick={principles.prev} className="flex-1" disabled={principles.total <= 1}>
                <IconArrowLeft size={16} />
                {t('facts.prevFact')}
              </Button>
              <Button size="md" onClick={principles.next} className="flex-1" disabled={principles.total <= 1}>
                {t('facts.nextFact')}
                <IconArrowRight size={16} />
              </Button>
            </div>
          </>
        )}

        {section === 'genres' && (
          <>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {GENRE_CARDS.map((g) => (
                <Chip key={g.id} active={genreId === g.id} onClick={() => setGenreId(g.id)}>
                  {t(g.nameKey)}
                </Chip>
              ))}
            </div>

            <Card className="p-6 animate-fade-slide-up" key={genre.id}>
              <div className="flex items-center gap-3 mb-5">
                <span className="grid place-items-center w-12 h-12 rounded-[var(--radius-md)] bg-ink-fill text-brand-500 shrink-0">
                  <GenreGlyph id={genre.id} size={27} strokeWidth={2.4} />
                </span>
                <h2 className="font-display font-semibold text-ink text-[2rem] leading-none [font-variation-settings:'opsz'_72,'WONK'_1]">
                  {t(genre.nameKey)}
                </h2>
              </div>
              <p className="text-xs font-semibold text-[var(--feature-ink)] uppercase tracking-wider mb-4">
                {t('genres.tips')}
              </p>
              <ol className="space-y-3">
                {genre.tipKeys.map((tipKey, i) => (
                  <li key={tipKey} className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--feature-soft)] text-[var(--feature-ink)] flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <p className="text-sm text-ink leading-relaxed">{t(tipKey)}</p>
                  </li>
                ))}
              </ol>
            </Card>
          </>
        )}

        {section === 'glossary' && (
          <>
            {/* Search */}
            <input
              type="search"
              value={glossSearch}
              onChange={(e) => setGlossSearch(e.target.value)}
              placeholder={t('glossary.searchPlaceholder')}
              className="w-full px-4 py-2.5 rounded-[var(--radius-md)] border border-line text-sm text-ink outline-none focus:border-brand-400 focus-visible:ring-2 focus-visible:ring-brand-400 bg-surface mb-3"
            />

            {/* Category filter */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {GLOSS_CATEGORIES.map((c) => (
                <Chip key={c.value} active={glossCat === c.value} onClick={() => setGlossCat(c.value)}>
                  {t(c.labelKey)}
                </Chip>
              ))}
            </div>

            {/* Term count */}
            <p className="text-xs text-ink-muted mb-3 tabular-nums">
              {filteredGlossary.length} / {GLOSSARY_TERMS.length}
            </p>

            {/* Term list */}
            <div className="space-y-2">
              {filteredGlossary.length === 0 && (
                <EmptyState Icon={IconFacts} title={t('glossary.noResults')} />
              )}
              {filteredGlossary.map((term) => (
                <div key={term.id} className="bg-surface rounded-[var(--radius-lg)] border border-line px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-ink text-sm">{t(term.termKey)}</span>
                    <span className="ml-auto shrink-0">
                      <Badge color="feature" className="text-[10px]">
                        {t(`glossary.categories.${term.category}`)}
                      </Badge>
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed text-pretty">{t(term.definitionKey)}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
}
