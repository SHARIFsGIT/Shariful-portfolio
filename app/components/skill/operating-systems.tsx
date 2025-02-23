import { IconBrandUbuntu, IconBrandWindows } from '@tabler/icons-react'
import { motion, useInView } from 'framer-motion'
import React, { useRef, useState } from 'react'
import SkillCard from './skill-card'

interface OSSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  category: 'Unix' | 'Windows'
  icon: React.FC<{ className?: string; stroke?: number }>
  keyFeatures: string[]
  tools: string[]
  projects: number
  certifications: string[]
  architecturePatterns: string[]
  securityFeatures: string[]
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  usageFrequency: 'Daily' | 'Weekly' | 'Monthly' | 'Occasional'
}

const osSkills: OSSkill[] = [
  {
    id: 'linux',
    title: 'Ubuntu',
    proficiency: 55,
    experience: '2+ years',
    description:
      'Experienced with the Linux system which seems like a magic box to me',
    category: 'Unix',
    keyFeatures: [
      'Access control',
      'File management',
      'Package management',
      'System administration',
      'Network configuration',
      'Automation & scripting',
      'User & access management',
      'Version control & collaboration',
    ],
    tools: [
      'Git',
      'Zsh',
      'Bash',
      'Docker',
      'OpenSSL',
      'VirtualBox',
      'Make / CMake',
    ],
    projects: 4,
    certifications: ['Linux for Robotics'],
    architecturePatterns: ['Null'],
    securityFeatures: ['Null'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#FCC624] to-[#E34F26] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandUbuntu className="size-full text-white" {...props} />
      </div>
    ),
    level: 'Intermediate',
    usageFrequency: 'Weekly',
  },
  {
    id: 'windows-server',
    title: 'Windows',
    proficiency: 90,
    experience: '15+ years',
    description: 'We all know and use Windows infrastructure',
    category: 'Windows',
    keyFeatures: [
      'PowerShell management',
      'Windows defender',
      'IP configuration',
      'Command prompt',
    ],
    tools: ['PowerShell', 'Command prompt'],
    projects: 79,
    certifications: ['Null'],
    architecturePatterns: ['Null'],
    securityFeatures: ['Windows Defender'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#00A4EF] to-[#0078D4] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandWindows className="size-full text-white" {...props} />
      </div>
    ),
    level: 'Advanced',
    usageFrequency: 'Daily',
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

export function OperatingSystems() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filteredSkills =
    filterCategory === 'all'
      ? osSkills
      : osSkills.filter((skill) => skill.category === filterCategory)

  const categories = [
    'all',
    ...new Set(osSkills.map((skill) => skill.category)),
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
          Operating Systems
        </h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          Operating systems that I am familiar with
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filterCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
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
                      {skill.tools.map((tool, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-gray-400" />
                          {tool}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-purple-500" />
                      Architecture Patterns
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.architecturePatterns.map((pattern, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        >
                          {pattern}
                        </span>
                      ))}
                    </div>
                  </div>

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
                          skill.category === 'Unix'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
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

export default OperatingSystems
