import { Router } from "express";
import {
  createNews,
  findAllNews,
  mainNews,
} from "../controllers/news.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createNews);
router.get("/", findAllNews);
router.get("/top", mainNews);

export default router;
