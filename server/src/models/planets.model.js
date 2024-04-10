import { parse } from 'csv-parse';
import fs from "fs";

// Define the array to hold habitable planets
const habitablePlanets = [];

// Function to load planets data from CSV
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream("./data/kepler_data.csv")
      .pipe(parse({
        comment: "#",
        columns: true
      }))
      .on('data', (data) => {
        // Check if the planet is habitable and add it to the array
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on('end', () => {
        // Resolve the promise with the habitablePlanets array
        resolve(habitablePlanets);
      })
      .on('error', (err) => {
        // Reject the promise if an error occurs
        reject(err);
      });
  });
}

// Function to determine if a planet is habitable
function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6 &&
    planet['koi_insol'] > 0.36;
}

// Load planets data when the module is imported
loadPlanetsData()
  .then(() => console.log(`Loaded ${habitablePlanets.length} habitable planets.`))
  .catch((err) => console.error('Error loading planets data:', err));

// Export the habitablePlanets array as planets object
export const planets = habitablePlanets;

// Export the loadPlanetsData function
export { loadPlanetsData };
