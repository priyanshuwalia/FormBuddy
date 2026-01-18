import { Request, Response } from "express";
import * as AnalyticsService from "./analytics.service.js";

export const getAnalyticsHandler = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const data = await AnalyticsService.getAnalytics(userId);
        res.json(data);
    } catch (error) {
        console.error("Analytics Error:", error);
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
};
