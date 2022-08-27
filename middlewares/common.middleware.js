const { Types } = require("mongoose");
const { CustomError } = require("../error/customError");

module.exports = {
    isValidId: (req, res, next) => {
        try {
            const { id } = req.params;
            const isValid = Types.ObjectId.isValid(id);
            if (!isValid) {
                return next(new CustomError('Id is not valid'));
            }
            next();
        } catch (e) {

            next(e);
        }
    },
    isDateValid: (validationSchema, dataType = 'body') => async (req, res, next) => {
        try {
            const { error, value } = validationSchema.validate(req[dataType]);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req[dataType] = value;
            next();
        } catch (e) {
            next(e);
        }
    },
};