const clearBitKey = require("../keys/clearbit_key.js");
const clearbit = require("clearbit")(clearBitKey);

class SearchRecruiterEmail {
  constructor(domain, fullName) {
    this.domain = domain;
    this.fullName = fullName;
  }

  searchByDomain() {
    return clearbit.Prospector.search({
      domain: this.domain,
      name: this.fullName
    }).then(persons => {
      if (persons.results.length) {
        return persons.results[0].email;
      } else {
        return null;
      }
    });
  }

  searchByEmail() {}
}

module.exports = SearchRecruiterEmail;
