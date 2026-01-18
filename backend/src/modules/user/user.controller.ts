import { Request, Response } from "express";
import * as UserService from "./user.service.js";

export const updateUserHandler = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        const { name, bio, profilePicture } = req.body;
        const updatedUser = await UserService.updateUser(userId, { name, bio, profilePicture });
        res.json(updatedUser);
    } catch (error) {
        console.error("Update User Error:", error);
        res.status(500).json({ error: "Failed to update profile" });
    }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.id;
        await UserService.deleteUser(userId);
        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ error: "Failed to delete account" });
    }
};
