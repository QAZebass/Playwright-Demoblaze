import dotenv from "dotenv";
import { test as setup } from "@playwright/test";
import { Header } from '../pages/header';
import { LoginPage } from '../pages/loginPage';
dotenv.config({ path: './envs/.env.Demoblaze' });

// UI LOGIN
const authFile = "./suits/Demoblaze/playwright/.auth/user.json";
setup("log in", async ({ page }) => {


  const username = process.env.USER_NAME;
  const password = process.env.PASSWORD;

  //UI Login
  const loginpage = new LoginPage(page);
  const header = new Header(page);

  await page.goto("/");
  await header.clickLogInButton();
  await loginpage.typeInUsername(username!);
  await loginpage.typeInPassword(password!);
  await loginpage.clickLogIn();
  await header.welcomeUserAssertion(username!);

  await page.context().storageState({ path: authFile });
});

// Wait until the page receives the cookies.
//
// Sometimes login flow sets cookies in the process of several redirects.
// Wait for the final URL to ensure that the cookies are actually set.

// Alternatively, you can wait until the page reaches a state where all cookies are set.
// End of authentication steps.
