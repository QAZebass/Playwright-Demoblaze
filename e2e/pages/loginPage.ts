import { Page, Locator, expect } from "@playwright/test";
export let alertMessage = "";

export class LoginPage {
  page: Page;
  private usernameTitle: Locator;
  private usernameInput: Locator;
  private passwordTitle: Locator;
  private passwordInput: Locator;
  private closeButton: Locator;
  private logInButton: Locator;
  private footerWrapper: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameTitle = page.locator('[for="log-name"]');
    this.usernameInput = page.locator('[id="loginusername"]');
    this.passwordTitle = page.locator('label[for="log-pass"]');
    this.passwordInput = page.locator('[id="loginpassword"]');
    this.closeButton = page.locator('button[type="button"]');
    this.logInButton = page.locator('button[class="btn btn-primary"]:has-text("Log in")');
    this.footerWrapper = page.locator('[class="modal-footer"]');
  }

  async typeInUsername(username: string) {
    const usernameTitle = await this.usernameTitle.textContent();
    expect(usernameTitle).toEqual("Username:");
    await this.usernameInput.fill(username);
  }
  async typeInPassword(password: string) {
    const passwordTitle = await this.passwordTitle.first().textContent();
    expect(passwordTitle).toEqual("Password:");
    await this.passwordInput.fill(password);
    await this.page.waitForTimeout(1000);
  }

  async clickLogIn() {
    await this.logInButton.waitFor({ state: "visible", timeout: 3000 });
    await this.logInButton.click();
    await this.page.waitForTimeout(2000);
  }

  async clickOnLogOut() {
    await this.log;
  }

  async alertListener() {
    this.page.on("dialog", async (dialog) => {
      const message = dialog.message();
      alertMessage = message;
      await dialog.accept();
    });
  }
}
