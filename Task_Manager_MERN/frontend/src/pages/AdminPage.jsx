import {useState,useEffect} from 'react'
import Navbar from '../components/common/Navbar'
import api from '../services/api'
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'

export default function AdminPage(){
  const[users,setUsers]=useState([])
  const[selectedUser,setSelectedUser]=useState(null)
  const[userTasks,setUserTasks]=useState([])
  const{user:currentUser}=useContext(AuthContext)

  //Charger la liste des utilisateurs
  async function loadUsers(){
    try{
      const res=await api.get('/admin/users')
      setUsers(res.data)
    }catch(err){
      console.error(err)
    }
  }

  //Voir les tâches d'un utilisateur
  async function viewUserTasks(userId){
    try{
      const res=await api.get(`/admin/users/${userId}/tasks`)
      setSelectedUser(userId)
      setUserTasks(res.data)
    }catch(err){
      console.error(err)
    }
  }

  //Créer une tâche pour un utilisateur (Admin only)
  async function createTaskForUser(userId,taskData){
    await api.post('/tasks',{...taskData,owner:userId})
    viewUserTasks(userId)//Recharger
  }

  //Supprimer une tâche d'un utilisateur
  async function deleteUserTask(taskId){
    if(window.confirm('Supprimer cette tâche?')){
      await api.delete(`/tasks/${taskId}`)
      viewUserTasks(selectedUser)//Recharger
    }
  }

  useEffect(()=>{
    loadUsers()
  },[])

  return(
    <div>
      <Navbar/>
      <div style={{padding:'30px',maxWidth:'1400px',margin:'0 auto'}}>
        <h1>Panneau Administration</h1>
        <p style={{color:'#666',marginBottom:'30px'}}>
          Rôle: <strong>{currentUser.role}</strong>
        </p>

        <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'30px'}}>
          {/*Liste utilisateurs*/}
          <div style={{
            background:'white',
            padding:'20px',
            borderRadius:'10px',
            maxHeight:'70vh',
            overflowY:'auto'
          }}>
            <h3>Utilisateurs ({users.length})</h3>
            {users.map(u=>(
              <div
                key={u._id}
                onClick={()=>viewUserTasks(u._id)}
                style={{
                  padding:'12px',
                  margin:'8px 0',
                  background:selectedUser===u._id?'#e8f4fd':'#f8f9fa',
                  borderRadius:'5px',
                  cursor:'pointer',
                  borderLeft:`4px solid ${
                    u.role==='master'?'#e74c3c':
                    u.role==='admin'?'#f39c12':'#27ae60'
                  }`,
                  display:'flex',
                  justifyContent:'space-between',
                  alignItems:'center'
                }}
              >
                <div>
                  <strong>{u.username}</strong>
                  <br/>
                  <small style={{color:'#666'}}>{u.email}</small>
                </div>
                <span style={{
                  fontSize:'11px',
                  padding:'3px 8px',
                  borderRadius:'10px',
                  background:u.role==='master'?'#e74c3c':u.role==='admin'?'#f39c12':'#27ae60',
                  color:'white'
                }}>
                  {u.role}
                </span>
              </div>
            ))}
          </div>

          {/*Tâches de l'utilisateur sélectionné*/}
          <div style={{
            background:'white',
            padding:'20px',
            borderRadius:'10px',
            maxHeight:'70vh',
            overflowY:'auto'
          }}>
            {selectedUser?(
              <>
                <h3>Tâches de l'utilisateur ({userTasks.length})</h3>
                {userTasks.length===0?(
                  <p style={{color:'#999',textAlign:'center',padding:'40px'}}>
                    Aucune tâche pour cet utilisateur
                  </p>
                ):(
                  userTasks.map(task=>(
                    <div key={task._id} style={{
                      borderLeft:`4px solid ${
                        task.importance==='urgent'?'#e74c3c':
                        task.importance==='todo'?'#f39c12':'#27ae60'
                      }`,
                      padding:'12px',
                      margin:'10px 0',
                      background:'#f8f9fa',
                      borderRadius:'5px',
                      display:'flex',
                      justifyContent:'space-between',
                      alignItems:'center'
                    }}>
                      <div>
                        <strong>{task.title}</strong>
                        <span style={{
                          marginLeft:'10px',
                          fontSize:'11px',
                          padding:'2px 8px',
                          borderRadius:'10px',
                          background:task.importance==='urgent'?'#e74c3c':task.importance==='todo'?'#f39c12':'#27ae60',
                          color:'white'
                        }}>
                          {task.importance}
                        </span>
                        {task.completed&&<span style={{marginLeft:'10px',color:'#27ae60'}}>✅</span>}
                      </div>
                      <button
                        onClick={()=>deleteUserTask(task._id)}
                        style={{background:'#e74c3c',color:'white',padding:'5px 10px'}}
                      >
                        🗑️
                      </button>
                    </div>
                  ))
                )}
              </>
            ):(
              <div style={{
                textAlign:'center',
                padding:'60px',
                color:'#999'
              }}>
                <p style={{fontSize:'18px'}}>Sélectionnez un utilisateur</p>
                <p>pour voir ses tâches</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}