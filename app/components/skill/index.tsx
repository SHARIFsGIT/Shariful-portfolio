import {
  IconBinary,
  IconBrandHtml5,
  IconDeviceDesktop,
  IconDeviceDesktopAnalytics,
  IconProps,
  IconRobot,
  IconSearch,
  IconServer,
  IconTools,
  IconX,
} from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useMemo, useRef, useState } from 'react'

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
type IconComponent = React.ComponentType<IconProps>

// Skill category interface
interface SkillCategory {
  id: string
  label: string
  icon: IconComponent
  component: React.ComponentType
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
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'programming',
    description: 'Dynamic web development and full-stack applications',
    tags: ['web', 'frontend', 'scripting', 'dom'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'programming',
    description: 'Statically typed JavaScript for large-scale applications',
    tags: ['web', 'frontend', 'type-safety', 'enterprise'],
  },
  // Web Development Skills
  {
    id: 'react',
    name: 'React',
    category: 'web',
    description: 'Modern JavaScript library for building user interfaces',
    tags: ['frontend', 'ui', 'component-based', 'hooks'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'web',
    description: 'React framework for production applications',
    tags: ['frontend', 'ssr', 'fullstack', 'api-routes'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'web',
    description: 'Utility-first CSS framework for rapid UI development',
    tags: ['frontend', 'styling', 'responsive', 'design-system'],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'web',
    description: 'JavaScript runtime for server-side development',
    tags: ['backend', 'javascript', 'server', 'api'],
  },
  // Database Skills
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'software',
    description: 'NoSQL database for scalable applications',
    tags: ['database', 'nosql', 'document', 'json'],
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'software',
    description: 'Relational database management system',
    tags: ['database', 'sql', 'relational', 'acid'],
  },
  // Circuit Design Skills
  {
    id: 'digital-design',
    name: 'Digital Circuit Design',
    category: 'circuit',
    description: 'Advanced digital circuit and logic design',
    tags: ['vhdl', 'verilog', 'simulation', 'digital-logic'],
  },
  {
    id: 'analog-design',
    name: 'Analog Circuit Design',
    category: 'circuit',
    description: 'Precision analog circuit and signal conditioning',
    tags: ['filters', 'amplifiers', 'signal-processing', 'power-management'],
  },
  {
    id: 'mixed-signal',
    name: 'Mixed-Signal Design',
    category: 'circuit',
    description: 'Integration of analog and digital circuits',
    tags: ['adc', 'dac', 'signal-conversion', 'power-domains'],
  },
  {
    id: 'pcb-design',
    name: 'PCB Design',
    category: 'circuit',
    description: 'Professional PCB design and layout',
    tags: ['eagle', 'proteus', 'schematics', 'layout'],
  },
  // Robotics Skills
  {
    id: 'ros',
    name: 'ROS',
    category: 'robotics',
    description: 'Robot Operating System for robotic application development',
    tags: ['robotics', 'navigation', 'perception', 'simulation'],
  },
  {
    id: 'arduino',
    name: 'Arduino',
    category: 'robotics',
    description: 'Microcontroller programming for robotics',
    tags: ['microcontroller', 'sensors', 'actuators', 'iot'],
  },
  {
    id: 'gazebo',
    name: 'Gazebo',
    category: 'robotics',
    description: '3D robotics simulation environment',
    tags: ['simulation', 'robot-modeling', 'sensors', 'multi-robot'],
  },
  // Development Tools
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    description: 'Version control system for tracking code changes',
    tags: ['version-control', 'collaboration', 'branching', 'history'],
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tools',
    description: 'Platform for hosting and collaborating on code',
    tags: ['git', 'ci-cd', 'pull-requests', 'code-review'],
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    description: 'Advanced code editor with extensive plugin ecosystem',
    tags: ['editor', 'extensions', 'debugging', 'intellisense'],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'tools',
    description:
      'Platform for developing and deploying containerized applications',
    tags: ['containers', 'devops', 'deployment', 'virtualization'],
  },
]

