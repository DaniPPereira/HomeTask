const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
        },
        photo: {
            type: DataTypes.STRING,
        },
        homeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        taskCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'task',
    });
};
