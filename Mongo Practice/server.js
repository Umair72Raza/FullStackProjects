const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require ('dotenv');
const mongoose = require('./connections/customer')
const customerRoutes = require('./routes/customer.js');
const loginSystem = require('./routes/loginSystem')

const app = express();

dotenv.config();

let PORT = 4000;

app.use(bodyParser.json())

app.use(express.static("Public"));

app.use(express.json())

app.use('/customer',customerRoutes)

app.use('/signup',loginSystem)

app.listen(PORT, "localhost", () => {
    console.log(`Server started at http://localhost/${PORT}`);
  });
