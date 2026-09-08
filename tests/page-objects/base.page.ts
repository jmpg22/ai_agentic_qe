import { Page, Locator } from '@playwright/test';

/**
 * BasePage provides reusable interaction helpers and serves as a foundational class
 * for Page Object Model implementations in this QE framework.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a relative or absolute URL.
   */
  async navigateTo(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Get page title.
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Wait for network idle state.
   */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}
