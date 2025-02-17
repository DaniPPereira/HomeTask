const taskRepository = require('../../framework/db/postgres/TaskRepository');

async function getTaskByUser({ userId }) {
    try {
        const tasks = await taskRepository.findByUser(userId);
        if (!tasks || tasks.length === 0) {
            throw new Error('No tasks found for this user');
        }
        return tasks;
    } catch (err) {
        throw new Error('Error fetching tasks by user: ' + err.message);
    }
}

module.exports = getTaskByUser;
