import express from 'express';

import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    storageImg,
    getImgProductById,
    getCompleteProductById,
    getExcelDataProducts
} from '../controllers/productsController.js';


import { upload } from '../helpers/multer.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Product
 *  description: Create a new product
 * @swagger
 * /products:
 *   post:
 *     tags: [Product]
 *     summary: Create a new product with name, price, image, stock, category, description, status and user_id.
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
 *               status:
 *                 type: boolean
 *               company_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Product create successfully.
 *       '500':
 *         description: Error to create product.
 */
router.post('/',upload.single('image'), createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Product]
 *     summary: Get all products.
 *     responses:
 *       '200':
 *         description: Products found successfully.
 *       '500':
 *         description: Error to find products.
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *  name: Product
 *  description: Get a product by its ID.
 * 
 * @swagger
 * /products/{id}:
 *   get:
 *     tags: [Product]
 *     summary: Get a product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product found successfully.
 *       '404':
 *         description: Product not found.
 *       '500':
 *         description: Server error to find product.
 */
router.get('/:id', getProductById);

/**
 * @swagger
 * /products/update/{id}:
 *   put:
 *     tags: [Product]
 *     summary: Update a product.
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
 *         description: Product updated successfully.
 *       '404':
 *         description: Product not found to update
 *       '500':
 *         description: Error to update product.
 */
router.put('/update',upload.single('image'), updateProduct);

/**
 * @swagger
 * /products/delete/{id}:
 *  tags: Product
 *  summary: Delete a product.
 * 
 * 
 * @swagger
 * /products/delete/{id}:
 *   delete:
 *     tags: [Product]
 *     summary: Delete a product.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product deleted successfully.
 *       '404':
 *         description: Product not found.
 *       '500':
 *         description: Server error to delete product.
 */
router.delete('/delete/:id', deleteProduct);

 /**
 * 
 * @swagger
 * tags:
 *   name: Product
 *   description: Products management
 * @swagger
 * /products/img/{id}:
 *   post:
 *     tags: [Product]
 *     summary: Create a new product image by its ID.
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
 *         description: Img created successfully.
 *       '404':
 *         description: Product not found to create img.
 *       '500':
 *         description: Server error to create img.
 */
//router.post('/img/:id', upload.single('image'), storageImg);
    

/**
 * @swagger
 *  tags:
 *   name: Product  
 *   description: Products add image
 * @swagger
 * /products/img/{id}:
 *   get:
 *     tags: [Product]
 *     summary: Get a product image by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product image found successfully.
 *       '404':
 *         description: Product image not found.
 *       '500':
 *         description: Server error to find product image.
 */
router.get('/img/:id', getImgProductById);


router.get('/complete/:id', getCompleteProductById);

/** 
* @swagger
* tags:
*  name: Product
*  description: Get all products from an excel file
* @swagger
* /products/uploadFile:
*   post:
*     tags: [Product]
*     summary: Get all products from an excel file
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               file:
*                 type: string
*                 format: binary
*     responses:
*       '200':
*         description: Products found successfully.
*       '500':
*         description: Error to find products.
*/

router.post('/uploadFile', upload.single('file'), getExcelDataProducts);


export default router;

