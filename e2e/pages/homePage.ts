import { Page, Locator, expect, APIRequestContext } from "@playwright/test";
import { productListPage } from "./productListPage";
import { productDetailPage } from "./productDetailPage";
import { Header } from "./header";

export var productCat: string;
export var productCategory: any;

export class HomePage {
  page: Page;
  private header: Header;
  private pdp: productDetailPage;
  private plp: productListPage;
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
    this.header = new Header(page);
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

  }

  async clickPhonesCategory() {

    await this.header.waitForLoginState();
    productCat = "phone";

    await this.categoryWrapper.waitFor({ state: 'visible' });
    const categoryTitle = await this.categoryTitle.textContent();
    expect(categoryTitle).toEqual("CATEGORIES");

    await this.phonesCategory.waitFor({ state: "visible" });
    productCategory = await this.phonesCategory.textContent();
    await this.phonesCategory.click();
    await this.page.waitForTimeout(1000);
  }

  async clickLaptopCategory() {
    await this.header.waitForLoginState();
    productCat = "notebook";

    await this.categoryWrapper.waitFor({ state: 'visible' });
    const categoryTitle = await this.categoryTitle.textContent();
    expect(categoryTitle).toEqual("CATEGORIES");

    await this.laptopCategory.waitFor({ state: "visible" });
    productCategory = await this.laptopCategory.textContent();
    await this.laptopCategory.click();
    await this.page.waitForTimeout(1000);
  }

  async clickMonitorCategory() {
    await this.header.waitForLoginState();
    productCat = "monitor";

    await this.categoryWrapper.waitFor({ state: 'visible' });
    const categoryTitle = await this.categoryTitle.textContent();
    expect(categoryTitle).toEqual("CATEGORIES");

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
