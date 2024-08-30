import { Router } from "express";
import * as userController from "../controllers/user";

const router = Router();

router.post("/home", userController.home);
router.get("/menu-item/:id", userController.getMenuItem);
router.post("/add-to-cart/:id", userController.addToCart);
router.put("/edit-cart-item/:id", userController.editCartItem);
router.delete("/delete-cart-item/:id", userController.deleteCartItem);
router.get("/cart-items/:id", userController.getCartItems);
router.post("/place-order/:id", userController.placeOrder);

export default router;
