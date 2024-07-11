import { useState } from 'react'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { Topper } from './components/Topper'
import { MyDiariesPage } from './pages/MyDiariesPage'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { DiaryPage } from './pages/DiaryPage'


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  console.log(`token is ${token}`)
  if (token === 'undefined') {
    return <LoginPage setToken={setToken}/>
  }else{
    return (
      <div>
        <Router> 
          <Topper setToken={setToken}/>
          <Routes> 
              <Route path="/my-diaries" element={<MyDiariesPage />} /> 
              <Route path="/home" element={<HomePage />} /> 
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/diary/:id" element={<DiaryPage />} />
          </Routes> 
        </Router> 
      </div>
    )
  } 
}

export default App
