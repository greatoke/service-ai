import { auth } from "@/auth"

export default async function Dashboard() {
  const session = await auth()
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome, {session?.user?.name || 'User'}!</h1>
        <p className="text-gray-600 dark:text-gray-300">
          This is your dashboard. You can manage your Service AI resources from here.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Your Chatbots</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Manage your AI chatbots and analyze their performance.</p>
          <div className="text-blue-600 dark:text-blue-400">0 active chatbots</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Your Data</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Upload and manage the data sources for your chatbots.</p>
          <div className="text-blue-600 dark:text-blue-400">0 documents uploaded</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Analytics</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">View usage statistics and performance metrics.</p>
          <div className="text-blue-600 dark:text-blue-400">No data available</div>
        </div>
      </div>
    </div>
  )
}