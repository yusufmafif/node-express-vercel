const prisma = require("../db");

const getAllProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

const getProductbyId = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    });
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
}

const deleteProductbyId = async (id) => {

    await getProductbyId(id);
  

    await prisma.product.delete({
        where: {
            id
        }
    });
}

const createData = async (data) => {
    const product = await prisma.product.create({
        data: {
            name: data.name,
            price: data.price,
            description: data.description,
            image: data.image
        }
    });
    return product;
}

const updateData = async (id, data) => {
    const product = await prisma.product.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: data.name,
            price: data.price,
            description: data.description,
            image: data.image
        }
    });
    return product;
}

const replaceData = async (id, data) => {
    const product = await prisma.product.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name: data.name,
            price: data.price,
            description: data.description,
            image: data.image
        }
    });
    return product;
}


module.exports = {
    getAllProducts,
    getProductbyId,
    deleteProductbyId,
    createData,
    updateData,
    replaceData
}

