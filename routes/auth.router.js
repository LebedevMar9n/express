const router = require('express').Router();

const { authController } = require('../controllers');
const { FORGOT_PASSWORD } = require('../enums/email-action.enum');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');

router.post('/login',
    authMiddleware.isLoginBodyValid,
    userMiddleware.isUserPresentByEmail,
    authController.login);
router.post('/refreshToken',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);
router.post('/logout',
    authMiddleware.checkAccesToken,
    authController.logout);
router.post('/logoutAllDevices',
    authMiddleware.checkAccesToken,
    authController.logoutAllDevices);
router.post('/password/forgot',
    authMiddleware.isEmailValid,
    userMiddleware.isUserPresentByEmail,
    authController.forgotPassword);
router.post('/password/forgot/set',
    authMiddleware.checkActionToken(FORGOT_PASSWORD),
    authController.setForgotPassword);

module.exports = router;