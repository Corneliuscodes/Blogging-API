const express = require("express");
const bodyParser = require('body-parser')
const app = express(); //instance of express
require('dotenv').config(); // Load .env file

const postsRoute = require(`./routes/posts`);
const userRoute = require(`./routes/user`);
const imageRoute = require(`./routes/image`);
const testRoute = require(`./routes/test`)


app.use(bodyParser.json());

app.use(`/posts`, postsRoute);
app.use(`/user`, userRoute);
app.use(`/images`, imageRoute)
app.use(`/test`, testRoute)

module.exports = app