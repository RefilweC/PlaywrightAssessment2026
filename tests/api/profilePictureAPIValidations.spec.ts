import path from 'node:path';
import { getLoginCredentials } from '../../src/data/application-input';
import { expect, test } from '../../src/fixtures/api.fixture';
import { assertResponseCode } from '../../src/utils/ApiHelper';

const profilePicturePath = path.resolve(__dirname, '../../data/profilepicture.png');

test.describe('Profile API endpoint status positive validations', () => {
  let accessToken: string;

  test.beforeEach(async ({ authClient }) => {
    const loginResponse = await authClient.login(getLoginCredentials());
    await assertResponseCode(loginResponse, 'login');
    accessToken = await authClient.getAccessToken(loginResponse);
  });

  test('Positive - login returns HTTP 200 and a usable access token', async () => {
    expect(accessToken.trim()).not.toBe('');
  });

  test('Positive - get user profile returns HTTP 200', async ({ profileClient }) => {
    const profileResponse = await profileClient.getProfile(accessToken);
    await assertResponseCode(profileResponse, 'get user profile');
  });

  test('Positive - update profile picture returns HTTP 200', async ({ profileClient }) => {
    const uploadResponse = await profileClient.updateProfilePicture(accessToken, {
      filePath: profilePicturePath,
    });

    await assertResponseCode(uploadResponse, 'update profile picture');
  });
});

test.describe('Profile API negative validations', () => {
  test('Negative - get user profile rejects an invalid access token', async ({ profileClient }) => {
    const response = await profileClient.getProfile('invalid-access-token');
    const responseBody = await response.text();

    expect(response.status(), 'Expected unauthorized response. Body: ${responseBody}').toBe(401);
  });

  test('Negative - profile picture update rejects an invalid access token', async ({ profileClient }) => {
    const response = await profileClient.updateProfilePicture('invalid-access-token', {
      filePath: profilePicturePath,
    });
    const responseBody = await response.text();

    expect(response.status(), 'Expected unauthorized response. Body: ${responseBody}').toBe(401);
  });
});
