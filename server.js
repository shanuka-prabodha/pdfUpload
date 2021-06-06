const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8270;
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

const fileRoute = require("./src/routes/file");



const path = require('path')
//app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(fileRoute);
/*
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '..','build', 'index.html'));
});*/

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




