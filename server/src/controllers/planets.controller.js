

import {planets} from "../models/planets.model.js";
class Myplanets{

    static async  getAllPlanets (req, res) {
        res.status(200).json(planets);
        // console.log(planets)
    };
}

export default Myplanets;
