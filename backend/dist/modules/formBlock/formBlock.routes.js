import { Router } from "express";
import { createFormBlockHandler, deleteBlockHandler, getBlocksByFormIdHandler, updateBlockHandler } from "./formBlock.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";
const router = Router();
router.post("/", verifyToken, createFormBlockHandler);
router.get("/:formId", getBlocksByFormIdHandler);
router.put("/:id", verifyToken, updateBlockHandler);
router.delete("/:id", verifyToken, deleteBlockHandler);
export default router;
