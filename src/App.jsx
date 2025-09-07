import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import VideoCreator from './components/VideoCreator'
import Features from './components/Features'
import Footer from './components/Footer'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [user, setUser] = useState(null)

  const handleGetStarted = () => {
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
        user={user}
        setUser={setUser}
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
    </div>
  )
}

export default App