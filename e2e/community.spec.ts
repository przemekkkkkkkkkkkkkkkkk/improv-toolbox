import { expect, test } from '@playwright/test';
import { goTo } from './helpers';

test.describe('Community — find your stage', () => {
  test.beforeEach(async ({ page }) => {
    await goTo(page, '/community');
  });

  test('separates theaters, groups and schools', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Theaters/ })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('link', { name: /Resort Komedii/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Klancyk/ })).toHaveCount(0);

    await page.getByRole('tab', { name: /Groups/ }).click();
    await expect(page.getByRole('region', { name: 'Poland' }).getByRole('link', { name: /Klancyk/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Szkoła Impro/ })).toHaveCount(0);

    await page.getByRole('tab', { name: /Schools/ }).click();
    await expect(page.getByRole('link', { name: /Szkoła Impro/ })).toBeVisible();
    // Theaters that also teach show up under Schools with a badge.
    await expect(page.getByRole('link', { name: /Upright Citizens Brigade/ })).toContainText('Also a Theater');
  });

  test('filters by country and search', async ({ page }) => {
    await page.getByLabel('Country').selectOption('United Kingdom');
    await expect(page.getByRole('region')).toHaveCount(1);
    await expect(page.getByRole('link', { name: /Hoopla/ })).toBeVisible();

    await page.getByLabel('Country').selectOption('');
    await page.getByRole('searchbox').fill('chicago');
    await expect(page.getByRole('listitem')).toHaveCount(4); // iO, Second City, Annoyance + Boom Chicago

    await page.getByRole('searchbox').fill('zzz');
    await expect(page.getByText('Nothing here yet')).toBeVisible();
  });

  test('adds, keeps and removes a place of your own', async ({ page }) => {
    await page.getByRole('button', { name: '+ Add' }).click();
    await page.getByLabel('Suggest it for everyone').uncheck();
    await page.getByLabel('Theater').uncheck();
    await page.getByLabel('Group').check();
    await page.getByLabel('Name', { exact: true }).fill('Impro Lisboa Test');
    await page.getByLabel('City', { exact: true }).fill('Lisbon');
    await page.locator('form').getByLabel('Country', { exact: true }).fill('Portugal');
    await page.getByLabel('Website').fill('example.com');
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    await expect(page.getByRole('tab', { name: /Groups/ })).toHaveAttribute('aria-selected', 'true');
    const link = page.getByRole('region', { name: 'Portugal' }).getByRole('link', { name: /Impro Lisboa Test/ });
    await expect(link).toHaveAttribute('href', 'https://example.com');
    await expect(link).toContainText('Added by you');
    await expect(page.getByRole('status')).toHaveText('Added to your list.');

    await page.reload();
    await page.getByRole('tab', { name: /Groups/ }).click();
    await expect(link).toBeVisible();

    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.getByRole('region', { name: 'Portugal' })).toHaveCount(0);
  });

  test('suggests a place for everyone via the contact backend', async ({ page }) => {
    const sent: string[] = [];
    await page.route('https://formspree.io/**', async (route) => {
      sent.push(route.request().postData() ?? '');
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    });
    await page.getByRole('button', { name: 'Add a place' }).click(); // bottom card opens the same form
    await page.getByLabel('Name', { exact: true }).fill('Impro Praha Test');
    await page.getByLabel('City', { exact: true }).fill('Prague');
    await page.locator('form').getByLabel('Country', { exact: true }).fill('Czechia');
    await page.getByLabel('Website').fill('example.org');
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const status = page.getByRole('status');
    await expect(status).toHaveText(/sent for review|Couldn’t send/);
    // Without VITE_FORMSPREE_FORM_ID there is no endpoint: the place is still saved locally.
    test.skip(sent.length === 0, 'VITE_FORMSPREE_FORM_ID not configured in this environment');
    await expect(status).toHaveText(/sent for review/);
    expect(sent[0]).toContain('Impro Praha Test');
    expect(sent[0]).toContain('https://example.org');
  });

  test('has its own bottom-nav tab and is not a More tool', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await goTo(page, '/wheel');
    await page.getByRole('button', { name: 'Community' }).click();
    await expect(page).toHaveURL(/\/community$/);
    await expect(page.getByRole('heading', { name: 'Find your stage' })).toBeVisible();
    await goTo(page, '/more');
    await expect(page.locator('[data-tool-name="community"]')).toHaveCount(0);
  });
});
