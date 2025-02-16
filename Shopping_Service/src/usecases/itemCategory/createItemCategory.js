const ItemCategoryRepository = require('../../framework/db/postgres/itemCategoryRepository');

module.exports = async ({ description }) => {
    if (!description) {
        throw new Error('Item category description is required.');
    }

    const category = await ItemCategoryRepository.create({ description });

    return {
        status: 201,
        message: 'Item category added successfully',
        category,
    };
};
