import {useState,useEffect} from 'react'
import Navbar from '../components/common/Navbar'
import TaskList from '../components/tasks/TaskList'
import FolderList from '../components/folders/FolderList'
import TaskForm from '../components/tasks/TaskForm'
import FolderForm from '../components/folders/FolderForm'
import api from '../services/api'

export default function DashboardPage(){
  const[tasks,setTasks]=useState([])
  const[folders,setFolders]=useState([])
  const[selectedFolder,setSelectedFolder]=useState(null)
  const[filterImportance,setFilterImportance]=useState('')
  const[showTaskForm,setShowTaskForm]=useState(false)
  const[showFolderForm,setShowFolderForm]=useState(false)

  //Charger les tâches
  async function loadTasks(){
    try{
      let url='/tasks'
      if(selectedFolder) url+=`?folder=${selectedFolder}`
      if(filterImportance) url+=`${selectedFolder?'&':'?'}importance=${filterImportance}`
      const res=await api.get(url)
      setTasks(res.data)
    }catch(err){
      console.error(err)
    }
  }

  //Charger les dossiers
  async function loadFolders(){
    try{
      const res=await api.get('/folders')
      setFolders(res.data)
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    loadTasks()
    loadFolders()
  },[selectedFolder,filterImportance])

  //Créer une tâche
  async function createTask(taskData){
    await api.post('/tasks',taskData)
    setShowTaskForm(false)
    loadTasks()
  }

  //Créer un dossier
  async function createFolder(folderData){
    await api.post('/folders',folderData)
    setShowFolderForm(false)
    loadFolders()
  }

  //Supprimer une tâche
  async function deleteTask(id){
    if(window.confirm('Supprimer cette tâche?')){
      await api.delete(`/tasks/${id}`)
      loadTasks()
    }
  }

  //Modifier une tâche
  async function updateTask(id,data){
    await api.put(`/tasks/${id}`,data)
    loadTasks()
  }

  return(
    <div>
      <Navbar/>
      <div style={{padding:'30px',maxWidth:'1200px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
          <h1>Mes Tâches</h1>
          <div style={{display:'flex',gap:'10px'}}>
            <button onClick={()=>setShowTaskForm(true)} style={{background:'#3498db',color:'white'}}>
              + Nouvelle tâche
            </button>
            <button onClick={()=>setShowFolderForm(true)} style={{background:'#9b59b6',color:'white'}}>
              + Nouveau dossier
            </button>
          </div>
        </div>

        {/*Filtres*/}
        <div style={{display:'flex',gap:'15px',marginBottom:'20px'}}>
          <select value={selectedFolder} onChange={(e)=>setSelectedFolder(e.target.value)}>
            <option value="">Tous les dossiers</option>
            {folders.map(f=>(
              <option key={f._id} value={f._id}>{f.name}</option>
            ))}
          </select>

          <select value={filterImportance} onChange={(e)=>setFilterImportance(e.target.value)}>
            <option value="">Toutes importances</option>
            <option value="urgent">🔴 Urgent</option>
            <option value="todo">🟡 À faire</option>
            <option value="longterm">🟢 Long terme</option>
          </select>
        </div>

        {/*Dossiers*/}
        <FolderList 
          folders={folders} 
          onDelete={async(id)=>{
            await api.delete(`/folders/${id}`)
            loadFolders()
          }}
        />

        {/*Tâches*/}
        <TaskList 
          tasks={tasks}
          folders={folders}
          onDelete={deleteTask}
          onUpdate={updateTask}
        />

        {/*Formulaire tâche modal*/}
        {showTaskForm&&(
          <div style={{
            position:'fixed',
            top:0,left:0,right:0,bottom:0,
            background:'rgba(0,0,0,0.5)',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            zIndex:1000
          }} onClick={()=>setShowTaskForm(false)}>
            <div onClick={(e)=>e.stopPropagation()} style={{
              background:'white',
              padding:'30px',
              borderRadius:'10px',
              width:'90%',
              maxWidth:'500px'
            }}>
              <TaskForm 
                folders={folders}
                onSubmit={createTask}
                onCancel={()=>setShowTaskForm(false)}
              />
            </div>
          </div>
        )}

        {/*Formulaire dossier modal*/}
        {showFolderForm&&(
          <div style={{
            position:'fixed',
            top:0,left:0,right:0,bottom:0,
            background:'rgba(0,0,0,0.5)',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            zIndex:1000
          }} onClick={()=>setShowFolderForm(false)}>
            <div onClick={(e)=>e.stopPropagation()} style={{
              background:'white',
              padding:'30px',
              borderRadius:'10px',
              width:'90%',
              maxWidth:'400px'
            }}>
              <FolderForm 
                onSubmit={createFolder}
                onCancel={()=>setShowFolderForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}