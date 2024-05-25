import express from "express"
import {
    createShoppingCar,
    getAllShoppingCars,
    deleteShoppingCarById,
    deleteProductById
   
} from "../controllers/shoppingCarController.js";
const router = express.Router();


router.post("/", createShoppingCar);

router.post("/getAllCar", getAllShoppingCars);

router.delete("/delete", deleteShoppingCarById);

router.delete("/deleteProduct", deleteProductById);
/*
router.get("/", getShoppingCarById);

router.get("/", getAllShoppingCarts);

router.put("/", updateShoppingCart);


 */

export default router;