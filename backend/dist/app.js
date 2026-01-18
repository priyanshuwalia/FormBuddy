import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./modules/auth/auth.routes.js";
import formRoutes from "./modules/form/form.routes.js";
import formBlockRoutes from "./modules/formBlock/formBlock.routes.js";
import responseRoutes from "./modules/response/response.routes.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";
import userRoutes from "./modules/user/user.routes.js";
dotenv.config();
const app = express();
app.use(cors({
    origin: ["https://form-buddy-v68o.vercel.app", "http://localhost:5173"],
    credentials: true,
}));
app.use(express.json());
app.get("/", (req, res) => {
    res.json({ message: "Welcome To FormBuddy API" });
});
app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/form-blocks", formBlockRoutes);
app.use("/api/response", responseRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/user", userRoutes);
export default app;
