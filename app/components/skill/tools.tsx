import {
  IconBrandDocker,
  IconBrandFigma,
  IconBrandGit,
  IconBrandGithub,
  IconBrandVscode
} from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { useRef } from 'react'
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
    ],
    workflows: [
      'Feature branch workflow',
      'Gitflow workflow',
      'Forking workflow',
    ],
    projects: 50,
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#F54D27] to-[#F76D47] p-2 shadow-lg">
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
    ],
    integrations: ['GitHub Actions', 'GitHub Pages', 'GitHub Packages'],
    projects: 45,
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 p-2 shadow-lg">
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
    ],
    integrations: ['ESLint', 'Prettier', 'GitLens', 'Live Server'],
    projects: 60,
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#0066B8] to-[#007ACC] p-2 shadow-lg">
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
    ],
    workflows: [
      'Development environments',
      'CI/CD pipelines',
      'Microservices deployment',
    ],
    projects: 20,
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#2496ED] to-[#2684FF] p-2 shadow-lg">
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
    ],
    workflows: ['API documentation', 'Team collaboration', 'Automated testing'],
    projects: 35,
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#FF6C37] to-[#FF8C37] p-2 shadow-lg">
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
    ],
    workflows: ['Design handoff', 'Team collaboration', 'Design reviews'],
    projects: 25,
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#F24E1E] to-[#FF7262] p-2 shadow-lg">
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

export function Tools() {
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
          Development Tools
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Essential tools and utilities for modern software development
        </p>
      </div>

      <div className="space-y-6">
        {toolSkills.map((skill) => (
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
                    <span className="font-medium">Category: </span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        skill.category === 'Version Control'
                          ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                          : skill.category === 'Design'
                            ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                            : skill.category === 'Development'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : skill.category === 'DevOps'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      } `}
                    >
                      {skill.category}
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
                  {skill.workflows && (
                    <div className="mb-2">
                      <span className="font-medium">Common Workflows:</span>
                      <ul className="mt-1 list-inside list-disc">
                        {skill.workflows.map((workflow, index) => (
                          <li key={index}>{workflow}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {skill.integrations && (
                    <div className="mb-2">
                      <span className="font-medium">Key Integrations:</span>
                      <ul className="mt-1 list-inside list-disc">
                        {skill.integrations.map((integration, index) => (
                          <li key={index}>{integration}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Projects Using Tool:</span>{' '}
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
