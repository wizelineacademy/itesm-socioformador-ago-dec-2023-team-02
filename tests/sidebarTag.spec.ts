import { test, expect } from '@playwright/test';

test.describe('sidebar tag', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await page.getByRole('button', { name: 'Get Started' }).click();
        await page.getByLabel('Email address').fill('prueba@gmail.com');
        await page.getByLabel('Password').fill('Holamundo:1');
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.getByRole('button', { name: 'Get Started' }).click();
        await page.goto('http://localhost:3000/conversation/new');
    });
    

    test('Create tag', async ({ page }) => {
        await page.locator('#tag-search').click();
        await page.getByRole('button', { name: 'Edit tags' }).click();
        await page.getByRole('button', { name: 'New tag +' }).click();
        await page.locator('#tag-name').fill('test');
        await page.locator('div:nth-child(2) > div > div:nth-child(3) > div').click();
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.getByText('test', { exact: true })).toBeVisible({timeout: 120000});
        await page.getByRole('button', { name: 'Close' }).click();
    });


    test('Edit tag', async ({ page }) => {
        await page.locator('#tag-search').click();
        await page.getByRole('button', { name: 'Edit tags' }).click();
        await page.getByRole('button', { name: 'test' }).nth(1).click();
        await page.locator('#tag-name').fill('test tag');
        await page.locator('.hue-horizontal').click();
        await page.locator('.slider-picker > div:nth-child(2) > div > div:nth-child(2) > div').click();
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.getByText('test tag', { exact: true })).toBeVisible({timeout: 120000});
        await page.getByRole('button', { name: 'Close' }).click();
    });


    test('Search tag', async ({ page }) => {
        await page.locator('#tag-search').click();
        await page.getByPlaceholder('Search tags').fill('tag');
        await expect(page.getByText('test tag', { exact: true })).toBeVisible({timeout: 120000});
        await page.getByPlaceholder('Search tags').fill('random');
        await expect(page.getByText('No tags to display')).toContainText('No tags to display');
        await page.getByRole('button', { name: 'Close' }).click();
    });


    test('Search by tag', async({page})=>{
        await page.getByRole('button', { name: 'New Chat' }).click();
        await page.getByPlaceholder('Chat name').fill('tag test');
        await page.getByLabel('Select a Model', { exact: true }).click();
        await page.getByLabel('GPT-3.5-TURBO2 Tokens').getByText('GPT-3.5-TURBO').click();
        await page.getByRole('button', { name: 'Create' }).click();
        await page.locator('#tag-search').click();
        await page.getByRole('button', { name: 'test tag' }).click();
        await page.getByRole('button', { name: 'Close' }).click();
        await expect(page.locator('#no-items')).toContainText('No items to display');
        await page.locator('#tag-search').click();
        await page.getByRole('button', { name: 'test tag' }).click();
        await page.getByRole('button', { name: 'Close' }).click();
        await page.locator('#edit-chat').click();
        await page.getByText('Edit Tags').click();
        await page.getByRole('button', { name: 'test tag' }).click();
        await page.getByRole('button', { name: 'Close' }).click();
        await page.locator('#tag-search').click();
        await page.getByRole('button', { name: 'test tag' }).click();
        await page.getByRole('button', { name: 'Close' }).click();
        await expect(page.getByRole('button', { name: 'avatar tag test' })).toBeVisible();
        await page.locator('#edit-chat').click();
        await page.getByText('Delete').click();
        await page.getByRole('button', { name: 'Confirm' }).click();
    })


    test('Delete tag', async ({ page }) => {
        await page.locator('#tag-search').click();
        await page.getByRole('button', { name: 'Edit tags' }).click();
        await page.getByRole('button', { name: 'test tag' }).nth(1).click();
        await page.locator('div').filter({ hasText: /^Edit tag$/ }).getByRole('button').click();
        await page.getByRole('button', { name: 'Close' }).click();
    });

});