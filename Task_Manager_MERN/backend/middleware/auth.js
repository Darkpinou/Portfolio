const jwt=require('jsonwebtoken')
const User=require('../models/User')

//Vérifier token JWT
const auth=async(req,res,next)=>{
  try{
    const token=req.header('Authorization')?.replace('Bearer ','')
    
    if(!token){
      return res.status(401).json({message:'Token manquant'})
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET||'secret_key')
    const user=await User.findById(decoded.id).select('-password')
    
    if(!user){
      return res.status(401).json({message:'User non trouvé'})
    }

    req.user=user
    req.token=token
    next()
  }catch(err){
    res.status(401).json({message:'Token invalide'})
  }
}

module.exports=auth