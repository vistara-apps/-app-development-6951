import React, { useState, useEffect } from 'react'
import { X, Check, Crown, Zap, Users, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuthStore from '../../store/authStore'
import { subscriptionAPI } from '../../services/api'

const PricingModal = ({ isOpen, onClose }) => {
  const [plans, setPlans] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const { user, subscriptionTier, updateSubscription } = useAuthStore()

  useEffect(() => {
    if (isOpen) {
      loadPlans()
    }
  }, [isOpen])

  const loadPlans = async () => {
    try {
      const response = await subscriptionAPI.getPlans()
      setPlans(response.data)
    } catch (error) {
      toast.error('Failed to load pricing plans')
    }
  }

  const handleUpgrade = async (planId) => {
    if (!user) {
      toast.error('Please sign in to upgrade your plan')
      return
    }

    if (planId === 'free') {
      updateSubscription('free')
      toast.success('Switched to Free plan')
      onClose()
      return
    }

    setIsLoading(true)
    setSelectedPlan(planId)

    try {
      await subscriptionAPI.createCheckoutSession(planId)
      
      // In a real implementation, redirect to Stripe Checkout
      // window.location.href = response.data.url
      
      // Mock successful upgrade
      setTimeout(() => {
        updateSubscription(planId)
        toast.success(`Successfully upgraded to ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan!`)
        setIsLoading(false)
        setSelectedPlan(null)
        onClose()
      }, 2000)
      
    } catch (error) {
      toast.error('Failed to process upgrade')
      setIsLoading(false)
      setSelectedPlan(null)
    }
  }

  const getPlanIcon = (planId) => {
    switch (planId) {
      case 'free':
        return <Zap className="w-6 h-6" />
      case 'pro':
        return <Crown className="w-6 h-6" />
      case 'agency':
        return <Users className="w-6 h-6" />
      default:
        return <Zap className="w-6 h-6" />
    }
  }

  const getPlanColor = (planId) => {
    switch (planId) {
      case 'free':
        return 'text-blue-400'
      case 'pro':
        return 'text-purple-400'
      case 'agency':
        return 'text-orange-400'
      default:
        return 'text-blue-400'
    }
  }

  const isCurrentPlan = (planId) => {
    return subscriptionTier === planId
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-card border border-white/20 rounded-xl max-w-4xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Choose Your Plan</h2>
          <p className="text-purple-200">
            Unlock the full potential of VideoCraft Pro with our flexible pricing options
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-black/20 border rounded-xl p-6 transition-all duration-300 ${
                plan.id === 'pro' 
                  ? 'border-purple-400 scale-105 shadow-lg shadow-purple-400/20' 
                  : 'border-white/20 hover:border-white/40'
              } ${isCurrentPlan(plan.id) ? 'ring-2 ring-green-400' : ''}`}
            >
              {plan.id === 'pro' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {isCurrentPlan(plan.id) && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4 ${getPlanColor(plan.id)}`}>
                  {getPlanIcon(plan.id)}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">${plan.price}</span>
                  {plan.price > 0 && <span className="text-purple-200">/month</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-purple-100">
                    <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={isLoading || isCurrentPlan(plan.id)}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isCurrentPlan(plan.id)
                    ? 'bg-green-600 text-white cursor-default'
                    : plan.id === 'pro'
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading && selectedPlan === plan.id ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : isCurrentPlan(plan.id) ? (
                  <span>Current Plan</span>
                ) : (
                  <span>
                    {plan.price === 0 ? 'Get Started' : 'Upgrade Now'}
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-purple-200 text-sm mb-4">
            All plans include a 7-day free trial. Cancel anytime.
          </p>
          <div className="flex justify-center space-x-6 text-xs text-purple-300">
            <span>✓ Secure payments via Stripe</span>
            <span>✓ No setup fees</span>
            <span>✓ 24/7 support</span>
          </div>
        </div>

        {!user && (
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-200 text-center">
              Please sign in to upgrade your subscription plan
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PricingModal
