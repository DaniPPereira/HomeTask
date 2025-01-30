const db = require('../postgres/models');

class userRepository {
    async create(userData) {
        const user = await db.models.User.create({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            roles: userData.roles,
            token: userData.token,
            profilepicture: userData.profilepicture,
            verificationcode: userData.verificationcode,
            codeexpiry: userData.codeexpiry
        });
        return user;
    }

    async findAll() {
        const users = await db.models.User.findAll();
        return users;
    }

    async findByUserId(userId) {
        const user = await db.models.User.findOne({ where: { id: userId } });
        return user;
    }

    async findByEmail(email) {
        const user = await db.models.User.findOne({ where: { email } });
        return user;
    }

    async update(id, updatedData) {
        const updatedUser = await db.models.User.update(updatedData, { where: { id } });
        return updatedUser;
    }

    async delete(userId) {
        await db.models.User.destroy({ where: { id: userId } });
    }
}

module.exports = new userRepository();
