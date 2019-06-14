const puppeteer = require("puppeteer");
const { user, password, myFullName } = require("../config/config.js");
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

const getTextContent = async (page, selector) => {
  let text;

  try {
    await page.waitForSelector(selector);
    const element = await page.$(selector);
    text = page.evaluate(element => element.textContent, element);
  } catch {
    text = null;
  }
  return text;
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

const getDomainName = async page => {
  const domainElement = ".website-link";

  return await getTextContent(page, domainElement);
};

const applyToJob = async (page, job) => {
  const { link, snippet } = job;
  const applyButton = ".buttons.js-apply.applicant-flow-dropdown";
  const clTextArea = "textarea[name=note]";
  const sendApplicationButton = ".fontello-paper-plane";

  await page.goto(link);

  const domain = await getDomainName(page);

  await page.waitForSelector(applyButton);
  await page.click(applyButton);

  const [position, company] = await getPositionAndCompany(page);
  const [
    recruiterFullName,
    recruiterFirstName
  ] = await getRecruiterFullNameAndFirstName(page);

  const cL = createCoverLetter(
    company,
    position,
    recruiterFirstName,
    myFullName,
    snippet
  );
  await page.type(clTextArea, cL);

  // await page.click(sendApplicationButton);
};

const applyToAllJobs = async (page, jobs) => {
  let i = jobs.length - 1;

  while (i >= 0) {
    await applyToJob(page, jobs[i]);
    i--;
  }
};

const autoApply = async jobs => {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();

  await logInUser(page);
  await applyToAllJobs(page, jobs);

  await page.waitFor(3000);

  // Close Browser once finished
  await browser.close();
};

module.exports = { autoApply };
