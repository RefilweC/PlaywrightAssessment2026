import path from 'node:path';
import { getLoginCredentials } from '../../src/data/application-input';
import { test } from '../../src/fixtures/api.fixture';
import { assertResponseCode } from '../../src/utils/ApiHelper';

const profilePicturePath = path.resolve(process.cwd(), 'data/profilepicture.png');

test.describe('Profile API endpoint status validations', () => {
    
  test('login returns HTTP 200', async ({ authClient }) => {
    const response = await authClient.login(getLoginCredentials());

    await assertResponseCode(response, 'login');
  });

  test('get user profile returns HTTP 200', async ({ authClient, profileClient }) => {
    const loginResponse = await authClient.login(getLoginCredentials());
    await assertResponseCode(loginResponse, 'login');

    const accessToken = await authClient.getAccessToken(loginResponse);
    const profileResponse = await profileClient.getProfile(accessToken);

    await assertResponseCode(profileResponse, 'get user profile');
  });

  test('update profile picture returns HTTP 200', async ({ authClient, profileClient }) => {
    const loginResponse = await authClient.login(getLoginCredentials());
    await assertResponseCode(loginResponse, 'login');
    const accessToken = await authClient.getAccessToken(loginResponse);

    const profileResponse = await profileClient.getProfile(accessToken);
    await assertResponseCode(profileResponse, 'get user profile');  

    const uploadResponse = await profileClient.updateProfilePicture(accessToken, {
      filePath: profilePicturePath,
    });
    await assertResponseCode(uploadResponse, 'update profile picture');
    
/*
    const imagePath = path.resolve(process.cwd(), 'data/profilepicture.png');
    const uploadResponse = await profileClient.updateProfilePicture(accessToken, {
          filePath: imagePath,
        });
        await assertResponseCode(uploadResponse, 'update profile picture');
*/
   // await assertResponseCode(uploadResponse, 'update profile picture');

  });
});
