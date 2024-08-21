import { Page, Locator, expect } from "@playwright/test";
import { headerLocators } from "../Locators/header";

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
    this.homeButton = this.page.locator(headerLocators.homeButton);
    this.contactButton = this.page.locator(headerLocators.contactButton);
    this.aboutUSButton = this.page.locator(headerLocators.aboutUSButton);
    this.cartButton = this.page.locator(headerLocators.cartButton);
    this.logOutButton = this.page.locator(headerLocators.logOutButton);
    this.logInButton = this.page.locator(headerLocators.logInButton);
    this.welcomeUser = this.page.locator(headerLocators.welcomeUser);
  }

  async clickHomeButton() {
    await this.clickOn(headerLocators.homeButton);
  }
  async clickContactButton() {
    await this.clickOn(headerLocators.contactButton);
  }
  async clickAboutUsButton() {
    await this.clickOn(headerLocators.aboutUSButton);
  }
  async clickCartButton() {
    await this.clickOn(headerLocators.cartButton);
  }
  async clickLogInButton() {
    await this.clickOn(headerLocators.logInButton);
  }
  async clickLogOutButton() {
    await this.logOutButton.waitFor();
    await this.clickOn(headerLocators.logOutButton);
  }
  async welcomeUserAssertion(expectedUser: string) {
    await this.welcomeUser.waitFor({ timeout: 1500 });
    const text = await this.welcomeUser.textContent();
    await this.assertText(text!, `Welcome ${expectedUser}`);
  }
}
