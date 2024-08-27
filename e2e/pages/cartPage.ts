import { Page, Locator, expect } from "@playwright/test";
import { selectedProductDetails } from "./productDetailPage";
import { Header } from "./header";
import { product } from "./productListPage";
export let productDetailsInTable: any[] = [];
export let cartAlertConfirmation = "";
export let totalPriceInCart: any;
let intPrices: any[] = [];
let pricesSum: number;

export class cartPage {
  private header: Header;
  page: Page;
  private table: Locator;
  private tableRows: Locator;
  private deleteButton: Locator;
  private cartTitle: Locator;
  private productTitlesInTable: Locator;
  private productPricesInTable: Locator;
  private totalPrice: Locator;
  private placeOrderButton: Locator;

  //order modal

  private oderModal: Locator;
  private price: Locator;
  private nameInput: Locator;
  private countryInput: Locator;
  private cityInput: Locator;
  private creditCardInput: Locator;
  private monthInput: Locator;
  private yearInput: Locator;
  private modalFooter: Locator;
  private purchaseButton: Locator;
  private closeButton: Locator;
  private thankYouModal: Locator;
  private thankYouMessage: Locator;
  private okButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.cartTitle = this.page.getByText('Products', { exact: true });
    //PRODUCT TABLE
    this.table = this.page.locator('[id="tbodyid"]');
    this.tableRows = this.page.locator('tr[class="success"]');
    this.deleteButton = this.page.locator('td a');
    this.totalPrice = this.page.locator("div h3");
    this.productTitlesInTable = this.page.locator('tr td:nth-child(2)');
    this.productPricesInTable = this.page.locator('tr td:nth-child(3)');
    this.placeOrderButton = this.page.getByRole('button', { name: "Place Order" });
    //ORDER MODAL
    this.oderModal = this.page.locator('[id="orderModal"]');
    this.price = this.page.locator('[id="totalm"]');
    this.nameInput = this.page.locator('[id="name"]');
    this.cityInput = this.page.locator('[id="city"]');
    this.countryInput = this.page.locator('[id="country"]');
    this.creditCardInput = this.page.locator('[id="card"]');
    this.monthInput = this.page.locator('[id="month"]');
    this.yearInput = this.page.locator('[id="year"]');
    this.modalFooter = this.page.locator('[class="modal-content"] >> nth=2');
    this.purchaseButton = this.page.getByRole('button', { name: "Purchase" });
    this.closeButton = this.page.getByRole('button', { name: "Close" });
    this.thankYouModal = this.page.locator('[class$="showSweetAlert visible"]');
    this.thankYouMessage = this.page.locator('[class$="showSweetAlert visible"] h2');
    this.okButton = this.page.getByRole('button', { name: 'OK' });
  }


  async gettingProductInfoInCart() {
    await this.cartTitle.waitFor({ state: 'visible' });
    await expect(this.table).toBeVisible();

    const products = await this.productTitlesInTable.evaluateAll(products => products.map(product => product.textContent?.trim()));
    products.forEach(product => productDetailsInTable.push(product));
    const prices = await this.productPricesInTable.evaluateAll(prices => prices.map(price => price.textContent?.trim()));
    prices.forEach(price => { const ints = Number(price); intPrices.push(ints); });
    prices.forEach(price => productDetailsInTable.push(price));
    pricesSum = intPrices[0] + intPrices[1];
    expect(selectedProductDetails).toEqual(expect.arrayContaining(productDetailsInTable));
  }

  async clickOnPlaceOrderButton() {
    await this.placeOrderButton.waitFor();
    await this.placeOrderButton.click();
  }

  async fillOrderModal(name: string, country: string, city: string, creditCardNumber: string, month: string, year: string) {
    await this.gettingProductInfoInCart();
    await this.oderModal.waitFor();
    const priceInModal = await this.price.textContent();
    const justPrice = priceInModal!.replace("Total: ", "");
    expect(+justPrice).toEqual(pricesSum);
    await this.nameInput.fill(name);
    await this.countryInput.fill(country);
    await this.cityInput.fill(city);
    await this.creditCardInput.fill(creditCardNumber);
    await this.monthInput.fill(month);
    await this.yearInput.fill(year);
  }

  async clickOnPurchaseButton() {
    await this.purchaseButton.waitFor({ state: "visible" });
    await this.purchaseButton.click();
  }

  async clickOkButton(finishPurchaseMessage: string) {
    await this.thankYouModal.waitFor({ state: "visible" });
    const thanksMessage = await this.thankYouMessage.textContent();
    expect(thanksMessage).toEqual(finishPurchaseMessage);
    await this.okButton.click();
    await this.thankYouModal.waitFor({ state: "hidden" });
  }
  async deleteItemFromCart() {
    await this.header.waitForLoginState();
    await this.table.waitFor({ state: 'visible' });
    const arrayOfRows = await this.tableRows.all();
    for (let i = 0; i <= arrayOfRows.length - 1; i++) {
      const productRow = await this.page.locator(`[class="success"] >> nth=${i} >> td >> nth=1`).textContent();
      if (productRow === product) {
        console.log("Product found in the cart.");
        await this.deleteButton.nth(i).click({ timeout: 2000 });

        await this.page.locator(`[class="success"] >> nth=${i}`).waitFor({ state: 'detached' });
        console.log("Product successfully deleted from the cart.");

        break;
      }
    }
  }

}
