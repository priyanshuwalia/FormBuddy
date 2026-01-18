import { Router } from "express";
import { getAnalyticsHandler } from "./analytics.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const router = Router();

router.get("/", verifyToken, getAnalyticsHandler);

export default router;
