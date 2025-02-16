// src/repositories/shoppingItemRepository.js
const  db  = require('./models');
const ShoppingItem = require('../../../entities/shoppingItem');

class ShoppingItemRepository {
    async create(itemData) {
        const item = await db.models.ShoppingItem.create(itemData);
        return item;
    }

    async findById(id) {
        const item = await db.models.ShoppingItem.findByPk(id);
        return item;
    }

    async findByShoppingListId(shoppingListId) {
        const items = await db.models.ShoppingItem.findAll({ where: { shoppingListId } });
        return items
    }

    async update(id, updatedData) {
        const item = await db.models.ShoppingItem.update(updatedData, { where: { id } });
        return item;
    }

    async delete(id) {
        await db.models.ShoppingItem.destroy({ where: { id } });
    }
}

module.exports = new ShoppingItemRepository();
