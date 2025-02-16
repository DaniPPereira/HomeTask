const HomeRepository = require('../../framework/db/postgres/HomeRepository');

module.exports = async () => {
    try {
        const homes = await HomeRepository.findAll();
        return {
            status: 200,
            message: 'Homes fetched successfully',
            homes,
        };
    } catch (err) {
        throw new Error('Error fetching homes: ' + err.message);
    }
};
