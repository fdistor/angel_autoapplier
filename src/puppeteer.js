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

const getPositionAndCompany = async page => {
  const companyAndPositionElement = ".u-colorGray3";

  return (await getTextContent(page, companyAndPositionElement)).split(" at ");
};

const getRecruiterFullNameAndFirstName = async page => {
  const recruiterElement = ".name";

  const recruiterFullName = await getTextContent(page, recruiterElement);
  const recruiterNameArray = recruiterFullName.split(" ");
  const firstName = recruiterNameArray[0];

  return [recruiterFullName, firstName];
};

const getRecruiterEmail = async (page, name, company) => {};

const updateSpreadsheetRow = async (page, recruiter) => {};

const applyToJob = async (page, job) => {
  const applyButton = ".buttons.js-apply.applicant-flow-dropdown";
  const clTextArea = "textarea[name=note]";
  const sendApplicationButton = ".fontello-paper-plane";

  await page.goto(job.link);
  await page.waitForSelector(applyButton);
  await page.click(applyButton);

  const whatisthis = await getPositionAndCompany(page);
  const [position, company] = await getPositionAndCompany(page);
  const [
    recruiterFullName,
    recruiterFirstName
  ] = await getRecruiterFullNameAndFirstName(page);

  console.log("whatisthis: " + whatisthis);
  console.log("position: " + position);
  console.log("company: " + company);
  console.log("fullname: " + recruiterFullName);
  console.log("firstname: " + recruiterFirstName);

  // const cL = createCoverLetter(
  //   company,
  //   position,
  //   firstName,
  //   fullName,
  //   job.snippet
  // );
  // await page.type(clTextArea, cL);

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
