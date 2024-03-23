import express from 'express';

import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct ,storageImg,getImgProductById} from '../controllers/productsController.js';

import upload from '../helpers/multer.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Product
 *  description: Products management
 * 
 * @swagger
 * /products:
 *   post:
 *     tags: [Product]
 *     summary: Crea un nuevo producto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               user_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Producto creado exitosamente.
 *       '500':
 *         description: Error al crear producto.
 */
router.post('/', createProduct);

/**
 * @swagger
 * tags: Product
 * name: Product
 * description: Products management
 * @openapi
 * /products:
 *   get:
 *     tags: [Product]
 *     summary: Obtiene todos los productos.
 *     responses:
 *       '200':
 *         description: Productos encontrados exitosamente.
 *       '500':
 *         description: Error al encontrar productos.
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /products/{id}:
 * tags: Product
 * description: Products management
 * @swagger
 * /products/{id}:
 *   get:
 *     tags: [Product]
 *     summary: Obtiene un producto por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Producto encontrado exitosamente.
 *       '404':
 *         description: Producto no encontrado.
 *       '500':
 *         description: Error al encontrar producto.
 */
router.get('/:id', getProductById);

/**
 * @swagger
 * /products/update/{id}:
 * tags: Product
 * description: Actualiza un producto por su ID.
 * 
 * 
 * @swagger
 * /products/update/{id}:
 *   put:
 *     tags: [Product]
 *     summary: Actualiza un producto por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Producto actualizado exitosamente.
 *       '404':
 *         description: Producto no encontrado.
 *       '500':
 *         description: Error al actualizar producto.
 */
router.put('/update/:id', updateProduct);

/**
 * @openapi
 * /products/delete/{id}:
 *   delete:
 *     summary: Elimina un producto por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Producto eliminado exitosamente.
 *       '404':
 *         description: Producto no encontrado.
 *       '500':
 *         description: Error al eliminar producto.
 */
router.delete('/delete/:id', deleteProduct);

/**
 * @openapi
 * /products/img/{id}:
 *   post:
 *     summary: Sube una imagen para el producto especificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Imagen subida exitosamente.
 *       '404':
 *         description: Producto no encontrado.
 *       '500':
 *         description: Error al cargar imagen.
 */
router.post('/img/:id', upload.single('image'), storageImg);

router.get('/img/:id', getImgProductById);




export default router;

