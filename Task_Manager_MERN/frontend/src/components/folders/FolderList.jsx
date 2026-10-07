import FolderCard from './FolderCard'

export default function FolderList({folders,onDelete}){
  if(folders.length===0) return null

  return(
    <div style={{marginBottom:'30px'}}>
      <h3>Mes Dossiers ({folders.length})</h3>
      <div style={{display:'flex',gap:'15px',flexWrap:'wrap'}}>
        {folders.map(folder=>(
          <FolderCard
            key={folder._id}
            folder={folder}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}