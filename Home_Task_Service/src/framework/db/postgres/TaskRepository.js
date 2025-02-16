const db = require('./models');

class TaskRepository {
    async create(taskData) {
        const task = await db.models.task.create(taskData);
        return task;
    }

    async findAll() {
        const tasks = await db.models.task.findAll();
        return tasks;
    }

    async findById(id) {
        const task = await db.models.task.findOne({ where: { id } });
        if (task) {
            return task;
        }
        return null;
    }

    async update(id, updatedData) {
        const task = await db.models.task.update(updatedData, { where: { id } });
        return task;
    }

    async delete(id) {
        await db.models.task.destroy({ where: { id } });
    }
    async findByHome(homeId) {
        return db.models.task.findAll({ where: { homeId } });
    }

    async findByUser(userId) {
        return db.models.task.findAll({ where: { userId } });
    }

    async findByIds(taskIds) {
        return db.models.task.findAll({ where: { id: taskIds } });
    }
}

module.exports = new TaskRepository();
