const UserRepository = require('../../framework/db/postgres/UserRepository');

module.exports = async ({ id }) => {
    if (!id) {
        throw new Error('User list ID is required.');
    }

    await UserRepository.delete(id);

    return {
        status: 200,
        message: 'User list deleted successfully',
    };
};