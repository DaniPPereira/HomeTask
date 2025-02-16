const taskParticipantsRepository = require('../../framework/db/postgres/TaskParticipantRepository');

async function getTaskParticipantsByTaskId({ taskId }) {
    try {
        const participants = await taskParticipantsRepository.findByTaskId(taskId);
        return participants;
    } catch (err) {
        throw new Error('Error fetching participants by task ID: ' + err.message);
    }
}

module.exports = getTaskParticipantsByTaskId;
