const sheets = require("./spreadsheet.js");
const auto = require("./puppeteer");
const SearchRecruiterEmail = require("./clearbit");

const applyToAngel = async () => {
  const jobs = await sheets.accessSpreadsheet();
  const updatedJobs = await auto.autoApply(jobs);

  for (let job of updatedJobs) {
    const { domain, recruiter } = job;
    const searchRecruiterEmail = new SearchRecruiterEmail(domain, recruiter);

    job.email = await searchRecruiterEmail.searchByDomain();

    sheets.updateSpreadsheetRow(job);
  }
};

const email = "";
const name = "";

// applyToAngel();
const s = new SearchRecruiterEmail(email, name);
const email = s.searchByDomain().then(data => console.log(data));
