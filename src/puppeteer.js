const puppeteer = require("puppeteer");
const { user, password, fullName } = require("../config/config.js");
const createCoverLetter = require("./coverLetter.js");

const navigateToLogin = async page => {
  const homepage = "https://angel.co";

  await page.goto(homepage);
  await page.waitForSelector(".auth.login");
  await page.click(".auth.login");
};

const logInUser = async page => {
  const emailBox = "#user_email";
  const passwordBox = "#user_password";
  const submitButton = ".c-button";

  await page.waitForSelector(emailBox);
  await page.click(emailBox);
  await page.type(emailBox, user);
  await page.waitForSelector(passwordBox);
  await page.click(passwordBox);
  await page.type(passwordBox, password);
  await page.click(submitButton);
  await page.waitForNavigation({ waitUntil: "networkidle2" });
};

const getRecruiterName = async page => {
  await page.waitForSelector(".name");
  const span = await page.$(".name");
  return await page.evaluate(element => element.textContent, span);
};

const applyToJob = async (page, job) => {
  const { company, position } = job;
  const applyButton = ".buttons.js-apply.applicant-flow-dropdown";
  const clTextArea = "textarea[name=note]";

  await page.goto(job.link);
  await page.waitForSelector(applyButton);
  await page.click(applyButton);

  const recruiter = await getRecruiterName(page);
  const cL = createCoverLetter(company, position, recruiter, fullName);
  await page.click(clTextArea);
  await page.type(clTextArea, cL);
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

  await navigateToLogin(page);
  await logInUser(page);

  await applyToJob(page, jobs[0]);

  await page.waitFor(3000);

  // Close Browser once finished
  await browser.close();
};

module.exports = { autoApply };
