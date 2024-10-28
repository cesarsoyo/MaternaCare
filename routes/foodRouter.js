// Création d'un routeur Express
const foodRouter = require('express').Router()
// Importation du modèle utilisateur
const Food = require('../models/foodModel')
// Importation du middleware d'authentification
const authGuard = require('../middleware/authGuard')


// Obtenir tous les aliments (GET)
foodRouter.get('/addfood', async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des aliments', error });
    }
});


// foodRouter.get('/foodupdate/:userid', authGuard, async (req, res) => {
//     try {
//         let food = await foodModel.findById(req.params.userid);
//         res.render("pages/addfood.twig", {
//             title: "Modifier un plat",
//             enterprise: await enterModel.findById(req.session.enterprise),
//             food: food
//         })
//     } catch (error) {
//         res.render("pages/dashboard.twig")
//     }
// });


// Obtenir tous les aliments d'un patient par son ID (GET)
// foodRouter.get('/foods/:userId', async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const patientFoods = await Food.find({ userId });  // Rechercher tous les aliments correspondant à l'ID du patient
//         if (patientFoods.length === 0) {
//             return res.status(404).json({ message: 'Aucun aliment trouvé pour ce patient.' });
//         }
//         res.status(200).json(patientFoods);
//     } catch (error) {
//         res.status(500).json({ message: 'Erreur lors de la récupération des aliments du patient', error });
//     }
// });

// Créer un nouvel aliment (POST)
foodRouter.post('/addfood', async (req, res) => {
    try {
        const newFood = new Food(req.body);  // Créer un nouvel aliment avec les données du corps de la requête
        const savedFood = await newFood.save();  // Enregistrer dans la base de données
        res.status(201).json(savedFood);  // Retourner l'aliment créé
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création de l\'aliment', error });
    }
});



// Exportation du routeur
module.exports = foodRouter