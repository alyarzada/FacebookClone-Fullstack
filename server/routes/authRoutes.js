import express from "express";
import { loginHandler, signUpHandler } from "../controllers/authController.js";

// init router
const router = express.Router();

// routes
router.post("/login", loginHandler);
router.post("/register", signUpHandler);

export default router;
