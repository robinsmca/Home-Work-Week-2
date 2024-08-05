import { test, expect } from '@playwright/test';

test('Scenario1-Checkout Two Items', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle(/Swag Lab/);
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  //await page.getByRole('button', { name: 'Login' });
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page
    .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
    .click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('ROB');
  await page.locator('[data-test="lastName"]').fill('B');
  await page.locator('[data-test="postalCode"]').fill('3026');
  await page.locator('form').click();
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
});

test('Scenario2-Remove from checkout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('ROB');
  await page.locator('[data-test="lastName"]').fill('B');
  await page.locator('[data-test="postalCode"]').fill('3026');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="cancel"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
});

test('Scenario3-Cancel chekout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  // await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('ROB');
  await page.locator('[data-test="lastName"]').fill('B');
  await page.locator('[data-test="postalCode"]').fill('3026');
  await page.locator('[data-test="postalCode"]').press('Tab');
  const firstNameValue = page.locator('[data-test="firstName"]');
  const lastNameValue = page.locator('[data-test="lastName"]');
  const postalCodeValue = page.locator('[data-test="postalCode"]');
  await expect(firstNameValue).toHaveValue('ROB');
  await expect(lastNameValue).toHaveValue('B');
  await expect(postalCodeValue).toHaveValue('3026');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="cancel"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
});

test('Scenario4-Add more items in checkout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').press('Tab');
  await page.locator('[data-test="login-button"]').press('Shift+Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page
    .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
    .click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="continue-shopping"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page
    .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
    .click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('RB');
  await page.locator('[data-test="firstName"]').press('Tab');
  await page.locator('[data-test="lastName"]').fill('B');
  await page.locator('[data-test="lastName"]').press('Tab');
  await page.locator('[data-test="postalCode"]').fill('3026');
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('ROB');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
});

test('Scenario5-Cannot checkout without complete information', async ({
  page,
}) => {
  await page.goto('https://www.saucedemo.com/');
  await page
    .locator('[data-test="login-container"] div')
    .filter({ hasText: 'Login' })
    .first()
    .click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page
    .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
    .click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="continue"]').click();
});
