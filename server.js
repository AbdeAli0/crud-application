const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan')
const path = require('path');
const app = express();
const bodyParser = require("body-parser")

const connectdb = require('./server/database/connection')

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log request
app.use(morgan('tiny'));

//mongodb connection
connectdb();

//parse request
app.use(bodyParser.urlencoded({ extended : true }));

//view engine
app.set("view engine", "ejs")

//load assets
app.use("/css",express.static(path.resolve(__dirname, "assets/css")));
app.use("/img",express.static(path.resolve(__dirname, "assets/img")));
app.use("/js",express.static(path.resolve(__dirname, "assets/js")));

app.use('/',require('./server/routes/router'))

app.listen(PORT, (req, res) => {
    console.log(`server is running on port ${PORT}`);
})