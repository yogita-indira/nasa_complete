// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import path from "path";
// import http from "http";
// import { dirname } from "node:path";
// import { fileURLToPath } from "node:url";
// import { loadPlanetsData } from "./models/planets.model.js";

// dotenv.config();

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const app = express();

// // Middleware
// app.use(cors());
// app.use(morgan("combined"));
// app.use(express.json({ origin: "http://localhost:3000" }));
// app.use(express.static(path.join(__dirname, "..", "public"))); // Serve static files

// // Routes
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "public", "index.html"));
// });

// const port = process.env.PORT || 7080;

// async function startServer() {
//   try {
//     // Database connection
//     const DB_URL = process.env.DB_URL;
//     mongoose.connection.on("open", () => {
//       console.log("Mongo Connection Ready");
//     });

//     await mongoose.connect(DB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Database connected successfully");

//     // Load planets data
//     await loadPlanetsData();

//     // Start server
//     const server = http.createServer(app);

//     server.listen(port, () => {
//       console.log(`Server is listening on port ${port}`);
//     });
//   } catch (error) {
//     console.error("Error starting server:", error);
//   }
// }

// startServer();
import http from "http";
import mongoose from 'mongoose';
import app from "./app.js";
import { loadPlanetsData } from "./models/planets.model.js";
import {loadLaunchData} from "./models/launch.model.js";

import dotenv from "dotenv";
import { ObjectId } from 'mongodb';
dotenv.config();
const PORT = process.env.PORT || 7080;
const mongo_url=process.env.DB_URL;
const server = http.createServer(app);

mongoose.connection.once('open', ()=>{
  console.log('MongoDb connection is ready !')
})
mongoose.connection.on('error',(err)=>{
  console.log(err)
})

async function startServer() {
  await mongoose.connect(mongo_url);
  
const objectId = new ObjectId("66223cd1a9c443057ab1534b");
console.log(`${objectId.getTimestamp()}`, "done");
  await loadPlanetsData();
  await loadLaunchData();
  server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}

startServer();

