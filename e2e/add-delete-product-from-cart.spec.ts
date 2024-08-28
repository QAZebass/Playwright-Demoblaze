import { expect, test } from "@playwright/test";
import { productDetailPage, cartAlertConfirmation } from './pages/productDetailPage';
import { staticData } from "../e2e/utils/dataFixture.json";
import { productListPage } from './pages/productListPage';
import { cartPage } from "./pages/cartPage";
import { Header } from "./pages/header";

test.describe("Demoblaze Cart Testing", async () => {
  let selectedProduct: string | any;


  test.beforeEach('Visiting Demoblaze', async ({ page }) => {
    await page.goto("/");
  });

  test.afterEach("Delete product after being added to cart", async ({ page }) => {
    const cartpage = new cartPage(page);
    const header = new Header(page);
    await page.goto('/');
    await header.clickCartButton();
    await cartpage.deleteItemFromCart(selectedProduct);
  });

  test("TC1: Validate that the user can add any product to cart", async ({ page }) => {

    const pdp = new productDetailPage(page);
    const plp = new productListPage(page);
    const header = new Header(page);
    const cartpage = new cartPage(page);

    const productInformation = await plp.clickOnRandomProduct();
    selectedProduct = productInformation?.product;
    await pdp.cartAlertListener();
    await pdp.clickOnAddToCartButton();
    expect(cartAlertConfirmation).toEqual(staticData.cartConfirmation.productAddedtoCart);
    await header.clickCartButton();
    const informationObject = await cartpage.checkingProductInCart(selectedProduct);
    expect(productInformation?.product).toEqual(informationObject?.productInCart);
    expect(productInformation?.price).toEqual(`$${informationObject?.productPriceInCart}`);
  });


});
