import express from "express";
import { login, logout, sign, getUser } from "../controllers/authController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", sign);
router.post("/login", login);
router.get("/get-user", protectRoute, getUser);
router.post("/logout", logout);

export default router;
