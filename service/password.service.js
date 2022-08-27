const bcrypt = require('bcrypt');
const { CustomError } = require('../error/CustomError');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePassword: async (hashPassword, password) => {
        const isPaswordTheSame = await bcrypt.compare(password, hashPassword);

        if (!isPaswordTheSame) {
            throw new CustomError('Wrong email or password', 400);
        }
    },
};