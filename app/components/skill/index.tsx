import {
  IconBrandDjango,
  IconBrandVue,
  IconCode,
  IconDatabase,
  IconTool,
} from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Backend } from './backend'
import { Database } from './database'
import { Frontend } from './frontend'
import { Languages } from './languages'
import { Tools } from './tools'

interface SkillCategory {
  id: string
  label: string
  icon: typeof IconCode
  component: React.FC
}

const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    icon: IconCode,
    component: Languages,
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: IconBrandVue,
    component: Frontend,
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: IconBrandDjango,
    component: Backend,
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: IconDatabase,
    component: Database,
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: IconTool,
    component: Tools,
  },
]

const sidebarVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const contentVariants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

export function Skill() {
  const [activeTab, setActiveTab] = useState<string>('languages')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  const ActiveComponent =
    skillCategories.find((cat) => cat.id === activeTab)?.component || Languages

  return (
    <div className="grid h-full grid-cols-[280px,1fr] bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.div
        className="relative max-h-full overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Search Bar */}
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          <button
            onClick={() => {
              setIsSearchOpen(true)
              setTimeout(() => searchInputRef.current?.focus(), 100)
            }}
            className="w-full rounded-lg bg-gray-100 px-4 py-2 text-left text-gray-600 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
          >
            Search skills...
          </button>
        </div>

        {/* Category List */}
        <nav className="space-y-2 p-4">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleTabChange(category.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                activeTab === category.id
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              } `}
            >
              <category.icon
                className={`size-5 ${activeTab === category.id ? 'text-primary-500' : 'text-gray-400'}`}
                stroke={2}
              />
              <div className="flex flex-col items-start">
                <span className="font-medium">{category.label}</span>
              </div>
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="max-h-full overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search skills, technologies, tools..."
                  className="w-full border-none bg-transparent px-4 py-2 text-lg text-gray-900 placeholder-gray-400 focus:ring-0 dark:text-gray-100"
                  autoFocus
                />
              </div>
              <div className="max-h-96 overflow-y-auto border-t border-gray-200 p-4 dark:border-gray-700">
                {/* Search results would go here */}
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Start typing to search across all skills...
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
