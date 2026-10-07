require('dotenv').config()
const express=require('express')
const cors=require('cors')
const connectDB=require('./config/db')

//Routes
const authRoutes=require('./routes/auth')
const taskRoutes=require('./routes/tasks')
const folderRoutes=require('./routes/folders')
const adminRoutes=require('./routes/admin')

const app=express()

//Connexion DB
connectDB()

//Middlewares
app.use(cors())
app.use(express.json())

//Routes API
app.use('/api/auth',authRoutes)
app.use('/api/tasks',taskRoutes)
app.use('/api/folders',folderRoutes)
app.use('/api/admin',adminRoutes)

//Route test
app.get('/api/test',(req,res)=>{
  res.json({message:'API OK'})
})

//Démarrage serveur
const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
  console.log(`🚀 Serveur: http://localhost:${PORT}`)
  createMasterAccount()
})

//Création auto compte master
async function createMasterAccount(){
  const User=require('./models/User')
  const exists=await User.findOne({role:'master'})
  if(!exists){
    const bcrypt=require('bcryptjs')
    const hash=await bcrypt.hash('Master123!',10)
    await User.create({
      email:'master@taskmanager.com',
      username:'MasterAdmin',
      password:hash,
      role:'master'
    })
    console.log('\n👑 COMPTE MASTER CRÉÉ:')
    console.log('   Email: master@taskmanager.com')
    console.log('   Mdp: Master123!')
    console.log('   ⚠️ CHANGEZ LE MDP!\n')
  }
}