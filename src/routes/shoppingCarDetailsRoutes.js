import express from "express"
import  {
    createCartDetails,
    getCartDetailsById,
   getAllCartDetails,
   updateCartDetails,
    deleteCartDetails
} from "../controllers/shoppingCarDetailsController.js";
const router = express.Router();


router.post("/", createCartDetails);
router.get("/", getAllCartDetails);
router.get("/:id", getCartDetailsById);
router.put("/:id", updateCartDetails);
router.delete("/:id", deleteCartDetails);


export default router;