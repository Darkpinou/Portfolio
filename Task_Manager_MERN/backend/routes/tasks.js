const express=require('express')
const router=express.Router()
const Task=require('../models/Task')
const User=require('../models/User')
const auth=require('../middleware/auth')

//Toutes routes protégées
router.use(auth)

//Créer tâche
router.post('/',async(req,res)=>{
  try{
    const{title,description,importance,folder,sharedWith}=req.body

    //Si sharedWith fourni, convertir usernames en IDs
    let sharedWithIds=[]
    if(sharedWith&&sharedWith.length>0){
      const users=await User.find({username:{$in:sharedWith}})
      sharedWithIds=users.map(u=>u._id)
    }

    const task=await Task.create({
      title,
      description:description||'',
      importance:importance||'todo',
      folder:folder||null,
      sharedWith:sharedWithIds,
      owner:req.user._id
    })

    await task.populate(['owner','folder','sharedWith'])
    res.status(201).json(task)
  }catch(err){
    console.error(err)
    res.status(500).json({message:'Erreur création tâche'})
  }
})

//Liste tâches (miennes + partagées)
router.get('/',async(req,res)=>{
  try{
    const{folder,importance}=req.query
    
    let query={
      $or:[
        {owner:req.user._id},
        {sharedWith:req.user._id}
      ]
    }

    if(folder) query.folder=folder
    if(importance) query.importance=importance

    const tasks=await Task.find(query)
      .populate('owner','username')
      .populate('folder','name color')
      .populate('sharedWith','username')
      .sort({createdAt:-1})

    res.json(tasks)
  }catch(err){
    res.status(500).json({message:'Erreur'})
  }
})

//Détail tâche
router.get('/:id',async(req,res)=>{
  try{
    const task=await Task.findById(req.params.id)
      .populate('owner','username')
      .populate('folder')
      .populate('sharedWith','username')

    if(!task){
      return res.status(404).json({message:'Tâche non trouvée'})
    }

    //Vérifier accès (owner ou shared ou admin/master)
    const isOwner=task.owner._id.toString()===req.user._id.toString()
    const isShared=task.sharedWith.some(u=>u._id.toString()===req.user._id.toString())
    const isAdmin=req.user.role==='admin'||req.user.role==='master'

    if(!isOwner&&!isShared&&!isAdmin){
      return res.status(403).json({message:'Accès interdit'})
    }

    res.json(task)
  }catch(err){
    res.status(500).json({message:'Erreur'})
  }
})

//Modifier tâche
router.put('/:id',async(req,res)=>{
  try{
    const task=await Task.findById(req.params.id)

    if(!task){
      return res.status(404).json({message:'Tâche non trouvée'})
    }

    //Seul owner ou admin peut modifier
    const isOwner=task.owner.toString()===req.user._id.toString()
    const isAdmin=req.user.role==='admin'||req.user.role==='master'

    if(!isOwner&&!isAdmin){
      return res.status(403).json({message:'Non autorisé'})
    }

    //Mise à jour champs autorisés
    const allowed=['title','description','importance','completed','folder','sharedWith']
    allowed.forEach(field=>{
      if(req.body[field]!==undefined){
        task[field]=req.body[field]
      }
    })

    await task.save()
    await task.populate(['owner','folder','sharedWith'])

    res.json(task)
  }catch(err){
    res.status(500).json({message:'Erreur modification'})
  }
})

//Supprimer tâche
router.delete('/:id',async(req,res)=>{
  try{
    const task=await Task.findById(req.params.id)

    if(!task){
      return res.status(404).json({message:'Tâche non trouvée'})
    }

    const isOwner=task.owner.toString()===req.user._id.toString()
    const isAdmin=req.user.role==='admin'||req.user.role==='master'

    if(!isOwner&&!isAdmin){
      return res.status(403).json({message:'Non autorisé'})
    }

    await task.deleteOne()
    res.json({message:'Tâche supprimée'})
  }catch(err){
    res.status(500).json({message:'Erreur suppression'})
  }
})

module.exports=router