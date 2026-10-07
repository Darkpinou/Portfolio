import {useState,useEffect} from 'react'
import Navbar from '../components/common/Navbar'
import api from '../services/api'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'

export default function MasterPage(){
  const[users,setUsers]=useState([])
  const[showCreateModal,setShowCreateModal]=useState(false)
  const{user:currentUser}=useContext(AuthContext)

  //Charger utilisateurs
  async function loadUsers(){
    try{
      const res=await api.get('/admin/users')
      setUsers(res.data)
    }catch(err){
      console.error(err)
    }
  }

  //Créer un nouvel utilisateur (Admin ou User)
  async function createUser(userData){
    await api.post('/admin/users',userData)
    setShowCreateModal(false)
    loadUsers()
  }

  //Supprimer un utilisateur
  async function deleteUser(userId){
    if(window.confirm('Supprimer cet utilisateur et toutes ses données?')){
      await api.delete(`/admin/users/${userId}`)
      loadUsers()
    }
  }

  //Changer le rôle d'un utilisateur
  async function changeRole(userId,newRole){
    await api.put(`/admin/users/${userId}/modifier-role`,{role:newRole})
    loadUsers()
  }

  useEffect(()=>{
    loadUsers()
  },[])

  return(
    <div>
      <Navbar/>
      <div style={{padding:'30px',maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'30px'}}>
          <div>
            <h1>👑 Panneau Master</h1>
            <p style={{color:'#666'}}>Gestion complète des utilisateurs</p>
          </div>
          <button 
            onClick={()=>setShowCreateModal(true)}
            style={{background:'#e74c3c',color:'white',fontSize:'16px',padding:'12px 24px'}}
          >
            + Créer un compte
          </button>
        </div>

        {/*Tableau des utilisateurs*/}
        <div style={{
          background:'white',
          borderRadius:'10px',
          overflow:'hidden',
          boxShadow:'0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#2c3e50',color:'white'}}>
                <th style={{padding:'15px',textAlign:'left'}}>Utilisateur</th>
                <th style={{padding:'15px',textAlign:'left'}}>Email</th>
                <th style={{padding:'15px',textAlign:'left'}}>Rôle</th>
                <th style={{padding:'15px',textAlign:'left'}}>Date inscription</th>
                <th style={{padding:'15px',textAlign:'center'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u=>(
                <tr key={u._id} style={{borderBottom:'1px solid #eee'}}>
                  <td style={{padding:'15px'}}>
                    <strong>{u.username}</strong>
                    {u._id===currentUser._id&&(
                      <span style={{marginLeft:'8px',fontSize:'11px',background:'#3498db',color:'white',padding:'2px 6px',borderRadius:'10px'}}>VOUS</span>
                    )}
                  </td>
                  <td style={{padding:'15px',color:'#666'}}>{u.email}</td>
                  <td style={{padding:'15px'}}>
                    <span style={{
                      padding:'5px 12px',
                      borderRadius:'15px',
                      fontSize:'12px',
                      fontWeight:'bold',
                      color:'white',
                      background:
                        u.role==='master'?'#e74c3c':
                        u.role==='admin'?'#f39c12':'#27ae60'
                    }}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{padding:'15px',color:'#666',fontSize:'14px'}}>
                    {new Date(u.createdAt).toLocaleDateString('fr-FR')}
                  </td>
                  <td style={{padding:'15px',textAlign:'center'}}>
                    <div style={{display:'flex',gap:'8px',justifyContent:'center'}}>
                      {/*Bouton changer rôle (sauf pour master et soi-même)*/}
                      {u.role!=='master'&&u._id!==currentUser._id&&(
                        <button
                          onClick={()=>changeRole(u._id,u.role==='admin'?'user':'admin')}
                          style={{
                            background:u.role==='admin'?'#27ae60':'#f39c12',
                            color:'white',
                            padding:'5px 12px',
                            fontSize:'12px'
                          }}
                        >
                          {u.role==='admin'?'Rétrograder':'Promouvoir Admin'}
                        </button>
                      )}
                      
                      {/*Bouton supprimer (sauf soi-même et autres masters)*/}
                      {u._id!==currentUser._id&&u.role!=='master'&&(
                        <button
                          onClick={()=>deleteUser(u._id)}
                          style={{background:'#e74c3c',color:'white',padding:'5px 12px',fontSize:'12px'}}
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length===0&&(
            <div style={{padding:'40px',textAlign:'center',color:'#999'}}>
              Aucun utilisateur trouvé
            </div>
          )}
        </div>

        {/*Modal création utilisateur*/}
        {showCreateModal&&(
          <div style={{
            position:'fixed',
            top:0,left:0,right:0,bottom:0,
            background:'rgba(0,0,0,0.5)',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            zIndex:1000
          }} onClick={()=>setShowCreateModal(false)}>
            <div onClick={(e)=>e.stopPropagation()} style={{
              background:'white',
              padding:'30px',
              borderRadius:'10px',
              width:'90%',
              maxWidth:'450px'
            }}>
              <CreateUserForm 
                onSubmit={createUser}
                onCancel={()=>setShowCreateModal(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

//Composant formulaire création utilisateur
function CreateUserForm({onSubmit,onCancel}){
  const[email,setEmail]=useState('')
  const[username,setUsername]=useState('')
  const[password,setPassword]=useState('')
  const[role,setRole]=useState('user')
  const[error,setError]=useState('')

  async function handleSubmit(e){
    e.preventDefault()
    setError('')

    try{
      await onSubmit({email,username,password,role})
    }catch(err){
      setError(err.response?.data?.message||'Erreur création')
    }
  }

  return(
    <div>
      <h2 style={{marginBottom:'20px'}}>Créer un Utilisateur</h2>
      
      {error&&<p style={{color:'#e74c3c',marginBottom:'15px'}}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{marginBottom:'15px'}}>
          <label>Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{marginBottom:'15px'}}>
          <label>Nom d'utilisateur *</label>
          <input
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
            minLength="3"
          />
        </div>

        <div style={{marginBottom:'15px'}}>
          <label>Mot de passe *</label>
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>

        <div style={{marginBottom:'20px'}}>
          <label>Rôle</label>
          <select value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value="user">👤 Utilisateur normal</option>
            <option value="admin">🛡️ Administrateur</option>
          </select>
        </div>

        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <button type="button" onClick={onCancel} style={{background:'#95a5a6',color:'white'}}>
            Annuler
          </button>
          <button type="submit" style={{background:'#e74c3c',color:'white'}}>
            Créer l'utilisateur
          </button>
        </div>
      </form>
    </div>
  )
}