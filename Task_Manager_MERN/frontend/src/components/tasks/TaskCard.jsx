import {useState} from 'react'
import api from '../../services/api'

export default function TaskCard({task,folders,onUpdate,onDelete,canEdit=true}){
  const[showDetails,setShowDetails]=useState(false)
  const[editing,setEditing]=useState(false)
  const[title,setTitle]=useState(task.title)
  const[description,setDescription]=useState(task.description||'')

  const importanceColors={
    urgent:'#e74c3c',
    todo:'#f39c12',
    longterm:'#27ae60'
  }

  //Toggle completed
  async function toggleCompleted(){
    await api.put(`/tasks/${task._id}`,{completed:!task.completed})
    onUpdate(task._id,{completed:!task.completed})
  }

  //Sauvegarder modification
  async function saveEdit(){
    await api.put(`/tasks/${task._id}`,{title,description})
    onUpdate(task._id,{title,description})
    setEditing(false)
  }

  return(
    <div style={{
      background:'white',
      borderLeft:`4px solid ${importanceColors[task.importance]}`,
      padding:'15px',
      marginBottom:'10px',
      borderRadius:'5px',
      boxShadow:'0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'start'}}>
        <div style={{flex:1}}>
          {editing?(
            <div>
              <input value={title} onChange={(e)=>setTitle(e.target.value)} style={{marginBottom:'10px'}}/>
              <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows="3"/>
              <div style={{marginTop:'10px'}}>
                <button onClick={saveEdit} style={{background:'#27ae60',color:'white',marginRight:'10px'}}>💾 Sauver</button>
                <button onClick={()=>setEditing(false)}>Annuler</button>
              </div>
            </div>
          ):(
            <>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'5px'}}>
                <input 
                  type="checkbox" 
                  checked={task.completed}
                  onChange={toggleCompleted}
                />
                <strong style={{
                  textDecoration:task.completed?'line-through':'none',
                  color:task.completed?'#999':'#333'
                }}>
                  {task.title}
                </strong>
                <span style={{
                  fontSize:'11px',
                  padding:'2px 8px',
                  borderRadius:'10px',
                  background:importanceColors[task.importance],
                  color:'white'
                }}>
                  {task.importance==='urgent'?'Urgent':task.importance==='todo'?'À faire':'Long terme'}
                </span>
              </div>
              
              {task.folder&&(
                <small style={{color:'#666',marginLeft:'28px'}}>
                  📁 {task.folder.name}
                </small>
              )}
              
              {task.sharedWith?.length>0&&(
                <small style={{color:'#3498db',marginLeft:'10px'}}>
                  👥 Partagé avec {task.sharedWith.length} personne(s)
                </small>
              )}
            </>
          )}
        </div>

        {!editing&&canEdit&&(
          <div style={{display:'flex',gap:'5px'}}>
            <button onClick={()=>setShowDetails(!showDetails)} style={{background:'#95a5a6',color:'white',padding:'5px 10px'}}>
              {showDetails?'▲':'▼'}
            </button>
            <button onClick={()=>setEditing(true)} style={{background:'#3498db',color:'white',padding:'5px 10px'}}>✏️</button>
            <button onClick={()=>onDelete(task._id)} style={{background:'#e74c3c',color:'white',padding:'5px 10px'}}>🗑️</button>
          </div>
        )}
      </div>

      {/*Détails étendus*/}
      {showDetails&&!editing&&(
        <div style={{marginTop:'10px',paddingTop:'10px',borderTop:'1px solid #eee',marginLeft:'28px'}}>
          {task.description&&<p style={{color:'#666',fontSize:'14px'}}>{task.description}</p>}
          <small style={{color:'#999'}}>
            Créé le {new Date(task.createdAt).toLocaleDateString('fr-FR')}
          </small>
        </div>
      )}
    </div>
  )
}