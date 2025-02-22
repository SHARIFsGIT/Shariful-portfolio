import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandRedux,
  IconBrandTailwind
} from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { SiJest, SiTypescript } from 'react-icons/si'
import SkillCard from './skill-card'

interface FrontendSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  category: 'Framework' | 'Library' | 'Testing' | 'State Management' | 'Styling'
  icon: React.FC<{ className?: string; stroke?: number }>
  features: string[]
  tools: string[]
  projects?: number
  relatedTech?: string[]
}

const frontendSkills: FrontendSkill[] = [
  {
    id: 'react',
    title: 'React',
    proficiency: 95,
    experience: '4+ years',
    description: 'Building modern web applications with React ecosystem',
    category: 'Framework',
    features: [
      'Component architecture',
      'Hooks system',
      'Virtual DOM',
      'Server Components',
    ],
    tools: [
      'Create React App',
      'React DevTools',
      'React Router',
      'React Query',
    ],
    relatedTech: ['Redux', 'MobX', 'React Native'],
    projects: 40,
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#61DAFB] to-[#00B7FF] p-2 shadow-lg">
        <IconBrandReact className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    proficiency: 90,
    experience: '3+ years',
    description: 'React framework for production-grade applications',
    category: 'Framework',
    features: [
      'Server-side rendering',
      'Static site generation',
      'API routes',
      'Image optimization',
    ],
    tools: ['Vercel', 'Next Auth', 'SWR', 'Next SEO'],
    projects: 25,
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 p-2 shadow-lg">
        <IconBrandNextjs className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    proficiency: 88,
    experience: '3+ years',
    description: 'Static typing for enhanced development experience',
    category: 'Library',
    features: ['Type system', 'Interfaces', 'Generics', 'Decorators'],
    tools: ['TSC', 'TSLint', 'TS-Node', 'Type-Fest'],
    projects: 35,
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#007ACC] to-[#0058CC] p-2 shadow-lg">
        <SiTypescript className="size-full text-white" />
      </div>
    ),
  },
  {
    id: 'tailwind',
    title: 'Tailwind CSS',
    proficiency: 92,
    experience: '2+ years',
    description: 'Utility-first CSS framework for rapid UI development',
    category: 'Styling',
    features: [
      'Utility classes',
      'JIT compiler',
      'Custom plugins',
      'Responsive design',
    ],
    tools: ['PostCSS', 'Tailwind Config', 'DaisyUI', 'Headless UI'],
    projects: 30,
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] p-2 shadow-lg">
        <IconBrandTailwind className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'redux',
    title: 'Redux Toolkit',
    proficiency: 85,
    experience: '3+ years',
    description: 'State management solution for React applications',
    category: 'State Management',
    features: [
      'Immutable updates',
      'Action creators',
      'Thunk middleware',
      'DevTools',
    ],
    tools: ['Redux DevTools', 'RTK Query', 'Reselect', 'Redux Saga'],
    projects: 20,
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#764ABC] to-[#9F7AEA] p-2 shadow-lg">
        <IconBrandRedux className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'testing',
    title: 'Testing Tools',
    proficiency: 80,
    experience: '2+ years',
    description: 'Comprehensive testing solutions for frontend applications',
    category: 'Testing',
    features: [
      'Unit testing',
      'Integration tests',
      'E2E testing',
      'Component testing',
    ],
    tools: ['Jest', 'React Testing Library', 'Cypress', 'Vitest'],
    projects: 25,
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#99425B] to-[#BA5374] p-2 shadow-lg">
        <SiJest className="size-full text-white" />
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

export function Frontend() {
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
          Frontend Development
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Modern frontend technologies and frameworks for building user
          interfaces
        </p>
      </div>

      <div className="space-y-6">
        {frontendSkills.map((skill) => (
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
                        skill.category === 'Framework'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : skill.category === 'Library'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : skill.category === 'Testing'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                              : skill.category === 'State Management'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
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
                  <div className="mb-2">
                    <span className="font-medium">Tools & Libraries:</span>
                    <ul className="mt-1 list-inside list-disc">
                      {skill.tools.map((tool, index) => (
                        <li key={index}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                  {skill.relatedTech && (
                    <div className="mb-2">
                      <span className="font-medium">Related Technologies:</span>
                      <ul className="mt-1 list-inside list-disc">
                        {skill.relatedTech.map((tech, index) => (
                          <li key={index}>{tech}</li>
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
