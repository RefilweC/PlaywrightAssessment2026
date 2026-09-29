import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class UploadPopupPage extends BasePage {
  readonly okButton: Locator;
  readonly profileUpdateSuccessMessage: Locator;
  readonly popupDialog: Locator;

  constructor(page: Page) {
    super(page);
    this.profileUpdateSuccessMessage = page.getByText(/profile updated successfully|upload successful|success/i);
    this.popupDialog = page.locator('[role="dialog"], .modal, .popup, .toast, .alert');
    this.okButton = page.getByRole('button', { name: /ok/i }).first();
  }

  async closeUploadPopup(): Promise<void> {
   
    
    const dialogVisible = await this.popupDialog.isVisible().catch(() => false);

    if (!dialogVisible) {
      await this.page.waitForTimeout(5000);
    }

    const dialog = this.popupDialog.first();
    const okButton = this.okButton;

    if (await dialog.isVisible().catch(() => false)) {
      const closeByButton = await okButton.isVisible().catch(() => false);
      if (closeByButton) {
        await okButton.click();
        return;
      }

      const closeIcon = this.page.locator('[aria-label*="close" i], [data-testid*="close" i], .close').first();
      if (await closeIcon.isVisible().catch(() => false)) {
        await closeIcon.click();
        return;
      }

      await this.page.keyboard.press('Escape');
      return;
    }

    if (await this.profileUpdateSuccessMessage.isVisible().catch(() => false)) {
      await okButton.click();
    }
  }
}