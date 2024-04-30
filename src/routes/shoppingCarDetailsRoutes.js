import express from "express"
import  {
    createCartDetails,
    getCartDetailsById,
   getAllCartDetails,
   updateCartDetails,
    deleteCartDetails
} from "../controllers/shoppingCarDetailsController.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 * name: CartDetails
 * description: Cart details management
 * 
 * @swagger
 * /cart-details:
 * post:
 *  tags: [CartDetails]
 * summary: Crea un nuevo detalle de carrito.
 * requestBody:
 *      required: true
 *      content:
 *      application/json:
 *       schema:
 *          type: object
 *          properties:
 *       quantity:
 *        type: number
 *       productId:
 *        type: string
 *       shoppingCartId:
 *        type: string
 *      responses:
 *      '201':
 *      description: CartDetails creado correctamente.
 *      '500':
 *      description: Error al crear el detalle de carrito.
 */
router.post("/", createCartDetails);
/**
 * @swagger
 * /cart-details:
 * get:
 *   tags: [CartDetails]
 * summary: Obtiene todos los detalles de carrito.
 * 
 * @swagger
 * /cart-details:
 *  get:
 *      tags: [CartDetails]
 *      summary: Obtiene todos los detalles de carrito.
 *      responses:
 *      '200':
 *      description: Detalles de carrito encontrados exitosamente.
 *      '500':
 *      description: Error al encontrar detalles de carrito.
 */
router.get("/", getAllCartDetails);
/**
 * @swagger
 * tags:
 * name: CartDetails
 * description: Cart details management
 * 
 * @swagger
 * /cart-details/{id}:
 *   get:
 *      tags: [CartDetails]
 *      summary: Obtiene un detalle de carrito por su ID.
 *      parameters:
 *          - in: path
 *          name: id
 *          required: true
 *          schema:
 *          type: string
 * 
 *      responses:
 *          '200':
 *          description: Detalle de carrito encontrado.
 *          '404':
 *          description: CartDetails con ID ${id} no encontrado.
 *          '500':
 */
router.get("/:id", getCartDetailsById);
/**
 * @swagger
 * tags:
 * name: CartDetails
 * description: Cart details management
 * 
 * @swagger
 * /cart-details/{id}:
 *   put:
 *      tags: [CartDetails]
 *      summary: Actualiza un detalle de carrito por su ID.
 *      parameters:
 *          - in: path
 *          name: id
 *          required: true
 *          schema:
 *          type: string
 *      requestBody:
 *          required: true
 *          content:
 *          application/json:
 *          schema:
 *              type: object
 *              properties:
 *                  quantity:
 *                      type: number
 *                  productId:
 *                      type: string
 *                  shoppingCartId:
 *                      type: string
 *      responses:
 *          '200':
 *          description: Detalle de carrito actualizado correctamente.
 *          '404':
 *          description: CartDetails con ID ${id} no encontrado.
 *          '500':
 */
router.put("/:id", updateCartDetails);
/**
 * @swagger
 * tags:
 * name: CartDetails
 * description: Cart details management
 * 
 * @swagger
 * /cart-details/{id}:
 *   delete:
 *      tags: [CartDetails]
 *      summary: Elimina un detalle de carrito por su ID.
 *      parameters:
 *          - in: path
 *          name: id
 *          required: true
 *          schema:
 *          type: string
 *      responses:
 *          '200':
 *          description: Detalle de carrito eliminado correctamente.
 *          '404':
 *          description: CartDetails con ID ${id} no encontrado.
 *          '500':
 */
router.delete("/:id", deleteCartDetails);


export default router;