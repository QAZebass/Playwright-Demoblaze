import { expect, test } from '@playwright/test';
import { Header } from '../pages/header';
import { ContactPage, contactMessageAlertMessage } from '../pages/contactPage';
import { contactMessageConfirmation } from '../utils/dataFixture.json';
import { dataGenerator } from '../utils/dataGenerator';

test.describe('Contact Message Testing', async () => {
    test.beforeEach('Visiting Demoblaze', async ({ page }) => {
        await page.goto('/');
    });

    test('TC1: Validate that the user can send a contact message', async ({ page }) => {
        const contactPage = new ContactPage(page);
        const header = new Header(page);
        const { email, name, message } = await dataGenerator();

        await header.clickContactButton();
        await contactPage.typeInContactEmail(email);
        await contactPage.typeInContactName(name);
        await contactPage.typeInMessage(message);
        await contactPage.contactMessageAlertListener();
        await contactPage.clickOnSendMessage();
        expect(contactMessageAlertMessage).toEqual(contactMessageConfirmation.message);
    });
    test('TC2: Validate that the user can cancel the message sending with the button "cancel"', async ({ page }) => {
        const contactPage = new ContactPage(page);
        const header = new Header(page);
        const { email, name, message } = await dataGenerator();
        await header.clickContactButton();
        await contactPage.typeInContactEmail(email);
        await contactPage.typeInContactName(name);
        await contactPage.typeInMessage(message);
        await contactPage.clickOnClose();
    });
});