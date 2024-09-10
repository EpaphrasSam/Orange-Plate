import express, { Router } from "express";
import * as resturantController from "../controllers/resturant";

const router: Router = express.Router();
router;
router.put("/update-restaurant/:id", resturantController.updateRestaurant); // update restaurant
router.post("/create-menu/:id", resturantController.createMenu); // create menu
router.post("/update-menu-item/:id", resturantController.updateMenuItem); // update menu item
router.delete("/delete-menu-item/:id", resturantController.deleteMenuItem); // delete menu item
router.get("/categories", resturantController.getAllCategories); // get all categories
router.post("/create-password", resturantController.createPassword); // create password
router.get("/orders/:id", resturantController.getOrders); // get orders
router.get("/order/:id", resturantController.getOrder); // get order
router.put("/update-order-status/:id", resturantController.updateOrderStatus); // update order status

router.get("/:id", resturantController.getRestaurantById); // get restaurant by id

export default router;
