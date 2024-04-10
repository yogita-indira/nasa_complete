import { useCallback, useEffect, useState } from "react";

import {
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
} from './requests';

function useLaunches(onSuccessSound, onAbortSound, onFailureSound) {
  const [launches, setLaunches] = useState([]);
  const [isPendingLaunch, setIsPendingLaunch] = useState(false);

  const getLaunches = useCallback(async () => {
    try {
      const fetchedLaunches = await httpGetLaunches();
      setLaunches(fetchedLaunches);
    } catch (error) {
      console.error("Error fetching launches:", error);
      onFailureSound();
    }
  }, []);

  useEffect(() => {
    getLaunches();
  }, [getLaunches]);

  const submitLaunch = useCallback(async (e) => {
    e.preventDefault();
    setIsPendingLaunch(true);
    console.log("submitted")
    const data = new FormData(e.target);
    const launchDate = new Date(data.get("launch-day"));
    const mission = data.get("mission-name");
    const rocket = data.get("rocket-name");
    const target = data.get("planets-selector");
    
    try {
      const response = await httpSubmitLaunch({
        launchDate,
        mission,
        rocket,
        target,
      });

      if (response.ok) {
        getLaunches();
        setTimeout(() => {
          setIsPendingLaunch(false);
          onSuccessSound();
        }, 800);
      } else {
        onFailureSound();
      }
    } catch (error) {
      console.error("Error submitting launch:", error);
      onFailureSound();
    }
  }, [getLaunches, onSuccessSound, onFailureSound]);

  const abortLaunch = useCallback(async (id) => {
    try {
      const response = await httpAbortLaunch(id);
      if (response.ok) {
        getLaunches();
        onAbortSound();
      } else {
        onFailureSound();
      }
    } catch (error) {
      console.error("Error aborting launch:", error);
      onFailureSound();
    }
  }, [getLaunches, onAbortSound, onFailureSound]);

  return {
    launches,
    isPendingLaunch,
    submitLaunch,
    abortLaunch,
  };
}

export default useLaunches;
