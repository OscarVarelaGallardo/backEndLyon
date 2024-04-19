import express from "express"
import  {
    createCartDetails,
    getCartDetailsById,
   getAllCartDetails,
   updateCartDetails,
    deleteCartDetails
} from "../controllers/shoppingCarController.js";
const router = express.Router();


router.post("/create", createCartDetails);
router.get("/get", getAllCartDetails);
router.get("/get", getCartDetailsById);
router.put("/update", updateCartDetails);
router.delete("/delete", deleteCartDetails);


export default router;