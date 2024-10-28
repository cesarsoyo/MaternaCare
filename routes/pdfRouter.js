const express = require('express');
const { jsPDF } = require('jspdf');
const userModel = require('../models/userModel');
const foodModel = require("../models/foodModel")
const medicamentsModel = require("../models/medicamentsModel")

const pdfRouter = require('express').Router()

const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

pdfRouter.get('/generate-pdf', async (req, res) => {
    const email = req.query.email;

    try {
        const user = await userModel.findOne({ email: email });
        const foods = await foodModel.find({ mealEmail: email });
        const medicaments = await medicamentsModel.find({ medicEmail: email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Information de l'utilisateur", 20, 20);
        doc.setFontSize(12);
        doc.text(`Prénom : ${user.firstname}`, 20, 30);
        doc.text(`Nom de famille: ${user.name}`, 20, 40);
        doc.text(`Email: ${user.email}`, 20, 50);
        doc.text(`Rôle: ${user.role}`, 20, 60);

        doc.setFontSize(18);
        doc.text("Information de l'alimentation", 20, 80);
        doc.setFontSize(12);
        let yPosition = 90; 

        foods.forEach(food => {
            doc.text(`Titre du plat : ${food.mealTitle}`, 20, yPosition);
            doc.text(`Type du plat : ${food.mealType}`, 20, yPosition + 10);
            doc.text(`Contenu : ${food.mealContentTitle}`, 20, yPosition + 20);
            doc.text(`Type d'ingrédient : ${food.mealContentType}`, 20, yPosition + 30);
            doc.text(`Quantité : ${food.mealContentQuantity}`, 20, yPosition + 40);
            doc.text(`Heure du repas : ${food.mealTime}`, 20, yPosition + 50);
            doc.text(`Préparation : ${food.mealPreparation}`, 20, yPosition + 60);
            doc.text(`Commentaires : ${food.mealComments}`, 20, yPosition + 70);
            yPosition += 60;
        });

        let yPositionMedic = yPosition + 20;

        doc.setFontSize(18);
        doc.text("Information des médicaments", 20, yPositionMedic);
        doc.setFontSize(12);
        yPositionMedic += 10;

        medicaments.forEach(medicament => {
            doc.text(`Titre du médicament : ${medicament.medicName}`, 20, yPositionMedic);
            doc.text(`Dosage : ${medicament.medicQuantityNumber}  ${medicament.medicQuantity}`, 20, yPositionMedic + 10);
            doc.text(`Date de début : ${formatDate(medicament.medicStartDate)}`, 20, yPositionMedic + 20);
            doc.text(`Date de fin : ${formatDate(medicament.medicEndDate)}`, 20, yPositionMedic + 30);
            doc.text(`Symptômes : ${medicament.medicSymptoms}`, 20, yPositionMedic + 40);
            doc.text(`Commentaires : ${medicament.medicComments}`, 20, yPositionMedic + 50);
            yPositionMedic += 60;
        });

        const pdfData = doc.output('arraybuffer');
        const pdfBuffer = Buffer.from(pdfData);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=user${user.name}_${user.firstname}.pdf`);
        res.send(pdfBuffer);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors du téléchargement du PDF', error });
    }
});

module.exports = pdfRouter;

