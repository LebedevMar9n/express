const { CustomError } = require("../error/customError");
const userService = require("../service/user.service");

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await userService.findOneUser({ _id: id });
            if (!user) {
                return next(new CustomError('User not found', 404));
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserPresentByEmail: async (req, res, next) => {
        try {
            const { email } = req.body;
            const userByEmail = await userService.findOneUser({ email });
            if (!userByEmail) {
                return next(new CustomError('User not found', 404));
            }
            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },
    isUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await userService.findOneUser({ email });
            if (user) {
                return next(new CustomError('User with such ${email} is already exist'));
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
};