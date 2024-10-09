const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const userRouter = require('./routes/userRouter');

require('dotenv').config();

const app = express();

app.use(express.static('./public'))
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.CRYPTSESS,
}))
app.use(express.urlencoded({ extended: true }))
app.use(userRouter)

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Connecté sur le port ${process.env.PORT}`);
    }
})

mongoose.connect(process.env.MONGO)