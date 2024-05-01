import ShoppingCarts from "../models/ShoppingCarts.js";

const createShoppingCart = async (req, res) => {
    const { total, cartStatus, userId } = req.body; // Cambiado CartStatus a cartStatus
    try {
        const shoppingCart = new ShoppingCarts({ total, cartStatus, userId }); // Cambiado CartStatus a cartStatus
        await shoppingCart.save();
        res.status(201).json({ status: 201, msg: 'ShoppingCart creado correctamente', shoppingCart });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ status: 500, msg: 'Error al crear el carrito de compras', error: error });
    }
}

const getShoppingCartById = async (req, res) => {
    const { id } = req.params; // Cambiado req.body a req.params
    try {
        const shoppingCart = await ShoppingCarts.findById(id); // Cambiado findOne a findById
        if (!shoppingCart) {
            return res.status(404).json({ status: 404, msg: `ShoppingCart con ID ${id} no encontrado` });
        }
        res.status(200).json({ status: 200, shoppingCart });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ status: 500, msg: 'Error en el servidor', error: error });
    }
}

const getAllShoppingCarts = async (req, res) => {
    try {
        const shoppingCarts = await ShoppingCarts.find();
        if (!shoppingCarts || shoppingCarts.length === 0) {
            return res.status(404).json({ status: 404, msg: 'No hay Carritos almacenados' });
        }
        res.status(200).json({ status: 200, shoppingCarts });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ status: 500, msg: 'Error en el servidor', error: error });
    }
}

const updateShoppingCart = async (req, res) => {
    const { id } = req.params; // Cambiado req.body a req.params
    const { total, cartStatus, userId } = req.body; // Cambiado CartStatus a cartStatus
    try {
        const shoppingCart = await ShoppingCarts.findByIdAndUpdate(id, { total, cartStatus, userId }, { new: true }); // Cambiado findOne a findByIdAndUpdate
        if (!shoppingCart) {
            return res.status(404).json({ status: 404, msg: `ShoppingCart con ID ${id} no encontrado` });
        }
        res.status(200).json({ status: 200, msg: 'ShoppingCart actualizado correctamente', shoppingCart });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ status: 500, msg: 'Error en el servidor', error: error });
    }
}

const deleteShoppingCart = async (req, res) => {
    const { id } = req.params;
    try {
        const shoppingCart = await ShoppingCarts.findOneAndDelete({ _id: id });
        if (!shoppingCart) {
            return res.status(404).json({ status: 404, msg: `ShoppingCart con ID ${id} no encontrado` });
        }
        res.status(200).json({ status: 200, msg: 'ShoppingCart eliminado correctamente' });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ status: 500, msg: 'Error en el servidor', error: error });
    }
}

export { createShoppingCart, getShoppingCartById, getAllShoppingCarts, updateShoppingCart, deleteShoppingCart };
