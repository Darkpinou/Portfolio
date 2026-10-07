import {useState} from 'react'
import api from '../../services/api'

export default function TaskForm({folders,onSubmit,onCancel}){
  const[title,setTitle]=useState('')
  const[description,setDescription]=useState('')
  const[importance,setImportance]=useState('todo')
  const[folder,setFolder]=useState('')
  const[sharedWith,setSharedWith]=useState('')
  const[error,setError]=useState('')

  async function handleSubmit(e){
    e.preventDefault()
    setError('')

    if(!title.trim()){
      setError('Le titre est obligatoire')
      return
    }

    try{
      const taskData={
        title:title.trim(),
        description:description.trim(),
        importance,
        folder:folder||null,
        sharedWith:sharedWith?sharedWith.split(',').map(s=>s.trim()):[]
      }
      
      await onSubmit(taskData)
    }catch(err){
      setError(err.response?.data?.message||'Erreur création')
    }
  }

  return(
    <div>
      <h2 style={{marginBottom:'20px'}}>Nouvelle Tâche</h2>
      
      {error&&<p style={{color:'#e74c3c',marginBottom:'15px'}}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{marginBottom:'15px'}}>
          <label>Titre *</label>
          <input
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            required
            placeholder="Ma tâche..."
          />
        </div>

        <div style={{marginBottom:'15px'}}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            rows="3"
            placeholder="Détails optionnels..."
          />
        </div>

        <div style={{marginBottom:'15px'}}>
          <label>Importance</label>
          <select value={importance} onChange={(e)=>setImportance(e.target.value)}>
            <option value="urgent">🔴 Urgent</option>
            <option value="todo">🟡 À faire</option>
            <option value="longterm">🟢 Long terme</option>
          </select>
        </div>

        <div style={{marginBottom:'15px'}}>
          <label>Dossier</label>
          <select value={folder} onChange={(e)=>setFolder(e.target.value)}>
            <option value="">Pas de dossier</option>
            {folders.map(f=>(
              <option key={f._id} value={f._id}>{f.name}</option>
            ))}
          </select>
        </div>

        <div style={{marginBottom:'20px'}}>
          <label>Partager avec (usernames séparés par virgule)</label>
          <input
            type="text"
            value={sharedWith}
            onChange={(e)=>setSharedWith(e.target.value)}
            placeholder="user1, user2, ..."
          />
        </div>

        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <button type="button" onClick={onCancel} style={{background:'#95a5a6',color:'white'}}>
            Annuler
          </button>
          <button type="submit" style={{background:'#3498db',color:'white'}}>
            Créer la tâche
          </button>
        </div>
      </form>
    </div>
  )
}