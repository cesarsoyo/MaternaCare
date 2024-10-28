const express = require('express');
const { jsPDF } = require('jspdf');
const userModel = require('../models/userModel');
const pdfRouter = require('express').Router()

pdfRouter.get('/generate-pdf', async (req, res) => {
    const email = req.query.email;

    try {
        const user = await userModel.findOne({ email: email });
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

        const pdfData = doc.output('arraybuffer');
        const pdfBuffer = Buffer.from(pdfData);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Usuario_${user.name}_${user.firstname}.pdf`);
        res.send(pdfBuffer);
    } catch (error) {
        res.status(500).json({ message: 'Error al generar el PDF', error });
    }
});

module.exports = pdfRouter;

