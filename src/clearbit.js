const clearBitKey = require('../keys/clearbit_key.js');
const clearbit = require('clearbit')(clearBitKey);

class SearchRecruiterEmail {
  constructor(domain, fullName) {
    this.domain = domain;
    this.fullName = fullName;
  }

  async searchByDomain() {
    if (this.domain && this.fullName) {
      return clearbit.Prospector.search({
        domain: this.domain,
        name: this.fullName
      }).then(persons =>
        persons.results.length ? persons.results[0].email : null
      );
    } else {
      return null;
    }
  }
}

module.exports = SearchRecruiterEmail;
