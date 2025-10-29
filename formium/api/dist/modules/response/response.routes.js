import { Router } from "express";
import { createResponseHandler, getResponsesHandler } from "./response.controller.js";
const router = Router();
router.use("/", createResponseHandler);
router.use("/:formId", getResponsesHandler);
export default router;
