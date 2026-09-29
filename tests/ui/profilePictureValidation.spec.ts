import { test, expect } from '../../src/fixtures/base.fixture';
import { getLoginCredentials } from '../../src/data/application-input';

test.describe('My Profile Picture Validation', () => {
    test.beforeEach(async ({ loginPage }) => {
        const user = getLoginCredentials();
        await loginPage.login(user);
    });
  test('should validate the profile picture upload functionality', async ({ dashboardPage, myProfilePage, uploadPopupPage }) => {
    
    await dashboardPage.navigateToMyProfile();
    await dashboardPage.navigateToProfile();
    await myProfilePage.editProfile();
    await myProfilePage.uploadProfilePicture('C:\\Users\\refilwem\\PlaywrightAssessment2026\\data\\profilepicture.png');
//  await uploadPopupPage.closeUploadPopup();

  });
});