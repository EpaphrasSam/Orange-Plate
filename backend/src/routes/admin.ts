import { Router } from "express";
import * as adminController from "../controllers/admin";

const router = Router();

router.post("/create-restaurant", adminController.createRestaurant);
router.post("/create-rider", adminController.createRider);
router.post("/create-categories", adminController.createCategories);
export default router;
