import { Router } from "express";
import { createResponseHandler, getResponsesHandler, getResponseHandler } from "./response.controller.js";
const router = Router();
router.post("/", createResponseHandler);
router.get("/detail/:id", getResponseHandler);
router.get("/:formId", getResponsesHandler);
export default router;
