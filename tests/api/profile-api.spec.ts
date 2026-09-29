import path from 'node:path';
import { getLoginCredentials } from '../../src/data/application-input';
import { test } from '../../src/fixtures/api.fixture';
import { assertResponseCode } from '../../src/utils/ApiHelper';

test.describe('API profile validation', () => {
  test('login, get profile and upload profile picture endpoints return HTTP 200', async ({ authClient, profileClient }) => {
    const creds = getLoginCredentials();
    const loginResponse = await authClient.login(creds);
    await assertResponseCode(loginResponse, 'login');
    const token = await authClient.getAccessToken(loginResponse);

    const profileResponse = await profileClient.getProfile(token);
    await assertResponseCode(profileResponse, 'get user profile');

    const imagePath = path.resolve(process.cwd(), 'data/profilepicture.png');
    const uploadResponse = await profileClient.updateProfilePicture(token, {
      filePath: imagePath,
    });
    await assertResponseCode(uploadResponse, 'update profile picture');
  });
});
