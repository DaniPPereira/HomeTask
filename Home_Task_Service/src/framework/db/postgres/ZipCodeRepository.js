const db = require('./models');

console.log('Modelos registrados:', db.models ? Object.keys(db.models) : 'Nenhum modelo registrado.');
class ZipCodeRepository {
    async findAll() {
        return await db.models.zipcode.findAll();
    }
}

module.exports = new ZipCodeRepository();