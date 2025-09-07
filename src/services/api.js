import axios from 'axios'
import OpenAI from 'openai'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Initialize OpenAI client
const openai = OPENAI_API_KEY ? new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
}) : null

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('videocraft-auth')
  if (token) {
    const authData = JSON.parse(token)
    if (authData.state?.user?.token) {
      config.headers.Authorization = `Bearer ${authData.state.user.token}`
    }
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('videocraft-auth')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: async (email, _password) => {
    // Mock implementation - replace with real API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: '1',
              email,
              name: email.split('@')[0],
              subscriptionTier: 'free',
              token: 'mock-jwt-token'
            }
          }
        })
      }, 1000)
    })
  },
  
  register: async (name, email, _password) => {
    // Mock implementation - replace with real API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: Date.now().toString(),
              email,
              name,
              subscriptionTier: 'free',
              token: 'mock-jwt-token'
            }
          }
        })
      }, 1000)
    })
  },
  
  logout: async () => {
    return api.post('/auth/logout')
  }
}

// AI API
export const aiAPI = {
  generateScript: async (content, options = {}) => {
    if (!openai) {
      // Fallback mock implementation
      return new Promise((resolve) => {
        setTimeout(() => {
          const words = content.split(' ')
          const hook = words.slice(0, 8).join(' ')
          
          resolve({
            script: `Scene 1: Hook (0-3s)
"${hook}... Let me show you why this matters."

Scene 2: Problem (3-15s)
Many people struggle with this exact challenge. Here's the real issue and why it's holding you back.

Scene 3: Solution (15-35s)
${content.split('.')[0]}. This approach changes everything.

Scene 4: Benefits (35-50s)
By implementing this solution, you'll see immediate improvements and long-term success.

Scene 5: Call to Action (50-60s)
Ready to transform your results? Take the first step today!`,
            scenes: [
              { timestamp: 0, duration: 3, type: 'hook', content: `${hook}... Let me show you why this matters.` },
              { timestamp: 3, duration: 12, type: 'problem', content: 'Many people struggle with this exact challenge.' },
              { timestamp: 15, duration: 20, type: 'solution', content: content.split('.')[0] },
              { timestamp: 35, duration: 15, type: 'benefits', content: 'By implementing this solution, you\'ll see results.' },
              { timestamp: 50, duration: 10, type: 'cta', content: 'Ready to transform your results? Take action today!' }
            ]
          })
        }, 2000)
      })
    }
    
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional video script writer. Create engaging, structured video scripts optimized for social media. Format the response as a JSON object with "script" and "scenes" properties.'
          },
          {
            role: 'user',
            content: `Create a 60-second video script based on this content: "${content}". Include 5 scenes: Hook (0-3s), Problem (3-15s), Solution (15-35s), Benefits (35-50s), and CTA (50-60s). ${options.platform ? `Optimize for ${options.platform}.` : ''}`
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
      
      const result = JSON.parse(response.choices[0].message.content)
      return result
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw new Error('Failed to generate script')
    }
  }
}

// Storage API
export const storageAPI = {
  uploadFile: async (file, _type = 'asset') => {
    // Mock implementation - replace with real cloud storage
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUrl = URL.createObjectURL(file)
        resolve({
          url: mockUrl,
          filename: file.name,
          size: file.size,
          type: file.type
        })
      }, 1500)
    })
  },
  
  deleteFile: async (_fileUrl) => {
    // Mock implementation
    return Promise.resolve({ success: true })
  }
}

// Projects API
export const projectsAPI = {
  getProjects: async () => {
    return api.get('/projects')
  },
  
  createProject: async (projectData) => {
    return api.post('/projects', projectData)
  },
  
  updateProject: async (projectId, updates) => {
    return api.put(`/projects/${projectId}`, updates)
  },
  
  deleteProject: async (projectId) => {
    return api.delete(`/projects/${projectId}`)
  }
}

// Subscription API
export const subscriptionAPI = {
  getPlans: async () => {
    return {
      data: [
        {
          id: 'free',
          name: 'Free',
          price: 0,
          features: ['1 video export per month', 'Basic templates', 'Watermark included'],
          limits: { exports: 1, templates: 5 }
        },
        {
          id: 'pro',
          name: 'Pro',
          price: 29,
          features: ['10 video exports per month', 'Premium templates', 'Brand kit', 'No watermark'],
          limits: { exports: 10, templates: 50 }
        },
        {
          id: 'agency',
          name: 'Agency',
          price: 99,
          features: ['50 video exports per month', 'All templates', 'Team features', 'Priority support'],
          limits: { exports: 50, templates: 'unlimited' }
        }
      ]
    }
  },
  
  createCheckoutSession: async (planId) => {
    // Mock implementation - replace with Stripe integration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            url: `https://checkout.stripe.com/pay/mock-session-${planId}`
          }
        })
      }, 1000)
    })
  }
}

export default api
