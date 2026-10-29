import { expect, test } from '@playwright/test';
import { goTo } from './helpers';

test.describe('Community — find your stage', () => {
  test.beforeEach(async ({ page }) => {
    await goTo(page, '/community');
  });

  test('separates theaters, groups and schools', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Theaters/ })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('link', { name: /^Resort Komedii/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /^Klancyk/ })).toHaveCount(0);

    await page.getByRole('tab', { name: /Groups/ }).click();
    await expect(page.getByRole('region', { name: 'Poland' }).getByRole('link', { name: /^Klancyk/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /^Szkoła Impro Warszawa/ })).toHaveCount(0);

    await page.getByRole('tab', { name: /Schools/ }).click();
    await expect(page.getByRole('link', { name: /^Szkoła Impro Warszawa/ })).toBeVisible();
    // Theaters that also teach show up under Schools with a badge.
    await expect(page.getByRole('link', { name: /^Upright Citizens Brigade/ })).toContainText('Also a Theater');
  });

  test('filters by country and search', async ({ page }) => {
    await page.getByLabel('Country').selectOption('United Kingdom');
    await expect(page.getByRole('region')).toHaveCount(1);
    await expect(page.getByRole('link', { name: /^Hoopla/ })).toBeVisible();

    await page.getByLabel('Country').selectOption('');
    await page.getByRole('searchbox').fill('chicago');
    await expect(page.getByRole('listitem')).toHaveCount(4); // iO, Second City, Annoyance + Boom Chicago

    await page.getByRole('searchbox').fill('zzz');
    await expect(page.getByText('Nothing here yet')).toBeVisible();
  });

  test('sorts countries and places, search ignores diacritics', async ({ page }) => {
    await page.getByRole('tab', { name: /Schools/ }).click();
    // Polish cities sort alphabetically inside their country.
    const cities = await page.getByRole('region', { name: 'Poland' }).locator('li .text-sm').allTextContents();
    expect(cities).toEqual([...cities].sort((a, b) => a.localeCompare(b, 'en')));

    await page.getByRole('searchbox').fill('krakow');
    await expect(page.getByRole('link', { name: /^i.Eksploracje/ })).toBeVisible();
    // The country menu only offers countries that still have results.
    await expect(page.getByLabel('Country').locator('option')).toHaveCount(2);
  });

  test('links every place to the map', async ({ page }) => {
    const map = page.getByRole('link', { name: 'Show Resort Komedii on map' });
    await expect(map).toHaveAttribute('href', /google\.com\/maps\/search\/.*Resort%20Komedii/);
  });

  test('sends a new place straight to us', async ({ page }) => {
    const sent: string[] = [];
    await page.route('https://formspree.io/**', async (route) => {
      sent.push(route.request().postData() ?? '');
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
    });
    await page.getByRole('button', { name: 'Add a place' }).click();
    await page.getByRole('checkbox', { name: 'Theater' }).uncheck();
    await page.getByRole('checkbox', { name: 'Group' }).check();
    await page.getByLabel('Name', { exact: true }).fill('Impro Praha Test');
    await page.getByLabel('City', { exact: true }).fill('Prague');
    await page.locator('form').getByLabel('Country', { exact: true }).fill('Czechia');
    await page.getByLabel('Website').fill('example.org');
    await page.getByRole('button', { name: 'Send', exact: true }).click();

    // Without VITE_FORMSPREE_FORM_ID there is no endpoint: the form stays open with an error.
    if (sent.length === 0) {
      await expect(page.getByRole('alert')).toHaveText(/Couldn’t send/);
      await expect(page.getByLabel('Name', { exact: true })).toHaveValue('Impro Praha Test');
      return;
    }
    await expect(page.getByRole('status')).toHaveText(/sent for review/);
    await expect(page.locator('form')).toHaveCount(0);
    expect(sent[0]).toContain('Impro Praha Test');
    expect(sent[0]).toContain('https://example.org');
    expect(sent[0]).toContain('group');
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
