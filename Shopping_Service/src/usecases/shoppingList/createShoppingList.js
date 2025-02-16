const ShoppingListRepository = require('../../framework/db/postgres/shoppingListRepository');

module.exports = async ({ title, homeId }) => {
    if (!title || !homeId) {
        throw new Error('Title and Home ID are required.');
    }

    // Criar a lista de compras
    const shoppingList = await ShoppingListRepository.create({ title, homeId });

    return {
        status: 201,
        message: 'Shopping list created successfully',
        shoppingList,
    };
};
