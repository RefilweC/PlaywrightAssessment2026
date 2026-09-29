import { test, expect } from '../../src/fixtures/base.fixture';
import { getLoginCredentials } from '../../src/data/application-input';

test.describe('My Profile Picture Validation', () => {
    test.beforeEach(async ({ loginPage, dashboardPage, myProfilePage }) => {
        const user = getLoginCredentials();
        await loginPage.login(user);
        await dashboardPage.navigateToMyProfile();
        await dashboardPage.navigateToProfile();
        await myProfilePage.editProfile();
    });
  test('Positive - should validate the profile picture upload functionality', async ({ myProfilePage, uploadPopupPage, profilePicturePath }) => {
      await uploadPopupPage.uploadAndAssertSuccess(
        () => myProfilePage.uploadProfilePicture(profilePicturePath),
      );
  });

  test('Negative - should reject a profile picture larger than the allowed size', async ({ myProfilePage, uploadPopupPage, oversizedProfilePicturePath }) => {
      await uploadPopupPage.uploadAndAssertOversizedFailure(
        () => myProfilePage.uploadProfilePicture(oversizedProfilePicturePath),
      );
  });

  test('Negative - should reject a file that is not an image', async ({ myProfilePage, uploadPopupPage }) => {
      await uploadPopupPage.uploadAndAssertInvalidImageFailure(
      () => myProfilePage.uploadProfilePicture({
        name: 'not-an-image.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('This is not a supported image.'),
      }),
    );
  });
});