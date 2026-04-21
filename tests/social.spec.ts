import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
});

test('twitter icon exists and is visible', async ({ page }) => {
  const twitter = page.locator('[data-test="social-twitter"]');
  await expect(twitter).toBeVisible();
});

test('facebook icon exists and is visible', async ({ page }) => {
  const facebook = page.locator('[data-test="social-facebook"]');
  await expect(facebook).toBeVisible();
});

test('linkedin icon exists and is visible', async ({ page }) => {
  const linkedin = page.locator('[data-test="social-linkedin"]');
  await expect(linkedin).toBeVisible();
});

test('twitter link goes to correct URL', async ({ page, context }) => {
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('[data-test="social-twitter"]').click()
  ]);
  await expect(newPage).toHaveURL(/twitter|x\.com/);
});

test('facebook link goes to correct URL', async ({ page, context }) => {
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('[data-test="social-facebook"]').click()
  ]);
  await expect(newPage).toHaveURL(/facebook/);
});

test('linkedin link goes to correct URL', async ({ page, context }) => {
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('[data-test="social-linkedin"]').click()
  ]);
  await expect(newPage).toHaveURL(/linkedin/);
});