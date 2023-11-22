import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address').fill('prueba@gmail.com');
  await page.getByLabel('Password').fill('Holamundo:1');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.goto('http://localhost:3000/conversation/new');
  await page.getByRole('button', { name: 'New Chat' }).click();
  await page.getByPlaceholder('Chat name').fill('test 3');
  await page.getByLabel('Select a Model', { exact: true }).click();
  await page.getByLabel('GPT-3.5-TURBO-16K2 Tokens').getByText('GPT-3.5-TURBO-16K').click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Send Message').click();
  await page.getByPlaceholder('Send Message').fill('¿Cuál es la capital de Francia?');
  await page.getByText('10').click();
  await page.locator('form').getByRole('button').click();
  await page.getByText('¿Cuál es la capital de Francia?').click();
  await page.getByText('La capital de Francia es París').click();
  await page.locator('[id="edit-chat"]').click();
  await page.getByText('Delete').click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('No items to display').click();
});