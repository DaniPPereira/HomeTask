const ResidentsRepository = require('../../framework/db/postgres/ResidentsRepository');

module.exports = async (homeid, userId) => {
    if (!homeid || !userId) {
        throw new Error('Home ID and User ID are required.');
    }

    try {
        const rowsDeleted = await ResidentsRepository.delete(homeid, userId);

        if (rowsDeleted === 0) {
            return {
                status: 404,
                message: 'Resident not found',
            };
        }

        return {
            status: 200,
            message: 'Resident deleted successfully',
        };
    } catch (err) {
        throw new Error('Error deleting resident: ' + err.message);
    }
};
