import { motion, useInView } from 'framer-motion'
import {
    BrainCircuit,
    Code,
    Database,
    Layers,
    LayoutGrid,
    LucideIcon,
    Server,
} from 'lucide-react'
import React, { useRef, useState } from 'react'

// Types
interface WebDevelopmentSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  type: 'Frontend' | 'Backend' | 'Full-Stack' | 'Database' | 'DevOps' | 'AI/ML'
  icon: LucideIcon
  projects?: number
  features: string[]
  tools?: string[]
  libraries?: string[]
  performance?: {
    speed?: string
    scalability?: string
    reliability?: string
  }
  bestPractices?: string[]
  architecturePatterns?: string[]
}

// Define SkillCard component
const SkillCard = ({
  title,
  proficiency,
  experience,
  description,
  onClick,
  children,
}: {
  title: string
  proficiency: number
  experience: string
  description: string
  onClick: () => void
  children: React.ReactNode
}) => (
  <div
    onClick={onClick}
    className="cursor-pointer rounded-xl p-6 transition-all duration-300"
  >
    <div className="flex items-start gap-4">
      {children}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        <div className="mt-2 flex items-center gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Proficiency: {proficiency}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Experience: {experience}
          </div>
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  </div>
)

// Animation variants
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

// Skills data
const webDevelopmentSkills: WebDevelopmentSkill[] = [
  {
    id: 'react',
    title: 'React',
    proficiency: 92,
    experience: '4+ years',
    type: 'Frontend',
    description: 'Modern JavaScript library for building user interfaces',
    features: [
      'Component-based architecture',
      'Virtual DOM',
      'State management',
      'Hooks',
      'Context API',
      'Server-side rendering',
      'Performance optimization',
      'Declarative rendering',
    ],
    tools: [
      'Create React App',
      'Next.js',
      'Vite',
      'React DevTools',
      'Storybook',
      'Redux DevTools',
    ],
    libraries: [
      'Redux',
      'React Router',
      'Framer Motion',
      'React Query',
      'Zustand',
      'Recoil',
    ],
    projects: 25,
    performance: {
      speed: 'High rendering efficiency',
      scalability: 'Highly scalable',
      reliability: 'Robust ecosystem',
    },
    bestPractices: [
      'Component composition',
      'Memoization',
      'Code splitting',
      'Performance monitoring',
    ],
    architecturePatterns: [
      'Flux',
      'Atomic design',
      'Container/Presentational',
      'Hooks pattern',
    ],
    icon: Code,
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    proficiency: 88,
    experience: '3+ years',
    type: 'Backend',
    description: 'JavaScript runtime for server-side development',
    features: [
      'Asynchronous I/O',
      'Event-driven architecture',
      'NPM ecosystem',
      'Express.js',
      'Middleware support',
      'WebSocket integration',
      'Microservices',
      'Clustering',
    ],
    tools: ['Express', 'Nest.js', 'PM2', 'nodemon', 'npm', 'Yarn'],
    libraries: [
      'Socket.IO',
      'Axios',
      'Passport.js',
      'Mongoose',
      'TypeORM',
      'GraphQL',
    ],
    projects: 18,
    performance: {
      speed: 'Non-blocking I/O',
      scalability: 'Excellent horizontal scaling',
      reliability: 'Stable and mature',
    },
    bestPractices: [
      'Async/await',
      'Error handling',
      'Dependency injection',
      'Modular architecture',
    ],
    architecturePatterns: [
      'Microservices',
      'Event-driven',
      'RESTful API',
      'Serverless',
    ],
    icon: Server,
  },
  {
    id: 'mongodb',
    title: 'MongoDB',
    proficiency: 85,
    experience: '3+ years',
    type: 'Database',
    description: 'NoSQL database for flexible, scalable applications',
    features: [
      'Document-oriented storage',
      'Flexible schema',
      'Horizontal scaling',
      'Aggregation framework',
      'Indexing',
      'Replication',
      'Sharding',
      'Full-text search',
    ],
    tools: [
      'MongoDB Compass',
      'Mongoose',
      'Atlas',
      'Aggregation Pipeline',
      'MongoDB Realm',
    ],
    libraries: ['Mongoose', 'Mongosh', 'Mup', 'Meteor'],
    projects: 15,
    performance: {
      speed: 'High-performance read/write',
      scalability: 'Highly scalable',
      reliability: 'Robust data management',
    },
    bestPractices: [
      'Indexing strategies',
      'Query optimization',
      'Schema design',
      'Data modeling',
    ],
    architecturePatterns: [
      'Denormalization',
      'Embedded documents',
      'Horizontal partitioning',
      'Replica sets',
    ],
    icon: Database,
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    proficiency: 90,
    experience: '2+ years',
    type: 'Full-Stack',
    description: 'React framework for production-grade applications',
    features: [
      'Server-side rendering',
      'Static site generation',
      'API routes',
      'File-based routing',
      'Automatic code splitting',
      'TypeScript support',
      'Image optimization',
      'Incremental static regeneration',
    ],
    tools: [
      'create-next-app',
      'Vercel',
      'Next.js CLI',
      'ESLint integration',
      'Prettier',
    ],
    libraries: ['SWR', 'React Query', 'Tailwind CSS', 'shadcn/ui', 'Prisma'],
    projects: 20,
    performance: {
      speed: 'Optimized rendering',
      scalability: 'Enterprise-grade',
      reliability: 'Production-ready',
    },
    bestPractices: [
      'Static optimization',
      'Performance tuning',
      'SEO optimization',
      'Incremental adoption',
    ],
    architecturePatterns: [
      'Jamstack',
      'Serverless',
      'Hybrid rendering',
      'Edge computing',
    ],
    icon: Layers,
  },
  {
    id: 'tailwind',
    title: 'Tailwind CSS',
    proficiency: 95,
    experience: '2+ years',
    type: 'Frontend',
    description: 'Utility-first CSS framework for rapid UI development',
    features: [
      'Utility classes',
      'Responsive design',
      'Dark mode',
      'Customization',
      'PurgeCSS integration',
      'JIT compiler',
      'Design system',
      'Component extraction',
    ],
    tools: [
      'Tailwind CLI',
      'PostCSS',
      'Prettier Plugin',
      'VS Code Extension',
      'Tailwind UI',
    ],
    libraries: [
      '@tailwindcss/forms',
      '@tailwindcss/typography',
      '@tailwindcss/aspect-ratio',
      'HeadlessUI',
    ],
    projects: 30,
    performance: {
      speed: 'Minimal CSS bundle',
      scalability: 'Highly customizable',
      reliability: 'Consistent styling',
    },
    bestPractices: [
      'Utility-first approach',
      'Design tokens',
      'Component composition',
      'Responsive variants',
    ],
    architecturePatterns: [
      'Atomic design',
      'Design system',
      'Utility-first',
      'Component libraries',
    ],
    icon: LayoutGrid,
  },
  {
    id: 'tensorflow',
    title: 'TensorFlow.js',
    proficiency: 80,
    experience: '1+ years',
    type: 'AI/ML',
    description: 'Machine learning library for web and Node.js',
    features: [
      'Browser-based ML',
      'Pre-trained models',
      'Custom model training',
      'Transfer learning',
      'WebGL acceleration',
      'Model conversion',
      'Keras API',
      'Performance tracking',
    ],
    tools: [
      'TensorFlow.js Converter',
      'Keras',
      'Model Zoo',
      'Weights & Biases',
      'Colab',
    ],
    libraries: [
      '@tensorflow/tfjs',
      '@tensorflow/tfjs-node',
      'tfjs-vis',
      'ml5.js',
    ],
    projects: 10,
    performance: {
      speed: 'GPU-accelerated',
      scalability: 'Flexible deployment',
      reliability: 'Robust ML capabilities',
    },
    bestPractices: [
      'Model optimization',
      'Data preprocessing',
      'Transfer learning',
      'Performance monitoring',
    ],
    architecturePatterns: [
      'Transfer learning',
      'Federated learning',
      'Model serving',
      'Inference optimization',
    ],
    icon: BrainCircuit,
  },
]

