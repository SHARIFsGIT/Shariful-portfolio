import { IconBrandCss3, IconBrandHtml5 } from '@tabler/icons-react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'
import SkillCard from './skill-card'

interface Language {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  category: 'Markup' | 'Scripting' | 'Typed' | 'Style'
  icon: React.FC<{ stroke?: number }>
  keyFeatures: string[]
  tools: string[]
  projects?: number
  certifications?: string[]
  bestPractices?: string[]
  performance?: {
    parsing?: string
    execution?: string
    compatibility?: string
  }
  architecturePatterns?: string[]
  relatedTech?: string[]
  resources?: string[]
}

const languageSkills: Language[] = [
  {
    id: 'html5',
    title: 'HTML 5',
    proficiency: 95,
    experience: '5+ years',
    description: 'Expert in semantic markup and modern HTML5 features',
    category: 'Markup',
    keyFeatures: [
      'Semantic Elements',
      'Accessibility (ARIA)',
      'Forms & Validation',
      'SEO Optimization',
      'Media Elements',
      'Web Components',
      'Custom Elements',
      'Shadow DOM',
    ],
    tools: [
      'HTML Validator',
      'ARIA Checker',
      'Schema Markup',
      'Microdata',
      'Open Graph',
      'Rich Snippets',
      'HTML Minifier',
      'Emmet',
    ],
    projects: 50,
    certifications: [
      'W3C HTML5',
      'Web Accessibility',
      'SEO Fundamentals',
      'Semantic Web',
    ],
    bestPractices: [
      'Semantic Structure',
      'Progressive Enhancement',
      'Cross-browser Support',
      'Mobile-first Design',
    ],
    performance: {
      parsing: 'Optimized DOM',
      execution: 'Fast Rendering',
      compatibility: 'Cross-platform',
    },
    architecturePatterns: [
      'Component-based',
      'Progressive Enhancement',
      'Semantic Structure',
      'Accessibility Patterns',
    ],
    relatedTech: ['WAI-ARIA', 'Microdata', 'Web Components', 'Shadow DOM'],
    resources: ['MDN Web Docs', 'W3C Specs', 'HTML Living Standard', 'WHATWG'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#E44D26] to-[#F16529] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandHtml5 className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'css3',
    title: 'CSS 3',
    proficiency: 90,
    experience: '5+ years',
    description: 'Proficient in modern CSS techniques and frameworks',
    category: 'Style',
    keyFeatures: [
      'Flexbox & Grid',
      'Animations & Transitions',
      'Responsive Design',
      'CSS Modules',
      'Custom Properties',
      'CSS Grid',
      'Container Queries',
      'Layer Queries',
    ],
    tools: [
      'Sass/SCSS',
      'PostCSS',
      'CSS Modules',
      'Stylelint',
      'CSS-in-JS',
      'TailwindCSS',
      'CSS Frameworks',
      'Browser DevTools',
    ],
    projects: 45,
    certifications: [
      'CSS Advanced Layouts',
      'Responsive Web Design',
      'Animation Expert',
      'CSS Architecture',
    ],
    bestPractices: [
      'BEM Methodology',
      'CSS Architecture',
      'Performance Optimization',
      'Maintainable CSS',
    ],
    performance: {
      parsing: 'Efficient Selectors',
      execution: 'Hardware Acceleration',
      compatibility: 'Progressive Enhancement',
    },
    architecturePatterns: ['ITCSS', 'SMACSS', 'BEM', 'Atomic Design'],
    relatedTech: ['Sass', 'Less', 'PostCSS', 'CSS-in-JS'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#264DE4] to-[#2965F1] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandCss3 className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    proficiency: 85,
    experience: '4+ years',
    description: 'Strong foundation in modern JavaScript development',
    category: 'Scripting',
    keyFeatures: [
      'ES6+ Features',
      'Async Programming',
      'DOM Manipulation',
      'Design Patterns',
      'Functional Programming',
      'Event Loop',
      'Memory Management',
      'Web APIs',
    ],
    tools: [
      'ESLint',
      'Prettier',
      'Babel',
      'Webpack',
      'Jest',
      'npm/yarn',
      'Chrome DevTools',
      'VS Code',
    ],
    projects: 40,
    certifications: [
      'JavaScript Advanced Concepts',
      'ES6 Specialist',
      'Functional Programming',
      'Design Patterns',
    ],
    bestPractices: [
      'Clean Code',
      'SOLID Principles',
      'Performance Optimization',
      'Error Handling',
    ],
    performance: {
      parsing: 'V8 Optimization',
      execution: 'Memory Efficient',
      compatibility: 'Cross-browser',
    },
    architecturePatterns: [
      'Module Pattern',
      'Observer Pattern',
      'Factory Pattern',
      'Singleton Pattern',
    ],
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#F7DF1E] to-[#F7DF1E] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <Image
          src="/assets/icons/logo-javascript.svg"
          alt="JavaScript"
          width={48}
          height={48}
          className="size-full"
        />
      </div>
    ),
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    proficiency: 88,
    experience: '3+ years',
    description: 'Advanced TypeScript development with focus on type safety',
    category: 'Typed',
    keyFeatures: [
      'Type Systems',
      'Generics',
      'Decorators',
      'Advanced Types',
      'Type Inference',
      'Utility Types',
      'Mapped Types',
      'Conditional Types',
    ],
    tools: [
      'TSC',
      'TSLint',
      'TS-Node',
      'Type-Fest',
      'TypeScript ESLint',
      'ts-jest',
      'tsconfig-paths',
      'TypeScript Playground',
    ],
    projects: 30,
    certifications: [
      'TypeScript Professional',
      'Advanced TypeScript',
      'Type Systems Expert',
      'Enterprise TypeScript',
    ],
    bestPractices: [
      'Type Safety',
      'Interface Design',
      'Generic Patterns',
      'Error Handling',
    ],
    performance: {
      parsing: 'Type Checking',
      execution: 'Runtime Safety',
      compatibility: 'JavaScript Interop',
    },
    architecturePatterns: [
      'Repository Pattern',
      'Factory Pattern',
      'Dependency Injection',
      'Builder Pattern',
    ],
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#007ACC] to-[#007ACC] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <Image
          src="/assets/icons/typescript.svg"
          alt="TypeScript"
          width={48}
          height={48}
          className="size-full"
        />
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
          Core programming languages and markup technologies I specialize in
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
              {category.charAt(0).toUpperCase() + category.slice(1)}
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
                        Performance Metrics
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
                        Category:
                      </span>{' '}
                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                          skill.category === 'Markup'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : skill.category === 'Style'
                              ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                              : skill.category === 'Scripting'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : skill.category === 'Typed'
                                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
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
