import Launch from "./launches.mongo.js";
import planets from "./planets.mongo.js";
// const launches = new Map();



const DEFAULT_FLIGHT_NUMBER=100;
// let latestFlightNumber = 100;
const launch = {
  flightNumber: 45,
  mission: "Kepler Exploreation X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-296 A e",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};
// launches.set(launch.flightNumber, launch);
saveLaunch(launch);

function launchExist(launchId) {
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
  const Planets = await planets.findOne({
    keplerName: launch.target,
  });
  if (!Planets) {
    throw new Error("No matching planets found");
  }

  await Launch.updateOne({ flightNumber: launch.flightNumber }, launch, {
    upsert: true,
  });
}


async function scheduleNewLaunch(launch){
  const newFlightNumber=await getLatestLaunchNumber()+1;
  console.log(newFlightNumber)
const newLaunch=Object.assign(launch,{
  success:true,
  upcoming:true,
  customers: ["Zero to mastery", "NASA"],
  flightNumber: newFlightNumber,
});
await saveLaunch(newLaunch);
}
// function addNewLaunch(launchData) {
//   latestFlightNumber++;
//   const newLaunch = {
//     ...launchData,
//     flightNumber: latestFlightNumber,
//     success: true,
//     upcoming: true,
//     customers: ["Zero to mastery", "NASA"],
//   };
//   // launches.set(latestFlightNumber, newLaunch); // Remove this line
//   return newLaunch;
// }

async function getAllLaunches() {
  return await Launch.find(
    {},
    {
      _id: 0,
      _v: 0,
    }
  );
}

async function getLatestLaunchNumber() {
  const latestLaunch = await Launch.findOne().sort('-flightNumber');
  
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}


export { scheduleNewLaunch, getAllLaunches,  launchExist, abortLaunch };
