import { test } from "@playwright/test";
import { HomePage } from './pages/homePage';
import { Header } from './pages/header';
import { purchaseConfirmation } from './utils/dataFixture';
import { cartPage } from './pages/cartPage';
import { dataGenerator } from "./utils/dataGenerator";

test.describe('Validating Purchase of Products', async () => {

  test("Validate that the user can complete the purchase of two items", async ({ page, request, context }) => {

    const homepage = new HomePage(page, request);
    const header = new Header(page);
    const cartpage = new cartPage(page);
    const { name, country, city, creditCard, month, year } = await dataGenerator();

    await page.goto("/");
    await homepage.selectPhone();
    await header.clickHomeButton();
    await homepage.selectMonitor();
    await header.clickCartButton();
    await cartpage.clickOnPlaceOrderButton();
    await cartpage.fillOrderModal(name, country, city, creditCard, month, year);
    await cartpage.clickOnPurchaseButton();
    await cartpage.clickOkButton(purchaseConfirmation.message);

    await context.clearCookies();
    await context.clearPermissions();
  });

});