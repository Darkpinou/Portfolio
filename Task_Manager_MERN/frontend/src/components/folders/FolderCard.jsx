
export default function FolderCard({folder,onDelete}){
  return(
    <div style={{
      background:folder.color||'#3498db',
      color:'white',
      padding:'15px 20px',
      borderRadius:'8px',
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom:'10px',
      minWidth:'200px'
    }}>
      <span style={{fontWeight:'bold',fontSize:'16px'}}>📁 {folder.name}</span>
      <button 
        onClick={()=>onDelete(folder._id)}
        style={{
          background:'rgba(255,255,255,0.2)',
          color:'white',
          padding:'5px 10px',
          borderRadius:'5px',
          fontSize:'12px'
        }}
      >
        🗑️ Supprimer
      </button>
    </div>
  )
}