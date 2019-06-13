const puppeteer = require("puppeteer");
const { user, password, fullName } = require("../config/config.js");
const createCoverLetter = require("./coverLetter.js");

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

  await logInUser(page);

  await applyToJob(page, jobs[0]);

  await page.waitFor(3000);

  // Close Browser once finished
  await browser.close();
};

module.exports = { autoApply };
