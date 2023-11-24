import { test, expect } from '@playwright/test';

test.describe('Sidebar conversations', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await page.getByRole('button', { name: 'Get Started' }).click();
        await page.getByLabel('Email address').fill('prueba@gmail.com');
        await page.getByLabel('Password').fill('Holamundo:1');
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.getByRole('button', { name: 'Get Started' }).click();
        await page.goto('http://localhost:3000/conversation/new');
    });

    test('Search and rename conversation', async({page})=>{
      await page.getByRole('button', { name: 'New Chat' }).click();
      await page.getByPlaceholder('Chat name').fill('search test');
      await page.getByLabel('Select a Model', { exact: true }).click();
      await page.getByLabel('GPT-3.5-TURBO2 Tokens').getByText('GPT-3.5-TURBO').click();
      await page.getByRole('button', { name: 'Create' }).click(); 
      await page.getByPlaceholder('Search Chat').fill('random');
      await expect(page.locator('#no-items')).toContainText('No items to display');
      await page.locator('.p-2').first().click();
      await page.getByPlaceholder('Search Chat').fill('test');
      await expect(page.getByRole('button', { name: 'avatar search test' })).toBeVisible();
      await page.locator('#edit-chat').click();
      await page.getByText('Rename').click();
      await page.locator('#edit-name').fill('hello world');
      await page.getByRole('button', { name: 'avatar' }).getByRole('button').first().click();
      await page.getByPlaceholder('Search Chat').fill('test');
      await expect(page.locator('#no-items')).toContainText('No items to display');
      await page.locator('.p-2').first().click();
      await page.getByPlaceholder('Search Chat').fill('world');
      await expect(page.getByRole('button', { name: 'avatar hello world' })).toBeVisible();

      
      await page.locator('[id="edit-chat"]').click();
      await page.getByText('Delete').click();
      await page.getByRole('button', { name: 'Confirm' }).click();
    });


  });