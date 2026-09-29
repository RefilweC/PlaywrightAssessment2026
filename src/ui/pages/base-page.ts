import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
   constructor(readonly page: Page) {}
  

  async navigate(path: string) {
    await this.page.goto(path);
  }

  async click(element: Locator) {
    await element.click();
  }

  async fill(element: Locator, value: string) {
    await element.fill(value);
  }

  async select(element: Locator, value: string | { index: number }) {
    await element.selectOption(value);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async expectVisible(element: Locator) {
    await expect(element).toBeVisible();
  }

  async expectText(element: Locator, text: string) {
    await expect(element).toHaveText(text);
  }
}