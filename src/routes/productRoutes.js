import express from 'express';

import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getExcelDataProducts,
    updateStatus
} from '../controllers/productsController.js';


import  handleFileUpload from '../helpers/multer.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Product
 *  description: Create a new product
 * @swagger
 * /product:
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
router.post('/', handleFileUpload, createProduct);

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
 * /products/update:
 *   put:
 *     tags: [Product]
 *     summary: Update a product.
 *   
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
router.put('/update',handleFileUpload, updateProduct);

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

//router.post('/uploadFile', upload.single('file'), getExcelDataProducts);
/**
 * @swagger
 * tags:
 *  name: Product
 *  description: Update Status of a product
 * @swagger
 * /products/updateStatus:
 *   put:
 *     tags: [Product]
 *     summary: UpdateStatus of a product with status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               
 *               status:
 *                 type: string
 *              
 *     responses:
 *       '201':
 *         description: Product create successfully.
 *       '500':
 *         description: Error to create product.
 */
router.post('/updateStatus', updateStatus);




export default router;