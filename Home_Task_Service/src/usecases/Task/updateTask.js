const taskRepository = require('../../framework/db/postgres/TaskRepository');
const Task = require('../../framework/db/postgres/models/TaskModel');

async function updateTask({ id, title, description, data, state, photo, homeId, userId, taskCategoryId }) {
    if(!title || !description || !data || !homeId || !userId || !taskCategoryId) {
        throw new Error('Title, Description, Data, Home ID, User ID and Task Category ID are required.');
    }

    const task = await taskRepository.update(id,{ 
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

module.exports = updateTask;
