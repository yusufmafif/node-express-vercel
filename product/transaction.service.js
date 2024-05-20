const prisma = require("../db");

const getAllTransaction = async () => {
    const transactions = await prisma.transaction.findMany({
        include: {
            user: {
                select: {
                    username: true
                }
            }
        }
    }
    );
    return transactions;
}

const getDetailTransactionById = async (id) => {
    const transaction = await prisma.transactionDetails.findMany({
        where: {
            transactionId: id
        }
    });
    if (!transaction) {
        throw new Error("Product not found");
    }
    return transaction;
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
    const { transactionData } = data
    try {
        const transaction = await prisma.transaction.create({
            data: {
                paymentMethod: transactionData.paymentMethod,
                discount: transactionData.discount,
                totalPrice: transactionData.totalPrice,
                user: {
                    connect: {
                        id: transactionData.userId
                    }
                },
                transactionDetails: {
                    create: transactionData.details.map(detail => ({
                        productPrice: detail.productPrice,
                        subTotalPrice: detail.subTotalPrice,
                        quantity: detail.quantity,
                        product: {
                            connect: {
                                id: detail.productId
                            }
                        }
                    }))
                }
            },
            include: {
                transactionDetails: true
            }
        });
        console.log('Transaksi berhasil dibuat:', transaction);
        return transaction;
    } catch (error) {
        console.error('Gagal membuat transaksi:', error);
        throw error;
    }
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
    getDetailTransactionById,
    deleteProductbyId,
    createData,
    updateData,
    replaceData
}

