const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// app.use( (req, res, next) => {
//     console.log("Hi, I am middleware");
//     next();
// });

// app.use( (req, res, next) => {
//     console.log("Hi, I am 2nd middleware");
//     next();
// });

// // logger - morgan

// app.use((req, res, next) =>{
//     req.time = new Date(Date.now());
//     console.log(req.method, req.hostname, req.path, req.time);
// });

// app.use((req, res) => {
//     res.status(404).res.send("Page not found");
// });

const checkToken = (req, res , next) => {
    let {token} = req.query;
    if (token === "giveaccess") {
        next();
    }
    throw new ExpressError(401, "ACCESS DENIED!");
};

app.get("/api",checkToken, (req, res) => {
    res.send("data");
});

// app.get("wrong" , (req, res) => {
//     abcd = abcd;
// });

app.get("/" , (req, res) => {
    res.send("Hi, I am root.");
});

app.get("/random", (req, res) => {
    res.send("This is a random page");
});

app.get("/err" , (req, res) => {
    abcd = abcd;
});

app.get("/admin", (req,res) =>{
    throw new ExpressError(403, "Access to admin is Forbidden");
});

app.use((err, req, res, next) => {
    let {status = 500, message = "Some Error Occurred"} = err;
    res.status(status).send(message);
});

// app.use((err, req, res, next) => {
//     console.log("------ ERROR2 Middleware -------");
//     next(err);
// });

// app.use((req, res) => {
//     res.status(404).send("Page not found");
// });

app.listen(8080, () => {
    console.log("server listening to port 8080");
});