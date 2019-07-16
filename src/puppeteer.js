const puppeteer = require('puppeteer');
const { user, password, myFullName } = require('../config/config.js');
const createCoverLetter = require('./coverLetter.js');

const logInUser = async page => {
  const loginPage = 'https://angel.co/login';
  const emailBox = '#user_email';
  const passwordBox = '#user_password';
  const submitButton = '.c-button';

  await page.goto(loginPage);
  await page.waitForSelector(emailBox);
  await page.type(emailBox, user);
  await page.waitForSelector(passwordBox);
  await page.type(passwordBox, password);
  await page.click(submitButton);
};

const getTextContent = async (page, selector) => {
  let text;

  try {
    await page.waitForSelector(selector);
    const element = await page.$(selector);
    text = page.evaluate(element => element.textContent, element);
  } catch {
    text = '';
  }
  return text;
};

const getCompanyAndPosition = async page => {
  const header = '.u-colorGray3';

  const companyAndTitle = await getTextContent(page, header);
  const split = companyAndTitle.split(' at ');
  const position = split[0];
  const company = split[1];

  return [position, company];
};

const capitalizeFirstLetter = name => {
  return name ? name[0].toUpperCase() + name.slice(1) : name;
};

const getRecruiterFullNameAndFirstName = async page => {
  const recruiterElement = '.name';

  const recruiterFullName = await getTextContent(page, recruiterElement).catch(
    () => ''
  );
  const recruiterNameArray = recruiterFullName.split(' ');
  const recruiterName = recruiterNameArray
    .map(name => capitalizeFirstLetter(name))
    .join(' ');
  const firstName = capitalizeFirstLetter(recruiterNameArray[0]);

  return [recruiterName, firstName];
};

const createUpdatedJob = (
  job,
  recruiterFullName,
  companyName,
  positionTitle,
  domain
) => {
  const date = new Date();

  job.recruiter = recruiterFullName;
  job.company = companyName;
  job.position = positionTitle;
  job.applied = 'Yes';
  job.date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  job.scraped = 'Yes';
  job.domain = domain;
  return job;
};

const getDomainName = async page => {
  let domainElement = '.website-link';

  return await getTextContent(page, domainElement);
};

const pasteCL = async (page, coverLetter, selector) => {
  await page.$eval(
    selector,
    (element, cl) => (element.value = cl),
    coverLetter
  );
};

const getInfoAndApplyToJob = async (page, job) => {
  const { link, snippet } = job;
  const applyButton =
    '.c-button.c-button--blue.c-button--lg.c-button--lg.js-interested-button';
  const clTextArea = 'textarea[name=note]';
  const sendApplicationButton = '.fontello-paper-plane';

  await page.goto(link);

  const domain = await getDomainName(page);

  await page.waitForSelector(applyButton).catch(() => null);
  await page.waitFor(200);
  await page.click(applyButton);

  const [position, company] = await getCompanyAndPosition(page);

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

  await page.waitFor('.container');
  await pasteCL(page, cL, clTextArea);
  await page.type(clTextArea, ' ');
  await page.click(sendApplicationButton);

  return createUpdatedJob(job, recruiterFullName, company, position, domain);
};

const getInfoAndApplyToAllJobs = async (page, jobs) => {
  const len = jobs.length;
  let i = 0;
  let results = [];

  while (i < len) {
    const updatedJob = await getInfoAndApplyToJob(page, jobs[i]);
    results.push(updatedJob);
    i++;
  }

  return results;
};

const autoApply = async jobs => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await logInUser(page);

  const updatedJobs = await getInfoAndApplyToAllJobs(page, jobs);

  await browser.close();

  return updatedJobs;
};

module.exports = { autoApply };
