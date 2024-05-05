import ShoppingCarts from "../models/ShoppingCarts.js";
import CardDetails from '../models/CartDetails.js'
import Products from '../models/Products.js';
const createShoppingCart = async (req, res) => {
    const { total, shoppingCartId, quantity, productId } = req.body;
    const shoppingCartexist = await ShoppingCarts.findById(shoppingCartId);
    if (!shoppingCartexist) {
    try {
        
        const shoppingCart = new CardDetails({ total, shoppingCartId, quantity, productId });
        if (shoppingCart.total === 0) {
            return res.status(400).json({ status: 400, msg: 'El total no puede ser 0' });
        }
      
        //reestar quantity
        const product = await Products.findById(productId);
       
       

        if (!product) {
            return res.status(404).json({ status: 404, msg: 'Producto no encontrado' });
        }
        product.quantity -= quantity;
        await product.save();
        await shoppingCart.save();
        //saber cuandtos productos selecciono
    
        res.status(201).json({ status: 201, msg: 'ShoppingCart creado correctamente', shoppingCart });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ status: 500, msg: 'Error al crear el carrito de compras', error: error });
    }
}else{
   
    try {
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ status: 404, msg: 'Producto no encontrado' });
        }
        //validat stock
       /*  if (product.stock <= quantity) {
            return res.status(400).json({ status: 400, msg: 'No hay suficiente stock' });
        } */
        product.quantity -= quantity;
        await product.save();
        const shoppingCart = await Card
            .findById(shoppingCartId);
        if (!shoppingCart) {
            return res.status(404).json({ status: 404, msg: 'ShoppingCart no encontrado' });
        }
        

        await shoppingCart.save();
        res.status(201).json({ status: 201, msg: 'ShoppingCart creado correctamente', shoppingCart });
    }
    catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ status: 500, msg: 'Error al actualizar ', error: error });
    }
    }
}






const getAllShoppingCarts = async (req, res) => {
    const { shoppingCart } = req.body;

    try {
        const shoppingCarts = await CardDetails.find(shoppingCart)

        const getAllProducts = [];
        if (!shoppingCarts || shoppingCarts.length === 0) {
            return res.status(404).json({ status: 404, msg: 'No hay Carritos almacenados' });
        }   

        console.log(shoppingCarts)

        for (let i = 0; i < shoppingCarts.length; i++) {
            const product = await Products.findById(shoppingCarts[i].productId);
            //agregar la cantidad de productos seleccionados
          
           
            getAllProducts.push(product);
            
           

        }
        //saber cuantos productos selecciono el usuario y cuales    
       

        res.status(200).json({ status: 200, getAllProducts });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ status: 500, msg: 'Error en el servidor', error: error });
    }
}
/* 
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
} */

export {
    createShoppingCart,
    getAllShoppingCarts
}
