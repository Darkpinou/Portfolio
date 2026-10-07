import {useState} from 'react'

export default function FolderForm({onSubmit,onCancel}){
  const[name,setName]=useState('')
  const[color,setColor]=useState('#3498db')

  const colors=['#3498db','#e74c3c','#2ecc71','#f39c12','#9b59b6','#1abc9c','#e67e22','#34495e']

  function handleSubmit(e){
    e.preventDefault()
    if(name.trim()){
      onSubmit({name:name.trim(),color})
    }
  }

  return(
    <div>
      <h2 style={{marginBottom:'20px'}}>Nouveau Dossier</h2>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom:'15px'}}>
          <label>Nom du dossier *</label>
          <input
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            placeholder="Travail, Personnel..."
          />
        </div>

        <div style={{marginBottom:'20px'}}>
          <label>Couleur</label>
          <div style={{display:'flex',gap:'10px',marginTop:'8px',flexWrap:'wrap'}}>
            {colors.map(c=>(
              <div
                key={c}
                onClick={()=>setColor(c)}
                style={{
                  width:'35px',
                  height:'35px',
                  borderRadius:'50%',
                  background:c,
                  cursor:'pointer',
                  border:color===c?'3px solid #333':'3px solid transparent'
                }}
              />
            ))}
          </div>
        </div>

        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <button type="button" onClick={onCancel} style={{background:'#95a5a6',color:'white'}}>
            Annuler
          </button>
          <button type="submit" style={{background:'#9b59b6',color:'white'}}>
            Créer le dossier
          </button>
        </div>
      </form>
    </div>
  )
}