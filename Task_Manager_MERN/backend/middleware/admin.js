const auth=require('./auth')

//Vérifier si admin ou master
const adminAuth=async(req,res,next)=>{
  await auth(req,res,()=>{
    if(req.user.role!=='admin'&&req.user.role!=='master'){
      return res.status(403).json({message:'Réservé admin'})
    }
    next()
  })
}

//Vérifier si uniquement master
const masterAuth=async(req,res,next)=>{
  await auth(req,res,()=>{
    if(req.user.role!=='master'){
      return res.status(403).json({message:'Réservé master'})
    }
    next()
  })
}

module.exports={adminAuth,masterAuth}