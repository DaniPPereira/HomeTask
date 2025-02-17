// src/repositories/itemCategoryRepository.js
const db  = require('./models');

class ItemCategoryRepository {
    async create(categoryData) {
        const category = await db.models.ItemCategory.create(categoryData);
        return category;
    }

    async findAll() {
        const categories = await db.models.ItemCategory.findAll();
        return categories
    }

    async findById(id) {
        const category = await db.models.ItemCategory.findOne({ where: { id } });
        if (category) {
            return category;
        }
        return null;
    }

    async update(id, updatedData) {
        const category = await db.models.ItemCategory.update(updatedData, { where: { id } });
        return category;
    }

    async delete(id) {
        await db.models.ItemCategory.destroy({ where: { id } });
    }
}

module.exports = new ItemCategoryRepository();
