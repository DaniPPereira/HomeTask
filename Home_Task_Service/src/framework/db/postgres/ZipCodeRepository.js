const db = require('./models');

class ZipCodeRepository {
    async findAll() {
        return await db.models.zipcode.findAll();
    }
}

module.exports = new ZipCodeRepository();