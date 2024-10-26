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
        enum: ['entree', 'plat_principal', 'dessert', 'boisson'],  // Seules ces valeurs sont autorisées
        required: true
    },

    // Heure à laquelle on mange
    mealTime: {
        type: String,
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
        enum: ['viande', 'cereales', 'legumineuses', 'fruits', 'legumes', 'poisson', 'produits_laitiers', 'boissons', 'graines_oleagineuses', 'sucreries']
    },

    mealContentQuantity: {
        type: String,
        enum: ['kg', 'g', 'oz', 'cuil', 'cuil_a_s', 'cuil_a_c', 'L', 'dL', 'cL', 'mL', 'pintes', 'quart', 'tass', 'u']
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
