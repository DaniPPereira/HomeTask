const HomeRepository = require('../../framework/db/postgres/HomeRepository');

module.exports = async ({ address, name, zipCodeId, userId }) => {
    if (!address || !name || !zipCodeId || !userId) {
        throw new Error('Address, Name, and ZipCode ID are required.');
    }

    try {
        const home = await HomeRepository.create({ address, name, zipCodeId, userId});
        return {
            status: 201,
            message: 'Home created successfully',
            home,
        };
    } catch (err) {
        throw new Error('Error creating home: ' + err.message);
    }
};
