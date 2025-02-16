const { DataTypes } = require('sequelize');
const db = require('../config');

const ItemCategory = db.define('ItemCategory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'itemcategory',
  timestamps: false,
});


(async () => {
  try {
    await ItemCategory.sync({ alter: true }); 
    console.log('ItemCategory model synchronized.');
  } catch (err) {
    console.error('Error synchronizing ShoppingList model:', err);
  }
})();

module.exports = ItemCategory;