// Main component
const WebDevelopment = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<string>('all')

  const filteredSkills =
    filterType === 'all'
      ? webDevelopmentSkills
      : webDevelopmentSkills.filter((skill) => skill.type === filterType)

  const types = [
    'all',
    ...new Set(webDevelopmentSkills.map((skill) => skill.type)),
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
          Web Development & Technologies
        </h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          Skills in modern web development, from frontend to backend and
          emerging technologies
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filterType === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              {type === 'all' ? 'All' : type}
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
              proficiency={skill.proficiency}
              experience={skill.experience}
              description={skill.description}
              onClick={() =>
                setSelectedSkill(selectedSkill === skill.id ? null : skill.id)
              }
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-3 text-white shadow-lg"
              >
                <skill.icon className="size-full" />
              </motion.div>
            </SkillCard>

            {selectedSkill === skill.id && (
              <motion.div
                className="mt-4 pl-20"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid gap-6 text-sm text-gray-600 md:grid-cols-2 dark:text-gray-400">
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        Features
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {skill.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-gray-400" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {skill.performance && (
                      <div>
                        <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          Performance
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(skill.performance).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center gap-2"
                              >
                                <span className="h-1 w-1 rounded-full bg-gray-400" />
                                <span className="font-medium">{key}:</span>{' '}
                                {value}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {skill.tools && (
                      <div>
                        <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                          <span className="h-2 w-2 rounded-full bg-indigo-500" />
                          Tools
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skill.tools.map((tool, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {skill.libraries && (
                      <div>
                        <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                          <span className="h-2 w-2 rounded-full bg-yellow-500" />
                          Libraries
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skill.libraries.map((library, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            >
                              {library}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-4">
                      <div>
                        <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                          Type:
                        </span>{' '}
                        <span
                          className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                            skill.type === 'Frontend'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : skill.type === 'Backend'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : skill.type === 'Full-Stack'
                                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                  : skill.type === 'Database'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    : skill.type === 'DevOps'
                                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                                      : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                          }`}
                        >
                          {skill.type}
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
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default WebDevelopment
