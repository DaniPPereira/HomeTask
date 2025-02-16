const ShoppingListRepository = require('../../framework/db/postgres/shoppingListRepository');

module.exports = async ({ id }) => {
    if (!id) {
        throw new Error('Shopping list ID is required.');
    }

    await ShoppingListRepository.delete(id);

    return {
        status: 200,
        message: 'Shopping list deleted successfully',
    };
};
