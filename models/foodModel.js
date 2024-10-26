const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    // Relation avec l'user
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' 
    },
    
    // Type de repas
    mealType: {
        type: String,
        enum: ['Entrée', 'Plat principal', 'Dessert', 'Boisson'],  // Seules ces valeurs sont autorisées
        required: true
    },

    // Heure à laquelle on mange
    mealTime: {
        type: Date,
    },

    // Titre du plat
    mealTitle: {
        type: String,
        required: true 
    },

    // Contenu du plat
    mealContentTitle: {
        type: String,
    },

    mealContentType: {
        type: String,
    },

    mealContentQuantity: {
        type: String,
    },

    // Préparation du plat
    mealPreparation: {
        type: String,
    },

    // Commentaires supplémentaires
    mealComments: {
        type: String  
    }
});

// Créer le modèle Mongoose, ce modèle a déjà été créé par précaution
const Food = mongoose.model('foods', foodSchema);

module.exports = Food;
