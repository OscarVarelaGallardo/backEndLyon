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
    } else {

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


    if (!shoppingCarId) {
        return res.status(400).json({ status: 400, msg: 'No se ha proporcionado un carrito de compras' });
    }
    try {
        const carDetails = await CarDetails.find({ shoppingCartId: shoppingCarId });

        if (!carDetails || carDetails.length === 0) {
            return res.status(404).json({ status: 404, msg: 'No hay Carritos almacenados' });
        }

        const getAllProducts = await Promise.all(carDetails.map(async (car) => {
            const product = await Products.findById(car.productId);
            const url = "https://dvhdecadrkjnssqtlncz.supabase.co/storage/v1/object/public/img/";

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
        res.status(200).json({ status: 200, msg: "Carrito", nonNullProducts });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ status: 500, msg: 'Error en el servidor', error: error });
    }
}
const deleteShoppingCarById = async (req, res) => {
    const { shoppingCarId } = req.body;
    try {
      
       const findCar= await CarDetails.deleteMany({ shoppingCartId: shoppingCarId });
        console.log(findCar);
        if (!findCar) {
            return res.status(404).json({ status: 404, msg: 'No hay Carritos almacenados' });
        }
        res.status(200).json({ status: 200, msg: "Carrito eliminado correctamente"});

    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ status: 500, msg: 'Error en el servidor', error: error });
    }
}

export {
    createShoppingCar,
    getAllShoppingCars,
    deleteShoppingCarById
}
