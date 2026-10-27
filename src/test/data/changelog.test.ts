import { beforeEach, describe, expect, it } from 'vitest';
import pkg from '../../../package.json';
import { CHANGELOG } from '../../data/changelog';
import { SUPPORTED_LANGS } from '../../languages';
import { hasUnseenUpdate, markSeen } from '../../pwa/whatsNew';

describe('changelog', () => {
  it('has an entry for the current package.json version, newest first', () => {
    expect(CHANGELOG[0].version).toBe(pkg.version);
  });

  it('has unique versions with copy in every language', () => {
    expect(new Set(CHANGELOG.map((r) => r.version)).size).toBe(CHANGELOG.length);
    for (const release of CHANGELOG) {
      expect(release.changes.length).toBeGreaterThan(0);
      for (const change of release.changes) {
        for (const lang of SUPPORTED_LANGS) expect(change[lang].trim()).not.toBe('');
      }
    }
  });
});

describe('whatsNew store', () => {
  beforeEach(() => localStorage.clear());

  it('treats a first-ever visit as seen (no "Updated" toast for new users)', () => {
    expect(hasUnseenUpdate()).toBe(false);
    expect(localStorage.getItem('lastSeenVersion')).toBe(__APP_VERSION__);
  });

  it('flags returning users on an older version until they acknowledge', () => {
    localStorage.setItem('lastSeenVersion', '0.9.0');
    expect(hasUnseenUpdate()).toBe(true);
    markSeen();
    expect(hasUnseenUpdate()).toBe(false);
  });
});
