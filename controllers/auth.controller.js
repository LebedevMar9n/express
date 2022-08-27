const { Oauth, ActionToken, User } = require("../dataBase");
const { emailActionTypeEnum } = require("../enums");
const { FORGOT_PASSWORD } = require("../enums/email-action.enum");
const { passwordService, tokenService, emailService } = require("../service");

module.exports = {
    login: async (req, res, next) => {
        try {
            const { password: hashPassword, _id } = req.user;
            const { password } = req.body;

            await passwordService.comparePassword(hashPassword, password);

            const tokens = tokenService.generateAuthToken();

            await Oauth.create({
                userId: _id,
                ...tokens,
            });

            res.json({
                user: req.user,
                ...tokens,
            });
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {

            const { userId, refresh_token } = req.tokenInfo;

            await Oauth.deleteOne({ refresh_token });

            const tokens = tokenService.generateAuthToken();

            await Oauth.create({
                userId,
                ...tokens
            });

            res.json({ tokens });

        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {

            const { acces_token, user } = req;
            const { email, name } = user;

            await Oauth.deleteOne({ acces_token });

            // await emailService.sendMail(email, emailActionTypeEnum.LOGOUT, { name, count: 1 });

            res.sendStatus(204);

        } catch (e) {
            next(e);
        }
    },
    logoutAllDevices: async (req, res, next) => {
        try {
            const { _id, email, name } = req.user;

            const { deletedCount } = await Oauth.deleteMany({ userId: _id });

            // await emailService.sendMail(email, emailActionTypeEnum.LOGOUT, { name, count: deletedCount });


            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
        setForgotPassword: async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { password } = req.body;

            const hashPasword = await passwordService.hashPassword(password);
            const updatedUser = await User.findByIdAndUpdate(_id, { password: hashPasword }, { new: true });

            await ActionToken.deleteOne({ userId: _id, actionType: FORGOT_PASSWORD });

            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { email, name, _id } = req.user;

            const token = tokenService.generateActionToken(emailActionTypeEnum.FORGOT_PASSWORD, { name, _id });

            await ActionToken.create({
                userId: _id,
                action_token: token,
                actionType: emailActionTypeEnum.FORGOT_PASSWORD,
            });

            // await emailService.sendMail(email, emailActionTypeEnum.FORGOT_PASSWORD, { name, token });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};