const db = require('./models');


class TaskCategoryRepository {
    async create(categoryData) {
        const category = await db.models.taskcategory.create(categoryData);
        return category;
    }

    async findAll() {
        const categories = await db.models.taskcategory.findAll();
        return categories;
    }

    async findById(id) {
        const category = await db.models.taskcategory.findOne({ where: { id } });
        if (category) {
            return category;
        }
        return null;
    }

    async update(id, updatedData) {
        const category = await db.models.taskcategory.update(updatedData, { where: { id } });
        return category;
    }

    async delete(id) {
        await db.models.taskcategory.destroy({ where: { id } });
    }
}

module.exports = new TaskCategoryRepository();
