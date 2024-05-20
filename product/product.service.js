const prisma = require("../db");


const getAllProducts = async () => {
    const products = await prisma.product.findMany({
        where: {
            isDeleted: false
        }
    });
    return products;
}
const getAllProductsDisabled = async () => {
    const products = await prisma.product.findMany({
        where: {
            isDeleted: true
        }
    });
    return products;
}

const getProductbyName = async (name) => {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive' // (case-insensitive)
            },
            isDeleted: false
        }
    });
    if (products.length === 0) {
        throw new Error("Product not found");
    }
    return products;
}

const getProductbyId = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(id),
        }
    });
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
}


const deleteProductbyId = async (id) => {
    // await getProductbyId(id);
    await prisma.product.update({
        where: {
            id : Number(id)
        }
        , data: {
            isDeleted: true
        }
    });
}

const createData = async (data) => {
    const product = await prisma.product.create({
        data: {
            itemBarcode: data.itemBarcode,
            name: data.name,
            unit: data.unit,
            price: data.price,
            description: data.description,
            image: data.image,
            categoryName: data.categoryName
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
    getProductbyName,
    deleteProductbyId,
    createData,
    updateData,
    replaceData,
    getProductbyId,
    getAllProductsDisabled
}

