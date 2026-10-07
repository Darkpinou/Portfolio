const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
  },
  username:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    minlength:3,
    maxlength:30
  },
  password:{
    type:String,
    required:true,
    minlength:6,
    select:false
  },
  role:{
    type:String,
    enum:['user','admin','master'],
    default:'user'
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})

//Hash mdp avant sauvegarde
userSchema.pre('save',async function(next){
  if(!this.isModified('password')) return next()
  const salt=await bcrypt.genSalt(10)
  this.password=await bcrypt.hash(this.password,salt)
  next()
})

//Comparer mdp
userSchema.methods.comparePassword=async function(pwd){
  return await bcrypt.compare(pwd,this.password)
}

module.exports=mongoose.model('User',userSchema)