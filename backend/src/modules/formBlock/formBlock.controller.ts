
import * as FormBlockService from "./formBlock.service.js";
import { Request, Response } from "express";

export const createFormBlockHandler = async (req: Request, res: Response) => {
    try {

        const block = await FormBlockService.createFormBlock(req.body);
        res.status(201).json(block);
    }
    catch (err: any) {
        console.error("Error creating FormBlock:", err);
        res.status(500).json({ error: "failed to create FormBlock", details: err.message || err })
    }
}

export const getBlocksByFormIdHandler = async (req: Request, res: Response) => {
    try {
        const { formId } = req.body;
        const blocks = await FormBlockService.getBlocksByFormId(formId);
        if (!blocks || blocks.length === 0) {
            res.status(404).json({ error: "no blocks found" });
            return

        }
    }
    catch (err) {
        res.status(500).json({ error: "failed to fetch form Blocks", err })
    }
}
export const updateBlockHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        //@ts-ignore
        const userId = req.user.id;

        const updated = await FormBlockService.updateBlockById(id, userId, updateData);

        if (updated.count === 0) {
            res.status(404).json({ error: "block not found or unauthorized" })
            return
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to Update Block", details: err })
    }
}
export const deleteBlockHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        //@ts-ignore
        const { userId } = req.user.id;
        const deleted = await FormBlockService.deleteBlockById(id, userId);

        if (deleted.count === 0) {
            res.status(404).json({ error: "Block not found or unauthorized" });
            return
        }

        res.json({ message: "Block deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete block", details: err });
    }
};
