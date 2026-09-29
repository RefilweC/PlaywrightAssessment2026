import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

    openLoginBtn = this.page.getByRole('button', { name: /login/i }).first();
    email = this.page.locator('#login-email');
    password = this.page.locator('#login-password');
    loginBtn = this.page.getByRole('button', { name: /^Login$/ });

    async login(data: { email: string; password: string }) {
    await this.page.goto('/');
    await this.click(this.openLoginBtn);
    await this.expectVisible(this.email);
    await this.fill(this.email, data.email);
    await this.fill(this.password, data.password);
    await this.click(this.loginBtn);
  }
}
