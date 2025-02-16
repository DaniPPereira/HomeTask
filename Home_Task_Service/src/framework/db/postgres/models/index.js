const db = require('../config');

const Task = require('./TaskModel');
const TaskCategory = require('./TaskCategoryModel');
const TaskParticipants = require('./TaskParticipantsModel');
const Home = require('./HomeModel');
const ZipCode = require('./ZipCodeModel');
const Residents = require('./ResidentsModel');


const models = {
    task: Task(db),
    taskcategory: TaskCategory(db),
    taskparticipants: TaskParticipants(db),
    home: Home(db),
    zipcode: ZipCode(db),
    residents: Residents(db),
};

const associateModels = () => {
    models.task.belongsTo(models.taskcategory, { foreignKey: 'taskCategoryId' });
    models.task.belongsTo(models.home, { foreignKey: 'homeId' });
    models.task.belongsTo(models.residents, { foreignKey: 'userId' });

    models.taskparticipants.belongsTo(models.task, { foreignKey: 'taskId' });
    models.taskparticipants.belongsTo(models.residents, { foreignKey: 'userId' });

    models.residents.belongsTo(models.home, { foreignKey: 'homeId' });
    models.home.belongsTo(models.zipcode, { foreignKey: 'zipCodeId' });
};

const initializeModels = async () => {
    try {
        associateModels();

        await db.sync({ alter: true });

        console.log('✅ Modelos inicializados e sincronizados com sucesso!');
    } catch (error) {
        console.error('❌ Erro durante a inicialização dos modelos:', error);
        throw error;
    }
};

module.exports = {
    models,        
    db,           
    initializeModels,
};