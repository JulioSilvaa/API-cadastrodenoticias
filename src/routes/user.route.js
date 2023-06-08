import express from "express";
import userController from "../controllers/user.controller.js";
import {
  validatingId,
  validatingUser,
} from "../middlewares/global.middleware.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.findAllUsers);
router.get("/:id", validatingId, validatingUser, userController.findUser);
router.patch("/:id", validatingId, validatingUser, userController.updateUser);

export default router;
