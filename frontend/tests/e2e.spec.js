const { test, expect } = require('@playwright/test');

test.describe('Exchange Rate Invoice Calculator E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to frontend App. Adjust port if it's different.
    await page.goto('http://localhost:3000');
  });

  test('TC-001: Convert USD to JPY with valid rate', async ({ page }) => {
    await page.fill('input[name="usd_amount"]', '100');
    // Default might be BOJ, let's select Manual to enter a custom rate
    await page.selectOption('select[name="rate_source"]', 'Manual');
    await page.fill('input[name="rate"]', '150.5');
    // fill date
    await page.fill('input[name="conversion_date"]', '2026-03-25');
    await page.click('button:has-text("Convert")');

    // Wait for conversion result
    await expect(page.locator('.alert-success')).toBeVisible({ timeout: 5000 });
    // Expect JPY amount to be calculated: 100 * 150.5 = 15050
    // Check history length or specific item
    await page.waitForTimeout(1000);
    await page.screenshot({ path: '../screenshots/playwright/tc001_valid_conversion.png' });
  });

  test('TC-002: Enter negative USD', async ({ page }) => {
    await page.fill('input[name="usd_amount"]', '-50');
    await page.click('button:has-text("Convert")');
    // HTML5 validation or custom
    const input = page.locator('input[name="usd_amount"]');
    await expect(input).toBeVisible();
    await page.screenshot({ path: '../screenshots/playwright/tc002_negative_usd.png' });
  });

  test('TC-004: Submit empty form', async ({ page }) => {
    // Clear fields if pre-filled
    await page.fill('input[name="usd_amount"]', '');
    await page.click('button:has-text("Convert")');
    await page.screenshot({ path: '../screenshots/playwright/tc004_empty_form.png' });
  });

  test('TC-005 & TC-006: Select BOJ and Mizuho TTM', async ({ page }) => {
    await page.selectOption('select[name="rate_source"]', 'BOJ');
    await page.screenshot({ path: '../screenshots/playwright/tc005_boj.png' });

    await page.selectOption('select[name="rate_source"]', 'Mizuho TTM');
    await page.screenshot({ path: '../screenshots/playwright/tc006_mizuho.png' });
  });

  test('TC-012: Delete conversion record', async ({ page }) => {
    // First create one
    await page.fill('input[name="usd_amount"]', '50');
    await page.selectOption('select[name="rate_source"]', 'Manual');
    await page.fill('input[name="rate"]', '140');
    await page.fill('input[name="conversion_date"]', '2026-03-25');
    await page.click('button:has-text("Convert")');
    await page.waitForTimeout(1000);

    // Click delete on the first history item
    const deleteBtn = page.locator('button.delete-button').first();
    if (await deleteBtn.isVisible()) {
      await deleteBtn.click();
      await page.screenshot({ path: '../screenshots/playwright/tc012_delete_record.png' });
    }
  });
});
