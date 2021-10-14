// IMPORTS ------------------------------------------
import createError from 'http-errors';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
// --------------------------------------------------


// METHODS ------------------------------------------
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find(); // .select("-password");
        res.json( users );
    } catch (error) {
        next( error );
    };
};

export const getOneUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findById( id ).select("-password");
        if (!user) throw new createError(404, `No user with id --> ${id} found`);
        res.json( user );
    } catch (error) {
        next( error );
    };
};

export const verifyCookie = (req, res) => {
  res.send(req.user);
};

export const createUser = async (req, res, next) => {
    const data = req.body;
    
    try {
        
        const user = new User(data);
        const savedUser = await user.save();
        

        const token = user.generateAuthToken();

        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 10800000),
            sameSite: "lax",
            secure: true
        }).json( savedUser );
    } catch (error) {
        next( error );
    };
};

export const updateUser = async (req, res, next) => {
    // need to add hashing in case of password change
    
    try {
        const { id } = req.params;
        const updateData = req.body;
        let user = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )

        if (!user) throw new createError(404, `No user with id --> ${id} found`);
        res.send( user );
    } catch (error) {
        next( error );
    };
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete( id );
        if (!user) throw new createError(404, `No user with id --> ${id} was found`);
        res.json({
            success: `User with id:${id} was deleted.`,
            user: user
        });
    } catch (error) {
        next( error );
    };
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).populate("favorites", "composers works");
        if (!user) throw new createError(404, "Invalid email");

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) next( createError(404, "Invalid password"));

        const token = user.generateAuthToken();

        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 10800000),
            sameSite: "lax",
            secure: true
        }).send( user );
    } catch (error) {
        next( error );
    };
};
// --------------------------------------------------