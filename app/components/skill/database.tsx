import {
  IconBrandFirebase,
  IconBrandMongodb,
  IconBrandMysql,
} from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { BiLogoPostgresql } from 'react-icons/bi'
import { SiRedis } from 'react-icons/si'
import SkillCard from './skill-card'

interface DatabaseSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  type: 'SQL' | 'NoSQL' | 'Cache' | 'Search' | 'Cloud'
  icon: React.FC<{ className?: string; stroke?: number }>
  features: string[]
  useCases: string[]
  projects?: number
  tools?: string[]
}

const databaseSkills: DatabaseSkill[] = [
  {
    id: 'mongodb',
    title: 'MongoDB',
    proficiency: 90,
    experience: '4+ years',
    description: 'Document-oriented NoSQL database with high scalability',
    type: 'NoSQL',
    features: [
      'Document model',
      'Aggregation pipeline',
      'Indexing strategies',
      'Replication & sharding',
    ],
    useCases: [
      'Content management',
      'Real-time analytics',
      'Catalog management',
      'IoT applications',
    ],
    tools: ['Mongoose', 'Compass', 'Atlas', 'Charts'],
    projects: 30,
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#4DB33D] to-[#3F9C35] p-2 shadow-lg">
        <IconBrandMongodb className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    proficiency: 85,
    experience: '3+ years',
    description: 'Advanced open-source relational database',
    type: 'SQL',
    features: [
      'ACID compliance',
      'JSON support',
      'Full-text search',
      'Custom types',
    ],
    useCases: [
      'Complex queries',
      'Financial systems',
      'GIS applications',
      'Analytics platforms',
    ],
    tools: ['pgAdmin', 'PostGIS', 'TimescaleDB'],
    projects: 25,
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#336791] to-[#2F5E8D] p-2 shadow-lg">
        <BiLogoPostgresql className="size-full text-white" />
      </div>
    ),
  },
  {
    id: 'mysql',
    title: 'MySQL',
    proficiency: 80,
    experience: '3+ years',
    description: 'Popular open-source relational database management system',
    type: 'SQL',
    features: ['Replication', 'Partitioning', 'Stored procedures', 'Triggers'],
    useCases: [
      'Web applications',
      'OLTP systems',
      'Data warehousing',
      'E-commerce',
    ],
    tools: ['Workbench', 'phpMyAdmin', 'Adminer'],
    projects: 20,
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#00758F] to-[#F29111] p-2 shadow-lg">
        <IconBrandMysql className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'redis',
    title: 'Redis',
    proficiency: 75,
    experience: '2+ years',
    description:
      'In-memory data structure store used as cache and message broker',
    type: 'Cache',
    features: ['Caching', 'Pub/Sub', 'Data structures', 'Lua scripting'],
    useCases: [
      'Session management',
      'Real-time analytics',
      'Job queues',
      'Leaderboards',
    ],
    tools: ['RedisInsight', 'RedisGraph', 'RedisJSON'],
    projects: 15,
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#DC382D] to-[#C6302A] p-2 shadow-lg">
        <SiRedis className="size-full text-white" />
      </div>
    ),
  },
  {
    id: 'firebase',
    title: 'Firebase',
    proficiency: 85,
    experience: '3+ years',
    description: 'Cloud-hosted NoSQL database with real-time capabilities',
    type: 'Cloud',
    features: [
      'Real-time sync',
      'Offline support',
      'Security rules',
      'Cloud functions',
    ],
    useCases: [
      'Mobile apps',
      'Real-time chat',
      'Collaborative apps',
      'Social features',
    ],
    tools: ['Admin SDK', 'Security Rules', 'Extensions'],
    projects: 18,
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#FFCA28] to-[#FFA000] p-2 shadow-lg">
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
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

export function Database() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={containerRef}
      className="space-y-6 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
          Database Technologies
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Experience with various database systems and data storage solutions
        </p>
      </div>

      <div className="space-y-6">
        {databaseSkills.map((skill) => (
          <motion.div key={skill.id} variants={cardVariants}>
            <SkillCard
              title={skill.title}
              className={skill.id}
              proficiency={skill.proficiency} // Add this
              experience={skill.experience} // Add this
              description={skill.description} // Add this
              isSelected={false} // Optional
              onClick={() => {}} // Optional
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
              className="mt-2 pl-20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <div className="mb-2">
                    <span className="font-medium">Type: </span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        skill.type === 'SQL'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : skill.type === 'NoSQL'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : skill.type === 'Cache'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                              : skill.type === 'Search'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      } `}
                    >
                      {skill.type}
                    </span>
                  </div>
                  <span className="font-medium">Key Features:</span>
                  <ul className="mt-1 list-inside list-disc">
                    {skill.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mb-2">
                    <span className="font-medium">Common Use Cases:</span>
                    <ul className="mt-1 list-inside list-disc">
                      {skill.useCases.map((useCase, index) => (
                        <li key={index}>{useCase}</li>
                      ))}
                    </ul>
                  </div>
                  {skill.tools && (
                    <div className="mb-2">
                      <span className="font-medium">Tools & Extensions:</span>
                      <ul className="mt-1 list-inside list-disc">
                        {skill.tools.map((tool, index) => (
                          <li key={index}>{tool}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Projects Completed:</span>{' '}
                    {skill.projects}
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
