import { Request, Response } from "express";
import * as ResponseService from "./resposnse.service.js"

export const createResponseHandler = async (req: Request, res: Response) => {
    if (!req.body) {
        res.status(400).json({ error: "Request body is empty" });
        return;
    }
    const { formId, items } = req.body;
    try {
        if (!formId || !items || !Array.isArray(items)) {
            res.status(400).json({ error: "formId and Items[] required" })
            return
        }
        const response = await ResponseService.createResponse(formId, items);
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({ error: "Couldnt submit Response", err });
    }
}
export const getResponsesHandler = async (req: Request, res: Response) => {
    try {
        const { formId } = req.params;
        const responses = await ResponseService.getResponseByForm(formId);
        res.status(201).json(responses)


    } catch (err) {
        res.status(500).json({ error: "Failed to fetch responses" });
    }
}