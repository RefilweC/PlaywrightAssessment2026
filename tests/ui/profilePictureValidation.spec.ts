import { test, expect } from '../../src/fixtures/base.fixture';
import { getLoginCredentials } from '../../src/data/application-input';
import type { Page } from '@playwright/test';

async function uploadAndAssertAlert(
  page: Page,
  upload: () => Promise<void>,
  expectedMessage: RegExp,
): Promise<void> {
  const dialogPromise = page.waitForEvent('dialog');
  const uploadPromise = upload();
  const dialog = await dialogPromise;

  expect(dialog.type()).toBe('alert');
  expect(dialog.message()).toMatch(expectedMessage);
  await dialog.accept();
  await uploadPromise;
}

test.describe('My Profile Picture Validation', () => {
    test.beforeEach(async ({ loginPage, dashboardPage, myProfilePage }) => {
        const user = getLoginCredentials();
        await loginPage.login(user);
        await dashboardPage.navigateToMyProfile();
        await dashboardPage.navigateToProfile();
        await myProfilePage.editProfile();
    });
  test('Positive - should validate the profile picture upload functionality', async ({ page, myProfilePage, profilePicturePath }) => {
    await uploadAndAssertAlert(
      page,
      () => myProfilePage.uploadProfilePicture(profilePicturePath),
      /profile updated successfully|upload successful|success/i,
    );
  });

  test('Negative - should reject a profile picture larger than the allowed size', async ({ page, myProfilePage, oversizedProfilePicturePath }) => {
    await uploadAndAssertAlert(
      page,
      () => myProfilePage.uploadProfilePicture(oversizedProfilePicturePath),
      /less than 20\s*MB|20\s*MB|too large|size/i,
    );
  });

  test('Negative - should reject a file that is not an image', async ({ page, myProfilePage }) => {
    await uploadAndAssertAlert(
      page,
      () => myProfilePage.uploadProfilePicture({
        name: 'not-an-image.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('This is not a supported image.'),
      }),
      /invalid|unsupported|image|file|format|type/i,
    );
  });
});