const express=require('express')
const router=express.Router()
const User=require('../models/User')
const Task=require('../models/Task')
const Folder=require('../models/Folder')
const{adminAuth,masterAuth}=require('../middleware/admin')

//Liste tous les utilisateurs (Admin & Master)
router.get('/users',adminAuth,async(req,res)=>{
  try{
    const users=await User.find({}).select('-password').sort({createdAt:-1})
    res.json(users)
  }catch(err){
    res.status(500).json({message:'Erreur'})
  }
})

//Voir tâches d'un user spécifique (Admin & Master)
router.get('/users/:userId/tasks',adminAuth,async(req,res)=>{
  try{
    const tasks=await Task.find({owner:req.params.userId})
      .populate('owner','username')
      .populate('folder','name')
      .sort({createdAt:-1})

    res.json(tasks)
  }catch(err){
    res.status(500).json({message:'Erreur'})
  }
})

//Créer utilisateur (Master uniquement)
router.post('/users',masterAuth,async(req,res)=>{
  try{
    const{email,username,password,role}=req.body

    if(!email||!username||!password){
      return res.status(400).json({message:'Champs obligatoires'})
    }

    //Vérif unicité email
    const existingEmail=await User.findOne({email})
    if(existingEmail){
      return res.status(400).json({message:'Email déjà utilisé'})
    }

    //Vérif unicité username
    const existingUsername=await User.findOne({username})
    if(existingUsername){
      return res.status(400).json({message:'Username déjà pris'})
    }

    //Master ne peut créer que user ou admin (pas d'autre master)
    const newRole=(role==='admin')?'admin':'user'

    const user=await User.create({
      email,
      username,
      password,
      role:newRole
    })

    res.status(201).json({
      message:`Utilisateur ${newRole} créé`,
      user:{id:user._id,email:user.email,username:user.username,role:user.role}
    })
  }catch(err){
    console.error(err)
    res.status(500).json({message:'Erreur création user'})
  }
})

//Changer rôle d'un user (Master uniquement)
router.put('/users/:userId/modifier-role',masterAuth,async(req,res)=>{
  try{
    const{role}=req.body

    if(!['user','admin'].includes(role)){
      return res.status(400).json({message:'Rôle invalide'})
    }

    const user=await User.findByIdAndUpdate(
      req.params.userId,
      {role},
      {new:true}
    ).select('-password')

    if(!user){
      return res.status(404).json({message:'User non trouvé'})
    }

    res.json({message:'Rôle modifié',user})
  }catch(err){
    res.status(500).json({message:'Erreur modification rôle'})
  }
})

//Supprimer un user (Master uniquement)
router.delete('/users/:userId',masterAuth,async(req,res)=>{
  try{
    //Empêcher auto-suppression
    if(req.params.userId===req.user._id.toString()){
      return res.status(400).json({message:'Pas possible se supprimer soi-même'})
    }

    const user=await User.findByIdAndDelete(req.params.userId)

    if(!user){
      return res.status(404).json({message:'User non trouvé'})
    }

    //Supprimer ses données associées
    await Task.deleteMany({owner:req.params.userId})
    await Folder.deleteMany({owner:req.params.userId})

    res.json({message:'User et ses données supprimés'})
  }catch(err){
    res.status(500).json({message:'Erreur suppression user'})
  }
})

module.exports=router