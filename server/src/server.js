import app from "./app.js";
import http from "http";
import dotenv from "dotenv";
import { loadPlanetsData } from "./models/planets.model.js";

dotenv.config();

const port = process.env.PORT || 7080;

async function startServer() {
  try {
    await loadPlanetsData();
    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error loading planets data:', error);
    process.exit(1); // Exit the process with a non-zero code to indicate failure
  }
}

startServer();
