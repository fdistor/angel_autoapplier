const { gmailUser, gmailPassword, myFullName } = require('../config/config.js');
const options = {
	user: gmailUser,
	pass: gmailPassword,
	to: 'francis.distor@gmail.com',
	subject: 'test'
};
const send = require('gmail-send')(options);

send({ text: 'test' })
	.then(result => console.log(result))
	.catch(err => console.error('Error:', err));

export default class FollowUp {
	constructor(jobs) {
		this.jobs = jobs;
		this.updatedJobs = null;
	}

	createOptions(email, position) {
		const subject = `${position} - ${myFullName} application`;

		return {
			user: gmailUser,
			pass: gmailPassword,
			to: email,
			subject
		};
	}

	getFirstName(fullName) {
		return fullName.split(' ')[0];
	}

	async followUpOneJob(job) {
		const { email, position, recruiter } = job;
		const options = this.createOptions(email, position);
	}

	followUpAllJobs(jobs) {
		jobs.forEach(job => this.followUpOneJob);
	}
}
