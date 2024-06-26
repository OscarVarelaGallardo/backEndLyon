import ShoppingCarts from "../models/ShoppingCarts.js";
import CarDetails from '../models/CartDetails.js';
import Products from '../models/Products.js';



const createShoppingCar = async (req, res) => {
    const { total, shoppingCartId, quantity, productId } = req.body;
    //simular datos 
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
            //regresar el carrito de compras
        const getAllProducts = await Promise.all([product].map(async (car) => {
            console.log(car);
            let product = await Products.findById(car._id);
            const url = "https://dvhdecadrkjnssqtlncz.supabase.co/storage/v1/object/public/img/";

            if (!product) {
                return null; // O maneja este caso como prefieras
            }
            return product = {
                //todos los datos del producto
                id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                quantity: car.quantity,
                file: url + product.file,
                brand: product.brand ? product.brand : null,
            };
        }
        ));
            res.status(201).json({ status: 201, msg: 'ShoppingCart creado correctamente',shoppingCart,   getAllProducts });
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
            //devolver el carrito de compras agregando datos de productos
            const getAllProducts = await Promise.all([product].map(async (car) => {
                const product = await Products.findById(car.productId);
                const url = "https://dvhdecadrkjnssqtlncz.supabase.co/storage/v1/object/public/img/";

                if (!product) {
                    return null; // O maneja este caso como prefieras
                }
                return product = {
                    //todos los datos del producto
                    id: product._id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    quantity: car.quantity,
                    file: url + product.file,
                    brand: product.brand ? product.brand : null,
                };
            }
            ));

            res.status(201).json({ status: 201, msg: 'ShoppingCart creado correctamente2'    , getAllProducts });
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
                    id: product._id,
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
    console.log(req.body)
    console.log(shoppingCarId);
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

const deleteProductById = async (req, res) => {
   
    const { shoppingCartId, productId } = req.body;
    try {
        const findCar = await CarDetails.find(shoppingCartId);
        console.log(findCar);
      if (findCar.length === 0) {
            return res.status(404).json({ status: 404, msg: 'No hay Carritos almacenados' });
        }
        const productFind = await CarDetails.findOne({ productId: productId });
      
        if (!productFind) {
            return res.status(404).json({ status: 404, msg: 'Producto no encontrado' });
        }
        await CarDetails.deleteOne({ productId: productId }); 
        res.status(200).json({ status: 200, msg: "Producto eliminado correctamente" });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ status: 500, msg: 'Error en el servidor', error: error });
    }
}

export {
    createShoppingCar,
    getAllShoppingCars,
    deleteShoppingCarById,
    deleteProductById
}
