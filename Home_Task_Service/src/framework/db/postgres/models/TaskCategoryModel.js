const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('TaskCategory', {
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
        tableName: 'taskcategory',
    });
};
