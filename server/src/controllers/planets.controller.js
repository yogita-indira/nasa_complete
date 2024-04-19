

import {getAllPlanets} from "../models/planets.model.js";
class Myplanets{

    static async  httpgetAllPlanets (req, res) {
        return res.status(200).json(await getAllPlanets());
        // console.log(planets)
    };
}

export default Myplanets;


// const { getAllPlanets } = require('../../models/planets.model');

// async function httpGetAllPlanets(req, res) {
//   return res.status(200).json(await getAllPlanets());
// }

// module.exports = {
//   httpGetAllPlanets,
// };