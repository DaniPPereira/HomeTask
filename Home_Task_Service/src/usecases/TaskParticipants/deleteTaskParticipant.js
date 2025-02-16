const taskParticipantsRepository = require('../../framework/db/postgres/TaskParticipantRepository');

async function deleteTaskParticipant({ taskId, userId }) {
    try {
        await taskParticipantsRepository.delete(taskId, userId);
    } catch (err) {
        throw new Error('Error removing task participant: ' + err.message);
    }
}

module.exports = deleteTaskParticipant;
