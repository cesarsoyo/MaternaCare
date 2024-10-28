const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session')
const userRouter = require('./routes/userRouter');
const foodRouter = require('./routes/foodRouter');
const medicamentsRouter = require('./routes/medicamentsRouter');
const pdfRouter = require('./routes/pdfRouter');
require('dotenv').config();
const path = require('path');


const app = express();

app.use(express.json());
// app.use(express.static('./public'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.CRYPTSESS,
}))
app.use(express.urlencoded({ extended: true }))
app.use(userRouter)
app.use(foodRouter)
app.use(medicamentsRouter)
app.use('/api', pdfRouter);



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.get('/accueil', (req, res) => {
res.sendFile(path.join(__dirname, 'views', 'accueil.html')); 
});


app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Connecté sur le port ${process.env.PORT}`);
    }
})

mongoose.connect(process.env.MONGO)
    .then(() => console.log('MongoDB connecté'))
    .catch((err) => console.error('Erreur lors de la connexion à MongoDB :', err));