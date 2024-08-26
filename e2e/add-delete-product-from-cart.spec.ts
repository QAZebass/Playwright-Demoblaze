import { expect, test } from "@playwright/test";
import { HomePage } from './pages/homePage';
import { productDetailPage, cartAlertConfirmation } from './pages/productDetailPage';
import { cartConfirmation } from './utils/dataFixture';
import { productListPage } from './pages/productListPage';
import { cartPage } from "./pages/cartPage";
import { Header } from "./pages/header";

test.describe("Demoblaze Cart Testing", async () => {
  const expectedConfirmation = cartConfirmation.productAddedtoCart;

  test.beforeEach('Visiting Demoblaze', async ({ page }) => {
    await page.goto("/");
  });

  test.afterEach("Delete product after being added to cart", async ({ page }) => {
    const cartpage = new cartPage(page);
    const header = new Header(page);
    await page.goto('/');
    await header.clickCartButton();
    await cartpage.deleteItemFromCart();
  });
  test("TC1: Validate that the user can add one smartphone to cart", async ({ context, page, request }) => {

    const pdp = new productDetailPage(page);
    const homepage = new HomePage(page, request);
    const plp = new productListPage(page, request);

    await homepage.clickPhonesCategory();
    await plp.clickOnRandomProduct();
    await pdp.cartAlertListener();
    await pdp.clickOnAddToCartButton();

    expect(cartAlertConfirmation).toEqual(expectedConfirmation);
  });

  test("TC2: Validate that the user can add add one laptop to cart", async ({ page, request }) => {

    const pdp = new productDetailPage(page);
    const homepage = new HomePage(page, request);
    const plp = new productListPage(page, request);

    await homepage.clickLaptopCategory();
    await plp.clickOnRandomProduct();
    await pdp.cartAlertListener();
    await pdp.clickOnAddToCartButton();

    expect(cartAlertConfirmation).toEqual(expectedConfirmation);
  });

  test("TC3: Validate that the user can add one monitor to cart", async ({ page, request }) => {

    const pdp = new productDetailPage(page);
    const homepage = new HomePage(page, request);
    const plp = new productListPage(page, request);

    await homepage.clickMonitorCategory();
    await plp.clickOnRandomProduct();
    await pdp.cartAlertListener();
    await pdp.clickOnAddToCartButton();

    expect(cartAlertConfirmation).toEqual(expectedConfirmation);
  });

  /* test.skip("TC4: Validate that the user can add any unsorted product", async ({ context, page, request }) => {

    const pdp = new productDetailPage(page);
    const plp = new productListPage(page, request);

    await pdp.cartAlertListener();
    await pdp.clickOnAddToCartButton();
    expect(cartAlertConfirmation).toEqual(expectedConfirmation);
    await context.clearCookies();
    await context.clearPermissions();

  }); */
});
