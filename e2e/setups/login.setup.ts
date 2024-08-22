import { test as setup } from '@playwright/test';
import { Header } from '../pages/header';
import { LoginPage } from '../pages/loginPage';


// UI LOGIN
const authFile = "./e2e/playwright/.auth/user1.json";
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
