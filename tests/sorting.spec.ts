import { test, expect } from '@playwright/test';

test('products sort by price low to high', async ({ page }) => {
  // 1. Login first
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // 2. Click sort dropdown and select "Price (low to high)"
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  // 3. Get the first product price
  const firstPrice = await page.locator('.inventory_item_price').first().textContent();

  // 4. Check it's the cheapest one ($7.99)
  expect(firstPrice).toBe('$7.99');
});