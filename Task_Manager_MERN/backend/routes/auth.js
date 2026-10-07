const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const User=require('../models/User')

//Inscription
router.post('/register',async(req,res)=>{
  try{
    const{email,username,password}=req.body

    if(!email||!username||!password){
      return res.status(400).json({message:'Champs obligatoires'})
    }

    //Vérif email unique
    const existingEmail=await User.findOne({email})
    if(existingEmail){
      return res.status(400).json({message:'Email déjà utilisé'})
    }

    //Vérif username unique
    const existingUsername=await User.findOne({username})
    if(existingUsername){
      return res.status(400).json({message:'Username déjà pris'})
    }

    //Création user
    const user=await User.create({email,username,password,role:'user'})

    //Génération token
    const token=jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:'7d'}
    )

    res.status(201).json({
      token,
      user:{id:user._id,email:user.email,username:user.username,role:user.role}
    })
  }catch(err){
    console.error(err)
    res.status(500).json({message:'Erreur inscription'})
  }
})

//Connexion
router.post('/login',async(req,res)=>{
  try{
    const{email,password}=req.body

    if(!email||!password){
      return res.status(400).json({message:'Champs obligatoires'})
    }

    //Trouver user avec mdp inclus
    const user=await User.findOne({email}).select('+password')

    if(!user){
      return res.status(401).json({message:'Identifiants incorrects'})
    }

    //Vérifier mdp
    const isMatch=await user.comparePassword(password)

    if(!isMatch){
      return res.status(401).json({message:'Identifiants incorrects'})
    }

    //Token
    const token=jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:'7d'}
    )

    res.json({
      token,
      user:{id:user._id,email:user.email,username:user.username,role:user.role}
    })
  }catch(err){
    console.error(err)
    res.status(500).json({message:'Erreur connexion'})
  }
})

//Profil user connecté
router.get('/me',require('../middleware/auth'),async(req,res)=>{
  try{
    res.json(req.user)
  }catch(err){
    res.status(500).json({message:'Erreur'})
  }
})

module.exports=router