import express from 'express';
const router = express.Router();


import {
    getAllWorks,
    getOneWork
} from "../controllers/worksController.js";


router.route("/").get( getAllWorks );
router.route("/:id").get( getOneWork );


export default router;