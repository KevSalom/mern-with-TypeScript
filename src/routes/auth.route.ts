import { Router } from "express";
import { login, register, logout, profile } from "../controllers/auth.controller";
import { validateToken } from "../middlewares/validateToke";

const router = Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

router.get("/profile", validateToken, profile)

export default router;