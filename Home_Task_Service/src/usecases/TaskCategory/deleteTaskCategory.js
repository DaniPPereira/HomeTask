const taskCategoryRepository = require('../../framework/db/postgres/taskCategoryRepository');

async function deleteTaskCategory({ id }) {
    try {
        await taskCategoryRepository.delete(id);
    } catch (err) {
        throw new Error('Error deleting task category: ' + err.message);
    }
}

module.exports = deleteTaskCategory;
