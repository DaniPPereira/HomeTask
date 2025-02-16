const taskRepository = require('../../framework/db/postgres/taskRepository');

async function getTaskByHome({ homeId }) {
    try {
        const tasks = await taskRepository.findByHome(homeId);
        if (!tasks || tasks.length === 0) {
            throw new Error('No tasks found for this home');
        }
        return tasks;
    } catch (err) {
        throw new Error('Error fetching tasks by home: ' + err.message);
    }
}

module.exports = getTaskByHome;
