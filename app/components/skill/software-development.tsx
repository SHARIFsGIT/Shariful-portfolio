import { motion, useInView } from 'framer-motion'
import { Braces, Code, GitBranch, Lock, LucideIcon, Server, Shield } from 'lucide-react'
import React, { useRef, useState } from 'react'

// Types
interface SoftwareDevelopmentSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  type:
    | 'Programming Language'
    | 'Version Control'
    | 'Cloud'
    | 'Security'
    | 'Architecture'
    | 'Methodology'
  icon: LucideIcon
  projects?: number
  features: string[]
  tools?: string[]
  libraries?: string[]
  performance?: {
    efficiency?: string
    scalability?: string
    complexity?: string
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
const softwareDevelopmentSkills: SoftwareDevelopmentSkill[] = [
  {
    id: 'typescript',
    title: 'TypeScript',
    proficiency: 92,
    experience: '3+ years',
    type: 'Programming Language',
    description:
      'Typed superset of JavaScript for large-scale application development',
    features: [
      'Static typing',
      'Object-oriented programming',
      'Generics',
      'Type inference',
      'Compile-time checks',
      'Advanced type system',
      'Decorator support',
      'Modularity',
    ],
    tools: ['TSC', 'Babel', 'ESLint', 'Prettier', 'ts-node', 'Webpack'],
    libraries: ['TypeORM', 'Inversify', 'RxJS', 'Zod', 'TypeGraphQL', 'Prisma'],
    projects: 25,
    performance: {
      efficiency: 'High performance',
      scalability: 'Enterprise-grade',
      complexity: 'Advanced type management',
    },
    bestPractices: [
      'Strict typing',
      'Interfaces design',
      'Code refactoring',
      'Type composition',
    ],
    architecturePatterns: [
      'Dependency injection',
      'Composition over inheritance',
      'Functional programming',
      'Generic programming',
    ],
    icon: Braces,
  },
  {
    id: 'git',
    title: 'Git',
    proficiency: 95,
    experience: '4+ years',
    type: 'Version Control',
    description: 'Distributed version control system for tracking code changes',
    features: [
      'Distributed workflow',
      'Branching and merging',
      'Staging area',
      'Commit history',
      'Remote repositories',
      'Pull requests',
      'Code review',
      'Conflict resolution',
    ],
    tools: [
      'GitHub',
      'GitLab',
      'Bitbucket',
      'GitHub CLI',
      'Git Kraken',
      'SourceTree',
    ],
    libraries: ['Husky', 'lint-staged', 'commitlint', 'git-cz'],
    projects: 50,
    performance: {
      efficiency: 'High collaboration',
      scalability: 'Unlimited repositories',
      complexity: 'Advanced workflow management',
    },
    bestPractices: [
      'Branching strategies',
      'Commit message conventions',
      'Code review processes',
      'Continuous integration',
    ],
    architecturePatterns: [
      'Gitflow',
      'Trunk-based development',
      'Feature branch workflow',
      'Monorepo management',
    ],
    icon: GitBranch,
  },
  {
    id: 'aws',
    title: 'Amazon Web Services',
    proficiency: 85,
    experience: '2+ years',
    type: 'Cloud',
    description:
      'Cloud computing platform for scalable and flexible infrastructure',
    features: [
      'Compute services',
      'Storage solutions',
      'Database management',
      'Serverless computing',
      'Containerization',
      'Machine learning',
      'Security services',
      'Global infrastructure',
    ],
    tools: [
      'EC2',
      'S3',
      'Lambda',
      'ECS',
      'RDS',
      'CloudFormation',
      'Route 53',
      'CloudWatch',
    ],
    libraries: ['AWS SDK', 'Boto3', 'AWS CDK', 'Serverless Framework'],
    projects: 15,
    performance: {
      efficiency: 'High scalability',
      scalability: 'Enterprise-level',
      complexity: 'Advanced cloud management',
    },
    bestPractices: [
      'Infrastructure as Code',
      'Cost optimization',
      'Security configurations',
      'Architectural design',
    ],
    architecturePatterns: [
      'Microservices',
      'Serverless architecture',
      'Event-driven design',
      'Multi-region deployment',
    ],
    icon: Server,
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    proficiency: 80,
    experience: '2+ years',
    type: 'Security',
    description:
      'Comprehensive approach to protecting systems, networks, and programs',
    features: [
      'Threat modeling',
      'Penetration testing',
      'Encryption',
      'Authentication',
      'Access control',
      'Security auditing',
      'Incident response',
      'Compliance management',
    ],
    tools: [
      'OWASP ZAP',
      'Burp Suite',
      'Wireshark',
      'Metasploit',
      'Nmap',
      'Snort',
    ],
    libraries: ['OWASP Dependency-Check', 'Passport.js', 'Helmet.js', 'jose'],
    projects: 10,
    performance: {
      efficiency: 'Proactive protection',
      scalability: 'Enterprise security',
      complexity: 'Advanced threat mitigation',
    },
    bestPractices: [
      'Security by design',
      'Continuous monitoring',
      'Threat assessment',
      'Vulnerability management',
    ],
    architecturePatterns: [
      'Zero trust',
      'Defense in depth',
      'Principle of least privilege',
      'Secure software development',
    ],
    icon: Lock,
  },
  {
    id: 'design-patterns',
    title: 'Software Architecture',
    proficiency: 88,
    experience: '3+ years',
    type: 'Architecture',
    description: 'Advanced software design and architectural principles',
    features: [
      'SOLID principles',
      'Design patterns',
      'Clean architecture',
      'Domain-driven design',
      'Microservices',
      'Event-driven architecture',
      'Modular design',
      'Scalable systems',
    ],
    tools: [
      'PlantUML',
      'Draw.io',
      'Lucidchart',
      'Archimate',
      'Enterprise Architect',
    ],
    libraries: [
      'Domain-driven design libs',
      'Clean Architecture tools',
      'Design pattern catalogs',
    ],
    projects: 20,
    performance: {
      efficiency: 'High maintainability',
      scalability: 'Enterprise-level design',
      complexity: 'Advanced architectural thinking',
    },
    bestPractices: [
      'Modular design',
      'Separation of concerns',
      'Dependency inversion',
      'Architectural documentation',
    ],
    architecturePatterns: [
      'Microservices',
      'Hexagonal architecture',
      'Event sourcing',
      'CQRS',
    ],
    icon: Code,
  },
  {
    id: 'agile',
    title: 'Agile Methodologies',
    proficiency: 90,
    experience: '4+ years',
    type: 'Methodology',
    description:
      'Iterative approach to software development and project management',
    features: [
      'Scrum framework',
      'Kanban workflow',
      'Sprint planning',
      'Daily standup',
      'Retrospectives',
      'Continuous improvement',
      'Team collaboration',
      'Adaptive planning',
    ],
    tools: ['Jira', 'Trello', 'Asana', 'Linear', 'Monday.com', 'Confluence'],
    libraries: [
      'Agile tracking tools',
      'Productivity enhancers',
      'Collaboration platforms',
    ],
    projects: 40,
    performance: {
      efficiency: 'Continuous delivery',
      scalability: 'Team adaptability',
      complexity: 'Advanced project management',
    },
    bestPractices: [
      'Iterative development',
      'Customer collaboration',
      'Responding to change',
      'Continuous feedback',
    ],
    architecturePatterns: [
      'Scrum',
      'Kanban',
      'Extreme Programming',
      'Lean development',
    ],
    icon: Shield,
  },
]

// Main component
const SoftwareDevelopment = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<string>('all')

  const filteredSkills =
    filterType === 'all'
      ? softwareDevelopmentSkills
      : softwareDevelopmentSkills.filter((skill) => skill.type === filterType)

  const types = [
    'all',
    ...new Set(softwareDevelopmentSkills.map((skill) => skill.type)),
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
          Comprehensive skills in modern software development, from programming
          to methodology
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
                            skill.type === 'Programming Language'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : skill.type === 'Version Control'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : skill.type === 'Cloud'
                                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                  : skill.type === 'Security'
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                    : skill.type === 'Architecture'
                                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
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

export default SoftwareDevelopment
