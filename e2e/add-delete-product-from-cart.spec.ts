import { expect, test } from "@playwright/test";
import { HomePage } from './pages/homePage';
import { productDetailPage, cartAlertConfirmation } from './pages/productDetailPage';
import { cartConfirmation, status } from './utils/dataFixture';
import { Apis, productID, deletionStatusResponse, productuuid } from './utils/apiHelpers';
import { productListPage } from './pages/productListPage';

test.describe("Demoblaze Cart Testing", async () => {
  const expectedConfirmation = cartConfirmation.productAddedtoCart;

  test.afterEach(
    "Delete product after being added to cart",
    async ({ request }) => {
      const apis = new Apis(request);
      await apis.getItemID(productID);
      await apis.DeleteItemFromCart(productuuid);
      expect(deletionStatusResponse).toBe(status.ok);
    },
  );
  test("TC1: Validate that the user can add one smartphone to cart", async ({ page, request }) => {
    const pdp = new productDetailPage(page);
    const homepage = new HomePage(page, request);
    const plp = new productListPage(page, request);

    await page.goto("/");
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

    await page.goto("/");
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

    await page.goto("/");
    await homepage.clickMonitorCategory();
    await plp.clickOnRandomProduct();
    await pdp.cartAlertListener();
    await pdp.clickOnAddToCartButton();

    expect(cartAlertConfirmation).toEqual(expectedConfirmation);
  });

  test("TC4: Validate that the user can add any unsorted product", async ({ page, request }) => {
    const pdp = new productDetailPage(page);
    const homepage = new HomePage(page, request);
    const plp = new productListPage(page, request);

    await page.goto("/");
    await plp.clickOnRandomUnsortedProduct();
    await pdp.cartAlertListener();
    await pdp.clickOnAddToCartButton();
    expect(cartAlertConfirmation).toEqual(expectedConfirmation);

  });
});
