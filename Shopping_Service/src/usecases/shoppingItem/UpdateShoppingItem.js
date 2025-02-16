const ShoppingItemRepository = require('../../framework/db/postgres/shoppingItemRepository');

module.exports = async ({ id, updates }) => {
    if (!id || !updates) {
        throw new Error('Shopping Item ID and updates are required.');
    }

    const existingItem = await ShoppingItemRepository.findById(id);
    if (!existingItem) {
        throw new Error(`Shopping Item with ID ${id} not found.`);
    }
    
    const updatedItem = await ShoppingItemRepository.update(id, updates);

    return {
        status: 200,
        message: 'Shopping item updated successfully',
        data: updatedItem,
    };
};
