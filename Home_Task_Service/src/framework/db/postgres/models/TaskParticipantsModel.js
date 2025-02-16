const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('TaskParticipants', {
        taskId: {
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
          tableName: 'taskparticipants',
      });
};
