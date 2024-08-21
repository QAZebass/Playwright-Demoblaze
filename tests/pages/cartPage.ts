import { Page, Locator, expect } from "@playwright/test";
import { cartLocators } from "../Locators/cart";
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
    this.cartTitle = this.page.locator(cartLocators.cartTitle);
    this.productName = this.page.locator(cartLocators.productName);
    this.productPrice = this.page.locator(cartLocators.productPrice);
    this.table = this.page.locator(cartLocators.table);
    this.tableTitleProduct = this.page.locator(cartLocators.tableTitleProduct);
    this.tablePriceProduct = this.page.locator(cartLocators.tablePriceProduct);
    this.totalPrice = this.page.locator(cartLocators.totalPrice);
    this.placeOrderButton = this.page.locator(cartLocators.placeOrderButton);
    //order modal
    this.oderModal = this.page.locator(cartLocators.orderModal);
    this.price = this.page.locator(cartLocators.price);
    this.nameInput = this.page.locator(cartLocators.nameInput);
    this.cityInput = this.page.locator(cartLocators.cityInput);
    this.countryInput = this.page.locator(cartLocators.countryInput);
    this.creditCardInput = this.page.locator(cartLocators.creditCardInput);
    this.monthInput = this.page.locator(cartLocators.monthInput);
    this.yearInput = this.page.locator(cartLocators.yearInput);
    this.modalFooter = this.page.locator(cartLocators.modalFooter);
    this.purchaseButton = this.page.locator(cartLocators.purchaseButton);
    this.closeButton = this.page.locator(cartLocators.closeButton);
    this.thankYouModal = this.page.locator(cartLocators.thankYouModal);
    this.thankYouMessage = this.page.locator(cartLocators.thankYouMessage);
    this.okButton = this.page.locator(cartLocators.okButton);
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
        await this.assertText(productname, product1);
        await this.assertText(productprice, price1);
      } else if (cartProductTable[i].name === product2) {
        const productname = cartProductTable[i].name;
        const productprice = cartProductTable[i].price;
        await this.assertText(productname, product2);
        await this.assertText(productprice, price2);
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

    const rows = await this.page.$$(cartLocators.tableRows);
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
    await this.clickOn(cartLocators.placeOrderButton);
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
    await this.assertText(+justPrice, price);
    await this.typeIn(cartLocators.nameInput, name);
    await this.typeIn(cartLocators.countryInput, country);
    await this.typeIn(cartLocators.cityInput, city);
    await this.typeIn(cartLocators.creditCardInput, creditCardNumber);
    await this.typeIn(cartLocators.monthInput, month);
    await this.typeIn(cartLocators.yearInput, year);
  }

  async clickOnPurchaseButton() {
    await this.purchaseButton.waitFor({ state: "visible" });
    await this.clickOn(cartLocators.purchaseButton);
  }

  async clickOkButton(finishPurchaseMessage: string) {
    await this.thankYouModal.waitFor({ state: "visible" });
    const thanksMessage = await this.thankYouMessage.textContent();
    await this.assertText(thanksMessage, finishPurchaseMessage);
    await this.clickOn(cartLocators.okButton);
    await this.thankYouModal.waitFor({ state: "hidden" });
  }
}
