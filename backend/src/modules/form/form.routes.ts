import { Router } from "express";
import { createFormHandler, deleteFormHandler, getFormHandler, getUserFormsHandler, updateFormHandler } from "./form.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js"


const router = Router();

router.post("/", createFormHandler);
router.get("/dashboard", verifyToken, getUserFormsHandler);
router.get("/:slug", getFormHandler);
router.put("/:id", verifyToken, updateFormHandler)
router.delete("/:id", verifyToken, deleteFormHandler);

export default router;