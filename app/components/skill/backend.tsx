import {
  IconBrandGraphql,
  IconBrandNodejs,
  IconBrandSocketIo,
} from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { SiExpress, SiNestjs } from 'react-icons/si'
import SkillCard from './skill-card'

interface BackendSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  icon: React.FC<{ className?: string; stroke?: number }>
  projects?: number
  features: string[]
  frameworks?: string[]
  libraries?: string[]
}

const backendSkills: BackendSkill[] = [
  {
    id: 'nodejs',
    title: 'Node.js',
    proficiency: 90,
    experience: '4+ years',
    description:
      'Building scalable server-side applications with Node.js ecosystem',
    features: [
      'Event-driven architecture',
      'RESTful APIs',
      'Microservices',
      'Performance optimization',
    ],
    frameworks: ['Express.js', 'NestJS', 'Fastify'],
    libraries: ['Prisma', 'Sequelize', 'Mongoose'],
    projects: 25,
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#539E43] to-[#76B063] p-2 shadow-lg">
        <IconBrandNodejs className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'express',
    title: 'Express.js',
    proficiency: 85,
    experience: '4+ years',
    description: 'Fast, unopinionated web framework for Node.js',
    features: [
      'Middleware architecture',
      'Routing system',
      'Error handling',
      'Template engines',
    ],
    projects: 20,
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-gray-800 to-gray-600 p-2 shadow-lg">
        <SiExpress className="size-full text-white" />
      </div>
    ),
  },
  {
    id: 'nestjs',
    title: 'NestJS',
    proficiency: 80,
    experience: '2+ years',
    description: 'Progressive Node.js framework for scalable applications',
    features: [
      'Dependency injection',
      'Module architecture',
      'TypeScript integration',
      'OpenAPI (Swagger)',
    ],
    projects: 15,
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#E0234E] to-[#FF4B6B] p-2 shadow-lg">
        <SiNestjs className="size-full text-white" />
      </div>
    ),
  },
  {
    id: 'graphql',
    title: 'GraphQL',
    proficiency: 75,
    experience: '2+ years',
    description: 'Query language for APIs and runtime for executing queries',
    features: [
      'Schema design',
      'Resolvers',
      'Type system',
      'Query optimization',
    ],
    projects: 10,
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#E535AB] to-[#F767BC] p-2 shadow-lg">
        <IconBrandGraphql className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'socketio',
    title: 'Socket.IO',
    proficiency: 70,
    experience: '3+ years',
    description: 'Real-time bidirectional event-based communication',
    features: [
      'WebSocket protocol',
      'Room management',
      'Event handling',
      'Fallback transport',
    ],
    projects: 8,
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-gray-700 to-gray-500 p-2 shadow-lg">
        <IconBrandSocketIo className="size-full text-white" {...props} />
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

export function Backend() {
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
          Backend Development
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Server-side technologies and frameworks for building robust
          applications
        </p>
      </div>

      <div className="space-y-6">
        {backendSkills.map((skill) => (
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
                  <span className="font-medium">Key Features:</span>
                  <ul className="mt-1 list-inside list-disc">
                    {skill.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  {skill.frameworks && (
                    <div className="mb-2">
                      <span className="font-medium">Popular Frameworks:</span>
                      <ul className="mt-1 list-inside list-disc">
                        {skill.frameworks.map((framework, index) => (
                          <li key={index}>{framework}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {skill.libraries && (
                    <div className="mb-2">
                      <span className="font-medium">Key Libraries:</span>
                      <ul className="mt-1 list-inside list-disc">
                        {skill.libraries.map((library, index) => (
                          <li key={index}>{library}</li>
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
