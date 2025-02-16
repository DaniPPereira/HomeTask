const ItemCategoryRepository = require('../../framework/db/postgres/itemCategoryRepository');

module.exports = async () => {
    const categories = await ItemCategoryRepository.findAll();

    return {
        status: 200,
        categories,
    };
};
