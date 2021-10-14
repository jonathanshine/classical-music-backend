// IMPORTS ------------------------------------------
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// --------------------------------------------------

const { Schema, model } = mongoose;

dotenv.config();

// SCHEMA -------------------------------------------
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    favorites: {
        composers: [{ type: Schema.Types.ObjectId, ref: "Composer", required: false }, { _id: false }],
        works: [{ type: Schema.Types.ObjectId, ref: "Work", required: false }, { _id: false }]
    },
}, {
    versionKey: false,
    timestamps: true
});
// --------------------------------------------------


// METHODS/STATICS -----------------------------------
UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_PASS, {
        expiresIn: '3h'
    });
    console.log(`We created a cookie token for user ${user._id} --> ${token}`);
    return token;
};

UserSchema.statics.findByToken = function (token) {
  const User = this;


  try {
    // Verify the token
    let decoded = jwt.verify(token, process.env.JWT_PASS);
    // See if a user with that id exists
    return User.findOne({ _id: decoded._id });
  } catch (error) {
    return;
  }
};
// --------------------------------------------------


// MODEL --------------------------------------------
const User = model("User", UserSchema);

export default User;