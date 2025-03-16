import {
  IconBrandGit,
  IconBrandGithub,
  IconBrandTrello,
  IconBrandVscode,
  IconTerminal,
} from '@tabler/icons-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import SkillCard from './skill-card'

interface ToolSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  category: 'Version Control' | 'Editor' | 'Project Management'
  icon: React.FC<{ className?: string; stroke?: number }>
  keyFeatures: string[]
  tools: string[]
  projects: number
  certifications: string[]
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  usageFrequency: 'Daily' | 'Weekly' | 'Monthly' | 'Occasional'
}

const toolSkills: ToolSkill[] = [
  {
    id: 'git',
    title: 'Git',
    proficiency: 85,
    experience: '3+ years',
    description: 'Version control system for tracking code changes',
    category: 'Version Control',
    keyFeatures: [
      'Git flow',
      'Merge strategies',
      'Branch management',
      'History manipulation',
      'Repository management',
      'Remote collaboration',
    ],
    tools: ['Git CLI', 'Git GUI', 'Git Bash'],
    projects: 7,
    certifications: ['Programming hero', 'Phitron', 'The construct'],
    level: 'Expert',
    usageFrequency: 'Daily',
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#F54D27] to-[#F76D47] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandGit className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'github',
    title: 'GitHub',
    proficiency: 85,
    experience: '5+ years',
    description: 'Platform for hosting and collaborating on code',
    category: 'Version Control',
    keyFeatures: [
      'Code review',
      'Pull Requests',
      'Issue tracking',
      'Project management',
      'Actions & Workflows',
    ],
    tools: ['GitHub API', 'GitHub CLI', 'GitHub Pages', 'GitHub Actions'],
    projects: 80,
    certifications: ['Programming hero', 'Phitron', 'The construct'],
    level: 'Advanced',
    usageFrequency: 'Daily',
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandGithub className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'vscode',
    title: 'VS Code',
    proficiency: 100,
    experience: '6+ years',
    description: 'Advanced code editor with extensive plugin ecosystem',
    category: 'Editor',
    keyFeatures: [
      'Live Share',
      'Git integration',
      'Debugging tools',
      'Custom extensions',
      'Remote development',
      'Integrated terminal',
    ],
    tools: [
      'Docker',
      'ESLint',
      'GitLens',
      'Prettier',
      'Live Server',
      'Remote Extensions',
      'Debugger for Chrome',
    ],
    projects: 55,
    certifications: ['Programming hero', 'Phitron'],
    level: 'Expert',
    usageFrequency: 'Daily',
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#0066B8] to-[#007ACC] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandVscode className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'pycharm',
    title: 'PyCharm',
    proficiency: 80,
    experience: '3+ years',
    category: 'Editor',
    description: 'Professional Python IDE with advanced development tools',
    keyFeatures: ['Code completion', 'Debugging'],
    tools: ['Python console'],
    projects: 5,
    certifications: ['Phitron'],
    level: 'Expert',
    usageFrequency: 'Weekly',
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#21D789] to-[#07C3F2] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconTerminal className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'trello',
    title: 'Trello',
    proficiency: 70,
    experience: '3+ years',
    description: 'Project and task management platform',
    category: 'Project Management',
    keyFeatures: [
      'Due dates',
      'Checklists',
      'Attachments',
      'Labels & tags',
      'Kanban boards',
      'Task management',
      'Custom workflows',
      'Team collaboration',
    ],
    tools: ['Card Repeater', 'Calendar View', 'Timeline View', 'Custom Fields'],
    projects: 7,
    certifications: ['Institute for Artificial Intelligence'],
    level: 'Intermediate',
    usageFrequency: 'Monthly',
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#0079BF] to-[#055A8C] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandTrello className="size-full text-white" {...props} />
      </div>
    ),
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export function Tools() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filteredTools =
    filterCategory === 'all'
      ? toolSkills
      : toolSkills.filter((tool) => tool.category === filterCategory)

  const categories = [
    'all',
    ...new Set(toolSkills.map((tool) => tool.category)),
  ]

  return (
    <motion.div
      ref={containerRef}
      className="space-y-8 rounded-xl bg-gradient-to-b from-gray-50 to-white p-8 shadow-sm dark:from-gray-900 dark:to-gray-800"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="mb-10">
        <h2 className="mb-3 text-3xl font-bold text-gray-800 dark:text-gray-200">
          Development Tools
        </h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          Essential tools and utilities for modern developments
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                filterCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-800'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8">
        {filteredTools.map((tool) => (
          <motion.div
            key={tool.id}
            variants={cardVariants}
            className="rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
          >
            <SkillCard
              title={tool.title}
              className={tool.id}
              proficiency={tool.proficiency}
              experience={tool.experience}
              description={tool.description}
              level={tool.level}
              usageFrequency={tool.usageFrequency}
              isSelected={selectedTool === tool.id}
              onClick={() =>
                setSelectedTool(selectedTool === tool.id ? null : tool.id)
              }
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <tool.icon stroke={1.5} />
              </motion.div>
            </SkillCard>

            <motion.div
              className="mt-4 pl-20"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: selectedTool === tool.id ? 1 : 0,
                height: selectedTool === tool.id ? 'auto' : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid gap-6 text-sm text-gray-600 md:grid-cols-2 dark:text-gray-400">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                      Key Features
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {tool.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-gray-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Tools & Technologies
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {tool.tools.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-gray-400" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-yellow-500" />
                      Certifications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tool.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div>
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Category:
                      </span>{' '}
                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                          tool.category === 'Version Control'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                            : tool.category === 'Editor'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}
                      >
                        {tool.category}
                      </span>
                    </div>
                    <div>
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Projects:
                      </span>{' '}
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {tool.projects}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Tools
