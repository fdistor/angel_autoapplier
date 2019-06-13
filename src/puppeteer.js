const puppeteer = require("puppeteer");
const { user, password } = require("../config/config.js");

const navigateToLogin = async page => {
  const homepage = "https://angel.co";

  await page.goto(homepage);
  await page.waitForSelector(".auth.login");
  await page.click(".auth.login");
};

const logInUser = async page => {
  await page.waitForSelector("#user_email");
  await page.click("#user_email");
  await page.type("#user_email", user);
  await page.waitForSelector("#user_password");
  await page.click("#user_password");
  await page.type("#user_password", password);
  await page.click(".c-button");
  await page.waitForNavigation({ waitUntil: "networkidle2" });
};

const clickOnApply = async page => {};

const applyToJob = async (page, job) => {
  await page.goto(job.link);

  const name = await getRecruiterName();
  console.log(name);
};

const applyToAllJobs = async (page, jobs) => {
  jobs.forEach(job => {});
};

const autoApply = async jobs => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10
  });

  const homepage = "https://angel.co";
  const page = await browser.newPage();

  await navigateToLogin(page);
  await logInUser(page);

  await page.waitFor(3000);

  await applyToJob(page, jobs[0]);

  // Close Browser once finished
  await browser.close();
};

module.exports = { autoApply };
