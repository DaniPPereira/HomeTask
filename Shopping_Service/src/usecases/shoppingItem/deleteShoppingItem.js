const ShoppingItemRepository = require('../../framework/db/postgres/shoppingItemRepository');

module.exports = async ({ id }) => {
    if (!id) {
        throw new Error('Item ID is required.');
    }

    await ShoppingItemRepository.delete(id);

    return {
        status: 200,
        message: 'Item deleted successfully',
    };
};
