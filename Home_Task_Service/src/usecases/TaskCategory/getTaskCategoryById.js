const taskCategoryRepository = require('../../framework/db/postgres/taskCategoryRepository');

async function getTaskCategoryById({ id }) {
    try {
        const category = await taskCategoryRepository.findById(id);
        if (!category) {
            throw new Error('Task category not found');
        }
        return category;
    } catch (err) {
        throw new Error('Error fetching task category: ' + err.message);
    }
}

module.exports = getTaskCategoryById;
