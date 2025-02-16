const db = require('./models'); 

class ResidentsRepository {
    async create(residentData) {
        const resident = await db.models.residents.create(residentData);
        return resident;
    }

    async findAll() {
        const residents = await db.models.residents.findAll();
        return residents;
    }

    async findByHomeId(homeId) {
        const residents = await db.models.residents.findAll({ where: { HomeId: homeId } });
        return residents;
    }

    async findByUserId(userId) {
        const resident = await db.models.residents.findOne({ where: { UserId: userId } });
        if (resident) {
            return resident;
        }
        return null;
    }

    async delete(homeId, userId) {
        await db.models.residents.destroy({ where: { homeId: homeId, userId: userId } });
    }
}

module.exports = new ResidentsRepository();
