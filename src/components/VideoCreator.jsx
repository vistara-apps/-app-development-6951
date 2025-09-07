import React, { useState } from 'react'
import TextInput from './creator/TextInput'
import BrandKit from './creator/BrandKit'
import TemplateSelector from './creator/TemplateSelector'
import VideoPreview from './creator/VideoPreview'
import ExportSettings from './creator/ExportSettings'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/Tabs'

const VideoCreator = () => {
  const [activeTab, setActiveTab] = useState('script')
  const [projectData, setProjectData] = useState({
    title: '',
    scriptContent: '',
    brandAssets: {
      logo: null,
      primaryColor: '#9c73ff',
      fontFamily: 'Inter'
    },
    selectedTemplate: null,
    videoSettings: {
      format: '16:9',
      platform: 'youtube',
      duration: 60
    },
    generatedScript: '',
    videoPreview: null
  })

  const updateProjectData = (updates) => {
    setProjectData(prev => ({ ...prev, ...updates }))
  }

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-card rounded-xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white mb-2">Create Your Video</h2>
            <p className="text-purple-200">Transform your content into engaging videos</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-black/20 p-1 m-6 rounded-lg">
              <TabsTrigger value="script" className="text-white data-[state=active]:bg-white/20">
                1. Script
              </TabsTrigger>
              <TabsTrigger value="brand" className="text-white data-[state=active]:bg-white/20">
                2. Brand
              </TabsTrigger>
              <TabsTrigger value="template" className="text-white data-[state=active]:bg-white/20">
                3. Template
              </TabsTrigger>
              <TabsTrigger value="preview" className="text-white data-[state=active]:bg-white/20">
                4. Preview
              </TabsTrigger>
              <TabsTrigger value="export" className="text-white data-[state=active]:bg-white/20">
                5. Export
              </TabsTrigger>
            </TabsList>
            
            <div className="p-6">
              <TabsContent value="script" className="mt-0">
                <TextInput 
                  projectData={projectData}
                  updateProjectData={updateProjectData}
                  onNext={() => setActiveTab('brand')}
                />
              </TabsContent>
              
              <TabsContent value="brand" className="mt-0">
                <BrandKit 
                  projectData={projectData}
                  updateProjectData={updateProjectData}
                  onNext={() => setActiveTab('template')}
                />
              </TabsContent>
              
              <TabsContent value="template" className="mt-0">
                <TemplateSelector 
                  projectData={projectData}
                  updateProjectData={updateProjectData}
                  onNext={() => setActiveTab('preview')}
                />
              </TabsContent>
              
              <TabsContent value="preview" className="mt-0">
                <VideoPreview 
                  projectData={projectData}
                  updateProjectData={updateProjectData}
                  onNext={() => setActiveTab('export')}
                />
              </TabsContent>
              
              <TabsContent value="export" className="mt-0">
                <ExportSettings 
                  projectData={projectData}
                  updateProjectData={updateProjectData}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

export default VideoCreator