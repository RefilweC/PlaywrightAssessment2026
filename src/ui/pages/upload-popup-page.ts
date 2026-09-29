import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class UploadPopupPage extends BasePage {
    readonly okButton: Locator; 
    
   // readonly invalidImageMessage: Locator;
  //readonly popupDialog: Locator;

  constructor(page: Page) {
    super(page);
    
    this.okButton = page.getByRole('button', { name: /ok/i }).first();
  }

  async uploadAndAssertAlert(
    upload: () => Promise<void>,
    expectedMessage: RegExp,
  ): Promise<void> {
    const dialogPromise = this.page.waitForEvent('dialog');
    const uploadPromise = upload();
    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toMatch(expectedMessage);
    await dialog.accept();
    await uploadPromise;
  }

  async uploadAndAssertSuccess(upload: () => Promise<void>): Promise<void> {
    const profileUpdateSuccessMessage = /profile updated successfully|upload successful|success/i;
    await this.uploadAndAssertAlert(
      upload,
      profileUpdateSuccessMessage,
    );
  }

  async uploadAndAssertOversizedFailure(upload: () => Promise<void>): Promise<void> {
    const profileUpdateFailureMessageSize =(/Image must be less than 20MB before compression/i);
    await this.uploadAndAssertAlert(
      upload,
      profileUpdateFailureMessageSize,
    );
  }

  async uploadAndAssertInvalidImageFailure(upload: () => Promise<void>): Promise<void> {
    const invalidImageMessage = (/(?:invalid|unsupported|must be|only).*?(?:image|file)|(?:image|file).*?(?:invalid|unsupported|format|type)/i);
    await this.uploadAndAssertAlert(
      upload,
      invalidImageMessage,
    );
  }

}