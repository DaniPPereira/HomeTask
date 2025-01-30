const bcrypt = require('bcrypt');
const userRepository = require('../../framework/db/postgres/UserRepository');

module.exports = async (userId, updateData) => {
    const { name, email, password, roles, profilepicture, verificationcode, codeexpiry } = updateData;

    // Verifica se o usuário existe
    const existingUser = await userRepository.findByUserId(userId);
    if (!existingUser) {
        throw new Error('User not found');
    }

    console.log('Existing user:', existingUser);

    // Se uma nova senha for fornecida, ela deve ser encriptada
    let updatedFields = { name, email, roles, profilepicture, verificationcode, codeexpiry };
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedFields.password = hashedPassword;
    }

    // Remove campos não definidos
    updatedFields = Object.fromEntries(
        Object.entries(updatedFields).filter(([_, value]) => value !== undefined)
    );

    console.log('Updated fields:', updatedFields);

    // Atualiza o usuário
    await userRepository.update(userId, updatedFields);

    // Busca os dados atualizados do usuário
    const updatedUser = await userRepository.findByUserId(userId);

    console.log('Updated user:', updatedUser);
    
    return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        roles: updatedUser.roles,
        profilepicture: updatedUser.profilepicture,
        verificationcode: updatedUser.verificationcode,
        codeexpiry: updatedUser.codeexpiry,
    };
};