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
    })
      .then(persons => {
        if (persons.results.length) {
          // console.log(persons.results[0].email);
          return persons.results[0].email;
        } else {
          return null;
        }
      })
      .catch(() => console.log("Invalid query"));
  }

  searchByEmail() {}
}

module.exports = SearchRecruiterEmail;
