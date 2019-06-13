const puppeteer = require("puppeteer");
const { user, password, fullName } = require("../config/config.js");
const createCoverLetter = require("./coverLetter.js");
const clearBitKey = require("../keys/clearbit_key.js");

const logInUser = async page => {
  const loginPage = "https://angel.co/login";
  const emailBox = "#user_email";
  const passwordBox = "#user_password";
  const submitButton = ".c-button";

  await page.goto(loginPage);
  await page.waitForSelector(emailBox);
  await page.type(emailBox, user);
  await page.waitForSelector(passwordBox);
  await page.type(passwordBox, password);
  await page.click(submitButton);
  await page.waitForNavigation({ waitUntil: "networkidle2" });
};

const getTextContent = async (page, selector) => {
  await page.waitForSelector(selector);
  const element = await page.$(selector);
  return await page.evaluate(element => element.textContent, element);
};

const getRecruiterEmail = async (page, name, company) => {};

const updateSpreadsheetRow = async (page, recruiter) => {};

const applyToJob = async (page, job) => {
  const applyButton = ".buttons.js-apply.applicant-flow-dropdown";
  const clTextArea = "textarea[name=note]";
  const sendApplicationButton = ".fontello-paper-plane";
  const recruiterElement = ".name";
  const companyElement = ".u-colorGray3";

  await page.goto(job.link);
  await page.waitForSelector(applyButton);
  await page.click(applyButton);

  const recruiterFullName = await getTextContent(page, recruiterElement);
  const recruiterNameArray = recruiterFullName.split("");
  const firstName = recruiterNameArray[0];

  const cL = createCoverLetter(
    company,
    position,
    firstName,
    fullName,
    job.snippet
  );
  await page.type(clTextArea, cL);

  // await page.click(sendApplicationButton);

  // await updateSpreadsheetRow(page, recruiter, re);
};

const applyToAllJobs = async (page, jobs) => {
  jobs.forEach(job => {});
};

const autoApply = async jobs => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10
  });

  const page = await browser.newPage();

  await logInUser(page);
  await applyToJob(page, jobs[0]);

  await page.waitFor(3000);

  // Close Browser once finished
  await browser.close();
};

module.exports = { autoApply };
