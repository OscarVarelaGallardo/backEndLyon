import Products from '../models/Products.js';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import ExcelJS from 'exceljs';

const url = "https://dvhdecadrkjnssqtlncz.supabase.co/storage/v1/object/public/img/"
const updateStatus = async (req, res) => {
    const { _id, status } = req.body;
    if (!_id) { return res.status(400).json({ status: 400, msg: 'Falta el id del producto' }); }
    if (!status) { return res.status(400).json({ status: 400, msg: 'Falta el status del producto' }); }
    if (status !== 'reject' && status !== 'accept') {
        return res.status(400).json({ status: 400, msg: 'Status invalido' })
    }
    try {
        const product = await Products.findById(_id);
        if (!product) {
            return res.status(404).json({ status: 404, msg: 'Producto no encontrado' });
        }
        const productUpdated = await Products.updateOne({ _id }, { status });
        if (productUpdated.nModified === 0) {
            return res.status(400).json({ status: 400, msg: 'No se ha actualizado el estado del producto' });
        }
        res.status(200).json({ status: 200, msg: 'Estado del producto actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error al actualizar datos del producto', error: error.message });
    }

}


const createProduct = async (req, res) => {
    const { name, price, stock, category, description, company_id, status, brand, color } = req.body;

    if (!name || !price || !stock || !category || !description || !status) {
        return res.status(400).json({ status: 400, msg: 'Faltan campos obligatorios' });
    }

    const file = req.file;
    console.log(req.body)
    try {

        const product = new Products({
            name,
            price,
            file: file ? file.originalname : null,
            stock,
            category,
            description,
            company_id,
            status,
            brand,
            color
        })
        if (!product) {
            return res.status(400).json({ status: 400, msg: 'No se ha podido crear el producto' });
        }

        const productCreated = await product.save();

        return res.status(201).json({ status: 201, msg: 'Producto creado exitosamente', product: productCreated });
    } catch (error) {

        res.status(500).json({ status: 500, msg: 'Error al crear producto', error: error.mesage });
    }
};

const getAllProducts = async (req, res) => {

    try {
        const products = await Products.find();
    
        products.map(product => {
            if (product.file) {
                product.file = `${url}/${product.file}`;
            }
        });
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

        product.file = `${url}/${product.file}`;
       
        return res.status(200).json({ status: 200, msg: 'producto encontrado exitosamente', product });
    } catch (error) {
        console.error('Error al encontrar producto:', error);
        res.status(500).json({ status: 500, msg: 'error al encontrar producto', error: error.mesage });
    }
};


const updateProduct = async (req, res) => {

//recuperar todos los demas datos del producto
   
    const { _id, name, price, stock, category, description, status ,brand,color} = req.body;
    if (!_id) {
        return res.status(400).json({ status: 400, msg: 'Falta el id del producto' });
    }
  
    try {
        const product = await Products.findByIdAndUpdate(_id);
        if (!product) {
            return res.status(404).json({ status: 404, msg: 'Producto no encontrado' });
        }
        let file = req.file;
        const newProduct = {
            name,
            price,
            file: file ? file.originalname : product.image,
            stock,
            category,
            description,
            status,
            brand,
            color
        };
        const productUpdated = await Products.updateOne({
            _id
        }, newProduct);


        if (productUpdated.nModified === 0) {
            return res.status(400).json({ status: 400, msg: 'No se ha actualizado el producto' });
        }
        res.status(200).json({ status: 200, msg: 'Producto actualizado exitosamente' });
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
                imagess: row.getCell(6).value,
                status: false,
                company_ids: row.getCell(7).value,
                nodata: row.getCell(8).value,
                stock: row.getCell(9).value,
                price: row.getCell(11).value,
                image: row.getCell(12).value,
                image1: row.getCell(13).value,
                image2: row.getCell(14).value

            });
        });
        products.map((product) => {
            if (product?.image?.hyperlink) {
                product.image = product.image.hyperlink;
            }
        });
        if (products.length > 0) {

            await Products.insertMany(products);
            return await res.status(201).json({ status: 201, msg: 'Productos cargados exitosamente ' });
        }
        return res.status(400).json({ status: 400, msg: 'No se ha encontrado productos en el archivo excel' });
    } catch (error) {
        console.error('Error al obtener los datos del excel:', error);
        res.status(500).json({ status: 500, msg: 'Error al obtener los datos del excel', error: error.message });

    }
};






export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getExcelDataProducts, updateStatus };

