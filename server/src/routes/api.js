import express from "express";
import planetsRouter from "./planets/planets.router.js";

import launchesRouter from "./launches/launches.router.js";
// Use routers
const api=express.Router();
api.use(planetsRouter);
api.use(launchesRouter);
export {api};