const UserRepository = require('../../framework/db/postgres/UserRepository');

module.exports = async () => {
   
    const shoppingList = await UserRepository.findAll();
    return {
        status: 200,
        shoppingList,
    };
};