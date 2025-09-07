import React, { useState } from 'react'
import { Wand2, FileText, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { aiAPI } from '../../services/api'

const TextInput = ({ projectData, updateProjectData, onNext }) => {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateScript = async () => {
    if (!projectData.scriptContent.trim()) return
    
    setIsGenerating(true)
    
    try {
      const result = await aiAPI.generateScript(projectData.scriptContent, {
        platform: projectData.videoSettings?.platform || 'youtube'
      })
      
      updateProjectData({ 
        generatedScript: result.script,
        scenes: result.scenes,
        title: projectData.title || projectData.scriptContent.split(' ').slice(0, 6).join(' ') + '...'
      })
      
      toast.success('Script generated successfully!')
    } catch (error) {
      console.error('Script generation error:', error)
      toast.error('Failed to generate script. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Input Your Content</h3>
        <p className="text-purple-200 mb-6">
          Paste your blog post, article, or any text content that you'd like to transform into a video.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-white font-medium mb-2">Project Title (Optional)</label>
          <input
            type="text"
            value={projectData.title}
            onChange={(e) => updateProjectData({ title: e.target.value })}
            placeholder="My Awesome Video"
            className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-purple-400 focus:outline-none transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-white font-medium mb-2">Content Text</label>
          <textarea
            value={projectData.scriptContent}
            onChange={(e) => updateProjectData({ scriptContent: e.target.value })}
            placeholder="Paste your blog post, article, or any text content here. The AI will analyze it and create an engaging video script..."
            rows={8}
            className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-purple-400 focus:outline-none transition-colors resize-none"
          />
          <div className="text-right text-purple-300 text-sm mt-1">
            {projectData.scriptContent.length} characters
          </div>
        </div>
      </div>
      
      {projectData.scriptContent.trim() && (
        <div className="bg-black/20 rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-medium flex items-center">
              <Wand2 className="w-4 h-4 mr-2" />
              AI-Generated Script
            </h4>
            <button
              onClick={handleGenerateScript}
              disabled={isGenerating}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generate Script</span>
                </>
              )}
            </button>
          </div>
          
          {projectData.generatedScript && (
            <div className="bg-black/30 rounded-lg p-4">
              <pre className="text-purple-100 text-sm whitespace-pre-wrap font-mono">
                {projectData.generatedScript}
              </pre>
            </div>
          )}
          
          {!projectData.generatedScript && !isGenerating && (
            <div className="text-center py-8 text-purple-300">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Click "Generate Script" to create your video script</p>
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!projectData.scriptContent.trim()}
          className="bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Brand Assets
        </button>
      </div>
    </div>
  )
}

export default TextInput
