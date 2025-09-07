import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProjectStore = create(
  persist(
    (set, get) => ({
      projects: [],
      currentProject: null,
      
      // Project actions
      createProject: (projectData) => {
        const newProject = {
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...projectData
        }
        
        set((state) => ({
          projects: [...state.projects, newProject],
          currentProject: newProject
        }))
        
        return newProject
      },
      
      updateProject: (projectId, updates) => {
        set((state) => ({
          projects: state.projects.map(project =>
            project.id === projectId
              ? { ...project, ...updates, updatedAt: new Date().toISOString() }
              : project
          ),
          currentProject: state.currentProject?.id === projectId
            ? { ...state.currentProject, ...updates, updatedAt: new Date().toISOString() }
            : state.currentProject
        }))
      },
      
      deleteProject: (projectId) => {
        set((state) => ({
          projects: state.projects.filter(project => project.id !== projectId),
          currentProject: state.currentProject?.id === projectId ? null : state.currentProject
        }))
      },
      
      setCurrentProject: (project) => {
        set({ currentProject: project })
      },
      
      clearCurrentProject: () => {
        set({ currentProject: null })
      },
      
      getProjectById: (projectId) => {
        return get().projects.find(project => project.id === projectId)
      }
    }),
    {
      name: 'videocraft-projects',
      partialize: (state) => ({
        projects: state.projects,
        currentProject: state.currentProject
      })
    }
  )
)

export default useProjectStore
