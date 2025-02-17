const taskRepository = require('../../framework/db/postgres/TaskRepository');

async function createTask({ title, description, data, state, photo, homeId, userId, taskCategoryId }) {
    if(!title || !description || !data || !homeId || !userId || !taskCategoryId) {
        throw new Error('Title, Description, Data, Home ID, User ID and Task Category ID are required.');
    }

    const task = await taskRepository.create({ 
        title, 
        description, 
        data, 
        state, 
        photo, 
        homeId, 
        userId, 
        taskCategoryId 
    });

    return task;
}

module.exports = createTask;
