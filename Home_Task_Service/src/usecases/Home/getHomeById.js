const HomeRepository = require('../../framework/db/postgres/HomeRepository');

module.exports = async (id) => {
    if (!id) {
        throw new Error('ID is required.');
    }

    try {
        const home = await HomeRepository.findById(id);
        if (!home) {
            return {
                status: 404,
                message: 'Home not found',
            };
        }
        return {
            status: 200,
            message: 'Home fetched successfully',
            home,
        };
    } catch (err) {
        throw new Error('Error fetching home: ' + err.message);
    }
};
