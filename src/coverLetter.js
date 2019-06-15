module.exports = (company, position, recruiter, fullName, snippet) => {
  const coverLetter = `Hi ${recruiter},\n\nI'm interested in the ${position}. What ${company} is doing ${snippet} is great and I want to be a part of it. \n\nFrom,\n\n${fullName}`;
  return coverLetter;
};