// Updated skill categories configuration with more specific icons
const skillCategories: SkillCategory[] = [
  {
    id: 'os',
    label: 'Operating Systems',
    icon: IconDeviceDesktop,
    component: OperatingSystems,
    skills: allSkills.filter((skill) => skill.category === 'os'),
  },
  {
    id: 'programming',
    label: 'Programming',
    icon: IconBinary,
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
    icon: IconBrandHtml5,
    component: Frontend,
    skills: allSkills.filter((skill) => skill.category === 'web'),
  },
  {
    id: 'circuit',
    label: 'Circuit Design',
    icon: IconDeviceDesktopAnalytics,
    component: CircuitDesign,
    skills: allSkills.filter((skill) => skill.category === 'circuit'),
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: IconTools,
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
      duration: 0.9,
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
      duration: 0.5,
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
  const [recentSearches, setRecentSearches] = useState<Skill[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Advanced search functionality with scoring
  const searchResults = useMemo(() => {
    if (!searchQuery) return []

    const query = searchQuery.toLowerCase().trim()

    // Split the query into individual terms for better matching
    const queryTerms = query.split(/\s+/).filter((term) => term.length > 0)

    if (queryTerms.length === 0) return []

    // Calculate score for each skill based on multiple factors
    const scoredResults = allSkills.map((skill) => {
      let score = 0
      const name = skill.name.toLowerCase()
      const description = skill.description.toLowerCase()
      const tags = skill.tags.map((tag) => tag.toLowerCase())

      // Process each search term
      for (const term of queryTerms) {
        // Exact matches in name (highest priority)
        if (name === term) score += 100
        else if (name.startsWith(term)) score += 50
        else if (name.includes(term)) score += 30

        // Matches in tags (high priority)
        const exactTagMatch = tags.some((tag) => tag === term)
        if (exactTagMatch) score += 80

        const tagStartsWithMatch = tags.some((tag) => tag.startsWith(term))
        if (tagStartsWithMatch) score += 40

        const tagIncludesMatch = tags.some((tag) => tag.includes(term))
        if (tagIncludesMatch) score += 20

        // Matches in description (lower priority)
        if (description.includes(term)) score += 10
      }

      // Boost score based on how many of the terms match
      const matchingTermCount = queryTerms.filter(
        (term) =>
          name.includes(term) ||
          tags.some((tag) => tag.includes(term)) ||
          description.includes(term)
      ).length

      // If all terms match, give a bonus
      if (matchingTermCount === queryTerms.length) {
        score += 25
      }

      // Normalize score based on term count for consistent ranking
      score = score / queryTerms.length

      return { skill, score }
    })

    // Filter out results with zero score and sort by decreasing score
    return scoredResults
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((result) => result.skill)
  }, [searchQuery])

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    // Update URL with the active tab for better sharing and navigation
    window.history.replaceState(null, '', `?tab=${tabId}`)
  }

  // Initialize active tab from URL if available
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tabParam = params.get('tab')
    if (tabParam && skillCategories.some((cat) => cat.id === tabParam)) {
      setActiveTab(tabParam)
    }
  }, [])

  // Make sure we have a default component if the active tab is not found
  // This handles the case where the component might be undefined
  const activeCategory = skillCategories.find((cat) => cat.id === activeTab)
  const ActiveComponent = activeCategory
    ? activeCategory.component
    : OperatingSystems

  const handleSearchClose = () => {
    setIsSearchOpen(false)
    setSearchQuery('')
  }

  // Handle escape key press to close search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        handleSearchClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen])

  // Handle clicks outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleSearchClose()
      }
    }

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSearchOpen])

  // Recent searches functionality
  const saveRecentSearch = (skill: Skill) => {
    try {
      const recentSearches = JSON.parse(
        localStorage.getItem('recentSkillSearches') || '[]'
      )

      // Remove if already exists (to avoid duplicates)
      const filteredSearches = recentSearches.filter(
        (item: Skill) => item.id !== skill.id
      )

      // Add to beginning of array (most recent first)
      filteredSearches.unshift({
        id: skill.id,
        name: skill.name,
        category: skill.category,
        description: skill.description,
        tags: skill.tags,
      })

      // Limit to 5 recent searches
      const trimmedSearches = filteredSearches.slice(0, 5)

      // Save back to localStorage
      localStorage.setItem(
        'recentSkillSearches',
        JSON.stringify(trimmedSearches)
      )
    } catch (error) {
      console.error('Error saving recent search:', error)
    }
  }

  // Get recent searches
  const getRecentSearches = (): Skill[] => {
    try {
      return JSON.parse(localStorage.getItem('recentSkillSearches') || '[]')
    } catch (error) {
      console.error('Error getting recent searches:', error)
      return []
    }
  }

  // Load recent searches when the component mounts
  useEffect(() => {
    setRecentSearches(getRecentSearches())
  }, [])

  // Handle skill selection from search results
  const handleSkillSelect = (skill: Skill) => {
    // Find the category for this skill
    const category = skillCategories.find((cat) =>
      cat.skills.some((s) => s.id === skill.id)
    )

    if (category) {
      // Save recent searches in local storage
      saveRecentSearch(skill)

      // Update recent searches state
      setRecentSearches(getRecentSearches())

      // Navigate to the category
      handleTabChange(category.id)
      handleSearchClose()
    }
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
            aria-label="Search skills"
          >
            <span>Search skills...</span>
            <IconSearch className="text-gray-400" size={20} />
          </button>
        </div>

        {/* Category List */}
        <nav className="space-y-2 p-4" aria-label="Skill categories">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleTabChange(category.id)}
              className={`group flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                activeTab === category.id
                  ? 'text-primary-600 bg-gradient-to-r from-green-50 to-orange-50 dark:from-blue-900/50 dark:to-gray-800/50 dark:text-blue-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              } `}
              aria-current={activeTab === category.id ? 'page' : undefined}
            >
              <category.icon
                className={`size-5 ${activeTab === category.id ? 'text-primary-500' : 'text-gray-400'}`}
                size={20}
                stroke={2}
                aria-hidden="true"
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
            {ActiveComponent && <ActiveComponent />}
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
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-modal-title"
          >
            <motion.div
              ref={modalRef}
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
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search skills, technologies, tools..."
                  className="focus:ring-primary-500 w-full rounded-lg border-none bg-gray-100 py-2 pl-10 pr-12 text-lg text-gray-900 focus:ring-2 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                  autoFocus
                  aria-label="Search skills"
                  id="search-modal-title"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    <IconX size={20} />
                  </button>
                )}
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto border-t border-gray-200 p-4 dark:border-gray-700">
                {searchQuery && searchResults.length > 0 ? (
                  <div>
                    <h3 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                      Search Results
                    </h3>
                    <ul className="space-y-2" role="listbox">
                      {searchResults.map((skill) => (
                        <li
                          key={skill.id}
                          onClick={() => handleSkillSelect(skill)}
                          className="flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="option"
                          aria-selected="false"
                        >
                          <div className="w-full">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                {skill.name}
                              </h3>
                              <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                {
                                  skillCategories.find(
                                    (cat) => cat.id === skill.category
                                  )?.label
                                }
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {skill.description}
                            </p>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {skill.tags.map((tag: string) => {
                                const isHighlighted = searchQuery
                                  .toLowerCase()
                                  .split(/\s+/)
                                  .some((term) =>
                                    tag.toLowerCase().includes(term)
                                  )
                                return (
                                  <span
                                    key={tag}
                                    className={`rounded-full px-2 py-1 text-xs ${
                                      isHighlighted
                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                        : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                )
                              })}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : searchQuery ? (
                  <div className="py-4 text-center text-gray-500 dark:text-gray-400">
                    No skills found matching &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : recentSearches.length > 0 ? (
                  <div>
                    <h3 className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                      Recent Searches
                    </h3>
                    <ul className="space-y-2" role="listbox">
                      {recentSearches.map((skill: Skill) => (
                        <li
                          key={skill.id}
                          onClick={() => handleSkillSelect(skill)}
                          className="flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="option"
                          aria-selected="false"
                        >
                          <div className="w-full">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                                {skill.name}
                              </h3>
                              <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                {
                                  skillCategories.find(
                                    (cat) => cat.id === skill.category
                                  )?.label
                                }
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {skill.description}
                            </p>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {skill.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    Start typing to search across all skills...
                  </div>
                )}

                {/* Search tips */}
                {!searchResults.length && searchQuery && (
                  <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm dark:border-gray-700 dark:bg-gray-800">
                    <h4 className="mb-1 font-medium text-gray-800 dark:text-gray-200">
                      Search Tips:
                    </h4>
                    <ul className="list-inside list-disc text-gray-600 dark:text-gray-400">
                      <li>
                        Try using single keywords (e.g., &ldquo;python&rdquo;
                        instead of &ldquo;python programming&rdquo;)
                      </li>
                      <li>Check for typos in your search</li>
                      <li>
                        Search by technology name, category, or specific skills
                      </li>
                    </ul>
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
