import React, { createContext, useContext } from 'react'

const TabsContext = createContext()

export const Tabs = ({ value, onValueChange, children, className = '' }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export const TabsList = ({ children, className = '' }) => {
  return (
    <div className={`flex ${className}`}>
      {children}
    </div>
  )
}

export const TabsTrigger = ({ value, children, className = '' }) => {
  const { value: activeValue, onValueChange } = useContext(TabsContext)
  const isActive = activeValue === value
  
  return (
    <button
      onClick={() => onValueChange(value)}
      className={`px-4 py-2 rounded-md transition-all duration-200 ${className} ${
        isActive ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
      data-state={isActive ? 'active' : 'inactive'}
    >
      {children}
    </button>
  )
}

export const TabsContent = ({ value, children, className = '' }) => {
  const { value: activeValue } = useContext(TabsContext)
  
  if (activeValue !== value) return null
  
  return (
    <div className={`animate-fade-in ${className}`}>
      {children}
    </div>
  )
}