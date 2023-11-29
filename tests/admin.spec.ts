import { test, expect } from '@playwright/test';

test.describe('Admin dashboard', () => {
  test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/');
      await page.getByRole('button', { name: 'Get Started' }).click();
      await page.getByLabel('Email address').fill('prueba@gmail.com');
      await page.getByLabel('Password').fill('Holamundo:1');
      await page.getByRole('button', { name: 'Continue', exact: true }).click();
      await page.getByRole('button', { name: 'Get Started' }).click();
      await page.goto('http://localhost:3000/conversation/new');
      await page.getByRole('button', { name: 'prueba@gmail.co... prueba@' }).click();
      await page.getByText('Admin Dashboard').click();
      await expect(page.getByRole('heading', { name: 'All Wizeliners' })).toBeVisible({timeout: 120000});
  });

  test('create new group', async ({ page }) => {
    await page.getByRole('button', { name: 'New Group' }).click();
    await page.getByPlaceholder('Group name').fill('Test group');
    await page.getByPlaceholder('Group credits').fill('100');
    await page.getByPlaceholder('Group description').fill('group for testing');
    await page.getByRole('button', { name: 'Create' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Add Users' }).click();
    await page.getByText('prueba@gmail.com').nth(1).click({timeout: 150000});
    await page.getByText('SAM Team').click();
    await page.getByText('Rodrigo Rodríguez De Luna').click();
    await page.getByText('María Eugenia Ontiveros Bellés').click();
    await page.getByText('Emilio Ortiz').click();
    await page.getByRole('button', { name: 'Add' }).click();
    await page.waitForTimeout(6000);
    await expect(page.getByRole('rowheader', { name: 'Emilio Ortiz Emilio Ortiz' })).toBeVisible();
    await expect(page.getByRole('rowheader', { name: 'SAM Team SAM Team tsam46317@' })).toBeVisible();
    await expect(page.getByRole('rowheader', { name: 'María Eugenia Ontiveros Bellé' })).toBeVisible();
    await expect(page.getByRole('rowheader', { name: 'Rodrigo Rodríguez De Luna' })).toBeVisible();
    await expect(page.getByRole('rowheader', { name: 'prueba@gmail.com prueba@gmail' })).toBeVisible();
  });

  test('remove user', async ({ page }) => {
    await page.getByRole('button', { name: 'Test group' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('rowheader', { name: 'Rodrigo Rodríguez De Luna' }).click();
    await page.getByRole('button', { name: 'Remove Users' }).click();
    await page.waitForTimeout(2000);
    await expect(page.getByText('Total 4 users')).toBeVisible();
  });

  test('Edit group', async ({ page }) => {
    await page.getByRole('button', { name: 'Test group' }).click();
    await page.getByRole('button', { name: 'Group Settings' }).click();
    await page.getByPlaceholder('Group credits').fill('50');
    await page.getByPlaceholder('Group description').fill('edit group test');
    await page.getByRole('button', { name: 'Edit' }).click();
    await expect(page.getByText('Group edited.')).toBeVisible();
  });

  test('search group', async ({ page }) => {
    await page.getByPlaceholder('Search group').click();
    await page.getByPlaceholder('Search group').fill('random');
    await expect(page.getByText('No items to display')).toBeVisible();
    await page.locator('.p-2').first().click();
    await page.getByPlaceholder('Search group').fill('test');
    await expect(page.getByRole('button', { name: 'Test', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Test group' })).toBeVisible();
  });

  test('Delete group', async ({ page }) => {
    await page.getByRole('button', { name: 'Test group' }).click();
    await expect(page.getByRole('heading', { name: 'Test group' })).toBeVisible({timeout: 120000});
    await page.getByRole('button', { name: 'Group Settings' }).click();
    await page.getByRole('banner').getByRole('button').click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await page.waitForTimeout(5000);
  });

});