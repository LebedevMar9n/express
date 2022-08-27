const jwt = require('jsonwebtoken');

const { ACCES_TOKEN_SECRET, REFRESH_TOKEN_SECRET, FORGOT_PASSWORD_TOKEN_SECRET } = require('../constants/config');
const { CustomError } = require('../error/customError');
const { tokenTypeEnum, emailActionTypeEnum } = require('../enums');

module.exports = {
    generateAuthToken: (payload = {}) => {
        const access_token = jwt.sign(payload, ACCES_TOKEN_SECRET, { expiresIn: '15M' });
        const refresh_token = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
        return {
            access_token,
            refresh_token,
        };
    },
    checkToken: (token = '', tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let secret;
            if (tokenType === tokenTypeEnum.ACCESS) secret = ACCES_TOKEN_SECRET;
            if (tokenType === tokenTypeEnum.REFRESH) secret = REFRESH_TOKEN_SECRET;
            if (tokenType === emailActionTypeEnum.FORGOT_PASSWORD) secret = FORGOT_PASSWORD_TOKEN_SECRET;

            return jwt.verify(token, secret);
        } catch (e) {
            throw new CustomError('1Token not valid', 401);
        }
    },
    generateActionToken: (actionType, payload = {}) => {
        let secretWord = '';
        let expiresIn = '7d';
        if (actionType === emailActionTypeEnum.FORGOT_PASSWORD) {
            secretWord = FORGOT_PASSWORD_TOKEN_SECRET;
        }
        else {
            throw new CustomError('Wrong action type', 500);
        }
        return jwt.sign(payload, secretWord, { expiresIn });
    },
};

