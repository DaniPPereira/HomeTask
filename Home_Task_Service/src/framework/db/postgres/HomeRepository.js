const db = require('./models'); 

class HomeRepository {
    async create(homeData) {
        const home = await db.models.home.create(homeData);
        return home;
    }

    async findAll() {
        const homes = await db.models.home.findAll();
        return homes;
    }

    async findById(id) {
        const home = await db.models.home.findOne({ where: { id } });
        if (home) {
            return home;
        }
        return null;
    }

    async update(id, updatedData) {
        const home = await db.models.home.update(updatedData, { where: { id } });
        return home;
    }

    async delete(id) {
        await db.models.home.destroy({ where: { id } });
    }
}

module.exports = new HomeRepository();
