"use client"

import { useState, useActionState} from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Building, 
  Users, 
  CheckCircle2, 
  Upload, 
  ArrowRight,
  Globe,
  Briefcase,
  Grid3X3,
  X
} from 'lucide-react'
import { createOrganization } from '@/actions/organisation'
import { Input } from './input'
import FormError from './form-error'

interface OrgSizeOption {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

interface OrgIndustryOption {
  id: string
  name: string
  icon: React.ReactNode
}

export default function CreateOrganizationForm() {
  const [state, formAction, isPending] = useActionState(createOrganization, null)
  const [step, setStep] = useState(1)
  const [orgData, setOrgData] = useState({
    name: '',
    size: '',
    industry: '',
    logo: "",
    description: ''
  })
  
  const sizeOptions: OrgSizeOption[] = [
    { id: '1-10', name: '1-10 employees', icon: <Users size={20} />, description: 'Small team or startup' },
    { id: '11-50', name: '11-50 employees', icon: <Users size={20} />, description: 'Growing business' },
    { id: '51-200', name: '51-200 employees', icon: <Users size={20} />, description: 'Medium-sized company' },
    { id: '201-1000', name: '201-1000 employees', icon: <Building size={20} />, description: 'Large organization' },
    { id: '1000+', name: '1000+ employees', icon: <Building size={20} />, description: 'Enterprise' },
  ]
  
  const industryOptions: OrgIndustryOption[] = [
    { id: 'technology', name: 'Technology', icon: <Grid3X3 size={20} /> },
    { id: 'finance', name: 'Finance', icon: <Briefcase size={20} /> },
    { id: 'healthcare', name: 'Healthcare', icon: <Users size={20} /> },
    { id: 'education', name: 'Education', icon: <Users size={20} /> },
    { id: 'retail', name: 'Retail', icon: <Briefcase size={20} /> },
    { id: 'manufacturing', name: 'Manufacturing', icon: <Building size={20} /> },
    { id: 'other', name: 'Other', icon: <Globe size={20} /> },
  ]
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setOrgData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSizeSelect = (size: string) => {
    setOrgData(prev => ({ ...prev, size }))
  }
  
  const handleIndustrySelect = (industry: string) => {
    setOrgData(prev => ({ ...prev, industry }))
  }
  
  const handleSubmit = (_: FormData) => {
    console.log("handleSubmit")
    console.log("orgData", orgData)

    const formData = new FormData()
    formData.append('name', orgData.name)
    formData.append('size', orgData.size)
    formData.append('industry', orgData.industry)
    // formData.append('description', orgData.description || "")
    formData.append('logo', "")

    formAction(formData)
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Your Organization</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 ml-16">
            To begin using the Service AI platform, you first need to create an organization
          </p>
        </div>
        
        <div className="p-6 md:p-8">
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-8 relative">
            <div className="absolute left-0 right-0 top-[15px] h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
            
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition-colors ${
                    step >= s 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
                </div>
                <span className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                  {s === 1 ? 'Basics' : s === 2 ? 'Details' : 'Review'}
                </span>
              </div>
            ))}
          </div>
          
          <form action={handleSubmit}>
            {/* Step 1: Organization Name */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="org-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Organization Name
                  </label>
                  <Input 
                    id="org-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your organization name"
                    value={orgData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Organization Size
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sizeOptions.map((option, index) => (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          orgData.size === option.id
                            ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                        }`}
                        onClick={() => handleSizeSelect(option.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            orgData.size === option.id
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                          }`}>
                            {option.icon}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {option.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {option.description}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Step 2: Organization Details */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Industry
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {industryOptions.map((option, index) => (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className={`border rounded-lg p-3 cursor-pointer transition-all text-center ${
                          orgData.industry === option.id
                            ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                        }`}
                        onClick={() => handleIndustrySelect(option.id)}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className={`p-2 rounded-lg ${
                            orgData.industry === option.id
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                          }`}>
                            {option.icon}
                          </div>
                          <div className="font-medium text-sm text-gray-900 dark:text-white">
                            {option.name}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="org-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Organization Description (Optional)
                  </label>
                  <textarea 
                    id="org-description"
                    name="description"
                    rows={3}
                    placeholder="Briefly describe your organization and how you plan to use Service AI"
                    value={orgData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Organization Logo (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                    <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                      <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Drag and drop your logo or click to browse
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      PNG, JPG or SVG (max. 2MB)
                    </p>
                    <button 
                      type="button"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Select File</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Step 3: Confirmation */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Organization Summary</h3>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Name</div>
                      <div className="font-medium text-gray-900 dark:text-white">{orgData.name}</div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Size</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {sizeOptions.find(opt => opt.id === orgData.size)?.name || 'Not specified'}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Industry</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {industryOptions.find(opt => opt.id === orgData.industry)?.name || 'Not specified'}
                      </div>
                    </div>
                    
                    {orgData.description && (
                      <div className="space-y-2 pt-2">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Description</div>
                        <div className="text-sm text-gray-900 dark:text-white">
                          {orgData.description}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
                  <div className="flex gap-3">
                    <div className="text-blue-600 dark:text-blue-400 mt-0.5">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 dark:text-blue-300">You're almost there!</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                        After creating your organization, you'll be able to invite team members and start using Service AI.
                      </p>
                    </div>
                  </div>
                </div>

                <FormError error={state?.error} />
              </motion.div>
            )}
            
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button 
                type="button"
                onClick={() => step > 1 ? setStep(step - 1) : null}
                disabled={step === 1}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  step === 1
                    ? 'text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Back
              </button>
              
              {step < 3 ? (
                <button 
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && (!orgData.name || !orgData.size) || step === 2 && !orgData.industry}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    (step === 1 && (!orgData.name || !orgData.size)) || (step === 2 && !orgData.industry)
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm hover:shadow'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button 
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <>
                      <span>Creating...</span>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>Create Organization</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
} 