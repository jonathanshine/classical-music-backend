// IMPORTS ------------------------------------------
import express from 'express';
import cors from 'cors';
import "./db-connect.js";
// --------------------------------------------------


// SETUPS -------------------------------------------
const app = express();
// --------------------------------------------------


// MIDDLEWARE ---------------------------------------
app.use( express.json() );

app.use( cors() );
// --------------------------------------------------


// ROUTES -------------------------------------------
app.get("/", (req, res) => {
    res.send(`<h1>aChord Backend</h1>`)
});
// --------------------------------------------------


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:.${PORT}`);
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