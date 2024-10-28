const express = require('express');
const { jsPDF } = require('jspdf');
const userModel = require('../models/userModel');
const foodModel = require("../models/foodModel")
const medicamentsModel = require("../models/medicamentsModel")

const pdfRouter = require('express').Router()

pdfRouter.get('/generate-pdf', async (req, res) => {
    const email = req.query.email;

    try {
        const user = await userModel.findOne({ email: email });
        const foods = await foodModel.find({ mealEmail: email });
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

        // html email + medicModel email
        doc.setFontSize(18);
        doc.text("Information de l'alimentation", 20, 80);
        doc.setFontSize(12);
        let yPosition = 90; // Posición inicial para el texto de los alimentos

        foods.forEach(food => {
            doc.text(`Titre du plat : ${food.mealTitle}`, 20, yPosition);
            doc.text(`Type du plat : ${food.mealType}`, 20, yPosition + 10);
            doc.text(`Contenu : ${food.mealContentTitle}`, 20, yPosition + 20);
            doc.text(`Type d'ingrédient : ${food.mealContentType}`, 20, yPosition + 30);
            doc.text(`Quantité : ${food.mealContentQuantity}`, 20, yPosition + 40);
            doc.text(`Heure du repas : ${food.mealTime}`, 20, yPosition + 50);
            doc.text(`Préparation : ${food.mealPreparation}`, 20, yPosition + 60);
            doc.text(`Commentaires : ${food.mealComments}`, 20, yPosition + 70);
            yPosition += 60; // Aumentar la posición para el siguiente alimento
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

