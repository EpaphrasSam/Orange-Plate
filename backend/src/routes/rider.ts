import { Router } from "express";
import * as riderController from "../controllers/rider";

const router = Router();

router.post("/home/:id", riderController.riderHome);
router.post("/accept-order", riderController.acceptOrder);
router.get("/orders/:id", riderController.riderOrders);
router.post("/end-trip/:id", riderController.endTrip);
export default router;
