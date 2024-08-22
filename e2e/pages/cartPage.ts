import { Page, Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export let cartProductTable: any[] = [];
export let cartAlertConfirmation = "";
export let totalPriceInCart: any;
export const name = faker.person.firstName();
export const country = faker.location.country();
export const city = faker.location.city();
export const creditCard = faker.finance.creditCardNumber();
export const month = faker.date.month();
export const year = "2024";

export class cartPage {
  private cartButton: Locator;
  private cartTitle: Locator;
  private productName: Locator;
  private productPrice: Locator;
  private tableTitleProduct: Locator;
  private tablePriceProduct: Locator;
  private table: Locator;
  private tableRows: Locator;
  private totalPrice: Locator;
  private placeOrderButton: Locator;

  //order modal
  page: Page;
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
    this.cartTitle = this.page.locator('[class="col-lg-8"] h2');
    this.productName = this.page.locator('[class="success"] td >> nth=1');
    this.productPrice = this.page.locator('[class="success"] td >> nth=2');
    //PRODUCT TABLE
    this.table = this.page.locator('[class="table-responsive"]');
    this.tableTitleProduct = this.page.locator('th:has-text("Title")');
    this.tablePriceProduct = this.page.locator('th:has-text("Price")');
    this.totalPrice = this.page.locator("div h3");
    this.placeOrderButton = this.page.locator('button:has-text("Place Order")');
    //order modal
    this.oderModal = this.page.locator('[id="orderModal"]');
    this.price = this.page.locator('[id="totalm"]');
    this.nameInput = this.page.locator('[id="name"]');
    this.cityInput = this.page.locator('[id="city"]');
    this.countryInput = this.page.locator('[id="country"]');
    this.creditCardInput = this.page.locator('[id="card"]');
    this.monthInput = this.page.locator('[id="month"]');
    this.yearInput = this.page.locator('[id="year"]');
    this.modalFooter = this.page.locator('[class="modal-content"] >> nth=2');
    this.purchaseButton = this.page.locator('[class="modal-content"] >> nth=2 >> button:has-text("Purchase")');
    this.closeButton = this.page.locator('[class="modal-content"] >> nth=2 >> button:has-text("Close")');
    this.thankYouModal = this.page.locator('[class$="showSweetAlert visible"]');
    this.thankYouMessage = this.page.locator('[class$="showSweetAlert visible"] h2');
    this.okButton = this.page.locator('[class$="showSweetAlert visible"] button:not(.cancel.btn.btn-lg.btn-default)');
  }

  async validateProductInformation(
    product1: string,
    price1: any,
    product2: string,
    price2: any,
  ) {
    for (let i = 0; i <= cartProductTable.length - 1; i++) {
      if (cartProductTable[i].name === product1) {
        const productname = cartProductTable[i].name;
        const productprice = cartProductTable[i].price;
        expect(productname).toEqual(product1);
        expect(productprice).toEqual(price1);
      } else if (cartProductTable[i].name === product2) {
        const productname = cartProductTable[i].name;
        const productprice = cartProductTable[i].price;
        expect(productname).toEqual(product2);
        expect(productprice).toEqual(price2);
      }
    }
  }

  async clickOnPlaceOrderButton(
    product1: string,
    price1: any,
    product2: string,
    price2: any,
  ) {
    await this.page.waitForTimeout(1500);
    await this.cartTitle.waitFor();
    const title = await this.cartTitle.textContent();
    expect(title).toMatch("Products");

    const rows = await this.page.$$('[class="success"]');
    const totalInCart = await this.totalPrice.textContent();
    totalPriceInCart = +totalInCart!;
    cartProductTable.push(`Total price from cart: ${totalPriceInCart}`);

    for (let i = 0; i <= rows.length - 1; i++) {
      const productNameOnChart = await this.page
        .locator(`[class="success"] >> nth=${i} >> td >> nth=1`)
        .textContent();
      const priceOnChart = await this.page
        .locator(`[class="success"] >> nth=${i} >> td >> nth=2`)
        .textContent();

      cartProductTable.push({ Name: productNameOnChart, Price: priceOnChart });
    }

    console.log(cartProductTable);
    this.validateProductInformation(product1, price1, product2, price2);
    await this.placeOrderButton.waitFor();
    await this.placeOrderButton.click();
  }

  async fillOrderModal(
    price: any,
    name: string,
    country: string,
    city: string,
    creditCardNumber: string,
    month: string,
    year: string,
  ) {
    await this.oderModal.waitFor();
    const priceInModal = await this.price.textContent();
    const justPrice = priceInModal.replace("Total: ", "");
    expect(+justPrice).toEqual(price);
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
}
