import React, { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Download, Loader2, Wand2, Edit3 } from 'lucide-react'

const VideoPreview = ({ projectData, updateProjectData, onNext }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(45) // Mock duration

  useEffect(() => {
    if (!projectData.videoPreview && projectData.selectedTemplate) {
      generateVideoPreview()
    }
  }, [])

  const generateVideoPreview = async () => {
    setIsGenerating(true)
    
    // Simulate video generation
    setTimeout(() => {
      const mockVideoData = {
        url: '/api/placeholder/640/360',
        scenes: [
          { time: 0, text: 'Hook: Attention-grabbing opener', visual: 'Text overlay with logo' },
          { time: 5, text: 'Problem: What challenges exist?', visual: 'Problem visualization' },
          { time: 15, text: 'Solution: How we solve it', visual: 'Solution demonstration' },
          { time: 30, text: 'Benefits: Why it matters', visual: 'Benefits showcase' },
          { time: 40, text: 'CTA: Take action now', visual: 'Call to action screen' }
        ],
        metadata: {
          resolution: '1920x1080',
          framerate: '30fps',
          fileSize: '12.4 MB'
        }
      }
      
      updateProjectData({ videoPreview: mockVideoData })
      setIsGenerating(false)
    }, 3000)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isGenerating) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-6">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Generating Your Video</h3>
        <p className="text-purple-200 mb-6">
          Our AI is creating your video using your content, brand assets, and selected template...
        </p>
        <div className="max-w-md mx-auto bg-black/20 rounded-full p-1">
          <div className="bg-purple-500 h-2 rounded-full transition-all duration-300" style={{ width: '75%' }}></div>
        </div>
        <p className="text-purple-300 text-sm mt-2">This usually takes 2-3 minutes</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Video Preview</h3>
        <p className="text-purple-200 mb-6">
          Review your generated video and make any final adjustments before exporting.
        </p>
      </div>
      
      {projectData.videoPreview && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-purple-900 to-indigo-900 relative flex items-center justify-center">
                {/* Mock video preview */}
                <div className="text-center text-white">
                  <h4 className="text-2xl font-bold mb-2">{projectData.title || 'Your Video Title'}</h4>
                  <p className="text-purple-200">Scene {Math.floor(currentTime / 10) + 1}: {projectData.videoPreview.scenes[Math.floor(currentTime / 10)]?.text}</p>
                </div>
                
                {/* Brand assets overlay */}
                {projectData.brandAssets.logo && (
                  <div className="absolute top-4 right-4">
                    <img
                      src={projectData.brandAssets.logo}
                      alt="Logo"
                      className="h-8 opacity-80"
                    />
                  </div>
                )}
                
                {/* Play/Pause overlay */}
                <button
                  onClick={togglePlayback}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-16 h-16 text-white" />
                  ) : (
                    <Play className="w-16 h-16 text-white" />
                  )}
                </button>
              </div>
              
              {/* Video Controls */}
              <div className="p-4 bg-black/80">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlayback}
                    className="text-white hover:text-purple-300 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  
                  <div className="flex-1">
                    <input
                      type="range"
                      min={0}
                      max={duration}
                      value={currentTime}
                      onChange={(e) => setCurrentTime(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  
                  <button
                    onClick={() => setCurrentTime(0)}
                    className="text-white hover:text-purple-300 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Video Details & Timeline */}
          <div className="space-y-4">
            <div className="bg-black/20 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-medium mb-3">Video Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-300">Resolution:</span>
                  <span className="text-white">{projectData.videoPreview.metadata.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Frame Rate:</span>
                  <span className="text-white">{projectData.videoPreview.metadata.framerate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">File Size:</span>
                  <span className="text-white">{projectData.videoPreview.metadata.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Duration:</span>
                  <span className="text-white">{formatTime(duration)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-black/20 rounded-lg p-4 border border-white/10">
              <h4 className="text-white font-medium mb-3">Scene Timeline</h4>
              <div className="space-y-2">
                {projectData.videoPreview.scenes.map((scene, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded text-sm cursor-pointer transition-colors ${
                      currentTime >= scene.time && currentTime < (projectData.videoPreview.scenes[index + 1]?.time || duration)
                        ? 'bg-purple-500/30 border border-purple-400'
                        : 'bg-black/30 hover:bg-black/50'
                    }`}
                    onClick={() => setCurrentTime(scene.time)}
                  >
                    <div className="text-purple-300 text-xs">{formatTime(scene.time)}</div>
                    <div className="text-white font-medium">{scene.text}</div>
                    <div className="text-purple-200 text-xs">{scene.visual}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={generateVideoPreview}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Wand2 className="w-4 h-4" />
                <span>Regenerate</span>
              </button>
              
              <button className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 border border-white/20">
                <Edit3 className="w-4 h-4" />
                <span>Edit Script</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!projectData.videoPreview}
          className="bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export Video</span>
        </button>
      </div>
    </div>
  )
}

export default VideoPreview