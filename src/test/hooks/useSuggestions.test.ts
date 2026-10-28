import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useSuggestions } from '../../hooks/useSuggestions';
import { SUGGESTIONS } from '../../data/suggestions';
import type { SuggestionCategory } from '../../types';

const SINGLE_CATEGORIES: SuggestionCategory[] = [
  'location', 'occupation', 'relationship', 'emotion', 'movie_title', 'word', 'first_line', 'what_not_to_say',
];

describe('useSuggestions', () => {
  describe('initial state', () => {
    it('starts with "location" category', () => {
      const { result } = renderHook(() => useSuggestions());
      expect(result.current.category).toBe('location');
    });

    it('initial suggestion is from the location pool', () => {
      const { result } = renderHook(() => useSuggestions());
      expect(result.current.current.category).toBe('location');
    });

  });

  describe('changeCategory', () => {
    it('updates category state', () => {
      const { result } = renderHook(() => useSuggestions());
      act(() => result.current.changeCategory('occupation'));
      expect(result.current.category).toBe('occupation');
    });

    it('immediately picks from the new category', () => {
      const { result } = renderHook(() => useSuggestions());
      SINGLE_CATEGORIES.forEach((cat) => {
        act(() => result.current.changeCategory(cat));
        expect(result.current.current.category).toBe(cat);
      });
    });
  });

  describe('pickRandom – single category', () => {
    it('selects a suggestion from the current category', () => {
      const { result } = renderHook(() => useSuggestions());
      act(() => result.current.changeCategory('emotion'));
      act(() => result.current.pickRandom());
      expect(result.current.current.category).toBe('emotion');
    });

    it('suggestion id is from the SUGGESTIONS pool', () => {
      const { result } = renderHook(() => useSuggestions());
      act(() => result.current.pickRandom());
      const ids = SUGGESTIONS.filter((s) => s.category === 'location').map((s) => s.id);
      expect(ids).toContain(result.current.current.id);
    });
  });
});
