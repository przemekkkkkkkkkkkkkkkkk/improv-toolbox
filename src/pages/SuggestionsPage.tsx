import { useTranslation } from 'react-i18next';
import { useSuggestions } from '../hooks/useSuggestions';
import type { SuggestionCategory } from '../types';
import { DrawStage } from '../components/layout/DrawStage';
import { Chip } from '../components/ui/Chip';
import { IconShuffle } from '../components/icons';

const CATEGORIES: SuggestionCategory[] = [
  'location', 'occupation', 'relationship', 'emotion',
  'movie_title', 'word', 'first_line', 'what_not_to_say',
];

export function SuggestionsPage() {
  const { t } = useTranslation();
  const { current, category, pickRandom, changeCategory } = useSuggestions();

  return (
    <DrawStage
      feature="suggestions"
      title={t('suggestions.title')}
      itemKey={current.textKey}
      stampLabel={t(`suggestions.categories.${category}`)}
      onDraw={pickRandom}
      drawLabel={t('suggestions.next')}
      drawIcon={<IconShuffle size={20} />}
      filters={CATEGORIES.map((cat) => (
        <Chip key={cat} active={category === cat} onClick={() => changeCategory(cat)} className="shrink-0">
          {t(`suggestions.categories.${cat}`)}
        </Chip>
      ))}
    >
      {t(current.textKey)}
    </DrawStage>
  );
}
