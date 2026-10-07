import {createContext,useState,useEffect} from 'react'
import api from '../services/api'

export const AuthContext=createContext()

export function AuthProvider({children}){
  const [user,setUser]=useState(null)
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    checkAuth()
  },[])

  //Vérifier si user connecté au chargement
  async function checkAuth(){
    try{
      const token=localStorage.getItem('token')
      if(token){
        api.defaults.headers.common['Authorization']=`Bearer ${token}`
        const res=await api.get('/auth/me')
        setUser(res.data)
      }
    }catch(error){
      localStorage.removeItem('token')
    }finally{
      setLoading(false)
    }
  }

  //Connexion
  async function login(email,password){
    const res=await api.post('/auth/login',{email,password})
    localStorage.setItem('token',res.data.token)
    api.defaults.headers.common['Authorization']=`Bearer ${res.data.token}`
    setUser(res.data.user)
    return res.data
  }

  //Inscription
  async function register(email,username,password){
    const res=await api.post('/auth/register',{email,username,password})
    localStorage.setItem('token',res.data.token)
    api.defaults.headers.common['Authorization']=`Bearer ${res.data.token}`
    setUser(res.data.user)
    return res.data
  }

  //Déconnexion
  function logout(){
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  return(
    <AuthContext.Provider value={{user,login,register,logout,loading}}>
      {children}
    </AuthContext.Provider>
  )
}