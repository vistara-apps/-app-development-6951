import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      subscriptionTier: 'free',
      
      // Auth actions
      login: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
          subscriptionTier: userData.subscriptionTier || 'free'
        })
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          subscriptionTier: 'free'
        })
      },
      
      updateSubscription: (tier) => {
        set((state) => ({
          user: { ...state.user, subscriptionTier: tier },
          subscriptionTier: tier
        }))
      },
      
      updateUser: (updates) => {
        set((state) => ({
          user: { ...state.user, ...updates }
        }))
      }
    }),
    {
      name: 'videocraft-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        subscriptionTier: state.subscriptionTier
      })
    }
  )
)

export default useAuthStore
