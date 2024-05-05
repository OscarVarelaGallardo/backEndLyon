import express from "express"
import {
    createShoppingCar,
   
} from "../controllers/shoppingCarDetailsController.js";
const router = express.Router();


router.post("/", createShoppingCar);
/* 
router.get("/", getShoppingCarById);

router.get("/", getAllShoppingCarts);

router.put("/", updateShoppingCart);

router.delete("/", deleteShoppingCart);

 */

export default router;