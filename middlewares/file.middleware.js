const { IMAGE_MAX_SIZE, IMAGE_MIMETYPES } = require("../constants/regular.constants");
const { CustomError } = require("../error/CustomError");

module.exports = {
  checkUserAvatar: async (req, res, next) => {
    try {
      if (!req.files?.avatar) {
        return next();
      }

      const { mimetype, size } = req.files.avatar;

      if (size > IMAGE_MAX_SIZE) {
        return next(new CustomError('Max size 3MB'));
      }

      if (!IMAGE_MIMETYPES.includes(mimetype)) {
        return next(new CustomError('Wrong file type'));
      }

      next();
    } catch (e) {
      next(e);
    }
  },
}