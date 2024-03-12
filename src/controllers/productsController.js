import Products from '../models/Products.js';


const createProduct = async (req, res) => {
    const { name, price, image, stock, category, description } = req.body;
    try {
        const newProduct = await Products.create({
            name, price, image, stock, category, description
        });
        res.status(201).json({ status: 201, msg: 'producto creado exitosamente', product: newProduct });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ status: 500, msg: 'error al crear producto', error: error.mesage });
    }
};

const getALLProducts = async (req, res) => {

    try {
        const products = await Products.findAll();
        res.status(200).json({ status: 200, msg: 'productos encontrados exitosamente', products });
    } catch (error) {
        console.error('Error al encontrar producto:', error);
        res.status(500).json({ status: 500, msg: 'error al encontrar productos', error: error.mesage });
    }
};

const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Products.findByPk(productId);
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
        const product = await Products.findByPk(id);
        if (!product) {
            return res.status(404).json({ status: 404, msg: 'producto no encontrado' });
        }
        await product.update({
            name, price, image, stock, category, description
        });
        res.status(200).json({ status: 200, msg: 'producto actualizado exitosamente', product });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ status: 500, msg: 'error al actualizar producto', error: error.message });
    }
};


const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Products.findByPk(id);
        if (!product) {
            return res.status(404).json({ status: 404, msg: 'producto no encontrado' });
        }
        await Products.destroy({ where: { id } });
        res.status(200).json({ status: 200, msg: 'producto eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ status: 500, msg: 'error al eliminar producto', error: error.mesage });
    }
};

const updateProduct2 = async (req, res) => {
    const productId = req.params.id;
    const { name, price, image, stock, category, description } = req.body;
    try {
        const product = await Products.findByPk(productId);
        if (!product) {
            return res.status(404).json({ status: 404, msg: 'producto no encontrado' });
        }
        await product.update({
            name, price, image, stock, category, description
        });
        res.status(200).json({ status: 200, msg: 'producto actualizado exitosamente', product });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ status: 500, msg: 'error al actualizar producto', error: error.message });
    }
}
const storageImg = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Products.findByPk(productId);
        if (!product) {
            return res.status(404).json({ status: 404, msg: 'producto no encontrado' });
        }
        await product.update({
           //poner el nombre de la imagen en la base de datos
            image: req.file.filename
        });

        res.status(200).json({ status: 200, msg: 'producto actualizado exitosamente', product });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ status: 500, msg: 'error al actualizar producto', error: error.message });
    }
}


export { createProduct, getALLProducts, getProductById, updateProduct, deleteProduct, updateProduct2,storageImg };