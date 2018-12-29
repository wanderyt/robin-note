
/**
 * Get session token via customized regex
 * @description Get session token via customized regex
 * @param {String[]} cookies
 * @param {RegExp} reg - cookies regex to match related token
 * @returns {String} targeted token string
 */
const getTokenByRegex = (cookies, reg = /(wctk=\w*);/) => {
  const matchResult = cookies.join(';').match(reg);
  if (matchResult && matchResult.length > 1) {
    return matchResult[1];
  } else {
    return '';
  }
};

module.exports = {
  getTokenByRegex
};