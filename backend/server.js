import express from "express";
import userRouter from "./routes/users.js";
import cors from "cors";

const app = express();
const PORT = 3001;

// CORS middleware 
app.use(cors({
  origin: "http://127.0.0.1:8080"
}));

// Middleware to parse JSON
app.use(express.json());

// Route test
// app.get(...) = define api. 
// req: request from the client, res: response for the client
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.use("/api/users", userRouter);