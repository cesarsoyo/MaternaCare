const authGuard = require('../middleware/authGuard')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()

userRouter.get('/signin', (req, res) => {
    res.render("pages/signin.twig")
})

userRouter.post('/signin', async (req, res) => {
    try {
        let newUser = new userModel(req.body)
        newUser.validateSync()
        await newUser.save()
        res.redirect('/login')
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la création d'un nouveau utilisateur", error });
    }
})

userRouter.get('/login', (req, res) => {
    res.render('pages/login.twig')
})

userRouter.post('/login',  async (req,res)=>{
    try {
        const user = await userModel.findOne({email: req.body.email}) 
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.user = user
                res.redirect("/dashboard")
            }else{
                throw new Error("les mot de passe ne correspondent pas")
            }
        }else{
            throw new Error("utilisateur pas enregistrer")
        }
    } catch (error) {
        res.render('pages/login.twig', {
            error: error.message
        })
    }
})

module.exports = userRouter