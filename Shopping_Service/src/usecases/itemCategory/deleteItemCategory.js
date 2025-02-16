const ItemCategoryRepository = require('../../framework/db/postgres/itemCategoryRepository');

module.exports = async ({ id }) => {
    if (!id) {
        throw new Error('Item Category ID is required.');
    }

    await ItemCategoryRepository.delete(id);

    return {
        status: 200,
        message: 'Item category deleted successfully',
    };
};
