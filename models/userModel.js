const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Définition du schéma utilisateur
const userSchema = new mongoose.Schema({
    // 1er FORMULAIRE
    name: {
        type: String,
        required: [true, "Le nom de famille est requis"],
        validate: {
            // Validation du nom de famille
            validator: function (v) {
                return /^[a-zA-ZÀ-ÿ\s]+$/u.test(v);
            },
            message: "Ce champ est obligatoire. Veuillez entrer votre nom de famille."
        }
    },
    firstname: {
        type: String,
        required: [true, "Le prénom est requis"],
        validate: {
            // Validation du prénom
            validator: function (v) {
                return /^[a-zA-ZÀ-ÿ\s]+$/u.test(v);
            },
            message: "Ce champ est obligatoire. Veuillez entrer votre prénom."
        }
    },
    email: {
        type: String,
        required: [true, "Le mail est requis"],
        validate: {
            // Validation de l'adresse e-mail
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g.test(v);
            },
            message: "Veuillez entrer une adresse e-mail valide."
        }
    },
    role: {
        type: String,
        required: [
            true, "Le rôle est requis"
        ],
        validate: {
            // Validation du rôle
            validator: function (v) { },
            message: "Veuillez sélectionner une option pour le rôle."
        }
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est requis"],
        validate: {
            // Validation du mot de passe
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v);
            },
            message: "Ce champ est obligatoire. Veuillez entrer un mot de passe."
        }
    },
    confirmPassword: {
        type: String,
        required: [true, "La confirmation du mot de passe est requis"],
        validate: {
            // Validation de la confirmation du mot de passe
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v);
            },
            message: "Les mots de passe ne correspondent pas. Veuillez vérifier et confirmer à nouveau votre mot de passe."
        }
    },



    // // 2ème FORMULAIRE
    // socialNumber: {
    //     type: Number,
    //     required: [true, "Le numéro de sécurité social est requis"],
    //     validate: {
    //         // Validation du numéro de sécurité sociale
    //         validator: function (v) {
    //             return /^\d{13}$/.test(v)
    //         },
    //         message: "Ce champ est obligatoire. Veuillez entrer votre numéro de sécurité social."
    //     }
    // },
    // birthday: {
    //     type: Date,
    //     required: [true, "La date de naissance est requis"],
    //     validate: {
    //         // Validation de la date de naissance
    //         validator: function (v) { },
    //         message: "Ce champ est obligatoire. Veuillez entrer une date de naissance."
    //     }
    // },
    // adress: String,
    // complementAdress: String,
    // city: String,
    // zipCode: Number,
    // numberTel: {
    //     type: Number,
    //     required: [true, "Le numéro de téléphone est requis"],
    //     validate: {
    //         // Validation du numéro de téléphone
    //         validator: function (v) { },
    //         message: "Ce champ est obligatoire. Veuillez entrer un numéro de téléphone."
    //     }
    // },

    // // FORMULAIRE PROFESSIONNEL
    // currentPost: {
    //     type: String,
    //     required: [true, "Le poste actuel est requis"],
    //     validate: {
    //         // Validation du poste actuel
    //         validator: function (v) { },
    //         message: "Ce champ est obligatoire. Veuillez entrer le titre du poste."
    //     }
    // },
    // workUniqueNumber: Number,
    // workPosition: String,
    // workCertificates: String,
    // workDescription: String,
    // workPlace: String,
    // workCity: String,
    // workZipCode: String,
    // workDisponibilityStart: Date,
    // workDisponibilityEnd: Date,
    // workPhoto: String,

    // pregTimePregnancy: Number,
    // pregDateChild: Date,
    // pregSymptoms: String,
    // pregBackground: String,
    // pregAllergies: String,
    // pregMedicaments: String,
    // pregProblems: String,
    // pregBlood: String,
    // pregDocuments: String,
    // pregSport: String,

    // // foodCollection: [
    // //     {
    // //         type: mongoose.Schema.Types.ObjectId,
    // //         ref: "patients" // Référence à la collection des patients
    // //     }
    // // ]
});

// Middleware pré-enregistrement pour le hachage du mot de passe
userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        // Hachage du mot de passe avant de l'enregistrer
        this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALT))
    }
    next() // Passe au middleware suivant
});

// Middleware pré-validation pour vérifier l'unicité de l'email
userSchema.pre("validate", async function (next) {
    try {
        // Recherche d'un utilisateur existant avec le même email
        const existingUser = await this.constructor.findOne({ email: this.email });
        if (existingUser) {
            this.validate("email", "Cet email est déjà enregistré"); // Validation échouée si l'email existe
        }
        next(); // Passe au middleware suivant
    } catch (error) {
        next(error); // Passe l'erreur au middleware suivant
    }
});

// Création du modèle utilisateur
const userModel = mongoose.model('users', userSchema);
module.exports = userModel; // Exportation du modèle
