const puppeteer = require("puppeteer");
const { user, password } = require("../config/config.js");

const autoApply = async jobs => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10
  });

  const homepage = "https://angel.co";
  const page = await browser.newPage();

  // Navigate to log in page
  await page.goto(homepage);
  await page.waitForSelector(".auth.login");
  await page.click(".auth.login");

  // Log in user
  await page.waitForSelector("#user_email");
  await page.click("#user_email");
  await page.type("#user_email", user);
  await page.waitForSelector("#user_password");
  await page.click("#user_password");
  await page.type("#user_password", password);
  await page.click(".c-button");

  await page.waitFor(3000);

  // Close Browser once finished
  await browser.close();
};

autoApply();
