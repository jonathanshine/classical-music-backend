import createError from 'http-errors';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const user = await User.findByToken(token);
    if (!user)
      next(
        createError(401, `Authentication failed - couldn't find a valid cookie.`)
      );

    // if a user exists, pass the user in the req for future use
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default auth;