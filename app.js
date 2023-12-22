const express = require('express');

const itemRoutes = require("./itemRoutes");
const app = express();

app.use(express.json())

app.use("/items", itemRoutes)

const errorHandler = (error, request, response, next) => {
    console.log(`error ${error.message}`)
    let status = error.status || 400
    response.status(status).send(error.message)
}

app.use(errorHandler)
module.exports = app