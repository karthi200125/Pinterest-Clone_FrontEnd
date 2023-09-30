import React, { useContext } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import Home from './pages/Home/Home'
import Create from './pages/Create/Create'
import Navbar from './components/Navbar/Navbar'
import Upload from './pages/Upload/Upload'
import Profile from './pages/Profile/Profile'
import Singleimg from './pages/SingleImg/Singleimg'
import EditProfile from './pages/EditProfile/EditProfile'
import { AuthContext } from './Context/Authcontext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {

  const {user} = useContext(AuthContext)
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>      
        <Routes>
          <Route path='/' element={user ? <Navigate to="/home"/> :<LandingPage/>}/> 
          <Route path='/home' element={user ?  <Home/> : <Navigate to="/"/>} />
          <Route path='/create' element={user ?  <Create/> : <Navigate to="/"/>} />
          <Route path='/upload' element={user ?  <Upload/> : <Navigate to="/"/>} />
          <Route path='/profile/:id' element={user ?  <Profile/> : <Navigate to="/"/>} />
          <Route path='/single/:id' element={user ?  <Singleimg/> : <Navigate to="/"/>} />
          <Route path='/editprofile/:id' element={user ?  <EditProfile/> : <Navigate to="/"/>} />
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App