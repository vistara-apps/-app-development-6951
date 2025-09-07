import React, { useState } from 'react'
import { Download, CheckCircle, Youtube, Instagram, Twitter, Linkedin, Monitor } from 'lucide-react'

const ExportSettings = ({ projectData, updateProjectData }) => {
  const [isExporting, setIsExporting] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)

  const platforms = [
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      formats: ['16:9 (1920x1080)', '16:9 (1280x720)'],
      maxDuration: '10 minutes',
      recommended: '1920x1080, 30fps'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      formats: ['9:16 (1080x1920)', '1:1 (1080x1080)', '16:9 (1920x1080)'],
      maxDuration: '60 seconds',
      recommended: '1080x1920, 30fps'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: Monitor,
      formats: ['9:16 (1080x1920)'],
      maxDuration: '3 minutes',
      recommended: '1080x1920, 30fps'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      formats: ['16:9 (1920x1080)', '1:1 (1080x1080)'],
      maxDuration: '10 minutes',
      recommended: '1920x1080, 30fps'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      formats: ['16:9 (1280x720)', '1:1 (720x720)'],
      maxDuration: '2 minutes 20 seconds',
      recommended: '1280x720, 30fps'
    }
  ]

  const qualityOptions = [
    { id: 'high', name: 'High Quality', description: '1080p, 30fps', fileSize: '~15MB' },
    { id: 'medium', name: 'Medium Quality', description: '720p, 30fps', fileSize: '~8MB' },
    { id: 'web', name: 'Web Optimized', description: '720p, 25fps', fileSize: '~5MB' }
  ]

  const handleExport = async () => {
    setIsExporting(true)
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      setExportComplete(true)
    }, 3000)
  }

  const handlePlatformSelect = (platform) => {
    updateProjectData({
      videoSettings: {
        ...projectData.videoSettings,
        platform: platform.id,
        format: platform.formats[0]
      }
    })
  }

  if (exportComplete) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Export Complete!</h3>
        <p className="text-purple-200 mb-6">
          Your video has been exported successfully and is ready for download.
        </p>
        <div className="space-y-4 max-w-md mx-auto">
          <button className="w-full bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download Video</span>
          </button>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Create Another Video
          </button>
        </div>
      </div>
    )
  }

  if (isExporting) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-6">
          <Download className="w-8 h-8 text-purple-400 animate-pulse" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Exporting Your Video</h3>
        <p className="text-purple-200 mb-6">
          Please wait while we prepare your video for download...
        </p>
        <div className="max-w-md mx-auto bg-black/20 rounded-full p-1">
          <div className="bg-purple-500 h-2 rounded-full transition-all duration-300" style={{ width: '60%' }}></div>
        </div>
        <p className="text-purple-300 text-sm mt-2">This may take a few minutes</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Export Settings</h3>
        <p className="text-purple-200 mb-6">
          Choose your target platform and quality settings for optimal performance.
        </p>
      </div>
      
      {/* Platform Selection */}
      <div>
        <h4 className="text-white font-medium mb-4">Target Platform</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              onClick={() => handlePlatformSelect(platform)}
              className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                projectData.videoSettings?.platform === platform.id
                  ? 'border-purple-400 bg-purple-500/20'
                  : 'border-white/20 bg-black/20 hover:border-white/40'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  projectData.videoSettings?.platform === platform.id
                    ? 'bg-purple-500'
                    : 'bg-white/10'
                }`}>
                  <platform.icon className="w-4 h-4 text-white" />
                </div>
                <h5 className="text-white font-medium">{platform.name}</h5>
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="text-purple-300">
                  Formats: {platform.formats.join(', ')}
                </div>
                <div className="text-purple-300">
                  Max: {platform.maxDuration}
                </div>
                <div className="text-purple-200 text-xs">
                  {platform.recommended}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quality Settings */}
      <div>
        <h4 className="text-white font-medium mb-4">Quality Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {qualityOptions.map((quality) => (
            <div
              key={quality.id}
              onClick={() => updateProjectData({
                videoSettings: {
                  ...projectData.videoSettings,
                  quality: quality.id
                }
              })}
              className={`cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                projectData.videoSettings?.quality === quality.id
                  ? 'border-purple-400 bg-purple-500/20'
                  : 'border-white/20 bg-black/20 hover:border-white/40'
              }`}
            >
              <h5 className="text-white font-medium mb-2">{quality.name}</h5>
              <p className="text-purple-200 text-sm mb-1">{quality.description}</p>
              <p className="text-purple-300 text-xs">{quality.fileSize}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Export Summary */}
      {projectData.videoSettings?.platform && (
        <div className="bg-black/20 rounded-lg p-6 border border-white/10">
          <h4 className="text-white font-medium mb-4">Export Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="text-purple-300 font-medium mb-2">Video Settings</h5>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-purple-200">Platform:</span>
                  <span className="text-white capitalize">{projectData.videoSettings.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Format:</span>
                  <span className="text-white">{projectData.videoSettings.format || '16:9 (1920x1080)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Quality:</span>
                  <span className="text-white capitalize">{projectData.videoSettings.quality || 'high'}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="text-purple-300 font-medium mb-2">Brand Assets</h5>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-purple-200">Logo:</span>
                  <span className="text-white">{projectData.brandAssets.logo ? 'Included' : 'None'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Brand Color:</span>
                  <span className="text-white">{projectData.brandAssets.primaryColor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Font:</span>
                  <span className="text-white">{projectData.brandAssets.fontFamily}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={handleExport}
          disabled={!projectData.videoSettings?.platform}
          className="bg-white text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <Download className="w-5 h-5" />
          <span>Export Video</span>
        </button>
      </div>
    </div>
  )
}

export default ExportSettings