import { test, expect } from '@playwright/test';

[
    { username: 'test', password: '1234', expectedMessage: 'Your username is invalid' },
    { username: 'tomsmith', password: '1234', expectedMessage: 'Your password is invalid' },
    { username: '', password: '', expectedMessage: 'Your username is invalid' },
    { username: '', password: '1234', expectedMessage: 'Your username is invalid' },
    { username: 'test', password: '', expectedMessage: 'Your username is invalid' },
    { username: 'tomsmith', password: '', expectedMessage: 'Your password is invalid' },
].forEach(({ username, password, expectedMessage }) => {
    test(`invalid login - user: ${username}, password: ${password}`, async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.getByLabel("Username").fill(username);
        await page.getByLabel("Password").fill(password);
        await page.getByRole("button", { name: "Login" }).click();
        await expect(page.getByText(expectedMessage)).toBeVisible();
    });
});

test('valid login', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByLabel("Username").fill("tomsmith");
    await page.getByLabel("Password").fill("SuperSecretPassword!");
    await page.getByRole("button", { "name": "Login" }).click();
    await expect(page.getByRole("heading", { name: "Secure area" }).first()).toBeVisible();
});

test.describe(() => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.getByLabel("Username").fill("tomsmith");
        await page.getByLabel("Password").fill("SuperSecretPassword!");
        await page.getByRole("button", { "name": "Login" }).click();
    })
    test('can logout', async ({ page }) => {
        await (page.getByRole("link", { name: "Logout" })).click();
        await expect(page.getByText("You logged out of the secure area!")).toBeVisible();
        await expect(page.getByRole("heading", { name: "Login Page" })).toBeVisible();
    });
})