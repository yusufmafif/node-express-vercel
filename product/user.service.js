const argon2 = require("argon2");
const prisma = require("../db");

const createUser = async (data) => {
    const {username, email, password } = data
    const existingUsername = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });

    if (existingUsername) {
        throw new Error("Username sudah digunakan");
    }

    // Periksa apakah email sudah digunakan
    const existingEmail = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (existingEmail) {
        throw new Error("Email sudah digunakan");
    }
    const hashPassword = await argon2.hash(password);
    const user = await prisma.user.create({
        data: {
            username: data.username,
            email: data.email,
            password: hashPassword
        }
    });
}

const getAllUser = async () => {
    const user = await prisma.user.findMany();
    return user;
}

module.exports = {
    createUser,
    getAllUser
}

