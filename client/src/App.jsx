import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthContext } from './Context/Authcontext'
import Create from './pages/Create/Create'
import EditProfile from './pages/EditProfile/EditProfile'
import Home from './pages/Home/Home'
import LandingPage from './pages/LandingPage/LandingPage'
import Profile from './pages/Profile/Profile'
import Singleimg from './pages/SingleImg/Singleimg'
import Upload from './pages/Upload/Upload'
import Explore from './pages/Explore/Explore'
import { Toaster } from 'react-hot-toast';


const App = () => {

  const {user} = useContext(AuthContext)
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Toaster/>
      <BrowserRouter>      
        <Routes>          
          <Route path='/' element={user ? <Navigate to="/home"/> :<LandingPage/>}/> 
          <Route path='/home' element={user ?  <Home/> : <Navigate to="/"/>} />
          <Route path='/create' element={user ?  <Create/> : <Navigate to="/"/>} />
          <Route path='/explore' element={user ?  <Explore/> : <Navigate to="/"/>} />
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