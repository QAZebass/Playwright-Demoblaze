import { test as setup } from '@playwright/test';
import { Header } from '../pages/header';
import { LoginPage } from '../pages/loginPage';


// UI LOGIN
const authFile = "./e2e/playwright/.auth/user2.json";
setup("log in", async ({ page }) => {

    const username = process.env.USER_NAME2;
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
