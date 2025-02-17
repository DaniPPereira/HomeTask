const taskCategoryRepository = require('../../framework/db/postgres/TaskCategoryRepository');

async function getAllTaskCategories() {
    try {
        const categories = await taskCategoryRepository.findAll();
        return categories;
    } catch (err) {
        throw new Error('Error fetching task categories: ' + err.message);
    }
}

module.exports = getAllTaskCategories;
