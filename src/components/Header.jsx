import React, { useState } from 'react'
import { ArrowLeft, Video, User, Crown, LogOut, Settings } from 'lucide-react'
import useAuthStore from '../store/authStore'
import AuthModal from './auth/AuthModal'
import PricingModal from './subscription/PricingModal'

const Header = ({ currentView, onBackToHome }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  
  const { user, isAuthenticated, subscriptionTier, logout } = useAuthStore()

  const handleAuthClick = (mode) => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
    if (currentView === 'creator') {
      onBackToHome()
    }
  }

  const handleUpgradeClick = () => {
    setIsPricingModalOpen(true)
    setIsUserMenuOpen(false)
  }

  const getSubscriptionColor = (tier) => {
    switch (tier) {
      case 'pro': return 'text-purple-300'
      case 'agency': return 'text-orange-300'
      default: return 'text-blue-300'
    }
  }

  return (
    <>
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
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 rounded-lg p-2 transition-all duration-200 border border-white/20"
                  >
                    <div className="hidden sm:block text-right">
                      <div className="text-white font-medium text-sm">{user.name || user.email}</div>
                      <div className={`text-xs flex items-center ${getSubscriptionColor(subscriptionTier)}`}>
                        <Crown className="w-3 h-3 mr-1" />
                        {subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)} Plan
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gradient-card border border-white/20 rounded-lg shadow-lg backdrop-blur-sm">
                      <div className="p-3 border-b border-white/10">
                        <div className="text-white font-medium text-sm">{user.name || user.email}</div>
                        <div className={`text-xs ${getSubscriptionColor(subscriptionTier)}`}>
                          {subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)} Plan
                        </div>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={handleUpgradeClick}
                          className="w-full text-left px-3 py-2 text-purple-200 hover:bg-white/10 transition-colors flex items-center space-x-2"
                        >
                          <Crown className="w-4 h-4" />
                          <span>Upgrade Plan</span>
                        </button>
                        <button
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full text-left px-3 py-2 text-purple-200 hover:bg-white/10 transition-colors flex items-center space-x-2"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 text-red-300 hover:bg-white/10 transition-colors flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="text-white/80 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />

      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />
    </>
  )
}

export default Header
