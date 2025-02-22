import {
  IconBrandMongodb
} from '@tabler/icons-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { BiLogoPostgresql } from 'react-icons/bi'
import {
  SiAmazondynamodb,
  SiElasticsearch,
  SiRedis
} from 'react-icons/si'
import SkillCard from './skill-card'

interface DatabaseSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  type: 'SQL' | 'NoSQL' | 'Cache' | 'Search' | 'Cloud' | 'Graph' | 'Time Series'
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
  certifications?: string[]
  bestPractices?: string[]
}

const databaseSkills: DatabaseSkill[] = [
  {
    id: 'mongodb',
    title: 'MongoDB',
    proficiency: 90,
    experience: '4+ years',
    description:
      'Enterprise-grade document database with comprehensive ecosystem',
    type: 'NoSQL',
    features: [
      'Document model',
      'Aggregation pipeline',
      'Indexing strategies',
      'Replication & sharding',
      'Change streams',
      'Multi-document ACID',
      'Field-level encryption',
    ],
    useCases: [
      'Content management',
      'Real-time analytics',
      'Catalog management',
      'IoT applications',
      'Mobile applications',
      'Gaming leaderboards',
    ],
    tools: ['Mongoose', 'Compass', 'Atlas', 'Charts', 'Realm'],
    projects: 30,
    performance: {
      throughput: '100k ops/sec',
      latency: '<10ms',
      scalability: 'Horizontal',
    },
    certifications: ['MongoDB Developer', 'MongoDB DBA'],
    bestPractices: [
      'Schema validation',
      'Index optimization',
      'Data modeling patterns',
      'Security best practices',
    ],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#4DB33D] to-[#3F9C35] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandMongodb className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    proficiency: 85,
    experience: '3+ years',
    description:
      'Advanced open-source relational database with enterprise features',
    type: 'SQL',
    features: [
      'ACID compliance',
      'JSON/JSONB support',
      'Full-text search',
      'Custom types & extensions',
      'Materialized views',
      'Parallel query execution',
      'Native partitioning',
    ],
    useCases: [
      'Complex queries',
      'Financial systems',
      'GIS applications',
      'Analytics platforms',
      'OLTP workloads',
      'Scientific computing',
    ],
    tools: [
      'pgAdmin',
      'PostGIS',
      'TimescaleDB',
      'pg_stat_statements',
      'pg_partman',
    ],
    projects: 25,
    performance: {
      throughput: '50k tps',
      latency: '<5ms',
      scalability: 'Vertical/Horizontal',
    },
    certifications: ['PostgreSQL Administration'],
    bestPractices: [
      'Query optimization',
      'Indexing strategies',
      'Vacuum management',
      'High availability setup',
    ],
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#336791] to-[#2F5E8D] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <BiLogoPostgresql className="size-full text-white" />
      </div>
    ),
  },
  {
    id: 'elasticsearch',
    title: 'Elasticsearch',
    proficiency: 82,
    experience: '3+ years',
    description: 'Distributed search and analytics engine',
    type: 'Search',
    features: [
      'Full-text search',
      'Aggregations',
      'Machine learning',
      'Anomaly detection',
      'Visualization',
      'RESTful API',
      'Multi-tenancy',
    ],
    useCases: [
      'Search engines',
      'Log analytics',
      'Security analytics',
      'Business analytics',
      'Application monitoring',
    ],
    tools: ['Kibana', 'Logstash', 'Beats', 'APM'],
    projects: 20,
    performance: {
      throughput: '10k docs/sec',
      latency: '<100ms',
      scalability: 'Horizontal',
    },
    certifications: ['Elastic Certified Engineer'],
    bestPractices: [
      'Mapping optimization',
      'Shard management',
      'Query optimization',
      'Indexing strategies',
    ],
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#343741] to-[#00BFB3] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <SiElasticsearch className="size-full text-white" />
      </div>
    ),
  },
  {
    id: 'redis',
    title: 'Redis',
    proficiency: 85,
    experience: '3+ years',
    description: 'Advanced in-memory data structure store with persistence',
    type: 'Cache',
    features: [
      'Caching',
      'Pub/Sub messaging',
      'Data structures',
      'Lua scripting',
      'Transactions',
      'Persistence',
      'Clustering',
    ],
    useCases: [
      'Session management',
      'Real-time analytics',
      'Job queues',
      'Leaderboards',
      'Rate limiting',
      'Real-time geospatial',
    ],
    tools: [
      'RedisInsight',
      'RedisGraph',
      'RedisJSON',
      'RediSearch',
      'RedisTimeSeries',
    ],
    projects: 22,
    performance: {
      throughput: '1M ops/sec',
      latency: '<1ms',
      scalability: 'Cluster',
    },
    certifications: ['Redis Certified Developer'],
    bestPractices: [
      'Memory optimization',
      'Eviction policies',
      'Persistence config',
      'Security setup',
    ],
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#DC382D] to-[#C6302A] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <SiRedis className="size-full text-white" />
      </div>
    ),
  },
  {
    id: 'dynamodb',
    title: 'DynamoDB',
    proficiency: 80,
    experience: '2+ years',
    description:
      'Fully managed NoSQL database service with serverless capabilities',
    type: 'Cloud',
    features: [
      'Auto-scaling',
      'Point-in-time recovery',
      'Global tables',
      'Transactions',
      'DAX caching',
      'Backup & restore',
      'Serverless',
    ],
    useCases: [
      'Serverless apps',
      'Gaming applications',
      'IoT data ingestion',
      'Session management',
      'High-scale events',
    ],
    tools: [
      'DynamoDB Streams',
      'AWS Console',
      'CLI',
      'CloudWatch',
      'NoSQL Workbench',
    ],
    projects: 15,
    performance: {
      throughput: 'Auto-scaling',
      latency: '<10ms',
      scalability: 'Automatic',
    },
    certifications: ['AWS Developer Associate'],
    bestPractices: [
      'Key design patterns',
      'Capacity planning',
      'Cost optimization',
      'Access patterns',
    ],
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#527FFF] to-[#4B4DED] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <SiAmazondynamodb className="size-full text-white" />
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
          Comprehensive experience with modern database systems and data storage
          solutions
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
              {type.charAt(0).toUpperCase() + type.slice(1)}
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

                  {skill.certifications && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Certifications
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.certifications.map((cert, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                          >
                            {cert}
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
                              : skill.type === 'Cache'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                : skill.type === 'Search'
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
