const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const { sheetsId } = require('../config/config.js');

const creds = require('../keys/client_secret.json');

module.exports = {
	accessSpreadsheet: async () => {
		const doc = new GoogleSpreadsheet(sheetsId);
		await promisify(doc.useServiceAccountAuth)(creds);
		const info = await promisify(doc.getInfo)();
		const sheet = info.worksheets[0];

		const rows = await promisify(sheet.getRows)({
			offset: 1,
			limit: 120,
			query: 'applied = No and haslink = TRUE'
		});

		return rows;
	},

	updateSpreadsheetRow: async job => {
		await job.save();
	}
};
