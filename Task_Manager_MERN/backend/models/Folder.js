const mongoose=require('mongoose')

const folderSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  color:{
    type:String,
    default:'#3498db'
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})

module.exports=mongoose.model('Folder',folderSchema)