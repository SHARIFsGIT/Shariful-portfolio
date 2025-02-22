import {
  IconBrandGolang,
  IconBrandNodejs
} from '@tabler/icons-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  SiApachekafka,
  SiKubernetes,
  SiNestjs
} from 'react-icons/si'
import SkillCard from './skill-card'

interface BackendSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  type: 'Runtime' | 'Framework' | 'DevOps' | 'Database' | 'Cloud' | 'Messaging'
  icon: React.FC<{ className?: string; stroke?: number }>
  projects?: number
  features: string[]
  frameworks?: string[]
  libraries?: string[]
  performance?: {
    throughput?: string
    latency?: string
    scalability?: string
  }
  certifications?: string[]
  bestPractices?: string[]
  architecturePatterns?: string[]
  securityFeatures?: string[]
}

const backendSkills: BackendSkill[] = [
  {
    id: 'nodejs',
    title: 'Node.js',
    proficiency: 90,
    experience: '4+ years',
    type: 'Runtime',
    description:
      'Building high-performance server-side applications with Node.js ecosystem',
    features: [
      'Event-driven architecture',
      'RESTful APIs',
      'Microservices',
      'Performance optimization',
      'Cluster module',
      'Worker threads',
      'Stream processing',
      'Memory management',
    ],
    frameworks: ['Express.js', 'NestJS', 'Fastify', 'Koa', 'Hapi'],
    libraries: [
      'Prisma',
      'Sequelize',
      'Mongoose',
      'Bull',
      'Jest',
      'Winston',
      'PM2',
    ],
    projects: 25,
    performance: {
      throughput: '10k req/sec',
      latency: '<100ms',
      scalability: 'Horizontal',
    },
    certifications: [
      'Node.js Application Developer',
      'Node.js Services Developer',
    ],
    bestPractices: [
      'Async/Await patterns',
      'Error handling',
      'Memory optimization',
      'Security practices',
    ],
    architecturePatterns: [
      'MVC',
      'Repository pattern',
      'Factory pattern',
      'Dependency injection',
    ],
    securityFeatures: [
      'Rate limiting',
      'Input validation',
      'JWT authentication',
      'CORS policies',
    ],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#539E43] to-[#76B063] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandNodejs className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'go',
    title: 'Golang',
    proficiency: 85,
    experience: '3+ years',
    type: 'Runtime',
    description: 'Building high-performance concurrent applications with Go',
    features: [
      'Goroutines',
      'Channels',
      'Memory management',
      'Cross-compilation',
      'Built-in testing',
      'Performance profiling',
      'Standard library',
    ],
    frameworks: ['Gin', 'Echo', 'Fiber', 'Chi'],
    libraries: ['GORM', 'sqlx', 'zap', 'testify'],
    projects: 20,
    performance: {
      throughput: '50k req/sec',
      latency: '<20ms',
      scalability: 'Horizontal',
    },
    certifications: ['Go Developer Certificate'],
    bestPractices: [
      'Error handling',
      'Interface design',
      'Concurrency patterns',
      'Memory management',
    ],
    architecturePatterns: [
      'Clean architecture',
      'DDD',
      'CQRS',
      'Event sourcing',
    ],
    securityFeatures: [
      'Context handling',
      'Secure defaults',
      'Memory safety',
      'Built-in crypto',
    ],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#00ADD8] to-[#0087B3] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandGolang className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'nestjs',
    title: 'NestJS',
    proficiency: 88,
    experience: '3+ years',
    type: 'Framework',
    description: 'Enterprise-ready Node.js framework with robust architecture',
    features: [
      'Dependency injection',
      'Module architecture',
      'TypeScript integration',
      'OpenAPI (Swagger)',
      'Microservices',
      'WebSocket support',
      'Task scheduling',
      'GraphQL support',
    ],
    projects: 15,
    frameworks: ['Express.js', 'Fastify'],
    libraries: [
      'TypeORM',
      'Mongoose',
      '@nestjs/graphql',
      '@nestjs/bull',
      '@nestjs/microservices',
    ],
    performance: {
      throughput: '8k req/sec',
      latency: '<80ms',
      scalability: 'Horizontal',
    },
    certifications: ['NestJS Fundamentals', 'Enterprise Node.js Architecture'],
    bestPractices: [
      'SOLID principles',
      'Clean architecture',
      'Testing strategies',
      'Exception filters',
    ],
    architecturePatterns: [
      'Repository pattern',
      'Factory pattern',
      'Adapter pattern',
      'Observer pattern',
    ],
    securityFeatures: [
      'Guards',
      'JWT strategy',
      'Role-based access',
      'Helmet integration',
    ],
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#E0234E] to-[#FF4B6B] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <SiNestjs className="size-full text-white" />
      </div>
    ),
  },
  {
    id: 'kafka',
    title: 'Apache Kafka',
    proficiency: 82,
    experience: '2+ years',
    type: 'Messaging',
    description:
      'Distributed event streaming platform for high-throughput data pipelines',
    features: [
      'Event streaming',
      'Message broking',
      'Stream processing',
      'Fault tolerance',
      'Scalable architecture',
      'Real-time processing',
      'Data integration',
    ],
    projects: 12,
    frameworks: ['Kafka Streams', 'KSQL', 'Kafka Connect'],
    libraries: ['node-rdkafka', 'kafkajs', 'Spring Kafka'],
    performance: {
      throughput: '1M msg/sec',
      latency: '<10ms',
      scalability: 'Horizontal',
    },
    bestPractices: [
      'Partition strategy',
      'Consumer groups',
      'Replication factor',
      'Topic design',
    ],
    architecturePatterns: [
      'Event sourcing',
      'CQRS',
      'Pub/Sub pattern',
      'Streaming ETL',
    ],
    securityFeatures: ['SSL/TLS', 'SASL auth', 'ACLs', 'Encryption'],
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#000000] to-[#444444] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <SiApachekafka className="size-full text-white" />
      </div>
    ),
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes',
    proficiency: 85,
    experience: '3+ years',
    type: 'DevOps',
    description:
      'Container orchestration platform for scalable microservices architecture',
    features: [
      'Container orchestration',
      'Service discovery',
      'Load balancing',
      'Auto-scaling',
      'Rolling updates',
      'Health monitoring',
      'Resource management',
      'Secret management',
    ],
    projects: 18,
    frameworks: ['Helm', 'Istio', 'Prometheus', 'Grafana'],
    libraries: ['client-go', 'kubectl', 'kubeadm'],
    performance: {
      throughput: 'Configurable',
      latency: 'Policy-based',
      scalability: 'Elastic',
    },
    certifications: ['CKA', 'CKAD', 'CKS'],
    bestPractices: [
      'Resource quotas',
      'Network policies',
      'Pod security',
      'High availability',
    ],
    architecturePatterns: [
      'Sidecar pattern',
      'Ambassador pattern',
      'Multi-cluster',
      'GitOps',
    ],
    securityFeatures: [
      'RBAC',
      'Network policies',
      'Pod security',
      'Secret management',
    ],
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#326CE5] to-[#2951A3] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <SiKubernetes className="size-full text-white" />
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

export function Backend() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<string>('all')

  const filteredSkills =
    filterType === 'all'
      ? backendSkills
      : backendSkills.filter((skill) => skill.type === filterType)

  const types = ['all', ...new Set(backendSkills.map((skill) => skill.type))]

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
          Backend Development
        </h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          Enterprise-grade server-side technologies and frameworks for building
          scalable applications
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

                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-purple-500" />
                      Architecture Patterns
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {skill.architecturePatterns?.map((pattern, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-gray-400" />
                          {pattern}
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
                </div>

                <div className="space-y-4">
                  {skill.securityFeatures && (
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
                  )}

                  {skill.frameworks && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        Frameworks & Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.frameworks.map((framework, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          >
                            {framework}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {skill.libraries && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-indigo-500" />
                        Key Libraries
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.libraries.map((library, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                          >
                            {library}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {skill.bestPractices && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-yellow-500" />
                        Best Practices
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.bestPractices.map((practice, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          >
                            {practice}
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
                          skill.type === 'Runtime'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : skill.type === 'Framework'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : skill.type === 'DevOps'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                : skill.type === 'Messaging'
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
