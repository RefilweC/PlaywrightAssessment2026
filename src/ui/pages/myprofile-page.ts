import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class MyProfilePage extends BasePage {
    readonly editProfileButton: Locator;
    readonly uploadProfilePictureInput: Locator;
    readonly saveChangesButton: Locator;
    readonly unsupportedImageFile: { name: string; mimeType: string; buffer: Buffer };

  constructor(page: Page) {
    super(page);
    this.editProfileButton = page.getByRole('button', { name: /edit profile/i });
    this.uploadProfilePictureInput = page.locator('input[type="file"]');
    this.saveChangesButton = page.getByRole('button', { name: /save changes/i });
    this.unsupportedImageFile = {
      name: 'not-an-image.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('This is not a supported image.'),
    };
  }

   async editProfile(): Promise<void> {
    await this.editProfileButton.click();
  }

  async uploadProfilePicture(
    file: string | { name: string; mimeType: string; buffer: Buffer },
  ): Promise<void> {
    await this.uploadProfilePictureInput.setInputFiles(file);
    await this.saveChangesButton.click();
    await this.page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    
  }

  async uploadUnsupportedFile(): Promise<void> {
    await this.uploadProfilePicture(this.unsupportedImageFile);
  }
}
