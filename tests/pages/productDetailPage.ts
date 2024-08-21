import { Page, Locator, expect } from "@playwright/test";
import { basePage } from "./basePage";
import { pdpLocators } from "../Locators/pdp";
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

export class productDetailPage extends basePage {
  private productInformationWrapper: Locator;
  private selectedProductName: Locator;
  private selectedProductPrice: Locator;
  private selectedProductDescription: Locator;
  private addToCartButton: Locator;

  constructor(page: Page) {
    super(page);

    this.productInformationWrapper = this.page.locator(
      pdpLocators.productInformationWrapper,
    );
    this.selectedProductName = this.page.locator(
      pdpLocators.selectedProductName,
    );
    this.selectedProductPrice = this.page.locator(
      pdpLocators.selectedProductPrice,
    );
    this.selectedProductDescription = this.page.locator(
      pdpLocators.selectedProductDescription,
    );
    this.addToCartButton = this.page.locator(pdpLocators.addToCartButton);
  }

  async clickOnAddToCartButton() {
    const productNameInPDP = await this.selectedProductName.textContent();
    await this.assertText(product, productNameInPDP!)
    const selectedProduct = await this.selectedProductName.textContent();
    const selectedProductPrice = await this.selectedProductPrice.textContent();
    const trimmed = selectedProductPrice?.slice(
      0,
      selectedProductPrice.indexOf(" "),
    );
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

    await this.page.locator(pdpLocators.addToCartButton).click();
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
