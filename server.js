const express = require("express");
const errorHandlerForHttp = require("./middleware/errorHandlerForHttp");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const responseTime = require('response-time');

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'))
app.use(errorHandlerForHttp)
app.use(responseTime());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
}) 