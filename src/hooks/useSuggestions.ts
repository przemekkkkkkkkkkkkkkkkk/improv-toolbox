import { useState, useMemo, useCallback } from 'react';
import { SUGGESTIONS } from '../data/suggestions';
import type { Suggestion, SuggestionCategory } from '../types';
import { useRandomBag } from './useRandomBag';

export function useSuggestions() {
  const [category, setCategory] = useState<SuggestionCategory>('location');
  const pool = useMemo(() => SUGGESTIONS.filter((s) => s.category === category), [category]);
  // The bag reshuffles itself whenever the pool (category) changes.
  const { current, draw } = useRandomBag<Suggestion>(pool);

  const pickRandom = useCallback(() => {
    draw();
  }, [draw]);

  const changeCategory = useCallback((cat: SuggestionCategory) => {
    setCategory(cat);
  }, []);

  return { current, category, pickRandom, changeCategory };
}
