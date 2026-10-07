import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import AdminPage from './pages/AdminPage'
import MasterPage from './pages/MasterPage'
import ProtectedRoute from './components/common/ProtectedRoute'

function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardPage/></ProtectedRoute>
          }/>
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin"><AdminPage/></ProtectedRoute>
          }/>
          <Route path="/master" element={
            <ProtectedRoute requiredRole="master"><MasterPage/></ProtectedRoute>
          }/>
          <Route path="*" element={<Navigate to="/login"/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App