import { expect, Page, Locator } from "@playwright/test";
import { Header } from "./header";
import { productDetailPage } from "./productDetailPage";
export let contactMessageAlertMessage: any;

export class ContactPage {

    private page: Page;
    private pdp: productDetailPage;
    private header: Header;
    private contactModal: Locator;
    private contactModalTitle: Locator;
    private contactEmailInputTitle: Locator;
    private contactEmailInput: Locator;
    private contactNameInputTitle: Locator;
    private contactNameInput: Locator;
    private messageBoxTitle: Locator;
    private messageBox: Locator;
    private closeButton: Locator;
    private sendMessageButton: Locator;

    constructor(page: Page) {

        this.page = page;
        this.header = new Header(page);
        this.pdp = new productDetailPage(page);
        this.contactModal = this.page.locator('div[class="modal-content"]').first();
        this.contactModalTitle = this.page.getByText('New message', { exact: true });
        this.contactEmailInputTitle = this.page.getByText('Contact Email:', { exact: true });
        this.contactEmailInput = this.page.locator('[id="recipient-email"]');
        this.contactNameInputTitle = this.page.getByText('Contact Name:', { exact: true });
        this.contactNameInput = this.page.locator('[id="recipient-name"]');
        this.messageBoxTitle = this.page.getByText('Message:', { exact: true });
        this.messageBox = this.page.locator('[id="message-text"]');
        this.closeButton = this.page.locator('[class="modal-footer"] >> nth=0 >> button:has-text("Close")');
        this.sendMessageButton = this.page.getByRole('button', { name: 'Send message' });
    }

    async waitForContactModal() {
        await this.contactModal.waitFor({ state: 'visible', timeout: 3000 });
        const title = await this.contactModalTitle.textContent();
        expect(title).toEqual('New message');
    }
    async typeInContactEmail(email: string) {
        await this.header.waitForLoginState();
        await this.waitForContactModal();
        await this.contactEmailInputTitle.waitFor({ state: 'visible' });
        const inputTitle = await this.contactEmailInputTitle.textContent();
        expect(inputTitle).toEqual('Contact Email:');
        await this.contactEmailInput.waitFor({ state: 'attached' });
        await this.contactEmailInput.fill(email);
    }
    async typeInContactName(contactName: string) {
        await this.contactNameInputTitle.waitFor({ state: 'visible' });
        const inputNameTitle = await this.contactNameInputTitle.textContent();
        expect(inputNameTitle).toEqual('Contact Name:');
        await this.contactNameInput.waitFor({ state: 'attached' });
        await this.contactNameInput.fill(contactName);
    }
    async typeInMessage(message: string) {
        await this.messageBoxTitle.waitFor({ state: 'visible' });
        const boxTitle = await this.messageBoxTitle.textContent();
        expect(boxTitle).toEqual('Message:');
        await this.messageBox.waitFor({ state: 'attached' });
        await this.messageBox.fill(message);
    }
    async clickOnClose() {
        await this.closeButton.waitFor({ state: 'visible' });
        const buttonText = await this.closeButton.textContent();
        expect(buttonText).toEqual('Close');
        await this.closeButton.waitFor({ state: 'attached' });
        await this.closeButton.click();
        const modalHidden: any = await this.contactModal.waitFor({ state: 'hidden' });
        expect(modalHidden).toBeHidden;
    }
    async clickOnSendMessage() {
        await this.sendMessageButton.waitFor({ state: 'visible' });
        const buttonText = await this.sendMessageButton.textContent();
        expect(buttonText).toEqual('Send message');
        await this.sendMessageButton.waitFor({ state: 'attached' });
        await this.sendMessageButton.click();
    }

    async contactMessageAlertListener() {
        this.page.on("dialog", async (dialog) => {
            const message = dialog.message();
            await dialog.accept();
            contactMessageAlertMessage = message;
        });
    }


}