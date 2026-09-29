import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { getLoginCredentials } from '../src/data/application-input';
import {
  assertResponseCode,
  buildEndpointList,
  getBearerToken,
} from '../src/utils/ApiHelper';

const loginUrl = 'https://www.ndosiautomation.co.za/APIDEV/login';
const profileUrl = 'https://www.ndosiautomation.co.za/APIDEV/profile';
const profileImageUrl = 'https://www.ndosiautomation.co.za/APIDEV/profile/image';

test.describe('API response code validation', () => {
  test('login endpoint responds with the expected status code', async ({ request }) => {
    const response = await request.post(loginUrl, {
      data: getLoginCredentials(),
    });

    await assertResponseCode(response, 'login');
  });

  test('get user profile endpoint responds with the expected status code', async ({ request }) => {
    const loginResponse = await request.post(loginUrl, { data: getLoginCredentials() });
    await assertResponseCode(loginResponse, 'login');
    const token = await getBearerToken(loginResponse);
    const response = await request.get(profileUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    await assertResponseCode(response, 'get user profile');
  });

  test('update profile picture endpoint responds with the expected status code', async ({ request }) => {
    const loginResponse = await request.post(loginUrl, { data: getLoginCredentials() });
    await assertResponseCode(loginResponse, 'login');
    const token = await getBearerToken(loginResponse);
    const imagePath = path.resolve(process.cwd(), 'data/profilepicture.png');
    const response = await request.post(profileImageUrl, {
      multipart: {
        profileImage: {
          name: path.basename(imagePath),
          mimeType: 'image/png',
          buffer: fs.readFileSync(imagePath),
        },
      },
      headers: { Authorization: `Bearer ${token}` },
    });

    await assertResponseCode(response, 'update profile picture');
  });

  test('endpoint inventory remains aligned with the expected routes', async () => {
    const endpoints = buildEndpointList();

    expect(endpoints).toHaveLength(3);
    expect(endpoints.map((endpoint) => endpoint.url)).toEqual([
      loginUrl,
      profileUrl,
      profileImageUrl,
    ]);
  });
});
