const taskRepository = require('../../framework/db/postgres/taskRepository');

async function getAllTasks() {
    try {
        const tasks = await taskRepository.findAll();
        return tasks;
    } catch (err) {
        throw new Error('Error fetching tasks: ' + err.message);
    }
}

module.exports = getAllTasks;
