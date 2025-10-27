// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('UK Redundancy Pay Calculator Tool', () => {
  test('should calculate statutory redundancy pay correctly', async ({ page }) => {
    // Path to the index.html file of the tool
    const toolPath = path.join(__dirname, '..', 'tools', 'uk-redundancy-pay-calculator', 'index.html');
    const toolUrl = `file://${toolPath}`;
    console.log(`Attempting to navigate to: ${toolUrl}`);

    // Navigate to the local HTML file
    await page.goto(toolUrl);
    console.log(`Successfully navigated to: ${toolUrl}`);

    // 1. Test Case: Standard calculation
    await page.fill('#age', '45');
    await page.fill('#years-service', '10');
    await page.fill('#weekly-pay', '500');
    await page.click('#calculate-btn');

    // Calculation: (5 years at 1.5 weeks) + (5 years at 1.0 week) = 7.5 + 5 = 12.5 weeks
    // 12.5 weeks * £500/week = £6250
    await expect(page.locator('#redundancy-pay-result')).toHaveText('6250.00');

    // 2. Test Case: With weekly pay cap
    await page.fill('#age', '50');
    await page.fill('#years-service', '12');
    await page.fill('#weekly-pay', '800'); // Exceeds cap
    await page.click('#calculate-btn');

    // Calculation: (10 years at 1.5 weeks) + (2 years at 1.0 week) = 15 + 2 = 17 weeks
    // 17 weeks * £700/week (capped) = £11900
    await expect(page.locator('#redundancy-pay-result')).toHaveText('11900.00');

    // 3. Test Case: Under 2 years of service (ineligible)
    await page.fill('#age', '30');
    await page.fill('#years-service', '1');
    await page.fill('#weekly-pay', '400');

    // Set up dialog listener BEFORE clicking the button that triggers it
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('at least 2 years of continuous service');
      await dialog.dismiss();
    });

    await page.click('#calculate-btn');
    await expect(page.locator('#redundancy-pay-result')).toHaveText('0.00');

    console.log('✓ UK Redundancy Pay Calculator passed all test cases.');
  });
});
