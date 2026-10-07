import {useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'

export default function LoginPage(){
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[error,setError]=useState('')
  const{login}=useContext(AuthContext)
  const navigate=useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setError('')
    try{
      await login(email,password)
      navigate('/dashboard')
    }catch(err){
      setError(err.response?.data?.message||'Erreur de connexion')
    }
  }

  return(
    <div style={{
      minHeight:'100vh',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      background:'#ecf0f1'
    }}>
      <form onSubmit={handleSubmit} style={{
        background:'white',
        padding:'40px',
        borderRadius:'10px',
        width:'100%',
        maxWidth:'400px',
        boxShadow:'0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{marginBottom:'25px',textAlign:'center'}}>Connexion</h2>

        {error&&<p style={{color:'#e74c3c',marginBottom:'15px'}}>{error}</p>}

        <div style={{marginBottom:'15px'}}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{marginBottom:'20px'}}>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{
          width:'100%',
          background:'#3498db',
          color:'white',
          padding:'12px'
        }}>
          Se connecter
        </button>

        <p style={{textAlign:'center',marginTop:'15px'}}>
          Pas de compte? <Link to="/register">S'inscrire</Link>
        </p>
      </form>
    </div>
  )
}