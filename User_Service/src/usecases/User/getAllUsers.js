const UserRepository = require('../../framework/db/postgres/UserRepository');

module.exports = async () => {
   
    const users = await UserRepository.findAll();
    return {
        status: 200,
        users,
    };
};