const sheets = require('./spreadsheet.js');
const followUpToJobsQuery = 'followup = Yes and hasemail = TRUE';
const FollowUp = require('./followUp.js');

const followUp = async () => {
	const jobs = await sheets.accessSpreadsheet(followUpToJobsQuery);
	const followUp = new FollowUp(jobs);
	const updatedJobs = await followUp.followUpAllJobs();

	updatedJobs.forEach(job => sheets.updateSpreadsheetRow(job));
};

followUp();
