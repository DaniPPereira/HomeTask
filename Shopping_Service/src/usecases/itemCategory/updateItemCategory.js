const ItemCategoryRepository = require('../../framework/db/postgres/itemCategoryRepository');

module.exports = async ({ id, description }) => {
    if (!id || !description) {
        throw new Error('Item Category ID and description are required.');
    }

    await ItemCategoryRepository.update(id, { description });

    return {
        status: 200,
        message: 'Item category updated successfully',
    };
};
