import {
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandTailwind,
  IconDatabase,
} from '@tabler/icons-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import SkillCard from './skill-card'

interface WebDevelopmentSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  category: 'Frontend' | 'Backend' | 'Full-Stack' | 'Database'
  icon: React.FC<{ className?: string; stroke?: number }>
  keyFeatures: string[]
  tools: string[]
  projects: number
  certifications: string[]
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  usageFrequency: 'Daily' | 'Weekly' | 'Monthly' | 'Occasional'
}

const webDevelopmentSkills: WebDevelopmentSkill[] = [
  {
    id: 'react',
    title: 'React',
    proficiency: 75,
    experience: '3+ years',
    description: 'Modern JavaScript library for building user interfaces',
    category: 'Frontend',
    keyFeatures: [
      'Hooks',
      'Virtual DOM',
      'State management',
      'Server-side rendering',
      'Component-based architecture',
    ],
    tools: ['Vite', 'Next.js', 'Create React App'],
    projects: 25,
    certifications: ['Programming hero'],
    level: 'Intermediate',
    usageFrequency: 'Weekly',
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#61DAFB] to-[#00B4D8] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandReact className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'node',
    title: 'Node.js',
    proficiency: 72,
    experience: '4+ years',
    category: 'Backend',
    description: 'JavaScript runtime for server-side development',
    level: 'Intermediate',
    usageFrequency: 'Weekly',
    keyFeatures: ['NPM ecosystem', 'Middleware support'],
    tools: ['Express.js', 'Nest.js', 'nodemon'],
    projects: 18,
    certifications: ['Programming hero'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#339933] to-[#1F7A1F] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandNodejs className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'mongodb',
    title: 'MongoDB',
    proficiency: 82,
    experience: '3+ years',
    category: 'Database',
    description: 'NoSQL database for scalable applications',
    level: 'Intermediate',
    usageFrequency: 'Weekly',
    keyFeatures: ['Sharding', 'Indexing', 'Document model'],
    tools: ['MongoDB Compass', 'Mongoose'],
    projects: 10,
    certifications: ['Programming hero'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#47A248] to-[#116149] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconDatabase className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    proficiency: 80,
    experience: '1+ years',
    category: 'Full-Stack',
    description: 'React framework for production applications',
    level: 'Advanced',
    usageFrequency: 'Weekly',
    keyFeatures: [
      'API routes',
      'Image optimization',
      'File-system routing',
      'Server-side rendering',
    ],
    tools: ['Vercel', 'TypeScript'],
    projects: 12,
    certifications: ['Programming hero'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#000000] to-[#111111] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandNextjs className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'tailwind',
    title: 'Tailwind CSS',
    proficiency: 90,
    experience: '4+ years',
    category: 'Frontend',
    description: 'CSS framework integrated with HTML',
    level: 'Expert',
    usageFrequency: 'Weekly',
    keyFeatures: [
      'Dark mode',
      'Utility classes',
      'Responsive design',
      'Custom configuration',
    ],
    tools: ['PostCSS'],
    projects: 50,
    certifications: ['Programming hero'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandTailwind className="size-full text-white" {...props} />
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

export function WebDevelopment() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filteredSkills =
    filterCategory === 'all'
      ? webDevelopmentSkills
      : webDevelopmentSkills.filter(
          (skill) => skill.category === filterCategory
        )

  const categories = [
    'all',
    ...new Set(webDevelopmentSkills.map((skill) => skill.category)),
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
          Essential tools and utilities for application developments
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                filterCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-800'
              }`}
            >
              {category === 'all' ? 'All' : category}
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
              level={skill.level}
              usageFrequency={skill.usageFrequency}
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
                      {skill.keyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-gray-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Tools & Technologies
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {skill.tools.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-gray-400" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">

                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-yellow-500" />
                      Certifications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div>
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Category:
                      </span>{' '}
                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                          skill.category === 'Frontend'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : skill.category === 'Backend'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : skill.category === 'Full-Stack'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {skill.category}
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

export default WebDevelopment
