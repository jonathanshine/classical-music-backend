// IMPORTS ------------------------------------------
import createError from 'http-errors';
import Composer from '../models/Composer.js';
// --------------------------------------------------


// METHODS ------------------------------------------
export const getAllComposers = async (req, res, next) => {
    try {
        const composers = await Composer.find();
        res.json( composers );
    } catch (error) {
        next( error )
    };
};

export const getOneComposer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const composer = await Composer.findById( id );
        if(!composer) throw new createError(404, `No composer with id --> ${id} was found`);
        res.json( composer );
    } catch (error) {
        next( error );
    };
};
// --------------------------------------------------