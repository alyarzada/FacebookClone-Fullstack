import express from "express";
import {
  deletePostController,
  getPostController,
  createPostController,
  updatePostController,
} from "../controllers/postController.js";
import { requireAuth } from "../middlewares/requireAuth.js";

// initialize router
const router = express.Router();

// middlewares
router.use(requireAuth);

// routes
router.get("/", getPostController);
router.post("/create", createPostController);
router.delete("/:id", deletePostController);
router.patch("/:id", updatePostController);

export default router;
