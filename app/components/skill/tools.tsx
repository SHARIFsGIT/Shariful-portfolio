import {
  IconBrandDocker,
  IconBrandFigma,
  IconBrandGit,
  IconBrandGithub,
  IconBrandVscode,
} from '@tabler/icons-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { SiPostman } from 'react-icons/si'
import SkillCard from './skill-card'

interface ToolSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  category:
    | 'Version Control'
    | 'Design'
    | 'Development'
    | 'DevOps'
    | 'Productivity'
  icon: React.FC<{ className?: string; stroke?: number }>
  features: string[]
  workflows?: string[]
  projects?: number
  integrations?: string[]
  bestPractices?: string[]
  performance?: {
    efficiency?: string
    reliability?: string
    scalability?: string
  }
  resources?: string[]
  commandLine?: string[]
  automations?: string[]
  teamSize?: string
  security?: string[]
  metrics?: {
    timesSaved?: string
    efficiency?: string
    collaboration?: string
  }
}

const toolSkills: ToolSkill[] = [
  {
    id: 'git',
    title: 'Git',
    proficiency: 95,
    experience: '5+ years',
    description: 'Version control system for tracking code changes',
    category: 'Version Control',
    features: [
      'Branch management',
      'Merge strategies',
      'Conflict resolution',
      'Git flow',
      'Rebasing',
      'Cherry picking',
      'Submodules',
      'Hooks',
    ],
    workflows: [
      'Feature branch workflow',
      'Gitflow workflow',
      'Forking workflow',
      'Trunk-based development',
    ],
    projects: 50,
    bestPractices: [
      'Atomic commits',
      'Meaningful commit messages',
      'Branch naming conventions',
      'Code review process',
    ],
    commandLine: ['git rebase', 'git cherry-pick', 'git bisect', 'git reflog'],
    security: [
      'GPG signing',
      'Access controls',
      'Secret management',
      'Secure workflow',
    ],
    metrics: {
      timesSaved: '30% dev time',
      efficiency: 'High',
      collaboration: 'Seamless',
    },
    resources: [
      'Git documentation',
      'GitHub guides',
      'Git branching strategies',
      'Advanced Git concepts',
    ],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#F54D27] to-[#F76D47] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandGit className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'github',
    title: 'GitHub',
    proficiency: 90,
    experience: '4+ years',
    description: 'Platform for hosting and collaborating on code',
    category: 'Version Control',
    features: [
      'Actions & Workflows',
      'Pull Requests',
      'Issue tracking',
      'Project management',
      'Code review',
      'Security scanning',
      'Package registry',
      'Codespaces',
    ],
    integrations: [
      'GitHub Actions',
      'GitHub Pages',
      'GitHub Packages',
      'GitHub API',
      'GitHub Apps',
      'GitHub Marketplace',
      'GitHub CLI',
      'GitHub Desktop',
    ],
    projects: 45,
    bestPractices: [
      'PR templates',
      'Issue templates',
      'Branch protection',
      'Review guidelines',
    ],
    security: [
      'Dependency scanning',
      'Code scanning',
      'Secret scanning',
      'Security policies',
    ],
    metrics: {
      timesSaved: '40% workflow time',
      efficiency: 'Very high',
      collaboration: 'Excellent',
    },
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandGithub className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'vscode',
    title: 'VS Code',
    proficiency: 92,
    experience: '4+ years',
    description: 'Advanced code editor with extensive plugin ecosystem',
    category: 'Development',
    features: [
      'Custom extensions',
      'Integrated terminal',
      'Debugging tools',
      'Live Share',
      'Remote development',
      'IntelliSense',
      'Git integration',
      'Tasks automation',
    ],
    integrations: [
      'ESLint',
      'Prettier',
      'GitLens',
      'Live Server',
      'Remote Extensions',
      'Docker',
      'Debugger for Chrome',
      'REST Client',
    ],
    projects: 60,
    bestPractices: [
      'Workspace settings',
      'Extension management',
      'Keyboard shortcuts',
      'Snippets usage',
    ],
    metrics: {
      timesSaved: '35% coding time',
      efficiency: 'Very high',
      collaboration: 'Good',
    },
    resources: [
      'VS Code docs',
      'Extension guides',
      'Debug configurations',
      'Settings reference',
    ],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#0066B8] to-[#007ACC] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandVscode className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'docker',
    title: 'Docker',
    proficiency: 75,
    experience: '2+ years',
    description: 'Container platform for building and shipping applications',
    category: 'DevOps',
    features: [
      'Containerization',
      'Docker Compose',
      'Image management',
      'Container orchestration',
      'Volume management',
      'Network configuration',
      'Multi-stage builds',
      'Health checks',
    ],
    workflows: [
      'Development environments',
      'CI/CD pipelines',
      'Microservices deployment',
      'Container registry',
      'Resource management',
      'Service scaling',
      'Load balancing',
      'Service discovery',
    ],
    projects: 20,
    bestPractices: [
      'Image optimization',
      'Security scanning',
      'Resource limits',
      'Layer caching',
    ],
    security: [
      'Image scanning',
      'Resource isolation',
      'Network policies',
      'Secret management',
    ],
    metrics: {
      timesSaved: '50% deploy time',
      efficiency: 'High',
      collaboration: 'Good',
    },
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#2496ED] to-[#2684FF] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandDocker className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'postman',
    title: 'Postman',
    proficiency: 88,
    experience: '3+ years',
    description: 'API development and testing platform',
    category: 'Development',
    features: [
      'API testing',
      'Request collections',
      'Environment variables',
      'Newman CLI',
      'Mock servers',
      'API documentation',
      'Test scripts',
      'Monitors',
    ],
    workflows: [
      'API documentation',
      'Team collaboration',
      'Automated testing',
      'API monitoring',
      'Performance testing',
      'API design',
      'API governance',
      'API security',
    ],
    projects: 35,
    bestPractices: [
      'Collection organization',
      'Environment management',
      'Test automation',
      'Documentation',
    ],
    metrics: {
      timesSaved: '40% API testing',
      efficiency: 'Very high',
      collaboration: 'Excellent',
    },
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#FF6C37] to-[#FF8C37] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <SiPostman className="size-full text-white" />
      </div>
    ),
  },
  {
    id: 'figma',
    title: 'Figma',
    proficiency: 85,
    experience: '2+ years',
    description: 'Collaborative interface design tool',
    category: 'Design',
    features: [
      'UI design',
      'Prototyping',
      'Design systems',
      'Component libraries',
      'Auto-layout',
      'Constraints',
      'Variables',
      'Plugins',
    ],
    workflows: [
      'Design handoff',
      'Team collaboration',
      'Design reviews',
      'Design systems',
      'Component libraries',
      'Design tokens',
      'Design specs',
      'Design versioning',
    ],
    projects: 25,
    bestPractices: [
      'Component organization',
      'Style guides',
      'Design tokens',
      'Accessibility',
    ],
    metrics: {
      timesSaved: '30% design time',
      efficiency: 'High',
      collaboration: 'Excellent',
    },
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#F24E1E] to-[#FF7262] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandFigma className="size-full text-white" {...props} />
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
          Essential tools and utilities for modern software development
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filterCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
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
                      {tool.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-gray-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {tool.workflows && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Workflows
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {tool.workflows.map((workflow, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-gray-400" />
                            {workflow}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tool.security && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        Security Features
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {tool.security.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-gray-400" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {tool.integrations && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-indigo-500" />
                        Integrations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {tool.integrations.map((integration, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                          >
                            {integration}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {tool.bestPractices && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-purple-500" />
                        Best Practices
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {tool.bestPractices.map((practice, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                          >
                            {practice}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {tool.metrics && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-yellow-500" />
                        Performance Metrics
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(tool.metrics).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-gray-400" />
                            <span className="font-medium">
                              {key.split(/(?=[A-Z])/).join(' ')}:
                            </span>{' '}
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-4">
                    <div>
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Category:
                      </span>{' '}
                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                          tool.category === 'Version Control'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                            : tool.category === 'Design'
                              ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                              : tool.category === 'Development'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : tool.category === 'DevOps'
                                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
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
