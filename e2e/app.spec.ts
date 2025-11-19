import { test, expect } from '@playwright/test';

test.describe('Dashboard App E2E Journey', () => {
  
  test('Complete dashboard navigation and interaction flow', async ({ page }) => {
    // Step 1: Load home page
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Verify home page loaded with Overview heading
    await expect(page.locator('h2:has-text("Overview")')).toBeVisible();
    
    // Step 2: Verify stats cards are visible
    await expect(page.locator('text=Total Revenue')).toBeVisible();
    await expect(page.locator('text=Subscriptions')).toBeVisible();
    await expect(page.locator('text=Sales')).toBeVisible();
    await expect(page.locator('text=Active Now')).toBeVisible();
    
    // Wait for visual stability
    await page.waitForTimeout(1000);
    
    // Step 3: Verify recent deployments section
    await expect(page.locator('text=Recent Deployments')).toBeVisible();
    await expect(page.locator('text=acme-web')).toBeVisible();
    
    await page.waitForTimeout(1000);
    
    // Step 4: Navigate to Projects page
    await page.click('text=Projects');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('http://localhost:3000/projects');
    
    // Verify projects page content
    await expect(page.locator('h2:has-text("Projects")')).toBeVisible();
    
    await page.waitForTimeout(1000);
    
    // Step 5: Navigate to Analytics page
    await page.click('text=Analytics');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('http://localhost:3000/analytics');
    
    // Verify analytics page with charts
    await expect(page.locator('h2:has-text("Analytics")')).toBeVisible();
    
    await page.waitForTimeout(1500);
    
    // Step 6: Navigate to Settings page
    await page.click('text=Settings');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('http://localhost:3000/settings');
    
    await expect(page.locator('text=Profile')).toBeVisible();
    
    await page.waitForTimeout(1000);
    
    // Step 7: Return to home
    await page.click('text=Overview');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('http://localhost:3000/');
    
    await page.waitForTimeout(1000);
    
    // Step 8: Toggle theme
    const themeButton = page.locator('button:has([class*="lucide"])').first();
    await themeButton.click();
    
    await page.waitForTimeout(1000);
    
    // Step 9: Interact with search
    await page.click('input[type="search"]');
    await page.fill('input[type="search"]', 'test search');
    
    await page.waitForTimeout(1000);
    
    // Final wait for video capture
    await page.waitForTimeout(2000);
  });
});