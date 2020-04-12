const express = require('express');
const cors = require("cors");
const app = express();
const parameterValidation = require('./services/parameterValidation');
const recipePuppyExternal = require('./services/recipePuppy');

app.use(express.json());
app.use(cors());
app.use(parameterValidation);
app.use(recipePuppyExternal);

app.get('/recipes', function (request, response) {
    response.status(200).json(request.body);
});

module.exports = app;