import { motion, useInView } from 'framer-motion'
import {
  Box,
  Code2,
  Database,
  Globe,
  LayoutGrid,
  LucideIcon,
  Network,
  Rocket,
  Webhook,
} from 'lucide-react'
import { useRef, useState } from 'react'
import SkillCard from './skill-card'

interface SoftwareDevelopmentSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  category: 'Backend' | 'Frontend' | 'DevOps' | 'Database'
  icon: LucideIcon
  keyFeatures: string[]
  tools: string[]
  projects: number
  certifications: string[]
  architecturePatterns: string[]
  securityFeatures: string[]
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  usageFrequency: 'Daily' | 'Weekly' | 'Monthly' | 'Occasional'
}

const softwareDevelopmentSkills: SoftwareDevelopmentSkill[] = [
  {
    id: 'typescript',
    title: 'TypeScript',
    proficiency: 75,
    experience: '1+ years',
    category: 'Frontend',
    description: 'Used for large-scale application development',
    keyFeatures: [
      'Generics',
      'Static typing',
      'Type inference',
      'Object-oriented programming',
      'Decorator support',
    ],
    tools: ['Prettier', 'ts-node', 'Webpack'],
    projects: 5,
    certifications: ['Programming hero'],
    architecturePatterns: ['Generic programming', 'Functional programming'],
    securityFeatures: ['Type safety', 'Code analysis'],
    level: 'Intermediate',
    usageFrequency: 'Monthly',
    icon: Code2,
  },
  {
    id: 'html',
    title: 'HTML',
    proficiency: 95,
    experience: '6+ years',
    category: 'Frontend',
    description:
      'Standard markup language for application structure and content',
    keyFeatures: [
      'Accessibility',
      'Media elements',
      'Semantic elements',
      'Forms & validation',
    ],
    tools: ['VS Code', 'Chrome DevTools'],
    projects: 80,
    certifications: ['Programming hero', 'Phitron'],
    architecturePatterns: ['Responsive design'],
    securityFeatures: ['Content security'],
    level: 'Expert',
    usageFrequency: 'Weekly',
    icon: Globe,
  },
  {
    id: 'css',
    title: 'CSS',
    proficiency: 90,
    experience: '6+ years',
    category: 'Frontend',
    description: 'Styling language for designing web applications',
    keyFeatures: [
      'Grid',
      'Flexbox',
      'Animations',
      'Media queries',
      'Custom properties',
    ],
    tools: [
      'Sass',
      'PostCSS',
      'TailwindCSS',
      'CSS Modules',
      'Styled Components',
    ],
    projects: 80,
    certifications: ['Programming hero', 'Phitron'],
    architecturePatterns: ['CSS modules'],
    securityFeatures: ['Null'],
    level: 'Expert',
    usageFrequency: 'Weekly',
    icon: LayoutGrid,
  },
  {
    id: 'docker',
    title: 'Docker',
    proficiency: 55,
    experience: '1+ years',
    category: 'DevOps',
    description:
      'Platform for developing and deploying containerized applications',
    keyFeatures: [
      'Docker Compose',
      'Image building',
      'Containerization',
      'Volume management',
    ],
    tools: ['Docker Hub', 'Docker Desktop', 'Dockerfile', 'Docker CLI'],
    projects: 7,
    certifications: [
      'Programming hero',
      'Institute for Artificial Intelligence',
    ],
    architecturePatterns: ['Container organization'],
    securityFeatures: ['Null'],
    level: 'Beginner',
    usageFrequency: 'Monthly',
    icon: Box,
  },
  {
    id: 'jenkins',
    title: 'Jenkins',
    proficiency: 50,
    experience: '1+ years',
    category: 'DevOps',
    description: 'Open-source automation server for CI/CD pipelines',
    keyFeatures: [
      'Test automation',
      'Pipeline automation',
      'Deployment automation',
    ],
    tools: ['Jenkins Pipeline'],
    projects: 0,
    certifications: ['The construct'],
    architecturePatterns: ['Null'],
    securityFeatures: ['Pipeline security'],
    level: 'Beginner',
    usageFrequency: 'Monthly',
    icon: Rocket,
  },
  {
    id: 'mysql',
    title: 'MySQL',
    proficiency: 90,
    experience: '3+ years',
    category: 'Database',
    description: 'Open-source relational database management system',
    keyFeatures: [
      'Views',
      'Indexing',
      'Replication',
      'Transactions',
      'ACID compliance',
      'Stored procedures',
    ],
    tools: ['MySQL Workbench'],
    projects: 20,
    certifications: ['Phitron', 'Programming hero'],
    architecturePatterns: ['Query optimization'],
    securityFeatures: ['Access control'],
    level: 'Expert',
    usageFrequency: 'Weekly',
    icon: Database,
  },
  {
    id: 'websockets',
    title: 'WebSockets',
    proficiency: 65,
    experience: '1+ years',
    category: 'Backend',
    description: 'Protocol for full-duplex communication channels',
    keyFeatures: [
      'Low latency',
      'Bi-directional',
      'Real-time data',
      'Auto reconnection',
      'Connection pooling',
    ],
    tools: ['Socket.io', 'WebSocket API', 'Browser DevTools'],
    projects: 3,
    certifications: ['Institute for Artificial Intelligence'],
    architecturePatterns: ['Pub/Sub pattern', 'Connection pooling'],
    securityFeatures: ['Token auth', 'Rate limiting'],
    level: 'Intermediate',
    usageFrequency: 'Occasional',
    icon: Network,
  },
  {
    id: 'fastapi',
    title: 'FastAPI',
    proficiency: 85,
    experience: '2+ years',
    category: 'Backend',
    description: 'Modern Python web framework for building APIs',
    keyFeatures: ['Validation', 'WebSocket support', 'Auto documentation'],
    tools: ['SQLAlchemy'],
    projects: 3,
    certifications: ['Institute for Artificial Intelligence'],
    architecturePatterns: ['Null'],
    securityFeatures: ['OAuth2', 'JWT auth'],
    level: 'Intermediate',
    usageFrequency: 'Occasional',
    icon: Webhook,
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

export function SoftwareDevelopment() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filteredSkills =
    filterCategory === 'all'
      ? softwareDevelopmentSkills
      : softwareDevelopmentSkills.filter(
          (skill) => skill.category === filterCategory
        )

  const categories = [
    'all',
    ...new Set(softwareDevelopmentSkills.map((skill) => skill.category)),
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
          Software Development Skills
        </h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          Comprehensive skills in modern software development, from frontend to backend
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
        {filteredSkills.map((skill) => (
          <motion.div
            key={skill.id}
            variants={cardVariants}
            className="rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
          >
            <SkillCard
              title={skill.title}
              className={skill.id}
              proficiency={skill.proficiency}
              experience={skill.experience}
              description={skill.description}
              level={skill.level}
              usageFrequency={skill.usageFrequency}
              isSelected={selectedSkill === skill.id}
              onClick={() =>
                setSelectedSkill(selectedSkill === skill.id ? null : skill.id)
              }
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-3 text-white shadow-lg"
              >
                <skill.icon className="size-full" />
              </motion.div>
            </SkillCard>

            <motion.div
              className="mt-4 pl-20"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: selectedSkill === skill.id ? 1 : 0,
                height: selectedSkill === skill.id ? 'auto' : 0,
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
                      {skill.keyFeatures.map((feature, index) => (
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
                      {skill.tools.map((tool, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-gray-400" />
                          {tool}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-purple-500" />
                      Architecture Patterns
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.architecturePatterns.map((pattern, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        >
                          {pattern}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      Security Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.securityFeatures.map((feature, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-800 dark:bg-red-900 dark:text-red-200"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-yellow-500" />
                      Certifications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.certifications.map((cert, index) => (
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
                          skill.category === 'Frontend'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : skill.category === 'Backend'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : skill.category === 'DevOps'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        }`}
                      >
                        {skill.category}
                      </span>
                    </div>
                    <div>
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Projects:
                      </span>{' '}
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {skill.projects}
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

export default SoftwareDevelopment
