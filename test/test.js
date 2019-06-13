const { expect } = require("chai");
const SearchByRecruiterEmail = require("../src/clearbit.js");

describe("SearchRecruiterEmail class", () => {
  let searchRecruiterEmail;

  beforeEach(() => {
    const domain = "stessa.com";
    const fullName = "Jonah Schwartz";
    searchRecruiterEmail = new SearchByRecruiterEmail(domain, fullName);
  });

  it("Should exist", () => {
    expect(searchRecruiterEmail).to.exist;
  });

  it("Should initialize properties", () => {
    expect(searchRecruiterEmail.domain).to.deep.equal("stessa.com");
    expect(searchRecruiterEmail.fullName).to.deep.equal("Jonah Schwartz");
  });

  it("Should have methods", () => {
    expect(typeof searchRecruiterEmail.searchByDomain).to.equal("function");
    expect(typeof searchRecruiterEmail.searchByEmail).to.equal("function");
  });
});

describe("searchByDomain functionality", () => {
  let searchRecruiterEmail;

  beforeEach(() => {
    const domain = "stessa.com";
    const fullName = "Jonah Schwartz";
    searchRecruiterEmail = new SearchByRecruiterEmail(domain, fullName);
  });

  it("Should return the email of the query", () => {
    searchRecruiterEmail
      .searchByDomain()
      .then(email => expect(email).to.equal("jonah@stessa.com"));
  });

  it("Should return null for email not found", () => {
    searchRecruiterEmail.fullName = "Does Not Exist";
    searchRecruiterEmail
      .searchByDomain()
      .then(email => expect(email).to.equal(null));
  });
});
