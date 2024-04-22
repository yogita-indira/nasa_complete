import {
  launchExist,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunch,
} from "../models/launch.model.js";
import Launch from "../models/launches.mongo.js";
import getPagination from "../services/query.js";


class Mylaunches {
  static async httpgetAllLaunches(req, res) {
    const { skip, limit } = getPagination(req.query);
const launches=await getAllLaunches(skip, limit);

    return res.status(201).json(launches);
  }
  static async httpAddNewLaunches(req, res) {
    try {
      const launchData = req.body;

      // Ensure that necessary fields are present in the request
      if (!launchData.mission || !launchData.launchDate || !launchData.target) {
        return res.status(400).json({
          error: "Please provide mission, launch date, and target fields.",
        });
      }

      const newLaunch = await scheduleNewLaunch(launchData);
      return res.status(201).json(newLaunch);
    } catch (error) {
      console.error("Error adding new launch:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
    console.log(typeof launchId);

    // Check if the launch with the provided ID exists
    if (!launchExist(launchId)) {
      return res.status(404).json({
        error: "Launch not found",
      });
    }

    // Abort the launch
    const aborted = abortLaunch(launchId);

    // Respond with the aborted launch
    return res.status(200).json(aborted);
  }
}

export default Mylaunches;
