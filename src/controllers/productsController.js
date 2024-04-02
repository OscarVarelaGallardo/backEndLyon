import Products from '../models/Products.js';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import ExcelJS from 'exceljs';




const createProduct = async (req, res) => {
    const { name, price, stock, category, description, company_id, status } = req.body;
    console.log(req.body);
    let file = req.file;
    if (!file) {
        return res.status(400).json({ status: 400, msg: 'Faltan la imagen del archivo ' });
    }
    if (!name || !price || !stock || !category || !description || !company_id, !status) {
        return res.status(400).json({ status: 400, msg: 'Faltan campos obligatorios' });
    }
    try {
       const productCreated= await Products.create({
            name, price, stock, category, description, company_id, status, image: file.filename

        });
        console.log('Producto creado:', productCreated);
        
        return res.status(201).json({ status: 201, msg: 'Producto creado exitosamente' });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ status: 500, msg: 'Error al crear producto', error: error.mesage });
    }
};

const getAllProducts = async (req, res) => {

    try {
        const products = await Products.find();
        const url = "https://backendlyon.onrender.com"
        products.map(product => {
            if (product.image) {
                product.image = `${url}/${product.image}`;
            }
        });
        
        console.log(products);
        return res.status(200).json({ status: 200, msg: 'productos encontrados exitosamente', products });
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
       return res.status(200).json({ status: 200, msg: 'producto encontrado exitosamente', product });
    } catch (error) {
        console.error('Error al encontrar producto:', error);
        res.status(500).json({ status: 500, msg: 'error al encontrar producto', error: error.mesage });
    }
};


const updateProduct = async (req, res) => {

    const {_id, name, price, image, stock, category, description,status} = req.body;
    if (!name || !price || !stock || !category || !description || !_id|| !status) {
        return res.status(400).json({ status: 400, msg: 'Todos los campos son requeridos para actualizar' });
    }
    try {
        const product = await Products.findById(_id);
        if (!product) {
            return res.status(404).json({ status: 404, msg: 'Producto no encontrado' });
        }

      const productUpdated = await Products.updateOne({ _id }, 
            { name, price, image, stock, category, description,status });
        console.log('Producto actualizado:', productUpdated);
        if (productUpdated.nModified === 0) {
            return res.status(400).json({ status: 400, msg: 'No se ha actualizado el producto' });
        }
        res.status(200).json({ status: 200, msg: 'Producto actualizado exitosamente', productUpdated });
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

const getExcelDataProducts = async (req, res) => {
    try {
        const excelData = req.file;
        if (!excelData) {
            return res.status(400).json({ status: 400, msg: 'No se ha subido ningun archivo' });
        }
        const workbook = new ExcelJS.Workbook();
        const pathExcel = path.join(__dirname, '..', '..', 'public', 'excel', excelData.filename);
        await workbook.xlsx.readFile(pathExcel);

        const worksheet = workbook.getWorksheet(1);
        workbook.worksheets.map(sheet => sheet.name);
        const products = [];
        worksheet.eachRow((row, rowNumber) => {
            products.push({
                category: row.getCell(1).value,
                name: row.getCell(2).value,
                nodata: row.getCell(3).value,
                description: row.getCell(4).value,
                category: row.getCell(5).value,
                imagess : row.getCell(6).value,
                status: false,
                company_ids: row.getCell(7).value,
                nodata: row.getCell(8).value,
                stock: row.getCell(9).value,
                price: row.getCell(11).value,
                image: row.getCell(12).value,
                image1: row.getCell(13).value ,
                image2: row.getCell(14).value

            });
        });
        products.map((product) => 
        {
            if (product?.image?.hyperlink) {
                product.image = product.image.hyperlink;
            }
        });
        if (products.length > 0) {
            console.log(products);
            await Products.insertMany(products);
           return await res.status(201).json({ status: 201, msg: 'Productos cargados exitosamente ' });
        }
        return res.status(400).json({ status: 400, msg: 'No se ha encontrado productos en el archivo excel' });
    } catch (error) {
        console.error('Error al obtener los datos del excel:', error);
        res.status(500).json({ status: 500, msg: 'Error al obtener los datos del excel', error: error.message });

    }
};

const getCompleteProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Products.findById(productId);

        if (!product) {
            return res.status(404).json({ status: 404, msg: 'Producto no encontrado' });
        }

        let responseData = { product };

        if (product.image) {
            const rutaCompleta = path.join(__dirname, '..', '..', 'public', 'images', product.image);
            const nombreImagen = path.basename(product.image);
            responseData.imageURL = nombreImagen;
        }

        return res.status(200).json({ status: 200, msg: 'Producto encontrado exitosamente', ...responseData });
    } catch (error) {
        console.error('Error al obtener el producto completo:', error);
        return res.status(500).json({ status: 500, msg: 'Error al obtener el producto completo', error: error.message });
    }
};




export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, storageImg, getImgProductById, getCompleteProductById, getExcelDataProducts };

