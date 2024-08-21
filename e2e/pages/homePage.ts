import { Page, Locator, expect, APIRequestContext } from "@playwright/test";
import { homeLocators } from '../Locators/home';
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
    this.productTitles = page.locator(homeLocators.productTitles);
    this.categoryWrapper = page.locator(homeLocators.categoriesWrapper);
    this.categoryTitle = page.locator(homeLocators.categoryTitle);
    this.phonesCategory = page.locator(homeLocators.phonesCategory);
    this.productsArray = page.locator(homeLocators.productsArray);
    this.productPicture = page.locator(homeLocators.productPicture);
    this.productInfoContainer = page.locator(homeLocators.productInfoContainer);
    this.productName = page.locator(homeLocators.productName);
    this.productPrice = page.locator(homeLocators.productPrice);
    this.productDescription = page.locator(homeLocators.productDescription);
    this.laptopCategory = page.locator(homeLocators.laptopCategory);
    this.monitorCategory = page.locator(homeLocators.monitorCategory);
    this.homeButton = page.locator(homeLocators.homeButton);
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
    await this.page
      .locator(homeLocators.phonesCategory)
      .waitFor({ state: "visible" });
    productCategory = await this.page
      .locator(homeLocators.phonesCategory)
      .textContent();
    await this.page.locator(homeLocators.phonesCategory).click();
    await this.page.waitForTimeout(1000);
  }

  async clickLaptopCategory() {
    productCat = "notebook";

    //We are in the right place
    await this.categoryWrapper.waitFor({ timeout: 1500 });
    const categoryTitle = await this.categoryTitle.textContent();
    expect(categoryTitle).toEqual("CATEGORIES");

    //Let's find the laptop category and click
    await this.page
      .locator(homeLocators.laptopCategory)
      .waitFor({ state: "visible" });
    productCategory = await this.page
      .locator(homeLocators.laptopCategory)
      .textContent();
    await this.page.locator(homeLocators.laptopCategory).click();
    await this.page.waitForTimeout(1000);
  }

  async clickMonitorCategory() {
    productCat = "monitor";

    //We are in the right place
    await this.categoryWrapper.waitFor({ timeout: 1500 });
    const categoryTitle = await this.categoryTitle.textContent();
    expect(categoryTitle).toEqual("CATEGORIES");

    //Let's find the monitor category and click
    await this.page
      .locator(homeLocators.monitorCategory)
      .waitFor({ state: "visible" });
    productCategory = await this.page
      .locator(homeLocators.monitorCategory)
      .textContent();
    await this.page.locator(homeLocators.monitorCategory).click();
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
