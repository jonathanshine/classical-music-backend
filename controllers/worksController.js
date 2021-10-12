// IMPORTS ------------------------------------------
import createError from 'http-errors';
import Work from '../models/Work.js';
// --------------------------------------------------


// METHODS ------------------------------------------
export const getAllWorks = async (req, res, next) => {
    try {
        const works = await Work.find();
        res.json( works );
    } catch (error) {
        next( error )
    };
};

export const getOneWork = async (req, res, next) => {
    try {
        const { id } = req.params;
        const work = await Work.findById( id );
        if(!work) throw new createError(404, `No work with id --> ${id} was found`);
        res.json( work );
    } catch (error) {
        next( error );
    };
};
// --------------------------------------------------