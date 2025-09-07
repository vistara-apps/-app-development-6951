import React, { useRef } from 'react'
import { Upload, Palette, Type, Image } from 'lucide-react'

const BrandKit = ({ projectData, updateProjectData, onNext }) => {
  const logoInputRef = useRef(null)

  const handleLogoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        updateProjectData({
          brandAssets: {
            ...projectData.brandAssets,
            logo: e.target.result
          }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleColorChange = (color) => {
    updateProjectData({
      brandAssets: {
        ...projectData.brandAssets,
        primaryColor: color
      }
    })
  }

  const predefinedColors = [
    '#9c73ff', '#ff6b6b', '#4ecdc4', '#45b7d1', 
    '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Brand Assets</h3>
        <p className="text-purple-200 mb-6">
          Upload your brand assets to ensure consistent branding across all your videos.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logo Upload */}
        <div className="space-y-4">
          <h4 className="text-white font-medium flex items-center">
            <Image className="w-4 h-4 mr-2" />
            Logo
          </h4>
          
          <div
            onClick={() => logoInputRef.current?.click()}
            className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 transition-colors bg-black/20"
          >
            {projectData.brandAssets.logo ? (
              <div className="space-y-2">
                <img
                  src={projectData.brandAssets.logo}
                  alt="Logo"
                  className="max-h-16 mx-auto"
                />
                <p className="text-purple-300 text-sm">Click to change logo</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="w-8 h-8 text-purple-300 mx-auto" />
                <p className="text-white">Upload Logo</p>
                <p className="text-purple-300 text-sm">PNG, JPG, SVG up to 5MB</p>
              </div>
            )}
          </div>
          
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
        </div>
        
        {/* Color Palette */}
        <div className="space-y-4">
          <h4 className="text-white font-medium flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Primary Color
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div
                className="w-12 h-12 rounded-lg border-2 border-white/30"
                style={{ backgroundColor: projectData.brandAssets.primaryColor }}
              ></div>
              <input
                type="color"
                value={projectData.brandAssets.primaryColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-16 h-8 rounded border-none cursor-pointer"
              />
              <span className="text-white font-mono text-sm">
                {projectData.brandAssets.primaryColor}
              </span>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className="w-12 h-12 rounded-lg border-2 border-white/30 hover:border-white/60 transition-colors"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Font Family */}
      <div className="space-y-4">
        <h4 className="text-white font-medium flex items-center">
          <Type className="w-4 h-4 mr-2" />
          Font Family
        </h4>
        
        <select
          value={projectData.brandAssets.fontFamily}
          onChange={(e) => updateProjectData({
            brandAssets: {
              ...projectData.brandAssets,
              fontFamily: e.target.value
            }
          })}
          className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white focus:border-purple-400 focus:outline-none"
        >
          <option value="Inter">Inter (Recommended)</option>
          <option value="Roboto">Roboto</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Poppins">Poppins</option>
          <option value="Helvetica">Helvetica</option>
        </select>
      </div>
      
      {/* Preview */}
      <div className="bg-black/20 rounded-lg p-6 border border-white/10">
        <h4 className="text-white font-medium mb-4">Brand Preview</h4>
        <div
          className="bg-white rounded-lg p-6 text-center"
          style={{
            fontFamily: projectData.brandAssets.fontFamily,
            borderTop: `4px solid ${projectData.brandAssets.primaryColor}`
          }}
        >
          {projectData.brandAssets.logo && (
            <img
              src={projectData.brandAssets.logo}
              alt="Logo"
              className="max-h-12 mx-auto mb-4"
            />
          )}
          <h5 className="text-gray-800 font-semibold text-lg mb-2">
            Your Brand in Action
          </h5>
          <p className="text-gray-600">
            This is how your brand will appear in videos
          </p>
          <div
            className="inline-block px-4 py-2 rounded-lg text-white font-medium mt-4"
            style={{ backgroundColor: projectData.brandAssets.primaryColor }}
          >
            Call to Action
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
        >
          Continue to Templates
        </button>
      </div>
    </div>
  )
}

export default BrandKit