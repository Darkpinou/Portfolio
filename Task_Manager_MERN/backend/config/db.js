const mongoose=require('mongoose')

const connectDB=async()=>{
  try{
    const conn=await mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/taskmanager')
    console.log(`✅ MongoDB: ${conn.connection.host}`)
  }catch(err){
    console.error(`❌ Erreur DB: ${err.message}`)
    process.exit(1)
  }
}

module.exports=connectDB