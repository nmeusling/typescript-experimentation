import { test, expect } from 'playwright/test';
[
    { firstName: 'Test', lastName: 'Tester', email: "test@tester.com", gender: "Male", mobile: "1231231234" },
    { firstName: 'Test', lastName: 'Female', email: "testfemale@tester.com", gender: "Female", mobile: "1231231235" },
    { firstName: 'Test', lastName: 'Other', email: "testother@tester.com", gender: "Other", mobile: "1231231236" },
    { firstName: 'Test', lastName: 'Hobbies', email: "testother@tester.com", gender: "Other", hobbies: ["Sports", "Reading"], mobile: "1231231236" },
    { firstName: 'Hello', lastName: 'World', gender: "Male", mobile: "1231231234" },
].forEach(({ firstName, lastName, email, gender, hobbies, mobile }) => {

    test(`create user - ${firstName} ${lastName}`, async ({ page }) => {
        await page.goto("https://demoqa.com/automation-practice-form");
        await expect(page.getByRole("heading", { name: "Practice form" })).toBeVisible();
        await page.getByRole("textbox", { name: "First Name" }).fill(firstName);
        await page.getByRole("textbox", { name: "Last Name" }).fill(lastName);
        if (email) {
            await page.getByRole("textbox", { name: "name@example.com" }).fill(email);
        }
        await page.getByText('MaleFemaleOther').getByText(gender, { exact: true }).click();
        await page.getByRole('textbox', { name: 'Mobile Number' }).fill(mobile);
        await page.getByRole("button", { name: "submit" }).click();
        const submissionForm = page.getByRole("dialog", { name: "Thanks for submitting the form" });
        await expect(submissionForm).toBeVisible();
        await expect(submissionForm.getByRole("row", { name: "Student Name" })).toContainText(`${firstName} ${lastName}`)
        await expect(submissionForm.getByRole("row", { name: "Gender" })).toContainText(gender);
        await expect(submissionForm.getByRole("row", { name: "Mobile" })).toContainText(mobile);
        if (email) {
            await expect(submissionForm.getByRole("row", { name: "Student Email" })).toContainText(email);
        }
        // Birthday locator('#dateOfBirthInput')
        //subjects locator('.subjects-auto-complete__value-container')
        // hobbies getByText('SportsReadingMusic')
        //address getByRole('textbox', { name: 'Current Address' })
    })
})