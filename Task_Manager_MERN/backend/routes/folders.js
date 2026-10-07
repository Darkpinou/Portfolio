const express=require('express')
const router=express.Router()
const Folder=require('../models/Folder')
const Task=require('../models/Task')
const auth=require('../middleware/auth')

router.use(auth)

//Créer dossier
router.post('/',async(req,res)=>{
  try{
    const{name,color}=req.body

    const folder=await Folder.create({
      name,
      color:color||'#3498db',
      owner:req.user._id
    })

    res.status(201).json(folder)
  }catch(err){
    res.status(500).json({message:'Erreur création dossier'})
  }
})

//Liste dossiers user
router.get('/',async(req,res)=>{
  try{
    const folders=await Folder.find({owner:req.user._id}).sort({createdAt:-1})
    res.json(folders)
  }catch(err){
    res.status(500).json({message:'Erreur'})
  }
})

//Modifier dossier
router.put('/:id',async(req,res)=>{
  try{
    const folder=await Folder.findOne({_id:req.params.id,owner:req.user._id})

    if(!folder){
      return res.status(404).json({message:'Dossier non trouvé'})
    }

    if(req.body.name) folder.name=req.body.name
    if(req.body.color) folder.color=req.body.color

    await folder.save()
    res.json(folder)
  }catch(err){
    res.status(500).json({message:'Erreur modification'})
  }
})

//Supprimer dossier (+ ses tâches)
router.delete('/:id',async(req,res)=>{
  try{
    const folder=await Folder.findOneAndDelete({_id:req.params.id,owner:req.user._id})

    if(!folder){
      return res.status(404).json({message:'Dossier non trouvé'})
    }

    //Supprimer aussi les tâches du dossier
    await Task.deleteMany({folder:req.params.id})

    res.json({message:'Dossier et ses tâches supprimés'})
  }catch(err){
    res.status(500).json({message:'Erreur suppression'})
  }
})

module.exports=router