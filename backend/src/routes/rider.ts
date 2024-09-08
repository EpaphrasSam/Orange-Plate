import { Router } from "express";
import * as riderController from "../controllers/rider";

const router = Router();

router.post("/home/:id", riderController.riderHome);
router.post("/accept-order", riderController.acceptOrder);
export default router;
