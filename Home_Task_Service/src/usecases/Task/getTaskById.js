const taskRepository = require('../../framework/db/postgres/taskRepository');

async function getTaskById({ id }) {
    try {
        const task = await taskRepository.findById(id);
        if (!task) {
            throw new Error('Task not found');
        }
        return task;
    } catch (err) {
        throw new Error('Error fetching task: ' + err.message);
    }
}

module.exports = getTaskById;
