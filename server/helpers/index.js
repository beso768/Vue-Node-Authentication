function onlyLatinCharacters(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function calcMaxDate() {
  let eighteenYearsAgo = new Date();
  return eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
}

module.exports = { onlyLatinCharacters, calcMaxDate };
