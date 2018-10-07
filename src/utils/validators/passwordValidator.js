/**
 * @type {RegExp} PasswordRegex
 * ^                         Start anchor
 * (?=.*\d)                  Ensure string has one number.
 * [A-Za-z\d]                Ensure string has one letter.
 * .{5}                      Ensure string is of length greater than 5.
 * $                         End anchor.
 */
const PASSWORD_REGEX_COMPLEX = /^(?=.*\d)[A-Za-z\d]{5,}$/;

module.exports.passwordValidator = password => PASSWORD_REGEX_COMPLEX.test(password);
