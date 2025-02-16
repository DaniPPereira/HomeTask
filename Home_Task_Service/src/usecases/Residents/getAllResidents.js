const ResidentsRepository = require('../../framework/db/postgres/ResidentsRepository');

module.exports = async () => {
    try {
        const residents = await ResidentsRepository.findAll();
        return {
            status: 200,
            message: 'ResidentsRepository fetched successfully',
            residents,
        };
    } catch (err) {
        throw new Error('Error fetching residents: ' + err.message);
    }
};
