import { Router } from "express";
import { validateToken } from "../middlewares/validateToke";

const router = Router();

router.get("/tasks", validateToken, (req, res) => {
  res.json({ message: "Hello World" });
});

export default router;