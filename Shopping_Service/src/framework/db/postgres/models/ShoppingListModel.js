const { DataTypes } = require('sequelize');
const db = require('../config');

const ShoppingList = db.define(
  'ShoppingList',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'shoppinglist',
    timestamps: false,
  }
);


(async () => {
  try {
    await ShoppingList.sync({ alter: true }); 
    console.log('ShoppingList model synchronized.');
  } catch (err) {
    console.error('Error synchronizing ShoppingList model:', err);
  }
})();

module.exports = ShoppingList;
