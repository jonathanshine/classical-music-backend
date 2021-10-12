// IMPORTS ------------------------------------------
import mongoose from 'mongoose';
const { Schema, model } = mongoose;
// --------------------------------------------------


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


// MODEL --------------------------------------------
const User = model("User", UserSchema);

export default User;