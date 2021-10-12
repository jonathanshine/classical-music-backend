import express from 'express';
const router = express.Router();


import {
    getAllComposers,
    getOneComposer
} from "../controllers/composersController.js";


router.route("/").get( getAllComposers );
router.route("/:id").get( getOneComposer );


export default router;