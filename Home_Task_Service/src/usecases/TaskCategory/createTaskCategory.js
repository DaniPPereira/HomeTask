const taskCategoryRepository = require('../../framework/db/postgres/taskCategoryRepository');

async function createTaskCategory({ description }) {
    try {

        const createdCategory = await taskCategoryRepository.create({ description });
        return createdCategory;  
    } catch (err) {
        throw new Error('Error creating task category: ' + err.message);
    }
}

module.exports = createTaskCategory;
