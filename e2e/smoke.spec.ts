import { test, expect } from '@playwright/test';

test('homepage loads and shows Overview heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h2:has-text("Overview")')).toBeVisible();
});
