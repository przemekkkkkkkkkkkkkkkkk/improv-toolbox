// "Has the user seen this version's release notes?" — one tiny store shared
// by the toast, the More-tab dot and the More/changelog pages.
import { useSyncExternalStore } from 'react';
import { useTranslation } from 'react-i18next';
import { resolveSupportedLang, type Lang } from '../languages';

const KEY = 'lastSeenVersion';
const listeners = new Set<() => void>();

function read(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return __APP_VERSION__; // storage blocked: never nag
  }
}

/**
 * True when the user ran an older version before and hasn't acknowledged this
 * one. A first-ever visit is NOT an update: it records the current version
 * silently so brand-new users don't get an "Updated to…" toast.
 */
export function hasUnseenUpdate(): boolean {
  const seen = read();
  if (seen === null) {
    // Plain write, no notify: this runs inside a useSyncExternalStore snapshot.
    try {
      localStorage.setItem(KEY, __APP_VERSION__);
    } catch {
      /* storage blocked */
    }
    return false;
  }
  return seen !== __APP_VERSION__;
}

export function markSeen(): void {
  try {
    localStorage.setItem(KEY, __APP_VERSION__);
  } catch {
    /* storage blocked */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => void listeners.delete(listener);
}

export function useUnseenUpdate(): boolean {
  return useSyncExternalStore(subscribe, hasUnseenUpdate, () => false);
}

export function useLang(): Lang {
  const { i18n } = useTranslation();
  return resolveSupportedLang(i18n.language, 'en');
}
