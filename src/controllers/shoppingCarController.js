import ShoppingCarts from "../models/ShoppingCarts.js";
import CarDetails from '../models/CartDetails.js';
import Products from '../models/Products.js';


const createShoppingCar = async (req, res) => {
    const { total, shoppingCartId, quantity, productId } = req.body;
    const shoppingCartexist = await ShoppingCarts.findById(shoppingCartId);
    if (!shoppingCartexist) {
    try {
        
        const shoppingCart = new CarDetails({ total, shoppingCartId, quantity, productId });
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





const getAllShoppingCars = async (req, res) => {
    const { shoppingCarId } = req.body;
   
    if (typeof shoppingCarId !== 'string') {
        return res.status(400).json({ status: 400, msg: 'El ID del carrito de compras debe ser un string' });
    }
    if (!shoppingCarId) {
        return res.status(400).json({ status: 400, msg: 'No se ha proporcionado un carrito de compras' });
    }
    try {
        const carDetails = await CarDetails.find({ shoppingCartId: shoppingCarId });
        console.log(carDetails);
        if (!carDetails || carDetails.length === 0) {
            return res.status(404).json({ status: 404, msg: 'No hay Carritos almacenados' });
        }

        const getAllProducts = await Promise.all(carDetails.map(async (car) => {
            const product = await Products.findById(car.productId);
            const url = "https://dvhdecadrkjnssqtlncz.supabase.co/storage/v1/object/public/img/";
            console.log(product);
            if (!product) {
                return null; // O maneja este caso como prefieras
            }
            return {
                product: {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    //stock: product.stock,
                    quantity: car.quantity,
                    file: url + product.file
                }
            };
        }));
        const nonNullProducts = getAllProducts.filter(product => product !== null);
        res.status(200).json({ status: 200,msg:"Carrito", nonNullProducts });
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
    createShoppingCar,
    getAllShoppingCars
}
