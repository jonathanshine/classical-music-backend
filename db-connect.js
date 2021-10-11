// IMPORTS ------------------------------------------
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// --------------------------------------------------


dotenv.config();


// MONGOOSE CONFIG ----------------------------------
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => console.log("Successfully connected to the database"))
.catch((error) => console.log("[ERROR] - connection to database failed --> ", error.message));
// --------------------------------------------------