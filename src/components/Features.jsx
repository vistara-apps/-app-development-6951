import React from 'react'
import { Brain, Palette, Monitor, Layout } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Script-to-Video",
      description: "Transform your written content into engaging video scripts with AI-powered scene segmentation and voiceover suggestions.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Palette,
      title: "Automated Brand Integration",
      description: "Upload your brand assets once and watch them automatically apply to all your videos, ensuring consistent brand identity.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Monitor,
      title: "Format Optimization",
      description: "Automatically resize and adjust video length for TikTok, Instagram Reels, YouTube, and other social platforms.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Layout,
      title: "Template Variety",
      description: "Choose from professional templates for ads, explainers, testimonials, and more to jumpstart your video creation.",
      color: "from-cyan-500 to-teal-500"
    }
  ]

  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need to Create
            <span className="block text-gradient">Amazing Videos</span>
          </h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Powerful features designed to streamline your video creation workflow
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-card rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-purple-100 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features