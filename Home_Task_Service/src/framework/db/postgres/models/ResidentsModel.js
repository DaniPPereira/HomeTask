const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Residents', {
        homeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    }, {
        tableName: 'residents',
    });
};
