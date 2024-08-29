import { test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { staticData } from '../utils/dataFixture.json';
import { dataGenerator } from "../utils/dataGenerator";
import { cartPage } from "../pages/cartPage";
import { Header } from "../pages/header";

test.describe("Demoblaze Purchase Testing", async () => {

    test.beforeEach('Visiting Demoblaze', async ({ page }) => {
        await page.goto("/");
    });

    test("TC1: Validate that the user can complete the purchase of two items", async ({ page, context }) => {

        const homepage = new HomePage(page);
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
        await cartpage.clickOkButton(staticData.purchaseConfirmation.message);

        await context.clearCookies();
        await context.clearPermissions();
    });

});
