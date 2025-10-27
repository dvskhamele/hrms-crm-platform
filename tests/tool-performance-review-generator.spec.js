// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Employee Performance Review Generator Tool', () => {
  test('should generate a performance review based on inputs', async ({ page }) => {
    const toolPath = path.join(__dirname, '..', 'tools', 'performance-review-generator', 'index.html');
    const toolUrl = `file://${toolPath}`;

    await page.goto(toolUrl);

    // Fill in inputs
    await page.fill('#employee-name', 'Alice Smith');
    await page.selectOption('#quality-of-work', 'exceeds');
    await page.selectOption('#communication', 'meets');
    await page.selectOption('#collaboration', 'needsImprovement');

    // Generate review
    await page.click('#generate-btn');

    // Assert generated review content
    const generatedReviewText = await page.locator('#generated-review').inputValue();
    expect(generatedReviewText).toContain('Alice Smith consistently delivers work of exceptional quality, often exceeding expectations.');
    expect(generatedReviewText).toContain('Alice Smith communicates effectively with their team and manager.');
    expect(generatedReviewText).toContain('Furthermore, alice smith would benefit from more actively participating in team discussions and offering support to colleagues.');

    // Test copy to clipboard button (visual change only, actual clipboard content cannot be asserted in Playwright without specific permissions/setup)
    const copyButton = page.locator('#copy-btn');
    await copyButton.click();
    await expect(copyButton).toHaveText('Copied!');
    // Wait for the text to revert (if implemented in script.js)
    await page.waitForTimeout(2500); // Give it time to revert
    await expect(copyButton).toHaveText('Copy to Clipboard');

    console.log('✓ Employee Performance Review Generator passed all test cases.');
  });
});
