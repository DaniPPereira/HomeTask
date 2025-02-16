const { DataTypes } = require('sequelize');
const db = require('../config');  

const ShoppingItem = db.define('ShoppingItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING, 
    allowNull: true,        
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,       
  },
}, {
  tableName: 'shoppingitem',
  timestamps: false,
});


const ShoppingList = db.models.ShoppingList;
const ItemCategory = db.models.ItemCategory;

if (ShoppingList && ItemCategory) {
  ShoppingItem.belongsTo(ShoppingList, { foreignKey: 'shoppingListId' });
  ShoppingItem.belongsTo(ItemCategory, { foreignKey: 'itemCategoryId' });
} else {
  console.error('Modelos ShoppingList ou ItemCategory não carregados corretamente.');
}

module.exports = ShoppingItem;
