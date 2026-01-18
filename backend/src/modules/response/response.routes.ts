import { Router } from "express";
import { createResponseHandler, getResponsesHandler } from "./response.controller.js";

const router = Router();

router.post("/", createResponseHandler);
router.get("/:formId", getResponsesHandler);

export default router;