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
    birthday: {
        type: Date,
        required: [true, "La date de naissance est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    }, 
    adress :{
        type: String,
        required: [false, "L'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    complementAdress :{
        type: String,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    city :{
        type: String,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    zipCode :{
        type: Number,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    numberTel :{
        type: Number,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    socialNumber :{
        type: Number,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },

    // PROFESSIONAL FORM
    currentPost :{
        type: String,
        required: [true, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    workCertificates :{
        type: String,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    workDescription :{
        type: String,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    workPlace :{
        type: String,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    workCity :{
        type: String,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    workZipCode :{
        type: String,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    workDisponibilityStart :{
        type: Date,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    workDisponibilityEnd :{
        type: Date,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    workUniqueNumber :{
        type: Number,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    workPhoto :{
        type: String,
    },


    // PATIENT FORM
    pregTimePregnancy :{
        type: Number,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    pregDateChild :{
        type: Date,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    pregSymptoms :{
        type: String,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    pregAntecedents :{
        type: String,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    pregAllergies :{
        type: String,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    pregMedicaments :{
        type: String,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    pregProblems :{
        type: String,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    pregBlood :{
        type: String,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    pregEchography :{
        type: String,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    pregSport :{
        type: String,
        required: [false, "Le complément d'adresse est optionnel"],
        validate: {
            validator: function (v) {
            },
            message: ""
        }
    },
    

    // bookCollection: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "books"
    // }
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