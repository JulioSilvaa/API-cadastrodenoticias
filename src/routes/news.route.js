import { Router } from "express";
import {
  createNews,
  findAllNews,
  findAllNewsByUser,
  mainNews,
  searchNewsById,
  searchNewsByTitle,
  updateNews,
} from "../controllers/news.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createNews);
router.get("/", findAllNews);
router.get("/top", mainNews);
router.get("/search", searchNewsByTitle);
router.get("/byUser", authMiddleware, findAllNewsByUser);
router.get("/:id", authMiddleware, searchNewsById);
router.patch("/:id", authMiddleware, updateNews);

export default router;
