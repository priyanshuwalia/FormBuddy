import prisma from "../../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!;

export const registerUser = async (email: string, password: string) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("Email already Registered");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashedPassword } })
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "2d" })
    return { id: user.id, email: user.email, token: token };

};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid Credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "3h" })

    return { token: token, user: { id: user.id, email: user.email } }
}
