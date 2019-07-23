const SearchRecruiterEmail = require('./clearbit');

const domain = '';
const recruiterName = '';

const search = new SearchRecruiterEmail(domain, recruiterName);
const email = (() => search.searchByDomain())().then(data => console.log(data));
