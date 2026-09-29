import { test as base, expect } from '@playwright/test';
import xlsx from 'xlsx';

import { LoginPage } from '../ui/pages/login-page';
import { DashboardPage } from '../ui/pages/dashboard-page';
import { MyProfilePage } from '../ui/pages/myprofile-page';
import { UploadPopupPage } from '../ui/pages/upload-popup-page';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  myProfilePage: MyProfilePage;
  uploadPopupPage: UploadPopupPage;

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

  xlsx: async ({}, use) => {
    await use(xlsx);
  },
});

export { expect };