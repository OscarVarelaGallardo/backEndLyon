import Products from '../models/Products.js';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const createProduct = async (req, res) => {
    const { name, price, image, stock, category, description, user_id,productStatus } = req.body;
    try {
        const newProduct = await Products.create({
            name, price, image, stock, category, description, user_id,productStatus
        });
        res.status(201).json({ status: 201, msg: 'producto creado exitosamente', product: newProduct });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ status: 500, msg: 'error al crear producto', error: error.mesage });
    }
};

const getAllProducts = async (req, res) => {

    try {
        const products = await Products.find();
        res.status(200).json({ status: 200, msg: 'productos encontrados exitosamente', products });
    } catch (error) {
        console.error('Error al encontrar producto:', error);
        res.status(500).json({ status: 500, msg: 'error al encontrar productos', error: error.mesage });
    }
};

const getProductById = async (req, res) => {
    const productId = req.params.id;
   
    try {
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ status: 404, msg: 'producto no encontrado' });
        }
        res.status(200).json({ status: 200, msg: 'producto encontrado exitosamente', product });
    } catch (error) {
        console.error('Error al encontrar producto:', error);
        res.status(500).json({ status: 500, msg: 'error al encontrar producto', error: error.mesage });
    }
};


const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image, stock, category, description } = req.body;

    try {
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({ status: 404, msg: 'Producto no encontrado' });
        }

        const productStatus = product.productStatus;if (productStatus === 0 || productStatus === false) {
            return res.status(403).json({ status: 403, msg: 'No se puede actualizar el producto porque el status es inactivo' });
        }

        await product.updateOne({
            name, price, image, stock, category, description
        });

        res.status(200).json({ status: 200, msg: 'Producto actualizado exitosamente', product });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ status: 500, msg: 'Error al actualizar producto', error: error.message });
    }
};


const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({ status: 404, msg: 'producto no encontrado' });
        }
        await Products.deleteOne({ _id: id });
        res.status(200).json({ status: 200, msg: 'producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ status: 500, msg: 'error al eliminar producto', error: error.mesage });
    }
};


const storageImg = async (req, res) => {
    const productId = req.params.id;
    console.log(req.file);
    try {
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ status: 404, msg: 'producto no encontrado' });
        }
        
        await product.updateOne({ image: req.file.filename });

        res.status(200).json({ status: 200, msg: 'producto actualizado exitosamente', product });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ status: 500, msg: 'error al actualizar producto', error: error.message });
    }
}

const getImgProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Products.findById(productId);

        if (!product || !product.image) {
            return res.status(404).json({ status: 404, msg: 'Imagen de producto no encontrada' });
        }

        const rutaBase = path.join(__dirname, '..', '..', 'public', 'images');
        const rutaCompleta = path.join(rutaBase, product.image);
        const extension = product.image.split('.').pop().toLowerCase();

        let contentType;
        switch (extension) {
            case 'jpg':
            case 'jpeg':
                contentType = 'image/jpeg';
                break;
            case 'png':
                contentType = 'image/png';
                break;
            default:
                contentType = 'application/octet-stream';
        }
    
        res.set('Content-Type', contentType);
        res.sendFile(rutaCompleta);
    } catch (error) {
        console.error('Error al obtener la imagen del producto:', error);
        res.status(500).json({ status: 500, msg: 'Error al obtener la imagen del producto', error: error.message });
    }
};



export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct,storageImg,getImgProductById };