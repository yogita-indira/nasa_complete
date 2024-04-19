import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
import { api } from "./routes/api.js";

// Use middleware
app.use(cors());
app.use(morgan("combined"));
app.use(express.json({ origin: "http://localhost:3000" }));
app.use(express.static(path.join(__dirname, "..", "public"))); // Serve static files
app.use("/v1", api);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
app.get("/", (req, res) => {
  // Return a response or render a view for the root URL
  res.send("Hello, world!"); // Example response
});

export default app;
