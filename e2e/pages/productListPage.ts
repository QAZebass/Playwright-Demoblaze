import { Page, Locator } from "@playwright/test";
import { Header } from "./header";
import { cartPage } from "./cartPage";
import { productDetailPage } from "./productDetailPage";

//export let product: any;
function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class productListPage {
  page: Page;
  private productsArray: Locator;
  private allProductsWrapper: Locator;
  private prices: Locator;
  private titles: Locator;
  private header: Header;
  private cartpage: cartPage;
  private pdp: productDetailPage;

  constructor(page: Page) {
    this.pdp = new productDetailPage(page);
    this.cartpage = new cartPage(page);
    this.header = new Header(page);
    this.page = page;
    this.productsArray = this.page.locator('[class="col-lg-4 col-md-6 mb-4"]');
    this.allProductsWrapper = this.page.locator('[id="tbodyid"]');
    this.prices = this.page.locator('[class="card h-100"] h5');
    this.titles = this.page.locator('[class="card h-100"] a[class="hrefch"]');
  }

  async clickOnRandomProduct(): Promise<models.ProductInfo | undefined> {

    await this.header.waitForLoginState();
    await this.allProductsWrapper.waitFor({ state: 'visible' });
    const arrayOfProductTitles = await this.productsArray.all();
    const randomProductNumber = getRandomNumber(0, arrayOfProductTitles.length - 1);
    await this.productsArray.nth(randomProductNumber).waitFor({ state: 'visible', timeout: 2000 });
    const price: any = await this.productsArray.nth(randomProductNumber).locator(this.prices).textContent();
    const product: any = await this.productsArray.nth(randomProductNumber).locator(this.titles).textContent();
    await this.productsArray.nth(randomProductNumber).click({ timeout: 1500 });
    const productInformation: models.ProductInfo = {
      product: product,
      price: price
    };
    return productInformation;
  }

  async addProductToCart(): Promise<models.ProductInfo | undefined> {
    await this.pdp.cartAlertListener();
    const productInformation = await this.clickOnRandomProduct();
    await this.pdp.clickOnAddToCartButton();
    return productInformation;
  }


}
