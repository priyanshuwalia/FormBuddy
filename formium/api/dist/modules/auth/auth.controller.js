import * as AuthService from "./auth.service.js";
export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AuthService.registerUser(email, password);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.loginUser(email, password);
        res.json(result);
    }
    catch (err) {
        res.status(401).json({ error: err.message });
    }
};
