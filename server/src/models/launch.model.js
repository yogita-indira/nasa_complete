const launches = new Map();
let latestFlightNumber = 100;
const launch = {
  flightNumber: 45,
  mission: "Kepler Exploreation X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};
launches.set(launch.flightNumber, launch);

// function launchExist(launchId) {
//   if(launchId){
//   console.log("exist")
//   return launches.has(launchId);
//   }else{
//     console.log("not exist")
//   }
// }
function launchExist(launchId) {
  return launches.has(launchId);
}



function abortLaunch(launchId){
  const aborted = launches.get(launchId);
  if (!aborted) {
      throw new Error(`Launch with ID ${launchId} not found`);
  }
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}
// launch.model.js

function addNewLaunch(launchData) {
  latestFlightNumber++;
  const newLaunch = {
    ...launchData,
    flightNumber: latestFlightNumber,
    success: true,
    upcoming: true,
    customers: ["Zero to mastery", "NASA"],
  };
  launches.set(latestFlightNumber, newLaunch);
  return newLaunch;
}



export { launches, addNewLaunch, launchExist, abortLaunch };
