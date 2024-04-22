import Launch from "./launches.mongo.js";
import planets from "./planets.mongo.js";
import axios from "axios";

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";
const DEFAULT_FLIGHT_NUMBER = 100;

async function findLaunch(filter) {
  return await Launch.findOne(filter);
}
async function populateLaunches() {
  console.log("Downloading launch data ");
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.log("Problem in downloading the data");
    throw new Error("Launch data failed");
  }

  const launchDocs = response.data.docs;
  // console.log(launchDocs)
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    // console.log(customers);
    const launch = {
      flightNumber: launchDoc.flight_number,
      mission: launchDoc.name,
      rocket: launchDoc.rocket.name,
      launchDate: launchDoc.date_local,
      upcoming: launchDoc.upcoming,
      customer: customers, // Changed from customer to customers
    };

    await saveLaunch(launch);
    
console.log("launch", launch);
  }
}


async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flight_number: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (firstLaunch) {
    console.log("Launch data already loaded");
  } else {
    console.log("Downloading launch data ");
    await populateLaunches();
  }
}

async function launchExist(launchId) {
  return Launch.exists({ flightNumber: launchId });
}

async function abortLaunch(launchId) {
  const aborted = await Launch.findOneAndUpdate(
    { flightNumber: launchId },
    { upcoming: false, success: false },
    { new: true }
  );

  if (!aborted) {
    throw new Error(`Launch with ID ${launchId} not found`);
  }

  return aborted;
}

async function saveLaunch(launch) {
  await Launch.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const Planets = await planets.findOne({
    keplerName: launch.target,
  });
  if (!Planets) {
    throw new Error("No matching planets found");
  }

  const newFlightNumber = (await getLatestLaunchNumber()) + 1;
  console.log(newFlightNumber);
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Zero to mastery", "NASA"],
    flightNumber: newFlightNumber,
  });
  await saveLaunch(newLaunch);
}

async function getAllLaunches(skip, limit) {
  return await Launch.find(
    {},
    {
      _id: 0,
      _v: 0,
    }
  )
   .sort({flightNumber:1})
    .skip(skip)
    .limit(limit);
}

async function getLatestLaunchNumber() {
  const latestLaunch = await Launch.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

export {
  loadLaunchData,
  scheduleNewLaunch,
  getAllLaunches,
  launchExist,
  abortLaunch,
};
