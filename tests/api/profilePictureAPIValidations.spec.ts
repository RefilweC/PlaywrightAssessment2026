import path from 'node:path';
import { getLoginCredentials } from '../../src/data/application-input';
import { expect, test } from '../../src/fixtures/api.fixture';
import { assertResponseCode } from '../../src/utils/ApiHelper';

const profilePicturePath = path.resolve(__dirname, '../../data/profilepicture.png');

test.describe('Profile API endpoint status validations', () => {
  let accessToken: string;

  test.beforeEach(async ({ authClient }) => {
    const loginResponse = await authClient.login(getLoginCredentials());
    await assertResponseCode(loginResponse, 'login');
    accessToken = await authClient.getAccessToken(loginResponse);
  });

  test('login returns HTTP 200 and a usable access token', async () => {
    expect(accessToken.trim()).not.toBe('');
  });

  test('get user profile returns HTTP 200', async ({ profileClient }) => {
    const profileResponse = await profileClient.getProfile(accessToken);
    await assertResponseCode(profileResponse, 'get user profile');
  });

  test('update profile picture returns HTTP 200', async ({ profileClient }) => {
    const uploadResponse = await profileClient.updateProfilePicture(accessToken, {
      filePath: profilePicturePath,
    });

    await assertResponseCode(uploadResponse, 'update profile picture');
  });
});
