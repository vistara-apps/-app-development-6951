import React from 'react'
import { PlayCircle, Clock, Users, TrendingUp, Megaphone, BookOpen } from 'lucide-react'

const TemplateSelector = ({ projectData, updateProjectData, onNext }) => {
  const templates = [
    {
      id: 'social-ad',
      name: 'Social Media Ad',
      description: 'Perfect for promoting products or services',
      icon: Megaphone,
      duration: '15-30s',
      platforms: ['Instagram', 'Facebook', 'TikTok'],
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'explainer',
      name: 'Explainer Video',
      description: 'Break down complex topics simply',
      icon: BookOpen,
      duration: '60-90s',
      platforms: ['YouTube', 'LinkedIn'],
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'testimonial',
      name: 'Testimonial',
      description: 'Showcase customer success stories',
      icon: Users,
      duration: '30-60s',
      platforms: ['Website', 'LinkedIn', 'YouTube'],
      preview: '/api/placeholder/300/200'
    },
    {
      id: 'trending',
      name: 'Trending Content',
      description: 'Capitalize on current trends',
      icon: TrendingUp,
      duration: '15-45s',
      platforms: ['TikTok', 'Instagram', 'YouTube Shorts'],
      preview: '/api/placeholder/300/200'
    }
  ]

  const handleTemplateSelect = (template) => {
    updateProjectData({ selectedTemplate: template })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Choose a Template</h3>
        <p className="text-purple-200 mb-6">
          Select a template that best fits your content type and target audience.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleTemplateSelect(template)}
            className={`cursor-pointer rounded-lg border-2 transition-all duration-200 hover:border-purple-400 ${
              projectData.selectedTemplate?.id === template.id
                ? 'border-purple-400 bg-purple-500/20'
                : 'border-white/20 bg-black/20'
            }`}
          >
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  projectData.selectedTemplate?.id === template.id
                    ? 'bg-purple-500'
                    : 'bg-white/10'
                }`}>
                  <template.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{template.name}</h4>
                  <div className="flex items-center space-x-2 text-purple-300 text-sm">
                    <Clock className="w-3 h-3" />
                    <span>{template.duration}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-purple-200 mb-4 text-sm">
                {template.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {template.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-2 py-1 bg-white/10 rounded text-purple-300 text-xs"
                  >
                    {platform}
                  </span>
                ))}
              </div>
              
              <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-lg flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-white/60" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {projectData.selectedTemplate && (
        <div className="bg-black/20 rounded-lg p-6 border border-white/10">
          <h4 className="text-white font-medium mb-4">Template Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h5 className="text-purple-300 text-sm font-medium mb-1">Duration</h5>
              <p className="text-white">{projectData.selectedTemplate.duration}</p>
            </div>
            <div>
              <h5 className="text-purple-300 text-sm font-medium mb-1">Best For</h5>
              <p className="text-white">{projectData.selectedTemplate.platforms.join(', ')}</p>
            </div>
            <div>
              <h5 className="text-purple-300 text-sm font-medium mb-1">Type</h5>
              <p className="text-white">{projectData.selectedTemplate.name}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!projectData.selectedTemplate}
          className="bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Preview
        </button>
      </div>
    </div>
  )
}

export default TemplateSelector