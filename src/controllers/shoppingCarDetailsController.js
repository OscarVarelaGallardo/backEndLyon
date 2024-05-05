import CartDetails from "../models/CartDetails.js";
import Product from "../models/Products.js"; // Assuming you have a Product model

export const createShoppingCar = async (req, res) => {
    const { quantity, total, productId, shoppingCartId } = req.body;
    const existProduct = await Product.findOne({ _id:productId });
  
    if (!existProduct) {
        return res.status(400).json({ status: 400, msg: 
            'El producto no existe en la base de datos'
         });
    }
    if(existProduct.stock < quantity){
        return res.status(400).json({ status: 400, msg: 
            'No hay suficiente stock para realizar la compra'
         });
    }

    try {
        const cartDetails = new CartDetails({ quantity, total, productId, shoppingCartId });
        //quitar los productos del stock
        existProduct.stock = existProduct.stock - quantity;
        await existProduct.save();
        //ver cuantos productos me restan en stock
        await cartDetails.save();

        res.status(201).json({ status: 201, msg: 'CartDetails creado correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error en el servidor', error: error });
    }
}

const getShoppingCarById = async (req, res) => {
    const { id } = req.params;
    try {
        const cartDetails = await CartDetails.findOne({ _id: id });
        if (!cartDetails) {
            return res.status(400).json({ status: 400, msg: 'CartDetails no encontrado' });
        }
        res.status(200).json({ status: 200, cartDetails });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error en el servidor' });
    }
}

const getAllCartDetails = async (req, res) => {
    try {
        const cartDetails = await CartDetails.find();
        if (!cartDetails || cartDetails.length === 0) {
            return res.status(400).json({ status: 400, msg: 'No hay detalles de carritos almacenados' });
        }
        res.status(200).json({ status: 200, cartDetails });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ status: 500, msg: 'Error en el servidor :c', error: error });
    }
}

const updateCartDetails = async (req, res) => {
    const { id } = req.params;
    const { quantity, total, productId, shoppingCartId } = req.body;
    try {
        const cartDetails = await CartDetails.findOne({ _id: id });
        if (!cartDetails) {
            return res.status(400).json({ status: 400, msg: 'CartDetails no encontrado' });
        }
        cartDetails.quantity = quantity;
        cartDetails.total = total;
        cartDetails.productId = productId;
        cartDetails.shoppingCartId = shoppingCartId;
        await cartDetails.save();
        res.status(200).json({ status: 200, msg: 'CartDetails actualizado correctamente', cartDetails });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ status: 500, msg: 'Error en el servidor', error: error });
    }
}

const deleteCartDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const cartDetails = await CartDetails.findOne({ _id: id });
        if (!cartDetails) {
            return res.status(400).json({ status: 400, msg: 'CartDetails no encontrado' });
        }
        await cartDetails.deleteOne(); // Utiliza el método deleteOne() para eliminar el documento
        res.status(200).json({ status: 200, msg: 'CartDetails eliminado correctamente' });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ status: 500, msg: 'Error en el servidor', error: error });
    }
}


export {
    getShoppingCarById,
    getAllCartDetails,
    updateCartDetails,
    deleteCartDetails
};
