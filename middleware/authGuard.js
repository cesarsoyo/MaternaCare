// On importe le modèle utilisateur pour accéder aux données
const userModel = require('../models/userModel');

// C'est notre garde pour vérifier l'authentification
const authGuard = async (req, res, next) => {
    try {
        // On vérifie si un utilisateur est connecté
        if (req.session && req.session.user) {
            // On cherche l'utilisateur dans la base de données avec son ID
            const userFinded = await userModel.findOne({ _id: req.session.user._id }); // Vérifier que l'utilisateur qui est en session existe en bdd
            // Si l'utilisateur est trouvé
            if (userFinded) {
                next(); // On passe à la suite
            } else {
                // Sinon, on redirige vers la page de connexion
                res.redirect('/login');
            }
        } else {
            // Si personne n'est connecté, on redirige aussi vers la page de connexion
            res.redirect('/login');
        }
    } catch (error) {
        // Si on a une erreur, on l'envoie comme réponse
        res.send(error.message);
    }
};

// On exporte notre garde pour l'utiliser ailleurs
module.exports = authGuard;
