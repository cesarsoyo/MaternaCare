const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// require('dotenv').config();

const userSchema = new mongoose.Schema({
    // 1st FORM
    name: {
        type: String,
        required: [true, "Le nom de famille est requis"],
        validate: {
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
            validator: function (v) { },
            message: "Veuillez sélectionner une option pour le rôle."
        }
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est requis"],
        validate: {
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
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v);
            },
            message: "Les mots de passe ne correspondent pas. Veuillez vérifier et confirmer à nouveau votre mot de passe."
        }
    },
    // 2nd FORM
    socialNumber: {
        type: Number,
        required: [true, "Le numéro de sécurité social es requis"],
        validate: {
            validator: function (v) {
                return /^\d{13}$/.test(v)
            },
            message: "Ce champ est obligatoire. Veuillez entrer votre numéro de sécurité social."
        }
    },
    birthday: {
        type: Date,
        required: [true, "La date de naissance est requis"],
        validate: {
            validator: function (v) {
            },
            message: "Ce champ est obligatoire. Veuillez entrer une date de naissance."
        }
    },
    adress: String,
    complementAdress: String,
    city: String,
    zipCode: Number,
    numberTel: Number,

    // PROFESSIONAL FORM
    currentPost: {
        type: String,
        required: [true, "Le poste actuel est requis"],
        validate: {
            validator: function (v) {
            },
            message: "Ce champ est obligatoire. Veuillez entrer un mot de passe."
        }
    },
    workCertificates: String,
    workDescription: String,
    workPlace: String,
    workCity: String,
    workZipCode: String,
    workDisponibilityStart: Date,
    workDisponibilityEnd: Date,
    workUniqueNumber: Number,
    workPhoto: String,

    pregTimePregnancy: Number,
    pregDateChild: Date,
    pregSymptoms: String,
    pregAntecedents: String,
    pregAllergies: String,
    pregMedicaments: String,
    pregProblems: String,
    pregBlood: String,
    pregEchography: String,
    pregSport: String
});


userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALT))
    }
    next()
});


userSchema.pre("validate", async function (next) {
    try {
        const existingUser = await this.constructor.findOne({ email: this.email });
        if (existingUser) {
            this.validate("email", "Cet email est déjà enregistré");
        }
        next();
    } catch (error) {
        next(error);
    }
});


const userModel = mongoose.model('users', userSchema)

module.exports = userModel