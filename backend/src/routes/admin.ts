import { Router } from "express";
import * as adminController from "../controllers/admin";

const router = Router();

router.post("/create-restaurant", adminController.createRestaurant);
router.post("/create-rider", adminController.createRider);

export default router;
