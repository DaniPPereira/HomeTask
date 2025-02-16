const db = require('../config');  
const ShoppingList = require('./ShoppingListModel');
const ItemCategory = require('./ItemCategoryModel');
const ShoppingItem = require('./ShoppingItemModel');

// Registre os modelos na instância do Sequelize
db.models = {};
db.models.ShoppingList = ShoppingList;
db.models.ItemCategory = ItemCategory;
db.models.ShoppingItem = ShoppingItem;


(async () => {
  try {
    
    await db.authenticate();

    db.models.ShoppingItem.belongsTo(db.models.ShoppingList, { foreignKey: 'shoppingListId' });
    db.models.ShoppingItem.belongsTo(db.models.ItemCategory, { foreignKey: 'itemCategoryId' });

    await db.sync({ alter: true });

    console.log('Modelos sincronizados com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar e sincronizar os modelos:', error);
  }
})();

module.exports = db;
