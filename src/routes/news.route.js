import { Router } from "express";
import { createNews, findAllNews } from "../controllers/news.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createNews);
router.get("/", findAllNews);

export default router;
