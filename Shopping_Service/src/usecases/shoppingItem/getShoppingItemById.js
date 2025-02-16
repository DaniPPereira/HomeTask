const ShoppingItemRepository = require('../../framework/db/postgres/shoppingItemRepository');

module.exports = async ({ id }) => {
    if (!id) {
        throw new Error('Shopping Item ID is required.');
    }

    const shoppingItem = await ShoppingItemRepository.findById(id);
    if (!shoppingItem) {
        throw new Error('Shopping item not found.');
    }

    return {
        status: 200,
        shoppingItem,
    };
};
