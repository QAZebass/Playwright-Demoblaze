import fs from 'fs';

const authFilePaths: Record<string, string> = {
    'chromium': './e2e/playwright/.auth/user1.json',
    'firefox': './e2e/playwright/.auth/user2.json',
    'webkit': './e2e/playwright/.auth/user3.json',
};


export async function getAuthDataForBrowser(browserType: string) {
    const authFilePath = authFilePaths[browserType];

    const userData = fs.readFileSync(authFilePath, 'utf-8');
    const user = JSON.parse(userData);
    const token = user.cookies.find((cookie) => cookie.name === "tokenp_").value;
    return token;
}