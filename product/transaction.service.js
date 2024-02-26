const prisma = require("../db");

const getAllTransaction = async () => {
    const transactions = await prisma.transaction.findMany();
    return transactions;
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

const createData = async (dataArray) => {
    const transactions = [];
    for (const data of dataArray) {
        const transaction = await prisma.transaction.create({
            data: {
                product: {
                    connect: {
                        id: data.productId
                    }
                },
                user: {
                    connect: {
                        id: data.userId
                    }
                },          
                quantity: data.quantity
            }
        }); 
        transactions.push(transaction);
    }       
    return transactions;    
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
    getAllTransaction,
    getProductbyId,
    deleteProductbyId,
    createData,
    updateData,
    replaceData
}

