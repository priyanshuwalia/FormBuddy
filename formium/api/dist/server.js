import app from "./app.js";
import prisma from "./config/db.js";
const PORT = process.env.PORT || 4000;
const main = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected successfully!");
        app.listen(PORT, () => {
            console.log(`✅ Server running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to connect to database:", error);
        process.exit(1);
    }
};
main();
