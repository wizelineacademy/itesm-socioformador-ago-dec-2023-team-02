import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address').fill('prueba@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').press('CapsLock');
  await page.getByLabel('Password').fill('H');
  await page.getByLabel('Password').press('CapsLock');
  await page.getByLabel('Password').fill('Holamundo:1');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.goto('http://localhost:3000/conversation/new');
  await page.getByRole('button', { name: 'New Chat' }).click();
  await page.getByPlaceholder('Chat name').fill('test 2');
  await page.getByLabel('Select a Model', { exact: true }).click();
  await page.getByLabel('DALLE2 Tokens').getByText('DALLE').click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Send Message').fill('christmas cat');
  await page.getByText('3', { exact: true }).click();
  await page.getByRole('button', { name: 'Size' }).click();
  await page.getByText('512x512').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('form').getByRole('button').click();
  await page.getByText('christmas cat');
  await page.locator('.pb-32 > div:nth-child(2) > div > div');

  await page.locator('[id="edit-chat"]').click();
  await page.getByText('Delete').click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByText('No items to display').click();
});