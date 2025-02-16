const taskParticipantsRepository = require('../../framework/db/postgres/TaskParticipantRepository');

async function getTaskParticipantsByUserId({ userId }) {
    try {
        const tasks = await taskParticipantsRepository.findByUserId(userId);
        return tasks;
    } catch (err) {
        throw new Error('Error fetching tasks by user ID: ' + err.message);
    }
}

module.exports = getTaskParticipantsByUserId;
