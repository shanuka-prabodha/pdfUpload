const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8270;

const session = require("express-session");


app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:false,

});

const  connection = mongoose.connection;
connection.once("open",()=>{

    console.log("Mongo DB Connection success!");
});


const PaymentRouter = require("./src/routes/AtmUser");
app.use("/atm",PaymentRouter);

const studentRouter = require("./src/routes/students.js");
app.use("/student",studentRouter);

const UserRouter = require("./src/routes/signin.js");
app.use("/student",UserRouter);

const fileRoute = require("./src/routes/file");
app.use(fileRoute);



app.use(express.static('client/build'));
const path = require('path')
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client','build', 'index.html'));
});



/*
app.use(express.static(path.join(__dirname, '..', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
*/

app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`)
});




