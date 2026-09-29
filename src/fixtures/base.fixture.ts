import { test as base, expect } from '@playwright/test';
import xlsx from 'xlsx';

import { LoginPage } from '../ui/pages/login-page';
import { DashboardPage } from '../ui/pages/dashboard-page';
import { MyProfilePage } from '../ui/pages/myprofile-page';
import { UploadPopupPage } from '../ui/pages/upload-popup-page';
import path from 'node:path';

const profilePicturePath = path.resolve(__dirname, '../../data/profilepicture.png');
const oversizedProfilePicturePath = path.resolve(__dirname, '../../data/largesizedpicture.png');

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  myProfilePage: MyProfilePage;
  uploadPopupPage: UploadPopupPage;
  profilePicturePath: string;
  oversizedProfilePicturePath: string;

  xlsx: typeof xlsx;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

    myProfilePage: async ({ page }, use) => {
        await use(new MyProfilePage(page));
    },

    uploadPopupPage: async ({ page }, use) => {
        await use(new UploadPopupPage(page));
    },

    profilePicturePath: async ({}, use) => {
      await use(profilePicturePath);
    },

    oversizedProfilePicturePath: async ({}, use) => {
      await use(oversizedProfilePicturePath);
    },

  xlsx: async ({}, use) => {
    await use(xlsx);
  },
});

export { expect };