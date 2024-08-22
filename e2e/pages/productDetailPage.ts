import { Page, Locator, expect } from "@playwright/test";
import { product } from "./productListPage";
export let cartAlertConfirmation = "";

var counter = 0;

const information = [
  { category: "phone", price: "phonePrice" },
  { category: "monitor", price: "monitorPrice" },
];
export let selectedProductDetails: any[] = [];
let prices: any[] = [];
export let totalFromTest: any;
export const phone = selectedProductDetails.phone;
export const phoneprice = selectedProductDetails.phonePrice;
export const monitor = selectedProductDetails.monitor;
export const monitorprice = selectedProductDetails.monitorPrice;

export class productDetailPage {
  page: Page;
  private productInformationWrapper: Locator;
  private selectedProductName: Locator;
  private selectedProductPrice: Locator;
  private selectedProductDescription: Locator;
  private addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productInformationWrapper = this.page.locator('[id="tbodyid"]');
    this.selectedProductName = this.page.locator('[id="tbodyid"] h2');
    this.selectedProductPrice = this.page.locator('[id="tbodyid"] h3');
    this.selectedProductDescription = this.page.locator('[id="tbodyid"] p');
    this.addToCartButton = this.page.locator('[id="tbodyid"] a');
  }

  async clickOnAddToCartButton() {
    const productNameInPDP = await this.selectedProductName.textContent();
    expect(product).toEqual(productNameInPDP!);
    const selectedProduct = await this.selectedProductName.textContent();
    const selectedProductPrice = await this.selectedProductPrice.textContent();
    const trimmed = selectedProductPrice?.slice(0, selectedProductPrice.indexOf(" "));
    const onlyNumberPrice = trimmed?.replace("$", "");

    const name = information[counter].category;
    const price = information[counter].price;

    const name_price = {};
    (name_price[name] = selectedProduct),
      (name_price[price] = +onlyNumberPrice!);

    selectedProductDetails.push(name_price);

    prices.push(+onlyNumberPrice!);
    totalFromTest = (await prices[0]) + prices[1];
    if (counter === 1) {
      selectedProductDetails.push(`Total calculated in test: ${totalFromTest}`);
      console.log(selectedProductDetails);
    }

    await this.addToCartButton.click();
    await this.page.waitForTimeout(1000);
    counter++;
  }

  async cartAlertListener() {
    this.page.on("dialog", async (dialog) => {
      const message = dialog.message();
      cartAlertConfirmation = message;
      await dialog.accept();
    });
  }
}
