import express from "express"
import  {
    createShoppingCart,
    getShoppingCartById,
    getAllShoppingCarts,
    updateShoppingCart,
    deleteShoppingCart
} from "../controllers/shoppingCarController.js";
const router = express.Router();


router.post("/", createShoppingCart);
router.get("/:id", getShoppingCartById);
router.get("/", getAllShoppingCarts);
router.put("/:id", updateShoppingCart);
router.delete("/:id", deleteShoppingCart);


export default router;