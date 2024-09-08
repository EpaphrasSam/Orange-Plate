import { Router } from "express";
import * as riderController from "../controllers/rider";

const router = Router();

router.post("/home/:id", riderController.riderHome);

export default router;
