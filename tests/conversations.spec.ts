import { test, expect } from '@playwright/test';

test.describe('conversations', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await page.getByRole('button', { name: 'Get Started' }).click();
        await page.getByLabel('Email address').fill('prueba@gmail.com');
        await page.getByLabel('Password').fill('Holamundo:1');
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.getByRole('button', { name: 'Get Started' }).click();
        await page.goto('http://localhost:3000/conversation/new');
    });

   test.afterEach(async({page})=>{
        await page.locator('[id="edit-chat"]').click();
        await page.getByText('Delete').click();
        await page.getByRole('button', { name: 'Confirm' }).click();
        await page.waitForTimeout(5000);
        await expect(page.getByText('No items to display')).toBeVisible({timeout: 220000});
    });
  
    test('Model ChatGPT-3.5', async ({ page }) => {
        await page.getByRole('button', { name: 'New Chat' }).click();
        await page.getByPlaceholder('Chat name').fill('test 1');
        await page.getByLabel('Select a Model', { exact: true }).click();
        await page.locator('[id="1"]').click();
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByPlaceholder('Send Message').fill('what is the capital of france?');
        await expect(page.getByText('Tokens being used')).toContainText('7 Tokens being used');
        await page.locator('#button-chat').click();
        await expect(page.getByText('what is the capital of france?', { exact: true })).toBeVisible({timeout: 150000});
        await expect(page.getByText('The capital of France is Paris.')).toBeHidden({timeout: 220000});
    });

    test('Model Dalle', async ({ page }) => {
        await page.getByRole('button', { name: 'New Chat' }).click();
        await page.getByPlaceholder('Chat name').fill('test 2');
        await page.getByLabel('Select a Model', { exact: true }).click();
        await page.locator('[id="4"]').click();
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByRole('button', { name: 'Size' }).click();
        await page.getByText('256x256').click();
        await page.getByRole('button', { name: 'Save' }).click();
        await page.getByPlaceholder('Send Message').fill('cat in a suit');
        //await expect(page.getByText('Tokens being used')).toContainText('4 Tokens being used');
        await page.locator('#button-chat').click();
        await expect(page.getByText('cat in a suit', { exact: true })).toBeVisible({timeout: 150000});
        await expect(page.getByRole('img', { name: 'Generated image' })).toBeHidden({timeout: 220000});
    });

    test('Model ChatGPT-3.5-16k', async ({ page }) => {
        await page.getByRole('button', { name: 'New Chat' }).click();
        await page.getByPlaceholder('Chat name').fill('test 3');
        await page.getByLabel('Select a Model', { exact: true }).click();
        await page.locator('[id="2"]').click();
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByPlaceholder('Send Message').fill('what is the capital of france?');
        await expect(page.getByText('Tokens being used')).toContainText('7 Tokens being used');
        await page.locator('#button-chat').click();
        await expect(page.getByText('what is the capital of france?', { exact: true })).toBeVisible({timeout: 150000});
        await expect(page.getByText('The capital of France is Paris.')).toBeHidden({timeout: 220000});
    });
/*
    test('Model ChatGPT-4', async ({ page }) => {
        await page.getByRole('button', { name: 'New Chat' }).click();
        await page.getByPlaceholder('Chat name').fill('test 4');
        await page.getByLabel('Select a Model', { exact: true }).click();
        await page.locator('[id="3]').click();

        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByPlaceholder('Send Message').fill('what is the capital of france?');
        await expect(page.locator('#token-count')).toContainText('7');
        await page.locator('#button-chat').click();
        await expect(page.getByText('what is the capital of france?', { exact: true })).toBeVisible({timeout: 150000});
        await expect(page.getByText('The capital of France is Paris.')).toBeHidden({timeout: 220000});
    });*/

  });