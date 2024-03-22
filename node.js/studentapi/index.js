const express = require('express');

const app = express();
require ('dotenv').config();

const courseRoute = require("./Routes/courseRoute");
const regRoute = require("./Routes/regRoute");
const createError = require("http-errors");

require ('./Model/dbConnect');

const studentRoutes = require('./Routes/studentRoute');

app.use (express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoute);
app.use('/api/reg', regRoute);
app.listen(process.env.port || 4000, function() {
    console.log('Now Listening for requests on: http://localhost:4000/');
  });

  


  //handling  errors
app.use(async(req, res, next)=>{
    next(createError.NotFound())
})

//Error handling middleware 
app.use((err, req,res,next)=> {
    if (err.status === 401){
        //handle 401 unauthorized error 
        res.status(401).send({
            error: {
                status:401,
                message:"You are not authorised to view this resource"
            }
        });
    }else {
        //Handle other errrors
        res.status (err.status || 500).send({
            error: {
                status:err ||500,
                message: "Internal Server Error",
            }
        });
    }

})

// const express = require("express");
// const app = express();
// const studentRoute = require("./routes/studentRoute");
// const courseRoute = require("./Routes/courseRoute");
// const regRoute = require("./Routes/regRoute");
// const createError = require("http-errors");
// require("dotenv").config();
// require("./Model/dbConnect");

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// app.use("/api/student", studentRoute);
// app.use("/api/course", courseRoute);
// app.use("/api/reg", regRoute);

// // Handling 404 error
// app.use(async(req, res, next) => {
//     next(createError.NotFound())
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     if (err.status === 401) {
//         // Handling 401 Unauthorized error
//         res.status(401).send({
//             error: {
//                 status: 401,
//                 message: "Unauthorized: Invalid username/password"
//             }
//         });
//     } else {
//         // Handling other errors
//         res.status(err.status || 500).send({
//             error: {
//                 status: err.status || 500,
//                 message: err.message || "Internal Server Error"
//             }
//         });
//     }
// });

// // Not Found middleware
// app.use(async(req, res, next) => {
//     next(createError.NotFound());
// });

// app.listen(process.env.port || 4000, function() {
//     console.log("Now listening for requests on: http://localhost:4000");
// });