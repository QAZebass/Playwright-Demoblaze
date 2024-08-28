![github-header-image](https://github.com/user-attachments/assets/83613e35-5377-4e9f-8ef5-5acac13994ee)

## Folder Structure

Playwright-Demoblaze
├── .env.Demoblaze
├── .github
│   └── workflows
│       └── playwright.yml
├── .gitignore
├── e2e
│   ├── add-delete-product-from-cart.spec.ts
│   ├── add-items-and-purchase.spec.ts
│   ├── login.spec.ts
│   ├── pages
│   │   ├── cartPage.ts
│   │   ├── header.ts
│   │   ├── homePage.ts
│   │   ├── loginPage.ts
│   │   ├── productDetailPage.ts
│   │   └── productListPage.ts
│   ├── playwright
│   │   └── .auth
│   │       ├── user1.json
│   │       ├── user2.json
│   │       └── user3.json
│   ├── setups
│   │   ├── login.setup.ts
│   │   ├── login.setup2.ts
│   │   └── login.setup3.ts
│   └── utils
│       ├── apiHelpers.ts
│       ├── browserUtils.ts
│       ├── dataFixture.ts
│       └── dataGenerator.ts
├── playwright.config.ts
├── README.md
└── yarn.lock
