const ShoppingItemRepository = require('../../framework/db/postgres/shoppingItemRepository');

module.exports = async ({ shoppingListId }) => {
    if (!shoppingListId) {
        throw new Error('Shopping List ID is required.');
    }

    const items = await ShoppingItemRepository.findByShoppingListId(shoppingListId);

    return {
        status: 200,
        items,
    };
};
