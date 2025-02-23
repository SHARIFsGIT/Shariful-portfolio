import { motion, useInView } from 'framer-motion'
import { Code } from 'lucide-react'
import { useRef, useState } from 'react'
import SkillCard from './skill-card'

interface Language {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  category: 'Systems' | 'Object-Oriented' | 'Scripting'
  icon: React.FC<{ className?: string; stroke?: number }>
  keyFeatures: string[]
  tools: string[]
  projects?: number
  certifications?: string[]
  bestPractices?: string[]
  performance?: {
    compilation?: string
    execution?: string
    memoryUsage?: string
  }
  architecturePatterns?: string[]
  relatedTech?: string[]
  resources?: string[]
}

const languageSkills: Language[] = [
  {
    id: 'c',
    title: 'C',
    proficiency: 90,
    experience: '4+ years',
    description: 'High-performance systems programming language',
    category: 'Systems',
    keyFeatures: [
      'Memory management',
      'Pointer operations',
      'System calls',
      'Low-level optimization',
      'Data structures',
      'Bit manipulation',
      'Process control',
      'I/O operations',
    ],
    tools: [
      'GCC',
      'Make',
      'GDB',
      'Valgrind',
      'CMake',
      'Linux APIs',
      'strace',
      'perf',
    ],
    projects: 25,
    bestPractices: [
      'Memory safety',
      'Error handling',
      'Code optimization',
      'Resource management',
    ],
    performance: {
      compilation: 'Fast',
      execution: 'Native speed',
      memoryUsage: 'Manual control',
    },
    architecturePatterns: [
      'Modular design',
      'Data abstraction',
      'Event handling',
      'State machines',
    ],
    relatedTech: [
      'Assembly',
      'Linux kernel',
      'Embedded systems',
      'Device drivers',
    ],
    icon: ({ className }) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#5C6BC0] to-[#3949AB] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <Code className={`size-full text-white ${className}`} />
      </div>
    ),
  },
  {
    id: 'cpp',
    title: 'C++',
    proficiency: 85,
    experience: '3+ years',
    description: 'Object-oriented systems and application development',
    category: 'Object-Oriented',
    keyFeatures: [
      'OOP principles',
      'Templates',
      'STL library',
      'Smart pointers',
      'RAII pattern',
      'Exception handling',
      'Multiple inheritance',
      'Operator overloading',
    ],
    tools: [
      'Clang++',
      'Visual Studio',
      'Boost',
      'Qt',
      'Catch2',
      'CMake',
      'Conan',
      'vcpkg',
    ],
    projects: 20,
    bestPractices: [
      'SOLID principles',
      'Exception safety',
      'Resource management',
      'Modern C++ features',
    ],
    performance: {
      compilation: 'Template heavy',
      execution: 'Zero-cost abstractions',
      memoryUsage: 'RAII-based',
    },
    architecturePatterns: [
      'Factory pattern',
      'Observer pattern',
      'PIMPL idiom',
      'Command pattern',
    ],
    relatedTech: ['STL', 'Boost', 'Qt', 'OpenGL'],
    icon: ({ className }) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#00599C] to-[#004482] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <Code className={`size-full text-white ${className}`} />
      </div>
    ),
  },
  {
    id: 'python',
    title: 'Python',
    proficiency: 92,
    experience: '5+ years',
    description: 'Versatile language for automation and scientific computing',
    category: 'Scripting',
    keyFeatures: [
      'Data analysis',
      'Machine learning',
      'Web frameworks',
      'Scientific computing',
      'Automation',
      'Scripting',
      'Package management',
      'Testing frameworks',
    ],
    tools: [
      'NumPy',
      'Pandas',
      'TensorFlow',
      'Django',
      'Flask',
      'PyTest',
      'Poetry',
      'Jupyter',
    ],
    projects: 35,
    bestPractices: [
      'PEP 8 style guide',
      'Virtual environments',
      'Documentation',
      'Type hints',
    ],
    performance: {
      compilation: 'Interpreted',
      execution: 'GIL-based',
      memoryUsage: 'Garbage collected',
    },
    architecturePatterns: [
      'MVC pattern',
      'Factory pattern',
      'Singleton pattern',
      'Observer pattern',
    ],
    relatedTech: [
      'Data Science',
      'Web Development',
      'Machine Learning',
      'DevOps',
    ],
    icon: ({ className }) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#FFD43B] to-[#306998] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <Code className={`size-full text-white ${className}`} />
      </div>
    ),
  },
  {
    id: 'rust',
    title: 'Rust',
    proficiency: 75,
    experience: '2+ years',
    description: 'Systems programming with memory safety guarantees',
    category: 'Systems',
    keyFeatures: [
      'Memory safety',
      'Concurrency',
      'Zero-cost abstractions',
      'Pattern matching',
      'Ownership model',
      'No null or dangling pointers',
      'Compile-time guarantees',
      'Trait-based generics',
    ],
    tools: [
      'Cargo',
      'Rustup',
      'Clippy',
      'Rayon',
      'Tokio',
      'serde',
      'diesel',
      'rocket',
    ],
    projects: 15,
    bestPractices: [
      'Ownership rules',
      'Lifetimes',
      'Error handling',
      'Functional programming',
    ],
    performance: {
      compilation: 'Strict checks',
      execution: 'Near C performance',
      memoryUsage: 'Compile-time managed',
    },
    architecturePatterns: [
      'Actor model',
      'Functional composition',
      'Trait objects',
      'Macro system',
    ],
    relatedTech: [
      'Systems Programming',
      'WebAssembly',
      'Embedded Systems',
      'Network Services',
    ],
    icon: ({ className }) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#DEA584] to-[#000000] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <Code className={`size-full text-white ${className}`} />
      </div>
    ),
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    proficiency: 88,
    experience: '4+ years',
    description: 'Dynamic web development and full-stack applications',
    category: 'Scripting',
    keyFeatures: [
      'Frontend frameworks',
      'Node.js backend',
      'Asynchronous programming',
      'DOM manipulation',
      'Event-driven',
      'Functional programming',
      'ES6+ features',
      'TypeScript support',
    ],
    tools: [
      'React',
      'Node.js',
      'Express',
      'Webpack',
      'Babel',
      'TypeScript',
      'Next.js',
      'Vite',
    ],
    projects: 30,
    bestPractices: [
      'Modular design',
      'Async/await',
      'Functional components',
      'State management',
    ],
    performance: {
      compilation: 'Interpreted/JIT',
      execution: 'V8 engine optimized',
      memoryUsage: 'Garbage collected',
    },
    architecturePatterns: [
      'Component-based',
      'Reactive programming',
      'Flux/Redux',
      'Microservices',
    ],
    relatedTech: [
      'Web Development',
      'Full-stack',
      'Mobile Development',
      'Cloud Services',
    ],
    icon: ({ className }) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#F0DB4F] to-[#323330] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <Code className={`size-full text-white ${className}`} />
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
          Core programming languages for systems, applications, and automation
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

                  {skill.performance && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Performance Characteristics
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(skill.performance).map(
                          ([key, value]) => (
                            <div key={key} className="flex items-center gap-2">
                              <span className="h-1 w-1 rounded-full bg-gray-400" />
                              <span className="font-medium">
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                              </span>{' '}
                              {value}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {skill.architecturePatterns && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-purple-500" />
                        Architecture Patterns
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {skill.architecturePatterns.map((pattern, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-gray-400" />
                            {pattern}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" />
                      Tools & Libraries
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

                  {skill.relatedTech && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-yellow-500" />
                        Related Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.relatedTech.map((tech, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {skill.bestPractices && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        Best Practices
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.bestPractices.map((practice, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-800 dark:bg-red-900 dark:text-red-200"
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
                        Category:
                      </span>{' '}
                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                          skill.category === 'Systems'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : skill.category === 'Object-Oriented'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                              : skill.category === 'Scripting'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
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
