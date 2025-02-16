const db = require('./models');

class TaskParticipantRepository {
    async create(taskParticipantData) {
        const taskParticipant = await db.models.taskparticipants.create(taskParticipantData);
        return taskParticipant;
    }

    async findAll() {
        const taskParticipants = await db.models.taskparticipants.findAll();
        return taskParticipants;
    }

    async findByTaskId(taskId) {
        const taskParticipants = await db.models.taskparticipants.findAll({ where: { TaskId: taskId } });
        return taskParticipants;
    }

    async findByUserId(userId) {
        return db.models.taskparticipants.findAll({ where: { userId } });
    }

    async delete(taskId, userId) {
        await db.models.taskparticipants.destroy({ where: { TaskId: taskId, UserId: userId } });
    }
}

module.exports = new TaskParticipantRepository();
