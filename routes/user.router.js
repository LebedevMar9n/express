const router = require('express').Router();

const userController = require('../controllers/user.controller');
const {
    commonMiddleware,
    userMiddleware,
    authMiddleware,
    fileMiddleware
} = require('../middlewares');
const { userValidator } = require('../validators');



router.get('/',
    userController.getUsers);

router.post('/',
    commonMiddleware.isDateValid(userValidator.newUserValidator),
    fileMiddleware.checkUserAvatar,
    userMiddleware.isUniqueEmail,
    userController.postUser);


router.get('/:id',
    commonMiddleware.isValidId,
    userMiddleware.isUserPresent,
    userController.getUserById);

router.put('/:id',
    commonMiddleware.isValidId,
    commonMiddleware.isDateValid(userValidator.updateUserValidator),
    userMiddleware.isUserPresent,
    authMiddleware.checkAccesToken,
    fileMiddleware.checkUserAvatar,
    userController.putUserById);

router.delete('/:id',
    commonMiddleware.isValidId,
    userMiddleware.isUserPresent,
    authMiddleware.checkAccesToken,
    userController.deleteUserById);


module.exports = router;