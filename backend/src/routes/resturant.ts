import express, { Router } from "express";
import * as resturantController from "../controllers/resturant";

const router: Router = express.Router();

router.post("/create-category", resturantController.createCategory); // create category
router.put("/update-restaurant/:id", resturantController.updateRestaurant); // update restaurant
router.post("/create-menu/:id", resturantController.createMenu); // create menu
router.post("/update-menu-item/:id", resturantController.updateMenuItem); // update menu item
router.delete("/delete-menu-item/:id", resturantController.deleteMenuItem); // delete menu item
router.post("/create-password", resturantController.createPassword); // create password
router.get("/orders/:id", resturantController.getOrders); // get orders
router.get("/order/:id", resturantController.getOrder); // get order
router.put("/update-order-status/:id", resturantController.updateOrderStatus); // update order status

export default router;
