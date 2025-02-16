const createShoppingList = require('./createShoppingList');
const updateShoppingList = require('./updateShoppingList');
const deleteShoppingList = require('./deleteShoppingList');
const getShoppingListById = require('./getShoppingListById');
const getShoppingListsByHouseId = require('./getShoppingListsByHouseId');

module.exports = {
    createShoppingList,
    updateShoppingList,
    deleteShoppingList,
    getShoppingListById,
    getShoppingListsByHouseId,
};
