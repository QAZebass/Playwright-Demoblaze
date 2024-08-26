import { Page, Locator, expect } from "@playwright/test";
export let alertMessage = "";

export class LoginPage {
  page: Page;

  private logInModalTitle: Locator;
  private userNameTitle: Locator;
  private usernameInput: Locator;
  private passwordTitle: Locator;
  private passwordInput: Locator;
  private closeButton: Locator;
  private logInButton: Locator;
  private footerWrapper: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logInModalTitle = this.page.getByRole('heading', { name: 'Log in' });
    this.userNameTitle = this.page.locator('[for="log-name"]:has-text("Username:")');
    this.usernameInput = this.page.locator('input[id="loginusername"]');
    this.passwordTitle = this.page.locator('[for="log-pass"]:has-text("Password:")');
    this.passwordInput = this.page.locator('input[id="loginpassword"]');
    this.closeButton = page.locator('button[type="button"]');
    this.logInButton = page.locator('button[class="btn btn-primary"]:has-text("Log in")');
    this.footerWrapper = page.locator('[class="modal-footer"]');
  }

  async typeInUsername(username: string) {
    const logInTitle = await this.logInModalTitle.textContent();
    expect(logInTitle).toEqual('Log in');
    const usernameTitle = await this.userNameTitle.textContent();
    expect(usernameTitle).toEqual("Username:");
    await this.usernameInput.fill(username);
  }
  async typeInPassword(password: string) {
    const passwordTitle = await this.passwordTitle.first().textContent();
    expect(passwordTitle).toEqual("Password:");
    await this.passwordInput.fill(password);
  }

  async clickLogIn() {
    await this.logInButton.waitFor({ state: "visible", timeout: 3000 });
    await this.logInButton.click();
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
