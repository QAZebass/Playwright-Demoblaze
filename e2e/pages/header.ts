import { Page, Locator, expect } from "@playwright/test";


export class Header {
  page: Page;
  private homeButton: Locator;
  private contactButton: Locator;
  private aboutUSButton: Locator;
  private cartButton: Locator;
  private logOutButton: Locator;
  private logInButton: Locator;
  private welcomeUser: Locator;

  constructor(page: Page) {

    this.page = page;
    this.homeButton = this.page.locator('[class="nav-item active"]');
    this.contactButton = this.page.locator('a:has-text("Contact")');
    this.aboutUSButton = this.page.locator('a:contains("About us")');
    this.cartButton = this.page.locator('[id="cartur"]');
    this.logOutButton = this.page.locator('[id="logout2"]');
    this.logInButton = this.page.locator('[id="login2"]');
    this.welcomeUser = this.page.locator('[id="nameofuser"]');
  }

  async clickHomeButton() {
    await this.homeButton.click();
  }
  async clickContactButton() {
    await this.contactButton.click();
  }
  async clickAboutUsButton() {
    await this.aboutUSButton.click();
  }
  async clickCartButton() {
    await this.cartButton.click();
  }
  async clickLogInButton() {
    await this.logInButton.click();
  }
  async clickLogOutButton() {
    await this.logOutButton.waitFor();
    await this.logOutButton.click();
  }
  async welcomeUserAssertion(expectedUser: string) {
    await this.welcomeUser.waitFor({ timeout: 1500 });
    const text = await this.welcomeUser.textContent();
    expect(text!).toEqual(`Welcome ${expectedUser}`);
  }
}
