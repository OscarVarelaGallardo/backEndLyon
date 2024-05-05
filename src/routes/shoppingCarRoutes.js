import express from "express"
import {
    createShoppingCar,
    getAllShoppingCars
   
} from "../controllers/shoppingCarController.js";
const router = express.Router();


router.post("/", createShoppingCar);

router.post("/getAllCar", getAllShoppingCars);
/*
router.get("/", getShoppingCarById);

router.get("/", getAllShoppingCarts);

router.put("/", updateShoppingCart);

router.delete("/", deleteShoppingCart);

 */

export default router;