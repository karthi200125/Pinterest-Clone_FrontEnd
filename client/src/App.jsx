import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { lazy, useContext, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthContext } from './Context/Authcontext'
import { Toaster } from 'react-hot-toast';
import Loading from './components/Loading/Loading'

const Home = lazy(() => import('./pages/Home/Home'));
const Create = lazy(() => import('./pages/Create/Create'));
const EditProfile = lazy(() => import('./pages/EditProfile/EditProfile'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Singleimg = lazy(() => import('./pages/SingleImg/Singleimg'));
const Upload = lazy(() => import('./pages/Upload/Upload'));
const Explore = lazy(() => import('./pages/Explore/Explore'));
const LandingPage = lazy(() => import('./pages/LandingPage/LandingPage'));

const App = () => {

  const { user } = useContext(AuthContext)
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <BrowserRouter>
          <Suspense fallback={<Loading/>}>
            <Routes>
              <Route path='/' element={user ? <Navigate to="/home" /> : <LandingPage />} />
              <Route path='/home' element={user ? <Home /> : <Navigate to="/" />} />
              <Route path='/create' element={user ? <Create /> : <Navigate to="/" />} />
              <Route path='/explore' element={user ? <Explore /> : <Navigate to="/" />} />
              <Route path='/upload' element={user ? <Upload /> : <Navigate to="/" />} />
              <Route path='/profile/:id' element={user ? <Profile /> : <Navigate to="/" />} />
              <Route path='/single/:id' element={user ? <Singleimg /> : <Navigate to="/" />} />
              <Route path='/editprofile/:id' element={user ? <EditProfile /> : <Navigate to="/" />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App