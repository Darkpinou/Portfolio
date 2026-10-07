const mongoose=require('mongoose')

const taskSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true,
    trim:true
  },
  description:{
    type:String,
    default:''
  },
  importance:{
    type:String,
    enum:['urgent','todo','longterm'],
    default:'todo'
  },
  completed:{
    type:Boolean,
    default:false
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  folder:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Folder',
    default:null
  },
  sharedWith:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
  createdAt:{
    type:Date,
    default:Date.now
  },
  updatedAt:{
    type:Date,
    default:Date.now
  }
})

//Auto update updatedAt
taskSchema.pre('save',function(next){
  this.updatedAt=Date.now()
  next()
})

module.exports=mongoose.model('Task',taskSchema)