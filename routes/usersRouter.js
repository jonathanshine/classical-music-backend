import express from 'express';
const router = express.Router();

import {
    createUser,
    deleteUser,
    getAllUsers,
    getOneUser,
    loginUser,
    updateUser,
    verifyCookie
} from "../controllers/usersController.js";

import auth from '../middleware/authentication.js';


router.route("/").get( getAllUsers ).post( createUser );
router.route("/:id").get( getOneUser ).put( updateUser ).delete( deleteUser );
router.route('/auth').post(auth, verifyCookie);
router.route("/login").post( loginUser );


export default router;