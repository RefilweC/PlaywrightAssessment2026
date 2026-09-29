import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class UploadPopupPage extends BasePage {
    readonly okButton: Locator;
    readonly profileUpdateSuccessMessage: Locator;  
    readonly profileUpdateFailureMessageSize: Locator;
    readonly invalidImageMessage: Locator;
  readonly popupDialog: Locator;

  constructor(page: Page) {
    super(page);
    this.profileUpdateSuccessMessage = page.getByText(/profile updated successfully|upload successful|success/i);
    this.profileUpdateFailureMessageSize = page.getByText(/Image must be less than 20MB before compression/i);
    this.invalidImageMessage = page.getByText(/(?:invalid|unsupported|must be|only).*?(?:image|file)|(?:image|file).*?(?:invalid|unsupported|format|type)/i);
    this.popupDialog = page.locator('[role="dialog"], .modal, .popup, .toast, .alert');
    this.okButton = page.getByRole('button', { name: /ok/i }).first();
  }

    async uploadPopupValidations(): Promise<void> {

    await expect(this.profileUpdateFailureMessageSize).toBeVisible();
      }

  async expectInvalidImageError(): Promise<void> {
    await expect(this.invalidImageMessage).toBeVisible();
  }
}