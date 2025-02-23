import {
  IconArrowNarrowRight,
  IconBrandReact,
  IconBrandWindows,
  IconCode,
  IconRobot,
  IconSearch,
  IconServer,
  IconTool,
  IconX,
} from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useMemo, useRef, useState } from 'react'

// Import components
import CircuitDesign from './circuit-design'
import OperatingSystems from './operating-systems'
import { Languages } from './programming'
import Robotics from './robotics'
import Backend from './software-development'
import Tools from './tools'
import Frontend from './web-development'

// Define skill type
interface Skill {
  id: string
  name: string
  category:
    | 'os'
    | 'programming'
    | 'robotics'
    | 'software'
    | 'web'
    | 'circuit'
    | 'tools'
  description: string
  tags: string[]
}

// Icon component type
type IconComponent = React.ComponentType<{
  className?: string
  stroke?: number
  size?: number
}> & {
  displayName?: string
}

// Skill category interface
interface SkillCategory {
  id: string
  label: string
  icon: IconComponent
  component: React.FC
  skills: Skill[]
}

// Sample skills data
const allSkills: Skill[] = [
  // OS Skills
  {
    id: 'windows',
    name: 'Windows',
    category: 'os',
    description: 'Windows system administration',
    tags: ['system', 'administration', 'windows'],
  },
  {
    id: 'linux',
    name: 'Linux',
    category: 'os',
    description: 'Linux system management',
    tags: ['system', 'unix', 'bash'],
  },
  // Programming Languages
  {
    id: 'c',
    name: 'C',
    category: 'programming',
    description: 'Systems programming language',
    tags: ['systems', 'low-level', 'performance'],
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'programming',
    description: 'Object-oriented systems programming',
    tags: ['oop', 'systems', 'performance'],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'programming',
    description: 'High-level programming language',
    tags: ['scripting', 'automation', 'data-science'],
  },
  // Add similar entries for other categories...
]

// Updated skill categories configuration
const skillCategories: SkillCategory[] = [
  {
    id: 'os',
    label: 'Operating Systems',
    icon: IconBrandWindows,
    component: OperatingSystems,
    skills: allSkills.filter((skill) => skill.category === 'os'),
  },
  {
    id: 'programming',
    label: 'Programming',
    icon: IconCode,
    component: Languages,
    skills: allSkills.filter((skill) => skill.category === 'programming'),
  },
  {
    id: 'robotics',
    label: 'Robotics',
    icon: IconRobot,
    component: Robotics,
    skills: allSkills.filter((skill) => skill.category === 'robotics'),
  },
  {
    id: 'software',
    label: 'Software Development',
    icon: IconServer,
    component: Backend,
    skills: allSkills.filter((skill) => skill.category === 'software'),
  },
  {
    id: 'web',
    label: 'Web Development',
    icon: IconBrandReact,
    component: Frontend,
    skills: allSkills.filter((skill) => skill.category === 'web'),
  },
  {
    id: 'circuit',
    label: 'Circuit Design',
    icon: IconTool,
    component: CircuitDesign,
    skills: allSkills.filter((skill) => skill.category === 'circuit'),
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
  const [activeTab, setActiveTab] = useState<string>('os')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Search functionality
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
    skillCategories.find((cat) => cat.id === activeTab)?.component ||
    OperatingSystems

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
                  ? 'text-primary-600 bg-gradient-to-r from-green-100 to-orange-50 dark:from-blue-100 dark:to-gray-300 dark:text-black'
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

export default Skill
