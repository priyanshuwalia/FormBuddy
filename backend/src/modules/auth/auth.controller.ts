import * as AuthService from "./auth.service.js"
import { Request,Response } from "express"

export const register = async (req: Request, res:Response)=> {
    try {
        const {email, password}= req.body;
        const user= await AuthService.registerUser(email, password);
        
        res.status(201).json(user);
    }
    catch (err:any) {
        res.status(400).json({error: err.message})
    }
}
export const login = async (req: Request, res: Response) =>{
    try {
        const {email, password}= req.body;
        const result = await AuthService.loginUser(email,password);
        res.json(result);
        

    }
    catch(err:any) {
        res.status(401).json({error: err.message})
    }
}