import React, { useState } from 'react'
import { Play, Sparkles, Zap, Target } from 'lucide-react'
import useAuthStore from '../store/authStore'
import AuthModal from './auth/AuthModal'

const Hero = ({ onGetStarted }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { isAuthenticated } = useAuthStore()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      onGetStarted()
    } else {
      setIsAuthModalOpen(true)
    }
  }
  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span className="text-purple-200 text-sm">AI-Powered Video Creation</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Text into
            <span className="block text-gradient">Branded Videos</span>
            in Minutes
          </h1>
          
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create professional, social-media-optimized videos from your blog posts, articles, and content. 
            No editing skills required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={handleGetStarted}
              className="group bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-all duration-200 shadow-glow hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Start Creating</span>
            </button>
            
            <button className="text-white border border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
              Watch Demo
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-white font-semibold mb-1">Lightning Fast</h3>
              <p className="text-purple-200 text-sm">Generate videos in under 2 minutes</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-white font-semibold mb-1">Brand Consistent</h3>
              <p className="text-purple-200 text-sm">Auto-apply your brand assets</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Play className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-white font-semibold mb-1">Platform Ready</h3>
              <p className="text-purple-200 text-sm">Optimized for all social platforms</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="signup"
      />
    </section>
  )
}

export default Hero
