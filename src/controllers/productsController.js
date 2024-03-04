import Products from '../models/Products';

const createProduct = async (req,res) => {
    const{name, price, image, stock, category, description} = req.body;
    try{
        const newProduct = await Products.create({
            name, price, image, stock, category, description
        });
        res.status(201).json({status:201, msg:'producto creado exitosamente', product: newProduct});
    }catch (error){
        console.error('Error al crear producto:',error);
        res.status(500).json({status:500, msg:'error al crear producto', error:error.mesage});
    }
};

const getALLProduct = async (req,res) => {
    
    try{
        const products = await Products.findAll();
        res.status(200).json({status:200, msg:'productos encontrados exitosamente', products});
    }catch (error){
        console.error('Error al encontrar producto:',error);
        res.status(500).json({status:500, msg:'error al encontrar productos', error:error.mesage});
    }
};

const getProductById = async (req,res) => {
    const productId = req.params.id;
    try{
        const product = await Products.findByPk(productId);
        if (!product){
            return res.status(404).json({status: 404, msg:'producto no encontrado'});
        }
        res.status(200).json({status:200, msg:'producto encontrado exitosamente', product});
    }catch (error){
        console.error('Error al encontrar producto:',error);
        res.status(500).json({status:500, msg:'error al encontrar producto', error:error.mesage});
    }
};

const updateProduct = async (req,res) => {
    const productId = req.params.id;
    const {name, price, image, stock, category, description} = req.body;
    try{
        const product = await Products.findByPk(productId);
        if (!product){
            return res.status(404).json({status: 404, msg:'producto no encontrado'});
        }
        await Products.update({
            name, price, image, stock, category, description
        },{
            where:{id:productId}
        });
        res.status(200).json({status:200, msg:'producto actualizado exitosamente', product: newProduct});
    }catch (error){
        console.error('Error al actualizar producto:',error);
        res.status(500).json({status:500, msg:'error al actualizar producto', error:error.mesage});
    }
};


const deleteProduct = async (req,res) => {
    const productId = req.params.id;
    try{
        const product = await Products.findByPk(productId);
        if (!product){
            return res.status(404).json({status: 404, msg:'producto no encontrado'});
        }
        await Products.destroy({
            where:{id:productId}
        });
        res.status(200).json({status:200, msg:'producto eliminado exitosamente', product});
    }catch (error){
        console.error('Error al eliminar producto:',error);
        res.status(500).json({status:500, msg:'error al eliminar producto', error:error.mesage});
    }
};

export {createProduct, getALLProduct, getProductById, deleteProduct};