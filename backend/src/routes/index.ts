import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, welcome to Orange Plate!");
});

export default router;
