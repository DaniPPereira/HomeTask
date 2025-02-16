const db = require('./models');

class ShoppingListRepository {
    async create(shoppingListData) {
        const shoppingList = await db.models.ShoppingList.create(shoppingListData);
        return shoppingList;
    }

    async findById(id) {
        const shoppingList = await db.models.ShoppingList.findOne({ where: { id } });
        if (shoppingList) {
            return shoppingList;
        }
        return null;
    }

    async findByHouseId(homeId) {
        const shoppingList = await db.models.ShoppingList.findOne({ where: { homeId } });
        if (shoppingList) {
            return shoppingList;
        }
        return null;
    }

    async update(id, updatedData) {
        const shoppingList = await db.models.ShoppingList.update(updatedData, { where: { id } });
        return shoppingList;
    }

    async delete(id) {
        await db.models.ShoppingList.destroy({ where: { id } });
    }
}

module.exports = new ShoppingListRepository();
