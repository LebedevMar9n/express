const { User } = require("../dataBase");

module.exports = {
    findAllUsers: (params = {}) => {
        return User.find(params);
    },
    findOneUser: (params = {}) => {
        return User.findOne(params);
    },
    deleteOneUser: (params) => {
        return User.deleteOne(params);
    },
    createOneUser: (user) => {
        return User.create(user);
    },
    updateOneUser: (params = {}, userData, options = { new: true }) => {
        return User.findOneAndUpdate(params, userData, options);
    },
};