import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import planetsRouter from "./routes/planets/planets.router.js";
import launchesRouter from "./routes/launches/launches.router.js";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Use middleware
app.use(cors());
app.use(morgan("combined"));
app.use(express.json({ origin: "http://localhost:3000" }));
app.use(express.static(path.join(__dirname, "..", "public"))); // Serve static files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
app.get("/", (req, res) => {
  // Return a response or render a view for the root URL
  res.send("Hello, world!"); // Example response
});
// Use routers
app.use(planetsRouter);
app.use(launchesRouter);

export default app;
