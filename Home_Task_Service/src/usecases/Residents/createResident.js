const ResidentsRepository = require('../../framework/db/postgres/ResidentsRepository');

module.exports = async ({ userId, homeId }) => {
    if (!userId || !homeId) {
        throw new Error('Preencha todos os campos!');
    }

    try {
        const resident = await ResidentsRepository.create({ userId ,homeId });
        return {
            status: 201,
            message: 'Resident created successfully',
            resident,
        };
    } catch (err) {
        throw new Error('Error creating resident: ' + err.message);
    }
};
