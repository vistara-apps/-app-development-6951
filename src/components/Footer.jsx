import React from 'react'
import { Video, Twitter, Github, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="relative px-4 py-12 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">VideoCraft Pro</h3>
            </div>
            <p className="text-purple-200 mb-6 max-w-md">
              Transform your written content into engaging, branded videos in minutes. 
              No editing skills required.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-purple-300 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-purple-300 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-purple-300 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Templates</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-purple-300 text-sm">
            © 2024 VideoCraft Pro. All rights reserved.
          </p>
          <p className="text-purple-300 text-sm">
            Made with ❤️ for content creators
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer