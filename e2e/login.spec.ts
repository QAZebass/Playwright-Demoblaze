import dotenv from "dotenv";
import { test, expect } from "@playwright/test";
import { Header } from './pages/header';
import { HomePage } from './pages/homePage';
import { LoginPage } from './pages/loginPage';
import { invalidCredentials, errorMessage } from './utils/dataFixture';
import { alertMessage } from './pages/loginPage';
dotenv.config();
test.describe("Log into Demoblaze", async () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test("TC1: Validate that the user can login", async ({ page, request }) => {
        const username = process.env.USER_NAME;
        const password = process.env.PASSWORD;

        const header = new Header(page);
        const homepage = new HomePage(page, request);
        const loginpage = new LoginPage(page);

        await page.goto('/');
        await header.clickLogInButton();
        await loginpage.typeInUsername(username!);
        await loginpage.typeInPassword(password!);
        await loginpage.clickLogIn();
        await header.welcomeUserAssertion(username!);
    });

    test.use({ storageState: { cookies: [], origins: [] } });

    test("TC2: Validate that the user cant login with wrong password", async ({ page, request }) => {
        const username = process.env.USER_NAME;
        const wrongpass = invalidCredentials.invalidPassword;
        const wrongLogin = errorMessage.wrongPass;

        const homepage = new HomePage(page, request);
        const loginpage = new LoginPage(page);
        const header = new Header(page);

        await page.goto('/');
        await header.clickLogInButton();
        await loginpage.typeInUsername(username!);
        await loginpage.typeInPassword(wrongpass);
        await loginpage.alertListener();
        await loginpage.clickLogIn();
        expect(alertMessage).toMatch(wrongLogin);
    });
    test.use({ storageState: { cookies: [], origins: [] } });

    test("TC3: Validate that the user cant login with wrong username", async ({
        page,
        request,
    }) => {
        const wrongUser = invalidCredentials.invalidUser;
        const password = process.env.PASSWORD;
        const wrongLogin = errorMessage.wrongUser;

        const homepage = new HomePage(page, request);
        const header = new Header(page);
        const loginpage = new LoginPage(page);

        await page.goto("/");
        await header.clickLogInButton();
        await loginpage.typeInUsername(wrongUser);
        await loginpage.typeInPassword(password!);
        await loginpage.alertListener();
        await loginpage.clickLogIn();
        expect(alertMessage).toMatch(wrongLogin);
    });

    test.use({ storageState: "./suits/Demoblaze/playwright/.auth/user.json" });
    test("TC4: Validate that the user can log out", async ({ page, request }) => {
        const header = new Header(page);
        const homepage = new HomePage(page, request);

        await page.goto("/");
        await header.clickLogOutButton();
    });
});
