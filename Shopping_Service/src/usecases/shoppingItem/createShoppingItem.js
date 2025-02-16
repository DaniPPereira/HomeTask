const ShoppingItemRepository = require('../../framework/db/postgres/shoppingItemRepository');

module.exports = async ({ shoppingListId, description, quantity, itemCategoryId, state, price }) => {
    if (!shoppingListId || !description || !quantity || !itemCategoryId) {
        throw new Error('Shopping List ID, Description, Quantity and Category are required.');
    }

    const item = await ShoppingItemRepository.create({ 
        shoppingListId, 
        description, 
        quantity, 
        itemCategoryId, 
        state, 
        price 
    });

    return {
        status: 201,
        message: 'Item added successfully',
        item,
    };
};
