import { Page, Locator } from "@playwright/test";
export let cartAlertConfirmation = "";

var counter = 0;
export let selectedProductDetails: any[] = [];
export let totalFromTest: any;


export class productDetailPage {
  page: Page;
  private productInfoWrapper: Locator;
  private selectedProductName: Locator;
  private selectedProductPrice: Locator;
  private addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productInfoWrapper = this.page.locator('[class="row"]');
    this.selectedProductName = this.page.locator('h2[class="name"]');
    this.selectedProductPrice = this.page.locator('h3[class="price-container"]');
    this.addToCartButton = this.page.getByRole('link', { name: 'Add to cart' });
  }

  async clickOnAddToCartButton() {

    await this.productInfoWrapper.first().waitFor({ state: 'visible', timeout: 2000 });
    const selectedProduct = await this.selectedProductName.textContent();
    const selectedProductPrice = await this.selectedProductPrice.textContent();
    const trimmed = selectedProductPrice?.slice(0, selectedProductPrice.indexOf(" "));
    const onlyNumberPrice = trimmed?.replace("$", "");
    selectedProductDetails.push(selectedProduct, onlyNumberPrice);

    if (counter === 1) {
      console.log(selectedProductDetails);
    }
    await this.addToCartButton.click();
    await this.page.waitForTimeout(2000);
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
