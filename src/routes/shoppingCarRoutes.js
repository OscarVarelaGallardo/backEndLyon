import express from "express"
import {
    createShoppingCart,
    getAllShoppingCarts
   
} from "../controllers/shoppingCarController.js";
const router = express.Router();


router.post("/", createShoppingCart);

router.post("/getAllCart", getAllShoppingCarts);
/*
router.get("/", getShoppingCarById);

router.get("/", getAllShoppingCarts);

router.put("/", updateShoppingCart);

router.delete("/", deleteShoppingCart);

 */

export default router;