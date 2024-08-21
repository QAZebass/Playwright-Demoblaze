import { Page, Locator, expect } from "@playwright/test";
import { loginLocator } from "../Locators/login";
import { basePage } from "./basePage";
export let alertMessage = "";

export class LoginPage extends basePage {
  private usernameTitle: Locator;
  private usernameInput: Locator;
  private passwordTitle: Locator;
  private passwordInput: Locator;
  private closeButton: Locator;
  private logInButton: Locator;
  private footerWrapper: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameTitle = page.locator(loginLocator.usernameTitle);
    this.usernameInput = page.locator(loginLocator.usernameInput);
    this.passwordTitle = page.locator(loginLocator.passwordTitle);
    this.passwordInput = page.locator(loginLocator.passwordInput);
    this.closeButton = page.locator(loginLocator.closeButton);
    this.logInButton = page.locator(loginLocator.logInButton);
    this.footerWrapper = page.locator(loginLocator.footerWrapper);
  }

  async typeInUsername(username: string) {
    const usernameTitle = await this.usernameTitle.textContent();
    expect(usernameTitle).toEqual("Username:");
    await this.typeIn(loginLocator.usernameInput, username);
  }
  async typeInPassword(password: string) {
    const passwordTitle = await this.passwordTitle.first().textContent();
    expect(passwordTitle).toEqual("Password:");
    await this.typeIn(loginLocator.passwordInput, password);
    await this.page.waitForTimeout(1000);
  }

  async clickLogIn() {
    await this.logInButton.waitFor({ state: "visible", timeout: 3000 });
    await this.page.locator(loginLocator.logInButton).click();
    await this.page.waitForTimeout(2000);
  }

  async alertListener() {
    this.page.on("dialog", async (dialog) => {
      const message = dialog.message();
      alertMessage = message;
      await dialog.accept();
    });
  }
}
