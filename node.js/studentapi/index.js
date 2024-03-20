const express = require('express');

const app = express();
require ('dotenv').config();
require ('./Model/dbConnect');

const studentRoutes = require('./Routes/studentRoute');

app.use (express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/students', studentRoutes);
app.listen(process.env.port || 4000, function() {
    console.log('Now Listening for requests on: http://localhost:4000/');
  });

  


  // //handling  errors
// app.use(async(req, res, next)=>{
//     next(createError.NOTFOUND())
// })

// //Error handling middleware 
// app.use((err, req,res,next)=> {
//     if (err.status === 401){
//         //handle 401 unauthorized error 
//         res.status(401).send({
//             error: {
//                 status:401,
//                 message:"You are not authorised to view this resource"
//             }
//         });
//     }else {
//         //Handle other errrors
//         res.status (err.status || 500).send({
//             error: {
//                 status:err ||500,
//                 message: "Internal Server Error",
//             }
//         });
//     }

// })