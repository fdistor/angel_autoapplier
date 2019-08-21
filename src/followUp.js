const { gmailUser, gmailPassword } = require('../config/config.js');
const options = {
	user: gmailUser,
	pass: gmailPassword,
	to: 'francis.distor@gmail.com',
	subject: 'test'
};
const send = require('gmail-send')(options);

send({
	text: 'test'
})
	.then(result => console.log(result))
	.catch(err => console.error('Error:', err));
