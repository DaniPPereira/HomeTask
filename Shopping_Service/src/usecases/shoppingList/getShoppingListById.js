const ShoppingListRepository = require('../../framework/db/postgres/shoppingListRepository');

module.exports = async ({ id }) => {
    if (!id) {
        throw new Error('Shopping list ID is required.');
    }

    const shoppingList = await ShoppingListRepository.findById(id);
    if (!shoppingList) {
        throw new Error('Shopping list not found.');
    }

    return {
        status: 200,
        shoppingList,
    };
};
