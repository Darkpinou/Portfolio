import axios from 'axios'

const api=axios.create({
  baseURL:process.env.REACT_APP_API_URL||'http://localhost:5000/api',
  headers:{
    'Content-Type':'application/json'
  }
})

//Intercepteur pour gérer erreurs 401
api.interceptors.response.use(
  (response)=>response,
  (error)=>{
    if(error.response?.status===401){
      localStorage.removeItem('token')
      window.location.href='/login'
    }
    return Promise.reject(error)
  }
)

export default api