const taskParticipantsRepository = require('../../framework/db/postgres/TaskParticipantRepository');


async function createTaskParticipant({ taskId, userId }) {
    if (!taskId || !userId) {
        throw new Error('Task ID and User ID are required.');
    }
    const taskParticipant = await taskParticipantsRepository.create({ taskId, userId });

    return taskParticipant;
}

module.exports = createTaskParticipant;
