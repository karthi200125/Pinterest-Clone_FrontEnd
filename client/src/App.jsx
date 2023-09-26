import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import Home from './pages/Home/Home'
import Create from './pages/Create/Create'
import Navbar from './components/Navbar/Navbar'
import Upload from './pages/Upload/Upload'
import Profile from './pages/Profile/Profile'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/upload' element={<Upload/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App