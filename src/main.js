const sheets = require("./spreadsheet.js");
const auto = require("./puppeteer");
const clearbit = require("./clearbit");

const applyToAngel = async () => {
  const jobs = await sheets.accessSpreadsheet();
};

applyToAngel();
