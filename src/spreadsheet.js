const GoogleSpreadsheet = require("google-spreadsheet");
const { promisify } = require("util");
const { sheetsId } = require("../config/config.js");
const { autoApply } = require("./puppeteer.js");

const creds = require("../keys/client_secret.json");

const accessSpreadsheet = async () => {
  const doc = new GoogleSpreadsheet(sheetsId);
  await promisify(doc.useServiceAccountAuth)(creds);
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[0];

  const rows = await promisify(sheet.getRows)({
    offset: 1,
    limit: 91,
    query: "applied = No and haslink = TRUE"
  });

  await autoApply(rows);
  // console.log(rows);
};

accessSpreadsheet();
