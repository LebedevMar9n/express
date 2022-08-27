const Joi = require("joi");

const { nameValidator, ageValidator, emailValidator, passwordValidator, phoneValidator } = require("./common.validator");

module.exports = {
    newUserValidator: Joi.object({
        name: nameValidator.required(),
        age: ageValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
        phone: phoneValidator.required(),
    }),

    updateUserValidator: Joi.object({
        name: nameValidator,
        age: ageValidator,
    }),
};