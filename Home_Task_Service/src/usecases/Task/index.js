const createTask = require('./createTask');
const updateTask = require('./updateTask');
const deleteTask = require('./deleteTask');
const getAllTasks = require('./getAllTasks');
const getTaskById = require('./getTaskById');
const getTasksByHome = require('./getTasksByHome');
const getTasksByUser = require('./getTasksByUser');

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getAllTasks,
    getTaskById,
    getTasksByHome,
    getTasksByUser
};
