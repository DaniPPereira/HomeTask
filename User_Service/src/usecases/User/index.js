const registerUser = require('./registerUser');
const loginUser = require('./loginUser');
const updateUser = require('./updateUser');
const forgotPassword = require('./forgotPassword');
const deleteUser = require('./deleteUser');
const getAllUsers = require('./getAllUsers');

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    forgotPassword,
    deleteUser,
    getAllUsers
};
