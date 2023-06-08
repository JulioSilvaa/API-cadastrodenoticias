import { Router } from "express";
import { createNews, findAllNews } from "../controllers/news.controller.js";

const router = Router();

router.post("/", createNews);
router.get("/", findAllNews);

export default router;
