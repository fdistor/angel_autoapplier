const sheets = require("./spreadsheet.js");
const auto = require("./puppeteer");
const SearchRecruiterEmail = require("./clearbit");

const applyToAngel = async () => {
  const jobs = await sheets.accessSpreadsheet();
  console.log(jobs);
  const updatedJobs = await auto.autoApply(jobs);

  for (let job of updatedJobs) {
    const { domain, recruiter } = job;
    const searchRecruiterEmail = new SearchRecruiterEmail(domain, recruiter);
    const date = new Date();

    job.email = await searchRecruiterEmail.searchByDomain();
    job.date = `${date.getMonth() + 1}/${date.getDay()}/${date.getFullYear()}`;
    console.log(job);
    sheets.updateSpreadsheetRow(job);
  }
};

applyToAngel();
