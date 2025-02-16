const HomeRepository = require('../../framework/db/postgres/HomeRepository');

module.exports = async (id, { address, name, zipCodeId }) => {
    if (!id) {
        throw new Error('ID is required.');
    }

    try {
        const [updatedRows] = await HomeRepository.update(
            { address, name, zipCodeId },
            { where: { id } }
        );

        if (updatedRows === 0) {
            return {
                status: 404,
                message: 'Home not found or no changes were made.',
            };
        }

        return {
            status: 200,
            message: 'Home updated successfully',
        };
    } catch (err) {
        throw new Error('Error updating home: ' + err.message);
    }
};
