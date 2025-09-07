import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Hero from './components/Hero'
import VideoCreator from './components/VideoCreator'
import Features from './components/Features'
import Footer from './components/Footer'
import useAuthStore from './store/authStore'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const { isAuthenticated } = useAuthStore()

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      // Will be handled by the Hero component to show auth modal
      return
    }
    setCurrentView('creator')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
  }

  return (
    <div className="min-h-screen bg-gradient-purple">
      <Header 
        currentView={currentView}
        onBackToHome={handleBackToHome}
      />
      
      {currentView === 'home' ? (
        <>
          <Hero onGetStarted={handleGetStarted} />
          <Features />
        </>
      ) : (
        <VideoCreator />
      )}
      
      <Footer />
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
          },
        }}
      />
    </div>
  )
}

export default App
