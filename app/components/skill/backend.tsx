import {
  IconBrandDjango,
  IconBrandDocker,
  IconBrandGitlab,
  IconBrandPython,
  IconCamera,
} from '@tabler/icons-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import SkillCard from './skill-card'

interface BackendSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  type: 'Framework' | 'Machine Learning' | 'Computer Vision' | 'DevOps'
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
  bestPractices?: string[]
  architecturePatterns?: string[]
  securityFeatures?: string[]
}

const backendSkills: BackendSkill[] = [
  {
    id: 'django',
    title: 'Django',
    proficiency: 88,
    experience: '3+ years',
    type: 'Framework',
    description:
      'High-level Python web framework emphasizing rapid development',
    features: [
      'ORM system',
      'Admin interface',
      'Authentication',
      'URL routing',
      'Form handling',
      'Template engine',
      'Cache framework',
      'Security features',
    ],
    frameworks: [
      'Django REST',
      'Django Channels',
      'Celery',
      'DRF',
      'Django CMS',
    ],
    libraries: [
      'Django Debug Toolbar',
      'Django Filters',
      'Django CORS',
      'Django OAuth',
      'Django Extensions',
    ],
    projects: 20,
    performance: {
      throughput: '5k req/sec',
      latency: '<100ms',
      scalability: 'Horizontal',
    },
    bestPractices: [
      'App structure',
      'Model design',
      'Security settings',
      'Performance tuning',
    ],
    architecturePatterns: [
      'MVT pattern',
      'Service layer',
      'Repository pattern',
      'Factory pattern',
    ],
    securityFeatures: [
      'CSRF protection',
      'XSS prevention',
      'SQL injection',
      'Authentication',
    ],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#092E20] to-[#0C4B33] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandDjango className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'pytorch',
    title: 'PyTorch',
    proficiency: 85,
    experience: '2+ years',
    type: 'Machine Learning',
    description: 'Deep learning framework for research and production',
    features: [
      'Dynamic graphs',
      'GPU acceleration',
      'Neural networks',
      'Autograd system',
      'Distributed training',
      'Model deployment',
      'Custom layers',
      'Data parallelism',
    ],
    frameworks: [
      'TorchVision',
      'TorchText',
      'TorchAudio',
      'FastAI',
      'Lightning',
    ],
    libraries: ['NumPy', 'Pandas', 'scikit-learn', 'Matplotlib', 'TensorBoard'],
    projects: 15,
    performance: {
      throughput: 'GPU optimized',
      latency: 'Model dependent',
      scalability: 'Distributed',
    },
    bestPractices: [
      'Model architecture',
      'Loss functions',
      'Optimization',
      'Regularization',
    ],
    architecturePatterns: ['CNN', 'RNN', 'Transformers', 'GAN'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#EE4C2C] to-[#FF3709] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandPython className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'opencv',
    title: 'OpenCV',
    proficiency: 82,
    experience: '2+ years',
    type: 'Computer Vision',
    description: 'Computer vision and image processing library',
    features: [
      'Image processing',
      'Object detection',
      'Feature extraction',
      'Video analysis',
      'Camera calibration',
      'Machine learning',
      'Deep learning',
      'GUI features',
    ],
    frameworks: ['NumPy', 'MediaPipe', 'TensorFlow', 'PyTorch Vision'],
    libraries: ['Matplotlib', 'PIL/Pillow', 'scikit-image', 'Dlib'],
    projects: 12,
    performance: {
      throughput: 'Real-time capable',
      latency: '<30ms',
      scalability: 'CPU/GPU',
    },
    bestPractices: [
      'Image preprocessing',
      'Algorithm selection',
      'Performance tuning',
      'Error handling',
    ],
    architecturePatterns: [
      'Pipeline pattern',
      'Filter chain',
      'Observer pattern',
      'Strategy pattern',
    ],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#5C3EE8] to-[#2717F5] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconCamera className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'docker',
    title: 'Docker',
    proficiency: 80,
    experience: '2+ years',
    type: 'DevOps',
    description: 'Container platform for application deployment',
    features: [
      'Containerization',
      'Image management',
      'Network isolation',
      'Volume management',
      'Docker Compose',
      'Multi-stage builds',
      'Health checks',
      'Resource limits',
    ],
    frameworks: ['Docker Compose', 'Docker Swarm', 'Portainer', 'Watchtower'],
    libraries: ['Docker SDK', 'Docker API', 'Docker CLI', 'Compose SDK'],
    projects: 18,
    performance: {
      throughput: 'Container specific',
      latency: 'Minimal overhead',
      scalability: 'Horizontal',
    },
    bestPractices: [
      'Image optimization',
      'Security policies',
      'Resource management',
      'Network design',
    ],
    architecturePatterns: [
      'Microservices',
      'Service mesh',
      'Container patterns',
      'Sidecar pattern',
    ],
    securityFeatures: [
      'Container isolation',
      'Network policies',
      'Secret management',
      'Resource limits',
    ],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#2496ED] to-[#2684FF] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandDocker className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'gitlab-cicd',
    title: 'GitLab CI/CD',
    proficiency: 78,
    experience: '2+ years',
    type: 'DevOps',
    description: 'Continuous integration and deployment platform',
    features: [
      'Pipeline automation',
      'Container registry',
      'Artifact management',
      'Environment management',
      'Auto DevOps',
      'Code quality',
      'Security scanning',
      'Release automation',
    ],
    frameworks: [
      'GitLab Runner',
      'GitLab Pages',
      'GitLab Registry',
      'GitLab Kubernetes',
    ],
    libraries: ['GitLab API', 'GitLab SDK', 'CI Lint', 'CI Variables'],
    projects: 15,
    performance: {
      throughput: 'Pipeline dependent',
      latency: 'Job specific',
      scalability: 'Runner based',
    },
    bestPractices: [
      'Pipeline design',
      'Cache usage',
      'Job organization',
      'Security scanning',
    ],
    architecturePatterns: [
      'Pipeline patterns',
      'Multi-stage builds',
      'Deployment strategies',
      'GitOps',
    ],
    securityFeatures: [
      'Secret variables',
      'Protected runners',
      'Security scanning',
      'Access controls',
    ],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#FC6D26] to-[#FCA326] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandGitlab className="size-full text-white" {...props} />
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
          Software Development
        </h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          Modern frameworks and tools for building scalable applications
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

                  <div className="mt-4 flex items-center gap-4">
                    <div>
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Type:
                      </span>{' '}
                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                          skill.type === 'Framework'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : skill.type === 'Machine Learning'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : skill.type === 'Computer Vision'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                : skill.type === 'DevOps'
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

export default Backend
