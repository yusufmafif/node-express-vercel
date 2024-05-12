const prisma = require("../db");


const getAllProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}

const getProductbyName = async (name) => {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: name,
                mode: 'insensitive' // mode 'insensitive' digunakan untuk mencocokkan tanpa memperhatikan huruf besar/kecil (case-insensitive)
            }
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
    await getProductbyId(id);
    await prisma.product.delete({
        where: {
            id : Number(id)
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
    getProductbyId
}

