import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import SettingPage from './pages/SettingsPage'
import { Toaster } from 'react-hot-toast'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import HomePage from './pages/HomePage'
import { Loader } from 'lucide-react'
import { useThemeStore } from './store/useThemeStore'
import ChatPage from './pages/ChatPage'
import SearchPage from './pages/SearchPage'
import TrackPage from './pages/TrackPage'

function App() {

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore()
  const { theme } = useThemeStore()

  console.log("Online Users:", onlineUsers);

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log(authUser)
  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )

  return (
    <div data-theme={theme} >
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/settings' element={<SettingPage />} />
        <Route path='/Profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
        <Route path='/chat' element={authUser ? <ChatPage /> : <Navigate to='/login' />} />
        <Route path='/search' element={authUser ? <SearchPage /> : <Navigate to='/login' />} />
        <Route path='/track' element={authUser ? <TrackPage /> : <Navigate to='/login' />} />
        <Route path='*' element={<Navigate to='/' />} />


      </Routes>

      <Toaster />

    </div >
  )
}

export default App
