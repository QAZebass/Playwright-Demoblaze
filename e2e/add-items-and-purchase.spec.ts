import { getAuthDataForBrowser } from '../e2e/utils/browserUtils';
import { test } from "@playwright/test";
import { HomePage } from './pages/homePage';
import { Header } from './pages/header';
import { purchaseConfirmation } from './utils/dataFixture';
import { phone, phoneprice, monitor, monitorprice, totalFromTest } from './pages/productDetailPage';
import { cartPage, name, country, city, creditCard, month, year } from './pages/cartPage';


test.describe('Validating Purchase of Products', async () => {

  test("Validate that the user can complete the purchase of two items", async ({ page, request, browserName }) => {

    const homepage = new HomePage(page, request);
    const header = new Header(page);
    const cartpage = new cartPage(page);

    await page.goto("/");
    await homepage.selectPhone();
    await header.clickHomeButton();
    await homepage.selectMonitor();
    await header.clickCartButton();
    await cartpage.clickOnPlaceOrderButton(phone, phoneprice, monitor, monitorprice);
    await cartpage.fillOrderModal(totalFromTest, name, country, city, creditCard, month, year);
    await cartpage.clickOnPurchaseButton();
    await cartpage.clickOkButton(purchaseConfirmation.message);

  });

});
