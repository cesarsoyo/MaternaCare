// Importation du middleware d'authentification
const authGuard = require('../middleware/authGuard')
// Importation du modèle utilisateur
const userModel = require('../models/userModel')
// Importation de la bibliothèque bcrypt pour le hachage
const bcrypt = require('bcrypt')
// Création d'un routeur Express
const userRouter = require('express').Router()


// Route GET pour afficher le formulaire de connexion
userRouter.get('/signin', (req, res) => {
    res.render("pages/signin.twig") // Rendu de la page signin
})

// Route POST pour créer un nouvel utilisateur
userRouter.post('/signin', async (req, res) => {
    try {
        let newUser = new userModel(req.body) // Création d'un nouvel utilisateur
        newUser.validateSync() // Validation des données
        await newUser.save() // Sauvegarde de l'utilisateur
        res.redirect('/login') // Redirection vers la page de connexion
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la création d'un nouveau utilisateur", error }); // Gestion des erreurs
    }
})

// Route GET pour afficher la page de connexion
userRouter.get('/login', (req, res) => {
    res.render('pages/login.twig') // Rendu de la page login
})

// Route POST pour authentifier un utilisateur
userRouter.post('/login', async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email }) // Recherche de l'utilisateur
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) { // Vérification du mot de passe
                req.session.user = user // Stockage de l'utilisateur dans la session
                res.redirect("/dashboard") // Redirection vers le tableau de bord
            } else {
                throw new Error("Les mot de passe ne correspondent pas") // Erreur si les mots de passe ne correspondent pas
            }
        } else {
            throw new Error("L'utilisateur n'est pas encore enregistré") // Erreur si l'utilisateur n'existe pas
        }
    } catch (error) {
        res.render('pages/login.twig',
            {
                title: "Connexion",
                error: error.message
            }) // Rendu avec message d'erreur
    }
})

// Route GET pour afficher le tableau de bord, avec protection par authGuard
userRouter.get('/dashboard', authGuard, async (req, res) => {
    const user = await userModel.findById(req.session.user._id)
    // .populate({ path: "patientsCollection" }) // Récupération de l'utilisateur et de ses patients
    res.render('pages/dashboard.twig', {
        user: req.session.user
        // , books: user.patientsCollection 
    }) // Rendu de la page dashboard
})

// Route GET pour déconnecter l'utilisateur
userRouter.get('/logout', (req, res) => {
    req.session.destroy() // Destruction de la session
    res.redirect('/login') // Redirection vers la page de connexion
})


userRouter.get('/addfood', (req, res) => {
    res.render("pages/addfood.twig") // Rendu de la page de confidentialité
});

userRouter.get('/addmedicaments', (req, res) => {
    res.render("pages/addmedicaments.twig") // Rendu de la page de confidentialité
});

// Route GET pour afficher la page de confidentialité
userRouter.get('/privacypg', (req, res) => {
    res.render("pages/privacypg.twig") // Rendu de la page de confidentialité
});

// Route GET pour afficher la page de sécurité
userRouter.get('/securitypg', (req, res) => {
    res.render("pages/securitypg.twig") // Rendu de la page de sécurité
});

// userRouter.get('/accueil', (req, res) => {
//     res.render("./accueil.html")
// });

userRouter.get('', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'accueil.html'));
});


// Exportation du routeur
module.exports = userRouter
