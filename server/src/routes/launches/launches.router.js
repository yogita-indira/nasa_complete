import express from "express";
const launchesRouter = express.Router();
import Mylaunches from "../../controllers/launches.controller.js";
launchesRouter.get("/getting", Mylaunches.httpgetAllLaunches);
launchesRouter.post("/addlaunches", Mylaunches.httpAddNewLaunches);
launchesRouter.delete("/deleteLaunch/:id", Mylaunches.httpAbortLaunch);
export default launchesRouter;
