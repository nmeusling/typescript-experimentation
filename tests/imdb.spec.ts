import { test, expect } from '@playwright/test';

test('has sign in', async ({ page }) => {
    await page.goto('https://imdb.com');
    await expect(page.getByRole("link", { name: 'Sign in' }).first()).toBeVisible();
    await page.getByRole("link", { name: 'Sign in' }).first().click()
    await expect(page).toHaveTitle("Sign in")
    await expect(page.getByText("Create an account")).toBeVisible()
    await page.getByText("Create an account").click()
    await expect(page).toHaveTitle(/Amazon/)
});