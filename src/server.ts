import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes/testRoutes";
import playerRoutes from "./routes/playerRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tests", testRoutes);
app.use("/api/players", playerRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Cavs Shotting Tracker API" });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
