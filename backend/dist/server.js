import app from "./app.js";
const PORT = process.env.PORT || 4000;
process.on("exit", (code) => {
    console.log("Process exited with code:", code);
});
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});
