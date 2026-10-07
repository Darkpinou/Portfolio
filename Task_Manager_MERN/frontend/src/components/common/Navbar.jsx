import {useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'

export default function Navbar(){
  const{user,logout}=useContext(AuthContext)
  const navigate=useNavigate()

  function handleLogout(){
    logout()
    navigate('/login')
  }

  return(
    <nav style={{
      background:'#2c3e50',
      color:'white',
      padding:'15px 30px',
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center'
    }}>
      <h2>📋 TaskManager</h2>
      <div style={{display:'flex',gap:'15px',alignItems:'center'}}>
        <span>Bonjour, {user?.username}</span>
        <span style={{
          background:user?.role==='master'?'#e74c3c':user?.role==='admin'?'#f39c12':'#27ae60',
          padding:'3px 10px',
          borderRadius:'12px',
          fontSize:'12px'
        }}>{user?.role}</span>
        <Link to="/dashboard" style={{color:'white'}}>Dashboard</Link>
        {(user?.role==='admin'||user?.role==='master')&&(
          <Link to={user?.role==='master'?'/master':'/admin'}style={{color:'white'}}>
            {user?.role==='master'?'Master':'Admin'}
          </Link>
        )}
        <button onClick={handleLogout} style={{background:'#e74c3c',color:'white'}}>
          Déconnexion
        </button>
      </div>
    </nav>
  )
}