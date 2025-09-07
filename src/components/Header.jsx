import React from 'react'
import { ArrowLeft, Video, User, Crown } from 'lucide-react'

const Header = ({ currentView, onBackToHome, user, setUser }) => {
  const handleLogin = () => {
    // Mock login - in real app would integrate with auth service
    setUser({
      email: 'demo@videocraft.com',
      subscriptionTier: 'Pro',
      exportsRemaining: 8
    })
  }

  return (
    <header className="relative z-50 px-4 py-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {currentView !== 'home' && (
              <button
                onClick={onBackToHome}
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">VideoCraft Pro</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <div className="text-white font-medium">{user.email}</div>
                  <div className="text-purple-200 text-sm flex items-center">
                    <Crown className="w-3 h-3 mr-1" />
                    {user.subscriptionTier} - {user.exportsRemaining} exports left
                  </div>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-200 border border-white/20"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header