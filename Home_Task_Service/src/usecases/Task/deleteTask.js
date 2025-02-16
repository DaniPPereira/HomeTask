const taskRepository = require('../../framework/db/postgres/taskRepository');

async function deleteTask({ id }) {
    try {
        await taskRepository.delete(id);
    } catch (err) {
        throw new Error('Error deleting task: ' + err.message);
    }
}

module.exports = deleteTask;
