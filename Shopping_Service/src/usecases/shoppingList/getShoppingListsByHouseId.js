const ShoppingListRepository = require('../../framework/db/postgres/shoppingListRepository');

module.exports = async ({ homeId }) => {
    if (!homeId) {
        throw new Error('Home ID is required.');
    }

    const shoppingList = await ShoppingListRepository.findByHouseId(homeId);

    return {
        status: 200,
        shoppingList,
    };
};
