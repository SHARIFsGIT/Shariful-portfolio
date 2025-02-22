import {
  IconArrowNarrowRight,
  IconBrandDjango,
  IconBrandVue,
  IconCode,
  IconDatabase,
  IconSearch,
  IconTool,
  IconX
} from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useMemo, useRef, useState } from 'react'

// Backend components (to be imported from respective files)
import { Backend } from './backend'
import { Database } from './database'
import { Frontend } from './frontend'
import { Languages } from './languages'
import { Tools } from './tools'

// Define a more comprehensive skill type
interface Skill {
  id: string
  name: string
  category: string
  description: string
  tags: string[]
}

// Create a type guard for icons
type IconComponent = React.ComponentType<{
  className?: string
  stroke?: number
  size?: number
}> & {
  displayName?: string
}

// Comprehensive skill categories
interface SkillCategory {
  id: string
  label: string
  icon: IconComponent
  component: React.FC
  skills: Skill[]
}

// Mock skill data (replace with your actual skills)
const allSkills: Skill[] = [
  // Languages
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    description: 'High-level, interpreted programming language',
    tags: ['scripting', 'backend', 'data science'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'languages',
    description: 'Typed superset of JavaScript',
    tags: ['frontend', 'strongly typed', 'javascript'],
  },
  // Add more skills...
]

// Skill categories configuration
const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    icon: IconCode,
    component: Languages,
    skills: allSkills.filter((skill) => skill.category === 'languages'),
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: IconBrandVue,
    component: Frontend,
    skills: allSkills.filter((skill) => skill.category === 'frontend'),
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: IconBrandDjango,
    component: Backend,
    skills: allSkills.filter((skill) => skill.category === 'backend'),
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: IconDatabase,
    component: Database,
    skills: allSkills.filter((skill) => skill.category === 'databases'),
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: IconTool,
    component: Tools,
    skills: allSkills.filter((skill) => skill.category === 'tools'),
  },
]

// Animation variants
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
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Comprehensive search functionality
  const searchResults = useMemo(() => {
    if (!searchQuery) return []

    const query = searchQuery.toLowerCase().trim()
    return allSkills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query) ||
        skill.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  }, [searchQuery])

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  const ActiveComponent =
    skillCategories.find((cat) => cat.id === activeTab)?.component || Languages

  const handleSearchClose = () => {
    setIsSearchOpen(false)
    setSearchQuery('')
  }

  return (
    <div className="grid h-screen grid-cols-[280px,1fr] bg-gray-50 dark:bg-gray-900">
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
            className="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-gray-600 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
          >
            <span>Search skills...</span>
            <IconSearch className="text-gray-400" size={20} />
          </button>
        </div>

        {/* Category List */}
        <nav className="space-y-2 p-4">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleTabChange(category.id)}
              className={`group flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
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

      {/* Advanced Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-20"
            onClick={handleSearchClose}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-2xl rounded-lg bg-white shadow-xl dark:bg-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              <div className="relative p-4">
                <IconSearch
                  className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search skills, technologies, tools..."
                  className="focus:ring-primary-500 w-full rounded-lg border-none bg-gray-100 py-2 pl-10 pr-12 text-lg text-gray-900 focus:ring-2 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <IconX size={20} />
                  </button>
                )}
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto border-t border-gray-200 p-4 dark:border-gray-700">
                {searchQuery && searchResults.length > 0 ? (
                  <ul className="space-y-2">
                    {searchResults.map((skill) => (
                      <li
                        key={skill.id}
                        className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                            {skill.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {skill.description}
                          </p>
                          <div className="mt-1 flex gap-2">
                            {skill.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <IconArrowNarrowRight
                          className="hover:text-primary-500 text-gray-400"
                          size={24}
                        />
                      </li>
                    ))}
                  </ul>
                ) : searchQuery ? (
                  <div className="py-4 text-center text-gray-500 dark:text-gray-400">
                    No skills found matching &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    Start typing to search across all skills...
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
