import dotenv from "dotenv";
import { test, expect } from "@playwright/test";
import { Header } from './pages/header';
import { LoginPage } from './pages/loginPage';
import { invalidCredentials, errorMessage } from './utils/dataFixture';
import { alertMessage } from './pages/loginPage';
dotenv.config();


test.describe("Log into Demoblaze", () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test("TC1: Validate that the user can login", async ({ page }) => {

        const username = process.env.USER_NAME;
        const password = process.env.PASSWORD;

        const header = new Header(page);
        const loginpage = new LoginPage(page);

        await page.goto('/');
        await header.clickLogInButton();
        await loginpage.typeInUsername(username!);
        await loginpage.typeInPassword(password!);
        await loginpage.clickLogIn();
        await header.welcomeUserAssertion(username!);
    });

    test("TC2: Validate that the user can't login with wrong password", async ({ page }) => {
        const username = process.env.USER_NAME;
        const wrongpass = invalidCredentials.invalidPassword;
        const wrongLogin = errorMessage.wrongPass;

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

    test("TC3: Validate that the user can't login with wrong username", async ({ page }) => {
        const wrongUser = invalidCredentials.invalidUser;
        const password = process.env.PASSWORD;
        const wrongLogin = errorMessage.wrongUser;

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
});

test.describe("Log out from Demoblaze", () => {

    test("TC4: Validate that the user can log out", async ({ page }) => {
        const header = new Header(page);

        await page.goto("/");
        await header.clickLogOutButton();
    });
});