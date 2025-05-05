"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  AlertCircle,
  X,
  Bot,
  Settings,
  ChevronRight,
  Check,
  ArrowRight,
  FileText
} from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function ChatbotsPage() {
  const { data: session } = useSession()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [createStep, setCreateStep] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Dummy data - would be replaced with actual API fetch
  const chatbots: any[] = [
    // This would be populated from your database
  ]
  
  // Demo model options for create form
  const modelOptions = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Most advanced model with broader knowledge and stronger reasoning', icon: '🧠' },
    { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', description: 'Efficient model with good balance of intelligence and speed', icon: '⚡' },
    { id: 'claude-3', name: 'Claude 3', description: 'Excellent at following instructions with strong safety features', icon: '🔍' },
  ]

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chatbots</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Create and manage your AI assistants
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search chatbots..." 
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 w-full md:w-60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all shadow-sm hover:shadow"
          >
            <Plus className="h-4 w-4" />
            <span>New Chatbot</span>
          </button>
        </div>
      </motion.div>
      
      {chatbots.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center"
        >
          <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No chatbots yet</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            Create your first AI assistant to help with customer support, lead generation, or information retrieval.
          </p>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all shadow-sm hover:shadow"
          >
            <Plus className="h-4 w-4" />
            <span>Create First Chatbot</span>
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatbots.map((chatbot, index) => (
            <motion.div 
              key={chatbot.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{chatbot.name}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Created {chatbot.createdAt}</span>
                    </div>
                  </div>
                  <div className="relative">
                    <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                      <MoreHorizontal className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </button>
                    {/* Dropdown menu would go here */}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{chatbot.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${chatbot.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {chatbot.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {chatbot.messagesCount} messages
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-between">
                <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium">
                  Settings
                </button>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                  Open Chat
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Create New Chatbot Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full mx-4 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create New Chatbot</h2>
                <button 
                  onClick={() => {
                    setIsCreateModalOpen(false)
                    setCreateStep(1)
                  }}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              <div className="p-6">
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-8 relative">
                  <div className="absolute left-0 right-0 top-[15px] h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
                  
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex flex-col items-center">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition-colors ${
                          createStep >= step 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {createStep > step ? <Check className="h-4 w-4" /> : step}
                      </div>
                      <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                        {step === 1 ? 'Basics' : step === 2 ? 'Model' : 'Knowledge'}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Step 1: Basic Information */}
                {createStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Chatbot Name
                      </label>
                      <input 
                        type="text"
                        placeholder="E.g., Customer Support Assistant"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea 
                        placeholder="Describe what this chatbot does..."
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Category
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                        <option value="customer-support">Customer Support</option>
                        <option value="sales">Sales & Marketing</option>
                        <option value="knowledge-base">Knowledge Base</option>
                        <option value="lead-generation">Lead Generation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 2: Model Selection */}
                {createStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Select the AI model that powers your chatbot. Different models have different capabilities and costs.
                    </p>
                    
                    <div className="space-y-3">
                      {modelOptions.map((model, index) => (
                        <motion.div
                          key={model.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.1 }}
                          className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-2xl">
                              {model.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 dark:text-white">{model.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {model.description}
                              </p>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600">
                              {/* Selected indicator would go here */}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* Step 3: Knowledge Base */}
                {createStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Add knowledge sources that your chatbot will use to answer questions.
                    </p>
                    
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                      <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                        <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Upload Knowledge Sources</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        Drag and drop files or click to browse. Supports PDF, DOCX, TXT, and more.
                      </p>
                      <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Plus className="h-4 w-4" />
                        <span>Add Files</span>
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-2">Or configure later</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        You can also add knowledge sources after creating your chatbot.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <button
                  onClick={() => {
                    if (createStep > 1) {
                      setCreateStep(createStep - 1)
                    } else {
                      setIsCreateModalOpen(false)
                    }
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {createStep === 1 ? 'Cancel' : 'Back'}
                </button>
                
                <button
                  onClick={() => {
                    if (createStep < 3) {
                      setCreateStep(createStep + 1)
                    } else {
                      // Submit form logic would go here
                      setIsCreateModalOpen(false)
                      setCreateStep(1)
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all shadow-sm hover:shadow"
                >
                  <span>{createStep === 3 ? 'Create Chatbot' : 'Continue'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}