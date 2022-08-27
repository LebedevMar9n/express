const { AUTHORIZATION } = require("../constants/regular.constants");
const { ActionToken } = require("../dataBase");
const oauth = require("../dataBase/oauth");
const { CustomError } = require("../error/customError");
const { tokenService } = require("../service");
const { authValidator } = require("../validators");

module.exports = {
    checkAccesToken: async (req, res, next) => {
        try {
            const authToken = req.get(AUTHORIZATION);
            if (!authToken) {
                throw new CustomError('No token', 401);
            }
            tokenService.checkToken(authToken, 'access');

            const tokenInfo = await oauth.findOne({ access_token: authToken }).populate('userId');
            if (!tokenInfo) {
                throw new CustomError('token not valid', 401);
            }


            req.access_token = tokenInfo.access_token;
            req.user = tokenInfo.userId;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get(AUTHORIZATION);
            if (!refreshToken) {
                throw new CustomError('No token', 401);
            }
            tokenService.checkToken(refreshToken, 'refresh');

            const tokenInfo = await oauth.findOne({ refresh_token: refreshToken });

            if (!tokenInfo) {
                throw new CustomError('token not valid', 401);
            }
            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },
    isLoginBodyValid: async (req, res, next) => {
        try {
            const { error, value } = await authValidator.login.validate(req.body);

            if (error) {
                return next(new CustomError('wrong email or password'));
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
    isEmailValid: async (req, res, next) => {
        try {
            const { error, value } = await authValidator.forgotPassword.validate(req.body);

            if (error) {
                return next(new CustomError('wrong email'));
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkActionToken: (actionType) => async (req, res, next) => {
        try {
            const actionToken = req.get(AUTHORIZATION);
            if (!actionToken) {
                throw new CustomError('No token', 401);
            }
            tokenService.checkToken(actionToken, actionType);

            const tokenInfo = await ActionToken.findOne({ action_token: actionToken }).populate('userId');

            if (!tokenInfo) {
                throw new CustomError('token not valid', 401);
            }
            req.tokenInfo = tokenInfo;
            req.user = tokenInfo.userId;

            next();
        } catch (e) {
            next(e);
        }
    },
};