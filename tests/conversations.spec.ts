import { test, expect } from '@playwright/test';

test.describe('conversations', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://52.54.237.87:3000/');
        await page.getByRole('button', { name: 'Get Started' }).click();
        await page.getByLabel('Email address').fill('prueba@gmail.com');
        await page.getByLabel('Password').fill('Holamundo:1');
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.getByRole('button', { name: 'Get Started' }).click();
        await page.goto('http://52.54.237.87:3000/conversation/new');
    });

 /*   test.afterEach(async({page})=>{
        await page.locator('[id="edit-chat"]').click();
        await page.getByText('Delete').click();
        await page.getByRole('button', { name: 'Confirm' }).click();
        //await expect(page.getByRole('heading', { name: 'Welcome prueba@gmail.com' })).toBeHidden();
    }); */
  
    test('Model ChatGPT-3.5', async ({ page }) => {
        await page.getByRole('button', { name: 'New Chat' }).click();
        await page.getByPlaceholder('Chat name').fill('test 1');
        await page.getByLabel('Select a Model', { exact: true }).click();
        //await page.getByLabel('GPT-3.5-TURBO2 Tokens').getByText('GPT-3.5-TURBO').click();
        await page.getByLabel('GPT-3.5-TURBO11819.73M Tokens').getByText('GPT-3.5-TURBO').click();
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByPlaceholder('Send Message').fill('what is the capital of france?');
        await expect(page.getByText('Tokens being used')).toContainText('7 Tokens being used');
        await page.locator('form').getByRole('button').click();
        //await page.locator('#button-chat').click();
        await expect(page.getByText('what is the capital of france?', { exact: true })).toBeVisible({timeout: 150000});
        await expect(page.getByText('The capital of France is Paris.')).toBeHidden({timeout: 220000});
    });

    test('Model Dalle', async ({ page }) => {
        await page.getByRole('button', { name: 'New Chat' }).click();
        await page.getByPlaceholder('Chat name').fill('test 2');
        await page.getByLabel('Select a Model', { exact: true }).click();
        await page.getByLabel('DALLE886479 Images Available').getByText('DALLE').click();
        //await page.getByLabel('DALLE2 Tokens').getByText('DALLE').click();
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByRole('button', { name: 'Size' }).click();
        await page.getByText('256x256').click();
        await page.getByRole('button', { name: 'Save' }).click();
        await page.getByPlaceholder('Send Message').fill('cat in a suit');
        await expect(page.getByText('Tokens being used')).toContainText('4 Tokens being used');
        await page.locator('form').getByRole('button').click();
        //await page.locator('#button-chat').click();
        await expect(page.getByText('cat in a suit', { exact: true })).toBeVisible({timeout: 150000});
        await expect(page.getByRole('img', { name: 'Generated image' })).toBeHidden({timeout: 220000});
    });

    test('Model ChatGPT-3.5-16k', async ({ page }) => {
        await page.getByRole('button', { name: 'New Chat' }).click();
        await page.getByPlaceholder('Chat name').fill('test 3');
        await page.getByLabel('Select a Model', { exact: true }).click();
        //await page.getByLabel('GPT-3.5-TURBO-16K2 Tokens').getByText('GPT-3.5-TURBO-16K').click();
        await page.getByLabel('GPT-3.5-TURBO11819.73M Tokens').click();
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByPlaceholder('Send Message').fill('what is the capital of france?');
        await expect(page.getByText('Tokens being used')).toContainText('7 Tokens being used');
        await page.locator('form').getByRole('button').click();
        //await page.locator('#button-chat').click();
        await expect(page.getByText('what is the capital of france?', { exact: true })).toBeVisible({timeout: 150000});
        await expect(page.getByText('The capital of France is Paris.')).toBeHidden({timeout: 220000});
    });
/*
    test('Model ChatGPT-4', async ({ page }) => {
        await page.getByRole('button', { name: 'New Chat' }).click();
        await page.getByPlaceholder('Chat name').fill('test 4');
        await page.getByLabel('Select a Model', { exact: true }).click();
        await page.getByLabel('GPT-42 Tokens').getByText('GPT-').click();
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByPlaceholder('Send Message').fill('what is the capital of france?');
        await expect(page.locator('#token-count')).toContainText('7');
        await page.locator('form').getByRole('button').click();
        await expect(page.getByText('what is the capital of france?', { exact: true })).toBeVisible({timeout: 120000});
        await expect(page.getByText('The capital of France is Paris.')).toBeVisible({timeout: 120000});
    });
*/
  });