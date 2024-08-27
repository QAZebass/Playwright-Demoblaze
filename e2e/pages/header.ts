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
    this.homeButton = this.page.getByRole('link', { name: 'Home' });
    this.contactButton = this.page.getByRole('link', { name: 'Contact' });
    this.aboutUSButton = this.page.getByRole('link', { name: 'About us' });
    this.cartButton = this.page.getByRole('link', { name: 'Cart', exact: true });
    this.logOutButton = this.page.getByRole('link', { name: 'Log out' });
    this.logInButton = this.page.getByRole('link', { name: 'Log in' });
    this.welcomeUser = this.page.getByText('Welcome');
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
    await this.welcomeUser.waitFor({ timeout: 3000 });
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
  async waitForLoginState() {
    await this.welcomeUser.waitFor({ state: 'visible', timeout: 2000 });
  }
}
