import express from "express";
const planetsRouter = express.Router();
import Myplanets from "../../controllers/planets.controller.js";
planetsRouter.get("/getPlanets", Myplanets.httpgetAllPlanets)
export default planetsRouter
