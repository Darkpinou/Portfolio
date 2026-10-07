import {Navigate} from 'react-router-dom'
import {useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'

export default function ProtectedRoute({children,requiredRole}){
  const{user}=useContext(AuthContext)

  if(!user) return<Navigate to="/login"/>

  if(requiredRole){
    if(requiredRole==='master'&&user.role!=='master') return<Navigate to="/dashboard"/>
    if(requiredRole==='admin'&&user.role==='user') return<Navigate to="/dashboard"/>
  }

  return children
}