const express = require("express");
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const app = express();
const { expressjwt } = require('express-jwt')
const path = require("path")

const port = process.env.PORT
const DB = process.env.MONGO_DB
mongoose.set('strictQuery', true)

app.use(express.json())

app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, "client", "dist")));

mongoose.connect(DB, (err) => { console.log('connected to db err = ', err) })
// server.js
app.use('/api/auth', require('./routes/authRouter.js'))

app.use('/api/tradeposts', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/api/tradeposts', require('./routes/tradePostRouter'))

app.use((err, req, res, next) => {
  console.log(err)
  if (err.name === "UnauthorizedError") {
    res.status(err.status)
  }
  return res.send({ errMsg: err.message })
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  console.log('server running port 7500')
})