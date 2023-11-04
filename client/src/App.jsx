import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense, lazy, useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthContext } from './Context/Authcontext'
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
          <Routes>
            <Route path='/' element={user ? <Navigate to="/home" /> : <LandingPage />} />
            <Route
              path='/home'
              element={
                user ? (
                  <Suspense fallback={<Loading />}>
                    <Home />
                  </Suspense>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path='/create'
              element={
                user ? (
                  <Suspense fallback={<Loading />}>
                    <Create />
                  </Suspense>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path='/explore'
              element={
                user ? (
                  <Suspense fallback={<Loading />}>
                    <Explore />
                  </Suspense>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path='/upload'
              element={
                user ? (
                  <Suspense fallback={<Loading />}>
                    <Upload />
                  </Suspense>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path='/profile/:id'
              element={
                user ? (
                  <Suspense fallback={<Loading />}>
                    <Profile />
                  </Suspense>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path='/single/:id'
              element={
                user ? (
                  <Suspense fallback={<Loading />}>
                    <Singleimg />
                  </Suspense>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path='/editprofile/:id'
              element={
                user ? (
                  <Suspense fallback={<Loading />}>
                    <EditProfile />
                  </Suspense>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}

export default App
