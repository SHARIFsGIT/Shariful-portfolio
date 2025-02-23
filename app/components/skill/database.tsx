import {
  IconBrandFirebase,
  IconBrandMongodb,
  IconDatabase,
} from '@tabler/icons-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import SkillCard from './skill-card'

interface DatabaseSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  type: 'SQL' | 'NoSQL' | 'Cloud'
  icon: React.FC<{ className?: string; stroke?: number }>
  features: string[]
  useCases: string[]
  projects?: number
  tools?: string[]
  performance?: {
    throughput?: string
    latency?: string
    scalability?: string
  }
  bestPractices?: string[]
}

const databaseSkills: DatabaseSkill[] = [
  {
    id: 'mysql',
    title: 'MySQL',
    proficiency: 85,
    experience: '3+ years',
    description: 'Popular open-source relational database system',
    type: 'SQL',
    features: [
      'ACID compliance',
      'Transactions',
      'Stored procedures',
      'Triggers',
      'Views',
      'Indexing',
      'Partitioning',
      'Replication',
    ],
    useCases: [
      'Web applications',
      'E-commerce',
      'Content management',
      'Enterprise systems',
      'Data warehousing',
    ],
    tools: [
      'MySQL Workbench',
      'phpMyAdmin',
      'DBForge',
      'MySQL Shell',
      'MySQL Router',
    ],
    performance: {
      throughput: '50k qps',
      latency: '<10ms',
      scalability: 'Master-Slave',
    },
    bestPractices: [
      'Query optimization',
      'Index design',
      'Normalization',
      'Backup strategy',
    ],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#00758F] to-[#F29111] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconDatabase className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'mongodb',
    title: 'MongoDB',
    proficiency: 82,
    experience: '2+ years',
    description: 'Modern document database for scalable applications',
    type: 'NoSQL',
    features: [
      'Document model',
      'Aggregation pipeline',
      'Indexing',
      'Replication',
      'Sharding',
      'ACID transactions',
      'Change streams',
    ],
    useCases: [
      'Real-time analytics',
      'Content management',
      'Mobile apps',
      'IoT applications',
      'Catalog management',
    ],
    tools: [
      'MongoDB Compass',
      'Mongoose',
      'MongoDB Atlas',
      'Studio 3T',
      'MongoDB Shell',
    ],
    performance: {
      throughput: '100k ops/sec',
      latency: '<5ms',
      scalability: 'Horizontal',
    },
    bestPractices: [
      'Schema design',
      'Index optimization',
      'Data modeling',
      'Security setup',
    ],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#4DB33D] to-[#3F9C35] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandMongodb className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'firebase',
    title: 'Firebase',
    proficiency: 80,
    experience: '2+ years',
    description: 'Real-time cloud database and backend services',
    type: 'Cloud',
    features: [
      'Real-time database',
      'Cloud Firestore',
      'Authentication',
      'Cloud Functions',
      'Hosting',
      'Storage',
      'Analytics',
    ],
    useCases: [
      'Mobile applications',
      'Real-time sync',
      'User authentication',
      'File storage',
      'Serverless apps',
    ],
    tools: [
      'Firebase Console',
      'Firebase CLI',
      'Firebase Admin SDK',
      'Firebase Emulator',
      'Security Rules',
    ],
    performance: {
      throughput: 'Auto-scaling',
      latency: '<100ms',
      scalability: 'Automatic',
    },
    bestPractices: [
      'Data structure',
      'Security rules',
      'Offline support',
      'Cost optimization',
    ],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#FFA000] to-[#F57C00] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandFirebase className="size-full text-white" {...props} />
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

export function Database() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<string>('all')

  const filteredSkills =
    filterType === 'all'
      ? databaseSkills
      : databaseSkills.filter((skill) => skill.type === filterType)

  const types = ['all', ...new Set(databaseSkills.map((skill) => skill.type))]

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
          Database Technologies
        </h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          Experience with SQL, NoSQL, and cloud database solutions
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
              className={skill.id}
              proficiency={skill.proficiency}
              experience={skill.experience}
              description={skill.description}
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
              >
                <skill.icon stroke={1.5} />
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
                        Performance Metrics
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(skill.performance).map(
                          ([key, value]) => (
                            <div key={key} className="flex items-center gap-2">
                              <span className="h-1 w-1 rounded-full bg-gray-400" />
                              <span className="font-medium">{key}:</span>{' '}
                              {value}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-purple-500" />
                      Best Practices
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {skill.bestPractices?.map((practice, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-gray-400" />
                          {practice}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-yellow-500" />
                      Common Use Cases
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.useCases.map((useCase, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>

                  {skill.tools && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-indigo-500" />
                        Tools & Extensions
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

                  <div className="mt-4 flex items-center gap-4">
                    <div>
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Type:
                      </span>{' '}
                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                          skill.type === 'SQL'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : skill.type === 'NoSQL'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : skill.type === 'Cloud'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
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
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Database
