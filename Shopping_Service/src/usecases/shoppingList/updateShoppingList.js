const ShoppingListRepository = require('../../framework/db/postgres/shoppingListRepository');

module.exports = async ({ id, title }) => {
    if (!id || !title) {
        throw new Error('ID and title are required.');
    }

    await ShoppingListRepository.update(id, { title });

    return {
        status: 200,
        message: 'Shopping list updated successfully',
    };
};
