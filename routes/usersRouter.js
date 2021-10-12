import express from 'express';
const router = express.Router();


import {
    createUser,
    getAllUsers,
    getOneUser,
    loginUser,
    updateUser
} from "../controllers/usersController.js";

router.route("/").get( getAllUsers ).post( createUser );
router.route("/:id").get( getOneUser ).put( updateUser );
router.route("/login").post( loginUser );


export default router;