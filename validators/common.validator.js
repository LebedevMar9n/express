const Joi = require("joi");
const { EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX } = require("../constants/regular.constants");

module.exports = {
    nameValidator: Joi.string().alphanum().min(2).max(100),
    ageValidator: Joi.number().integer().min(1).max(120),
    emailValidator: Joi.string().regex(EMAIL_REGEX).lowercase().trim(),
    passwordValidator: Joi.string().regex(PASSWORD_REGEX).required().trim(),
    phoneValidator: Joi.string().regex(PHONE_REGEX).required().trim(),
};