const argon2 = require("argon2");
const prisma = require("../db");

const createUser = async (data) => {
    const { username, email, password } = data
    const existingUsername = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });

    if (existingUsername) {
        throw new Error("Username has already been taken");
    }

    // Periksa apakah email sudah digunakan
    const existingEmail = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (existingEmail) {
        throw new Error("Email has already been used");
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

const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    });
    return user;
}

const editUserById = async (id, data) => {
    const hashPassword = await argon2.hash(data.password);
    const user = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            username: data.username,
            email: data.email,
            role: data.role
        }
    });
    return user;
}

module.exports = {
    createUser,
    getAllUser,
    getUserById,
    editUserById
}

