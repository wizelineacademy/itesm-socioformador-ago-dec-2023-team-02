import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://52.54.237.87:3000/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address').fill('prueba@gmail.com');
  await page.getByLabel('Password').fill('Holamundo:1');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.goto('http://52.54.237.87:3000//conversation/new');
});
