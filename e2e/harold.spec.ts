import { test, expect } from '@playwright/test';
import { goTo } from './helpers';

test.describe('Harold Format Page', () => {
  test.beforeEach(async ({ page }) => {
    await goTo(page, '/harold');
  });

  test('shows Harold-related content', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Harold/i })).toBeVisible();
  });

  test('renders multiple sections of Harold info', async ({ page }) => {
    const sections = page.locator('p[class*="uppercase tracking-wider"]');
    expect(await sections.count()).toBeGreaterThanOrEqual(2);
  });

  test('Harold content has meaningful text', async ({ page }) => {
    const text = page.locator('p').filter({ hasText: /\w{5,}/ }).first();
    await expect(text).toBeVisible();
  });
});
