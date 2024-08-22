import { test, expect, APIRequestContext } from "@playwright/test";
export let selectedUnsortedProductDetails: any[] = [];
export let parsedResponse: string;
export let id: string = "";
export let deletionStatusResponse: number;
export let productID: number;
export let productuuid: string;
const fs = require("fs");
const userData = fs.readFileSync(
  "./e2e/playwright/.auth/user.json",
  "utf-8",
);
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const user = JSON.parse(userData);
const token = user.cookies.find((cookie) => cookie.name === "tokenp_").value;

export class Apis {
  readonly reqContext: APIRequestContext;
  readonly endpoints: any;
  readonly productCategory: any;

  constructor(request: APIRequestContext) {
    this.reqContext = request;
    this.endpoints = {
      getIdEndpoint: "https://api.demoblaze.com/viewcart",
      deleteFromCart: "https://api.demoblaze.com/deleteitem",
      getProductInfo: "https://api.demoblaze.com/bycat",
      chooseUnsortedProduct: "https://api.demoblaze.com/entries"
    };
    this.productCategory = {
      monitor: "monitor",
      laptops: "notebook",
      phones: "phone",
    };
  }

  public async getItemID(productid: number) {
    let statusResponse: number;

    await test.step("Getting item ID", async () => {
      const response = await this.reqContext.post(
        this.endpoints.getIdEndpoint,
        {
          data: {
            cookie: token,
            flag: true,
          },
        },
      );
      statusResponse = response.status();
      expect(statusResponse).toBe(200);
      const responseBody = await JSON.parse(await response.text());
      const arrayOfItems = responseBody.Items;
      const ids = arrayOfItems.map((el) => el.prod_id);
      const idArray = ids.length;
      for (let i = 0; i <= idArray - 1; i++) {
        if (ids[i] === productid) {
          productuuid = responseBody.Items[i].id;
        }
      }
    });
  }

  public async DeleteItemFromCart(productuuid: string) {
    await test.step("Delete produt from cart", async () => {
      const response = await this.reqContext.post(
        this.endpoints.deleteFromCart,
        {
          data: { id: productuuid },
        },
      );
      deletionStatusResponse = response.status();
    });
  }

  public async getProductInfo(productCategory: string, productName: string) {
    let statusResponse: number;

    await test.step("Get the product number", async () => {
      const response = await this.reqContext.post(
        this.endpoints.getProductInfo,
        {
          data: { cat: productCategory },
        },
      );
      statusResponse = response.status();
      expect(statusResponse).toBe(200);
      const responseBody = await JSON.parse(await response.text());
      const arrayOfItems = responseBody.Items;
      const names = arrayOfItems.map((Item) => Item.title);
      const namesArray = names.length;
      for (let i = 0; i <= namesArray - 1; i++) {
        if (names[i] === productName) {
          productID = responseBody.Items[i].id;
        }
      }
    });
  }
  /* This endpoint selects a random product and returns its category so as to go on to use the 
  getProductInfo EP. Use this only for choosing an unsorted product. */
  public async selectUnsortedProduct() {
    let statusResponse: number;

    await test.step("Choose random, unsorted product and retrieve its category and name", async () => {
      const response = await this.reqContext.get(
        this.endpoints.chooseUnsortedProduct
      );
      statusResponse = response.status();
      expect(statusResponse).toBe(200);
      const responseBody = await JSON.parse(await response.text());
      const itemsLength = responseBody.Items.length;
      const randomProduct = getRandomNumber(0, itemsLength - 1);
      const category = await responseBody.Items[randomProduct].cat;
      const id = await responseBody.Items[randomProduct].id;
      const title = await responseBody.Items[randomProduct].title;
      selectedUnsortedProductDetails.push({ cat: category, id: id, title: title, randomProductNumber: randomProduct });
    });
  }
}
