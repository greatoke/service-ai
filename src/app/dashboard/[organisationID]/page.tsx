"use client"

import { useEffect } from "react"
import { auth } from "@/auth"
import { 
  BarChart4, 
  Users, 
  MessageSquare, 
  FileText, 
  ArrowUpRight, 
  TrendingUp,
  Activity,
  BarChart,
  LineChart,
  PieChart
} from "lucide-react"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"

export default function Dashboard() {
  const { data: session } = useSession()
  
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, {session?.user?.name || 'User'}!</h1>
            <p className="text-gray-600 dark:text-gray-300">
              This is your dashboard. You can manage your Service AI resources from here.
            </p>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="col-span-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Activity Overview</h2>
            </div>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          
          <div className="h-[240px] w-full relative">
            <div className="absolute inset-0 flex items-end justify-between px-2">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-sm w-[8px]"
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.random() * 100 + 20}px` }}
                  transition={{ 
                    duration: 1, 
                    delay: i * 0.02,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200 dark:bg-gray-700" />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <MessageSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chatbots</h2>
            </div>
            <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium">0 active</span>
          </div>
          
          <div className="mt-4 space-y-4">
            <div className="flex justify-center items-center h-[140px]">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative w-32 h-32"
              >
                <div className="absolute inset-0 rounded-full border-8 border-indigo-100 dark:border-indigo-900/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">0</span>
                </div>
              </motion.div>
            </div>
            
            <button className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-sm hover:shadow flex items-center justify-center gap-2">
              <span>Create Chatbot</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Documents</h2>
            </div>
            <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-medium">0 files</span>
          </div>
          
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-2 h-[140px]">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                  className="bg-emerald-50 dark:bg-emerald-900/10 rounded-lg p-3 flex flex-col items-center justify-center"
                >
                  <FileText className="h-6 w-6 text-emerald-400 dark:text-emerald-500 mb-2 opacity-40" />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 opacity-60">Empty</span>
                </motion.div>
              ))}
            </div>
            
            <button className="w-full py-2 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition-all shadow-sm hover:shadow flex items-center justify-center gap-2">
              <span>Upload Document</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <BarChart className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Analytics</h2>
            </div>
            <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full text-sm font-medium">
              <TrendingUp className="h-4 w-4 inline" />
            </span>
          </div>
          
          <div className="mt-4 space-y-4">
            <div className="flex justify-center items-center h-[140px]">
              <div className="flex gap-2 items-end justify-center w-full">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: i === 6 ? '20px' : `${(i + 1) * 10}px` }}
                      transition={{ duration: 0.7, delay: 0.6 + (i * 0.1), ease: "easeOut" }}
                      className="w-6 rounded-t-sm bg-gradient-to-t from-amber-500 to-amber-300 dark:from-amber-600 dark:to-amber-400"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{day}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="w-full py-2 px-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg transition-all shadow-sm hover:shadow flex items-center justify-center gap-2">
              <span>View Analytics</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Usage Metrics</h2>
            </div>
            <select className="text-sm bg-transparent border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400">
              <option>This Week</option>
              <option>This Month</option>
              <option>All Time</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {['API Calls', 'Token Usage', 'Response Time'].map((metric, i) => (
              <div key={metric} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{metric}</span>
                  <span className="font-medium text-gray-900 dark:text-white">0</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 1, delay: 0.8 + (i * 0.2) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'New Chatbot', icon: <MessageSquare className="h-5 w-5" />, color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' },
              { name: 'Upload Document', icon: <FileText className="h-5 w-5" />, color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
              { name: 'Team Settings', icon: <Users className="h-5 w-5" />, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
              { name: 'View Analytics', icon: <BarChart className="h-5 w-5" />, color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' },
            ].map((action, i) => (
              <motion.button
                key={action.name}
                className={`${action.color} p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all text-sm font-medium`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.9 + (i * 0.1) }}
              >
                {action.icon}
                <span>{action.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}