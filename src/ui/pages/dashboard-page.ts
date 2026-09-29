import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class DashboardPage extends BasePage {
  readonly menuButton: Locator;
  readonly myProfileOption: Locator;

  constructor(page: Page) {
    super(page);
    this.menuButton = page.getByRole('button', { name: /menu/i });
    this.myProfileOption = page.getByText('My Profile', { exact: true });
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async navigateToMyProfile(): Promise<void> {
    await this.openMenu();
    await expect(this.myProfileOption).toBeVisible();
    await this.myProfileOption.click();
  }

  async navigateToProfile(): Promise<void> {
    await this.navigateToMyProfile();
  }
}

