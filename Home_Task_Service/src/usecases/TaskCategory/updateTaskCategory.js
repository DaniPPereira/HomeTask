const taskCategoryRepository = require('../../framework/db/postgres/taskCategoryRepository');


async function updateTaskCategory({ id, description }) {
    if (!id || !description) {
        throw new Error('Description is required.');
    }

    const existingItem = await taskCategoryRepository.findById(id);
    if (!existingItem) {
        throw new Error(`Shopping Item with ID ${id} not found.`);
    }

    const updatedItem = await taskCategoryRepository.update(id, description);
    return updatedItem;
    
}

module.exports = updateTaskCategory;
