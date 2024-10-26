const express = require('express');
const Medicaments = require('../models/medicamentsModel');  // Assurez-vous que le schéma de Medicine est dans 'medicineModel.js'
const medicamentsRouter = express.Router();

// Obtenir tous les médicaments (GET)
medicamentsRouter.get('/medicaments', async (req, res) => {
    try {
        const medicaments = await Medicaments.find();
        res.status(200).json(medicaments);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des médicaments', error });
    }
});

// Obtenir tous les médicaments d'un patient par son ID (GET)
medicamentsRouter.get('/medicaments/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const patientMedicines = await Medicament.find({ userId });
        if (patientMedicines.length === 0) {
            return res.status(404).json({ message: 'Aucun médicament trouvé pour ce patient.' });
        }
        res.status(200).json(patientMedicines);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des médicaments du patient', error });
    }
});

// Créer un nouveau médicament (POST)
medicamentsRouter.post('/medicaments', async (req, res) => {
    try {
        const newMedicament = new Medicine(req.body);  // Créer un nouveau médicament avec les données du corps de la requête
        const savedMedicament = await newMedicament.save();  // Enregistrer dans la base de données
        res.status(201).json(savedMedicament);  // Retourner le médicament créé
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création du médicament', error });
    }
});

module.exports = medicamentRouter;
