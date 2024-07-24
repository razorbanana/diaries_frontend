import { useEffect} from 'react'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { Topper } from './components/Topper'
import { MyDiariesPage } from './pages/MyDiariesPage'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/profile/ProfilePage'
import { DiaryPage } from './pages/DiaryPage'
import { EntryPage } from './pages/EntryPage'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, UserState } from './app/user/userSlice'


function App() {
  const dispatch = useDispatch();
  const token = useSelector((state: {user: UserState}) => state.user.token);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) { 
      dispatch(setToken(token));
    }
  }, [])

  if (token === 'undefined') {
    return <LoginPage/>
  }else{
    return (
      <div className='App'>
        <Router> 
          <Topper/>
          <Routes> 
              <Route path="/my-diaries" element={<MyDiariesPage />} /> 
              <Route path="/home" element={<HomePage />} /> 
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/diary/:id" element={<DiaryPage />} />
              <Route path="/entry/:id" element={<EntryPage />} />
          </Routes> 
        </Router> 
      </div>
    )
  } 
}

export default App
