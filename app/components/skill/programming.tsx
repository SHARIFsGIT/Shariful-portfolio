import {
  IconBinaryTree,
  IconBraces,
  IconBrandCpp,
  IconBrandJavascript,
  IconBrandPython,
  IconLetterC,
} from '@tabler/icons-react'
import { motion, useInView } from 'framer-motion'
import React, { useRef, useState } from 'react'
import SkillCard from './skill-card'

interface Language {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  category:
    | 'Problem Solving'
    | 'Object-Oriented'
    | 'Web Developement'
    | 'Software Development'
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

const languageSkills: Language[] = [
  {
    id: 'c',
    title: 'C',
    proficiency: 90,
    experience: '4+ years',
    description:
      'Experienced in problem-solving with C on various online judge platforms',
    category: 'Problem Solving',
    keyFeatures: [
      'Recursion',
      'Dynamic Array',
      'I/O operations',
      'Bit manipulation',
      'String Operations',
      'Pointer operations',
      'Loop implementations',
      'Conditional operations',
      'Function implementations',
    ],
    tools: ['GCC', 'Codeblocks', 'Visual Studio'],
    projects: 400,
    certifications: ['AIUB', 'Phitron', 'CPS academy'],
    architecturePatterns: [
      'Error handling',
      'Memory management',
      'Code optimization',
    ],
    securityFeatures: [
      'Buffer overflow protection',
      'Memory sanitization',
      'Input validation',
    ],
    level: 'Advanced',
    usageFrequency: 'Daily',
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#5C6BC0] to-[#3949AB] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconLetterC className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'cpp',
    title: 'C++',
    proficiency: 85,
    experience: '4+ years',
    description: 'Mostly used for solving online contest problem',
    category: 'Object-Oriented',
    keyFeatures: [
      'Templates',
      'STL library',
      'OOP concepts',
      'Exception handling',
      'Multiple inheritance',
      'Operator overloading',
      'Dynamic memory allocation',
    ],
    tools: ['Clang++', 'Visual Studio', 'Codeblocks'],
    projects: 1000,
    certifications: ['AIUB', 'Phitron', 'CPS academy', 'The construct'],
    architecturePatterns: [
      'OOP organization',
      'Memory management',
      'Code optimization',
    ],
    securityFeatures: ['Memory overflow protection'],
    level: 'Advanced',
    usageFrequency: 'Daily',
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#00599C] to-[#004482] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandCpp className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    proficiency: 70,
    experience: '3+ years',
    description:
      'Implemented and optimized for solving data structure problems',
    category: 'Problem Solving',
    keyFeatures: [
      'Heaps',
      'Union find',
      'Hash tables',
      'Linked lists',
      'Stack & Queue',
      'Trees & Graphs',
      'Arrays & Strings',
    ],
    tools: ['C++', 'LeetCode', 'HackerRank', 'CodeForces', 'Visual Studio'],
    projects: 670,
    certifications: ['Phitron', 'CPS academy'],
    architecturePatterns: [
      'Memory management',
      'Time & Space complexity analysis',
    ],
    securityFeatures: ['Data integrity'],
    level: 'Intermediate',
    usageFrequency: 'Daily',
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-[#2D3748] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBinaryTree className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'algorithms',
    title: 'Algorithms',
    proficiency: 65,
    experience: '3+ years',
    description:
      'Design and analysis of efficient algorithms and solving problems',
    category: 'Problem Solving',
    keyFeatures: [
      'Backtracking',
      'Divide & Conquer',
      'Pattern matching',
      'Graph algorithms',
      'Greedy algorithms',
      'Sorting algorithms',
      'Dynamic programming',
      'Searching algorithms',
    ],
    tools: [
      'AtCoder',
      'GeeksforGeeks',
      'UVa Online Judge',
      'Algorithm Visualizer',
    ],
    projects: 500,
    certifications: ['Phitron', 'CPS academy'],
    architecturePatterns: [
      'Complexity analysis',
      'Optimization techniques',
      'Algorithm design patterns',
    ],
    securityFeatures: ['Input validation', 'Boundary checking'],
    level: 'Intermediate',
    usageFrequency: 'Daily',
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-[#4A5568] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBraces className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'python',
    title: 'Python',
    proficiency: 80,
    experience: '5+ years',
    description:
      'Used Python for software development and scientific computing',
    category: 'Software Development',
    keyFeatures: [
      'OpenCV',
      'Automation',
      'Data analysis',
      'Web frameworks',
      'Web development',
      'Machine learning',
    ],
    tools: [
      'NumPy',
      'Pandas',
      'Django',
      'PyTest',
      'Jupyter',
      'OpenCV',
      'PyCharm',
      'FastAPI',
      'PyAutoGUI',
      'Matplotlib',
      'Visual Studio',
    ],
    projects: 10,
    certifications: ['Phitron', 'Udemy', 'Coursera', 'edX', 'The construct'],
    architecturePatterns: ['OOP concepts', 'Module management'],
    securityFeatures: ['Encryption', 'Authentication'],
    level: 'Advanced',
    usageFrequency: 'Daily',
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-[#3776AB] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandPython className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    proficiency: 75,
    experience: '5+ years',
    description: 'Used for dynamic web development and full-stack applications',
    category: 'Web Developement',
    keyFeatures: [
      'ES6+ features',
      'Event handling',
      'DOM manipulation',
      'Functional programming',
    ],
    tools: ['Vite', 'React', 'Express', 'Node.js', 'Next.js', 'TypeScript'],
    projects: 30,
    certifications: ['Programming hero'],
    architecturePatterns: ['Flux/Redux', 'Component-based'],
    securityFeatures: ['CORS policies', 'Content Security', 'Input validation'],
    level: 'Intermediate',
    usageFrequency: 'Monthly',
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-[#F7DF1E] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandJavascript className="size-full text-black" {...props} />
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

export function Languages() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filteredSkills =
    filterCategory === 'all'
      ? languageSkills
      : languageSkills.filter((skill) => skill.category === filterCategory)

  const categories = [
    'all',
    ...new Set(languageSkills.map((skill) => skill.category)),
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
          Programming Languages
        </h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          Core programming languages for systems, applications, robotics and
          automation
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
                          skill.category === 'Problem Solving'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : skill.category === 'Object-Oriented'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
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

export default Languages