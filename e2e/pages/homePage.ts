import { Page, Locator, expect, APIRequestContext } from "@playwright/test";
import { productListPage } from "./productListPage";
import { productDetailPage } from "./productDetailPage";

export var productCat: string;
export var productCategory: any;

export class HomePage {
  page: Page;
  private pdp: productDetailPage;
  private plp: productListPage;
  private logInButton: Locator;
  private welcomeUserText: Locator;
  private homeButton: Locator;
  private productTitles: Locator;
  private categoryWrapper: Locator;
  private categoryTitle: Locator;
  private phonesCategory: Locator;
  private productsArray: Locator;
  private productPicture: Locator;
  private selectedPhone: Locator;
  private productInfoContainer: Locator;
  private productName: Locator;
  private productPrice: Locator;
  private productDescription: Locator;
  private laptopCategory: Locator;
  private monitorCategory: Locator;

  constructor(page: Page, request: APIRequestContext) {
    this.page = page;
    this.pdp = new productDetailPage(page);
    this.plp = new productListPage(page, request);
    this.productTitles = page.locator('[class="card h-100"]');
    this.categoryWrapper = page.locator('[class="list-group"]');
    this.categoryTitle = page.locator('[id="cat"]');

    this.productsArray = page.locator('[class="card h-100"]');
    this.productPicture = page.locator('[class="card-img-top img-fluid"]');
    this.productInfoContainer = page.locator('[class="card-block"]');
    this.productName = page.locator('[class="card-block"] a');
    this.productPrice = page.locator('[class="card-block"] h5');
    this.productDescription = page.locator('[class="card-block"] [class="card-text"]');
    //PRODUCT CATEGORIES
    this.phonesCategory = page.locator('[id="itemc"]:has-text("Phones")');
    this.laptopCategory = page.locator('[id="itemc"]:has-text("Laptops")');
    this.monitorCategory = page.locator('[id="itemc"]:has-text("Monitors")');

    this.homeButton = page.locator('[class="nav-item active"]');
  }

  async clickOnLogIn() {
    await this.logInButton.waitFor({ state: "visible" });
    this.logInButton.click();
  }
  async logInAssertion(user: string) {
    await this.welcomeUserText.waitFor();
    const text = await this.welcomeUserText.textContent();
    expect(text).toEqual(`Welcome ${user}`);
  }
  async clickOnHome() {
    await this.homeButton.waitFor();
    this.homeButton.click();
  }
  async clickPhonesCategory() {
    productCat = "phone";

    //We are in the right place
    await this.categoryWrapper.waitFor({ timeout: 1500 });
    const categoryTitle = await this.categoryTitle.textContent();
    expect(categoryTitle).toEqual("CATEGORIES");

    //Let's find the button and click
    await this.phonesCategory.waitFor({ state: "visible" });
    productCategory = await this.phonesCategory.textContent();
    await this.phonesCategory.click();
    await this.page.waitForTimeout(1000);
  }

  async clickLaptopCategory() {
    productCat = "notebook";

    //We are in the right place
    await this.categoryWrapper.waitFor({ timeout: 1500 });
    const categoryTitle = await this.categoryTitle.textContent();
    expect(categoryTitle).toEqual("CATEGORIES");

    //Let's find the laptop category and click
    await this.laptopCategory.waitFor({ state: "visible" });
    productCategory = await this.laptopCategory.textContent();
    await this.laptopCategory.click();
    await this.page.waitForTimeout(1000);
  }

  async clickMonitorCategory() {
    productCat = "monitor";

    //We are in the right place
    await this.categoryWrapper.waitFor({ timeout: 1500 });
    const categoryTitle = await this.categoryTitle.textContent();
    expect(categoryTitle).toEqual("CATEGORIES");

    //Let's find the monitor category and click
    await this.monitorCategory.waitFor({ state: "visible" });
    productCategory = await this.monitorCategory.textContent();
    await this.monitorCategory.click();
    await this.page.waitForTimeout(1000);
  }

  async selectPhone() {
    await this.clickPhonesCategory();
    await this.plp.clickOnRandomProduct();
    await this.pdp.clickOnAddToCartButton();
  }

  async selectMonitor() {
    await this.clickMonitorCategory();
    await this.plp.clickOnRandomProduct();
    await this.pdp.clickOnAddToCartButton();
  }
}
