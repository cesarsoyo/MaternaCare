// Importation du middleware d'authentification
const authGuard = require('../middleware/authGuard')
// Importation du modèle utilisateur
const foodModel = require('../models/userModel')
// Importation de la bibliothèque bcrypt pour le hachage
const bcrypt = require('bcrypt')
// Création d'un routeur Express
const foodRouter = require('express').Router()





// Exportation du routeur
module.exports = foodRouter