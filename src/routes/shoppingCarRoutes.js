import express from "express"
import {
    createShoppingCart,
    getShoppingCartById,
    getAllShoppingCarts,
    updateShoppingCart,
    deleteShoppingCart
} from "../controllers/shoppingCarController.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 * name: ShoppingCart
 * description: Shopping cart management
 * 
 * @swagger
 * /shopping-carts:
 *  post:
 *   tags: [ShoppingCart]
 *  summary: Crea un nuevo carrito de compras.
 *  requestBody:
 *      required: true
 *      content:
 *      application/json:
 *       schema:
 *          type: object
 *          properties:
 *             total:   
 *               type: number
 *              userId:
 *               type: string
 *              cartStatus:
 *               type: String
 *   responses:
 *     '201':
 *      description: ShoppingCart creado correctamente.
 *    '500':
 *     description: Error al crear el carrito de compras.
 */
 
router.post("/", createShoppingCart);
/**
 * @swagger
 * tags: 
 *  name: ShoppingCart
 *  description: Shopping cart management
 * 
 * @swagger
 * /shopping-carts/{id}:
 *   get:
 *      tags: [ShoppingCart]
 *      summary: Obtiene un carrito de compras por su ID.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 * 
 *          responses:
 *              '200':
 *              description: Carrito de compras encontrado.
 *              '404':
 *              description: ShoppingCart con ID ${id} no encontrado.
 *              '500':
 *              description: Error en el servidor.  
 */
router.get("/:id", getShoppingCartById);
/**
 * @swagger
 * /shopping-carts:
 *  get:
 *   tags: [ShoppingCart]
 *  summary: Obtiene todos los carritos de compras.
 * 
 * @swagger
 * /shopping-carts:
 *  get:
 *      tags: [ShoppingCart]
 *      summary: Obtiene todos los carritos de compras.
 *      responses:
 *      '200':
 *      description: Carritos de compras encontrados exitosamente.
 *      '500':
 *      description: Error al encontrar carritos de compras.
 */
router.get("/", getAllShoppingCarts);
/**
 * @swagger
 * tags:
 *  name: ShoppingCart
 *  description: Shopping cart management
 * 
 * @swagger
 * /shopping-carts/{id}:
 *   put:
 *     tags: [ShoppingCart]
 *     summary: Actualiza un carrito de compras por su ID.
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
 *               total:
 *                 type: number
 *               userId:
 *                 type: string
 *               cartStatus:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Carrito de compras actualizado correctamente.
 *       '404':
 *         description: Carrito de compras no encontrado.
 *       '500':
 *         description: Error en el servidor.
 */
router.put("/:id", updateShoppingCart);
/**
 * @swagger
 * tags:
 *  name: ShoppingCart
 *  description: Shopping cart management
 * 
 * @swagger
 * /shopping-carts/{id}:
 *   delete:
 *     tags: [ShoppingCart]
 *     summary: Elimina un carrito de compras por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Carrito de compras eliminado correctamente.
 *       '404':
 *         description: Carrito de compras no encontrado.
 *       '500':
 *         description: Error en el servidor.
 */
router.delete("/:id", deleteShoppingCart);


export default router;