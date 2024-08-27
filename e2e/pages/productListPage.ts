import { Page, Locator } from "@playwright/test";
import { productCategory } from "./homePage";
import { Header } from "./header";

export let product: any;
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class productListPage {
  page: Page;
  private productsArray: Locator;
  private allProductsWrapper: Locator;
  private header: Header;

  constructor(page: Page) {
    this.header = new Header(page);
    this.page = page;
    this.productsArray = this.page.locator('a[class="hrefch"]');
    this.allProductsWrapper = this.page.locator('[id="tbodyid"]');
  }

  async clickOnRandomProduct() {

    await this.header.waitForLoginState();
    await this.allProductsWrapper.waitFor({ state: 'visible' });
    const arrayOfProductTitles = await this.productsArray.all();
    const randomProductNumber = getRandomNumber(0, arrayOfProductTitles.length - 1);
    console.log(`Number of ${productCategory} available: ${arrayOfProductTitles.length}`);
    await this.productsArray.nth(randomProductNumber).waitFor({ state: 'visible', timeout: 2000 });
    product = await this.productsArray.nth(randomProductNumber).textContent();
    console.log(`The selected product is: ${product}`);
    await this.productsArray.nth(randomProductNumber).click({ timeout: 1500 });
  }


}
