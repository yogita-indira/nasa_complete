const FETCH_URL="http://192.168.46.114:8000";
async function httpGetPlanets() {
  const response =await fetch(`${FETCH_URL}/v1/getPlanets`)
  return await response.json();

  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {

  const response= await fetch(`${FETCH_URL}/v1/getting`)
  const fetchedLaunches= await response.json();
  return fetchedLaunches.sort((a,b)=>{
    return a.flightNumber-b.flightNumber;
  })
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}


async function httpSubmitLaunch(launch) {
  try {
 return await fetch(`${FETCH_URL}/v1/addlaunches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  
   
  } catch (error) {
  return {
    ok:false,
  };
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  return await fetch(`${FETCH_URL}/v1/deleteLaunch/${id}`,{
    method:"delete"
  });
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};