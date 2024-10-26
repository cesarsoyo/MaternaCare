const mongoose = require('mongoose');

const medicamentsSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Suppose que la collection des patients est 'User'
        //required: true
    },
    // Nom du médicament
    medicName: {
        type: String,
        required: true  // Exemple : "Paracétamol"
    },

    // Quantité en milligrammes
    medicQuantityNumber: {
        type: Number,  // Milligrammes (mg)
    },

    // Forme du médicament
    medicQuantity: {
        type: String,
        enum: ['Cpr.', 'Gel.', 'Susp.', 'Sol.', 'Pom.', 'Crème.', 'Gtt.', 'Inhale.', 'Compl.', 'Patch'],
    },

    // Fréquence d'administration
    medicFrequency: {
        type: String,
        enum: ['Une fois par jour', 'Deux fois par jour', 'Trois fois par jour', 'Quotidien', 'Hebdomadaire', 'Mensuel', 'Au besoin', 'Après chaque repas', 'Avant d\'aller au lit', 'Autre'],
    },

    // Date de début du traitement
    medicStartDate: {
        type: Date,
    },

    // Date de fin du traitement
    medicEndDate: {
        type: Date,
    },

    // Symptômes liés au médicament
    medicSymptoms: {
        type: String,
    },

    // Notes supplémentaires
    medicComments: {
        type: String  // Optionnel
    },

    // Champ pour spécifier "Autre" si sélectionné dans la fréquence
    otherSpecification: {
        type: String,  // Ce champ est utilisé si l'option "Autre" est sélectionnée dans la fréquence
        required: function () {
            return this.frequency === 'Autre';
        }
    }
});

// Créer le modèle de Mongoose
const Medicaments = mongoose.model('medicaments', medicamentsSchema);

module.exports = Medicaments;
