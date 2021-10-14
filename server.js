// IMPORTS ------------------------------------------
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './db-connect.js';
import usersRouter from './routes/usersRouter.js';
import composersRouter from './routes/composersRouter.js';
import worksRouter from './routes/worksRouter.js';
// --------------------------------------------------


// SETUPS -------------------------------------------
const app = express();
// --------------------------------------------------


// MIDDLEWARE ---------------------------------------
app.use( express.json() );

app.use( cors({ origin: "http://localhost:3000", credentials: true }) );

app.use( cookieParser() );
// --------------------------------------------------


// ROUTES -------------------------------------------
app.get("/", (req, res) => {
    res.send(`<h1>aChord Backend</h1>`)
});

app.use("/users", usersRouter);

app.use("/composers", composersRouter);

app.use("/works", worksRouter);
// --------------------------------------------------


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});


app.use(
    function errorHandler (err, req, res, next) {
        res.status(err.status || 400).send({
            error: {
                message: err.message,
                status: err.status
            }
        });
    }
);