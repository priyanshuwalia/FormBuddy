import { Router } from "express";
import { updateUserHandler, deleteUserHandler } from "./user.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";
const router = Router();
router.put("/", verifyToken, updateUserHandler);
router.delete("/", verifyToken, deleteUserHandler);
export default router;
