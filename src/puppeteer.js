const puppeteer = require("puppeteer");

const autoApply = async jobs => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10
  });

  const homepage = "https://angel.co";
  const page = await browser.newPage();

  // Log in user
  await page.goto(homepage);
  await page.waitForSelector(".auth.login");
  await page.click(".auth.login");
  await page.waitFor(3000);

  // Close Browser once finished
  await browser.close();
};

autoApply();
