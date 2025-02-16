const HomeRepository = require('../../framework/db/postgres/HomeRepository');

module.exports = async (id) => {
    if (!id) {
        throw new Error('ID is required.');
    }

    try {
        const rowsDeleted = await HomeRepository.delete(id);

        if (rowsDeleted === 0) {
            return {
                status: 404,
                message: 'Home not found',
            };
        }

        return {
            status: 200,
            message: 'Home deleted successfully',
        };
    } catch (err) {
        throw new Error('Error deleting home: ' + err.message);
    }
};
