import TaskCard from './TaskCard'

export default function TaskList({tasks,folders,onDelete,onUpdate}){
  if(tasks.length===0){
    return(
      <div style={{
        textAlign:'center',
        padding:'40px',
        color:'#999',
        background:'white',
        borderRadius:'10px',
        marginTop:'20px'
      }}>
        <p style={{fontSize:'18px'}}>Aucune tâche trouvée</p>
        <p>Créez votre première tâche !</p>
      </div>
    )
  }

  return(
    <div style={{marginTop:'20px'}}>
      <h3>Mes Tâches ({tasks.length})</h3>
      {tasks.map(task=>(
        <TaskCard
          key={task._id}
          task={task}
          folders={folders}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}