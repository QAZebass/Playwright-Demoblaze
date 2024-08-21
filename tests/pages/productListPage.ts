import { Page, Locator, APIRequestContext } from "@playwright/test";
import { basePage } from "./basePage";
import { productCat, productCategory } from "./homePage";
import { plpLocators } from "../Locators/plp";
import { Apis, selectedUnsortedProductDetails } from "../utils/apiHelpers";
export let product: any;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class productListPage extends basePage {
  private apis: Apis;
  private productsArray: Locator;

  constructor(page: Page, request: APIRequestContext) {
    super(page);

    this.apis = new Apis(request);
    this.productsArray = this.page.locator(plpLocators.productsArray);
  }

  async clickOnRandomProduct() {

    const array = await this.page.$$(plpLocators.productsArray);
    const randomProductNumber = getRandomNumber(0, array.length - 1);
    console.log(`Number of ${productCategory} available: ${array.length}`);
    const productPicture = this.page.locator(
      `[class="card h-100"] >> nth=${randomProductNumber} >> img`,
    );

    product = await this.page
      .locator(`[class="card h-100"] >> nth=${randomProductNumber} >> h4`)
      .textContent();
    console.log(`The selected product is: ${product}`);
    this.apis.getProductInfo(productCat, product);
    await productPicture.click();
  }

  /* Use the data from "selectUnsortedProduct()" here */
  async clickOnRandomUnsortedProduct() {

    await this.apis.selectUnsortedProduct()
    const randomProductNumber = await selectedUnsortedProductDetails[0].randomProductNumber
    product = await selectedUnsortedProductDetails[0].title
    const category = await selectedUnsortedProductDetails[0].cat
    console.log(`The selected product is: ${product}`)
    this.apis.getProductInfo(category, product)
    await this.clickOn(`[class="card h-100"] >> nth=${randomProductNumber} >> img`)
  }
}
