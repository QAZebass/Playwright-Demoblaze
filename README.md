![github-header-image (3)](https://github.com/user-attachments/assets/d43548c0-8534-437b-ba1d-cb27fc25ca96)

###

<p align="left">I'm a QA Automation and I created this repo in order to show the things I can do in Playwright. For sure I'll be adding more tests and modifying things as I learn more. Isn't that all about?. That's you'll see some extra setup files, utils or unused methods that I don't actually use in this project since I intended to run more tests in parallel but due to some problems of tests interacting with each other I decided to make things simpler.</p>

###

<h2 align="left">About me</h2>

###

<p align="left">📚 I'm currently using and learning Playwright<br>🎯 Goals:  Become the ultimate tester ninja!</p>

###

<h2 align="left">I code with</h2>

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
</div>

<h2 align="left">The Project</h2>
As you see, this Testing Automation project uses Playwright + TS. The tests test functionalities of the site "Demoblaze". The features are "Login", "Cart - Purchase" and "Contact Message". Of course I'll be adding more content as I learn and improve my techniques and skills in programming and as a tester too. So bear in mind that this is a work in progress.

<h2 align="left">Folder Structure</h2>

```
┣ 📂.github
┃ ┗ 📂workflows
┃   ┗ 📜playwright.yml
┣ 📂e2e
┃ ┣ 📂pages
┃ ┃ ┣ 📜cartPage.ts
┃ ┃ ┣ 📜contactPage.ts
┃ ┃ ┣ 📜header.ts
┃ ┃ ┣ 📜homePage.ts
┃ ┃ ┣ 📜loginPage.ts
┃ ┃ ┣ 📜productDetailPage.ts
┃ ┃ ┗ 📜productListPage.ts
┃ ┣ 📂playwright
┃ ┃ ┗ 📂.auth
┃ ┃   ┣ 📜user1.json
┃ ┃   ┣ 📜user2.json
┃ ┃   ┗ 📜user3.json
┃ ┣ 📂setups
┃ ┃ ┣ 📜login.setup.ts
┃ ┃ ┣ 📜login.setup2.ts
┃ ┃ ┗ 📜login.setup3.ts
┃ ┣ 📂specs
┃ ┃ ┣ 📜add-to-cart-complete-purchase.spec.ts
┃ ┃ ┣ 📜login.spec.ts
┃ ┃ ┗ 📜send-contact-message.spec.ts
┃ ┗ 📂utils
┃   ┣ 📜apiHelpers.ts
┃   ┣ 📜browserUtils.ts
┃   ┣ 📜dataFixture.json
┃   ┗ 📜dataGenerator.ts
┣ 📂playwright-report
┃ ┗ 📜index.html
┣ 📂test-results
┃ ┗ 📜.last-run.json
┣ 📜.env.Demoblaze
┣ 📜.gitignore
┣ 📜global.d.ts
┣ 📜package.json
┣ 📜playwright.config.ts
┣ 📜README.md
┣ 📜tsconfig.json
┗ 📜yarn.lock

```
<h2 align="left">How to run the tests (In case you want)</h2>

Bear in mind you'll first need to set environment variables in your secrets, which is the "USER_NAME" AND "PASSWORD". You can create your user in Demoblaze and then set them. You'll then need to install dotenv and create your .env.Demoblaze file in your root.

1) Copy the project URL to the clipboard
2) Use gitbash and clone the repository --> git clone projectURL
3) One the folder is in your PC, you can go into the folder, open gitbash and go "code ." to open VS code in the folder
4) Open the console, do "yarn" to install all the dependencies.
5) When the install is all over, simply run the script "yarn test"
