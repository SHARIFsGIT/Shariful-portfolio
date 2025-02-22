import {
  IconBrandNextjs,
  IconBrandReact
} from '@tabler/icons-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  SiChakraui,
  SiJest,
  SiTypescript,
  SiWebpack
} from 'react-icons/si'
import SkillCard from './skill-card'

interface FrontendSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  category:
    | 'Framework'
    | 'Library'
    | 'Testing'
    | 'State Management'
    | 'Styling'
    | 'Build Tools'
    | 'UI Component'
  icon: React.FC<{ className?: string; stroke?: number }>
  features: string[]
  tools: string[]
  projects?: number
  relatedTech?: string[]
  performance?: {
    bundleSize?: string
    renderTime?: string
    accessibility?: string
  }
  bestPractices?: string[]
  architecturePatterns?: string[]
  certifications?: string[]
  resources?: string[]
  designPatterns?: string[]
}

const frontendSkills: FrontendSkill[] = [
  {
    id: 'react',
    title: 'React',
    proficiency: 95,
    experience: '4+ years',
    description:
      'Building modern, high-performance web applications with React ecosystem',
    category: 'Framework',
    features: [
      'Component architecture',
      'Hooks system',
      'Virtual DOM',
      'Server Components',
      'Concurrent rendering',
      'Suspense & streaming',
      'Error boundaries',
      'Context API',
    ],
    tools: [
      'Create React App',
      'React DevTools',
      'React Router',
      'React Query',
      'TanStack Query',
      'React Hook Form',
      'Framer Motion',
    ],
    relatedTech: [
      'Redux',
      'MobX',
      'React Native',
      'Next.js',
      'Gatsby',
      'Remix',
    ],
    projects: 40,
    performance: {
      bundleSize: '~42kb gzipped',
      renderTime: '<16ms',
      accessibility: 'WCAG 2.1',
    },
    bestPractices: [
      'Component composition',
      'Custom hooks',
      'Memoization',
      'Code splitting',
    ],
    architecturePatterns: [
      'Atomic Design',
      'Container/Presenter',
      'Render props',
      'HOC pattern',
    ],
    certifications: ['Meta React Developer', 'React Testing Expert'],
    designPatterns: [
      'Observer pattern',
      'Factory pattern',
      'Provider pattern',
      'Command pattern',
    ],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#61DAFB] to-[#00B7FF] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandReact className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'nextjs',
    title: 'Next.js',
    proficiency: 90,
    experience: '3+ years',
    description: 'Production-grade React framework with enterprise features',
    category: 'Framework',
    features: [
      'Server-side rendering',
      'Static site generation',
      'Incremental builds',
      'API routes',
      'Image optimization',
      'Font optimization',
      'Edge functions',
      'Middleware',
    ],
    tools: [
      'Vercel',
      'Next Auth',
      'SWR',
      'Next SEO',
      'Next PWA',
      'Next i18next',
      'Next Themes',
    ],
    projects: 25,
    performance: {
      bundleSize: 'Route-based',
      renderTime: '<50ms FCP',
      accessibility: 'WCAG 2.1',
    },
    bestPractices: [
      'Dynamic imports',
      'Route optimization',
      'Image best practices',
      'SEO optimization',
    ],
    architecturePatterns: [
      'Page-based routing',
      'API architecture',
      'Data fetching',
      'Dynamic routing',
    ],
    certifications: ['Vercel Platform', 'Next.js Developer'],
    resources: [
      'Next.js docs',
      'Learn Next.js',
      'Next.js examples',
      'Vercel templates',
    ],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandNextjs className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    proficiency: 88,
    experience: '3+ years',
    description: 'Strongly-typed JavaScript for scalable applications',
    category: 'Library',
    features: [
      'Type system',
      'Interfaces',
      'Generics',
      'Decorators',
      'Utility types',
      'Type inference',
      'Module system',
      'Enums',
    ],
    tools: [
      'TSC',
      'TSLint',
      'TS-Node',
      'Type-Fest',
      'TypeScript ESLint',
      'ts-jest',
      'tsconfig-paths',
    ],
    projects: 35,
    performance: {
      bundleSize: 'Zero runtime',
      renderTime: 'Development only',
      accessibility: 'Type safety',
    },
    bestPractices: [
      'Type inference',
      'Type guards',
      'Discriminated unions',
      'Strict mode',
    ],
    architecturePatterns: [
      'Repository pattern',
      'Factory pattern',
      'Builder pattern',
      'Dependency injection',
    ],
    certifications: ['TypeScript Professional', 'Advanced TypeScript'],
    designPatterns: [
      'Abstract factory',
      'Strategy pattern',
      'Decorator pattern',
      'Module pattern',
    ],
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#007ACC] to-[#0058CC] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <SiTypescript className="size-full text-white" />
      </div>
    ),
  },
  {
    id: 'performance',
    title: 'Performance Tools',
    proficiency: 85,
    experience: '3+ years',
    description: 'Optimization and performance monitoring tools',
    category: 'Build Tools',
    features: [
      'Bundle analysis',
      'Code splitting',
      'Tree shaking',
      'Lazy loading',
      'Resource hints',
      'Caching strategies',
      'Performance metrics',
      'Web vitals',
    ],
    tools: [
      'Webpack',
      'Vite',
      'Lighthouse',
      'WebPageTest',
      'Chrome DevTools',
      'Bundle analyzer',
      'Performance API',
    ],
    projects: 30,
    performance: {
      bundleSize: 'Optimization',
      renderTime: 'Analysis',
      accessibility: 'Monitoring',
    },
    bestPractices: [
      'Bundle optimization',
      'Asset optimization',
      'Critical CSS',
      'Cache strategies',
    ],
    architecturePatterns: [
      'Module federation',
      'PRPL pattern',
      'App shell',
      'Islands architecture',
    ],
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#8DD6F9] to-[#2B3A42] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <SiWebpack className="size-full text-white" />
      </div>
    ),
  },
  {
    id: 'testing',
    title: 'Testing Tools',
    proficiency: 88,
    experience: '3+ years',
    description: 'Comprehensive testing solutions for frontend applications',
    category: 'Testing',
    features: [
      'Unit testing',
      'Integration tests',
      'E2E testing',
      'Component testing',
      'Visual testing',
      'Performance testing',
      'Accessibility testing',
      'Snapshot testing',
    ],
    tools: [
      'Jest',
      'React Testing Library',
      'Cypress',
      'Vitest',
      'Playwright',
      'Storybook',
      'MSW',
      'Testing Library',
    ],
    projects: 25,
    performance: {
      bundleSize: 'Dev dependency',
      renderTime: 'Test execution',
      accessibility: 'A11y testing',
    },
    bestPractices: [
      'TDD/BDD',
      'Testing pyramid',
      'CI integration',
      'Test coverage',
    ],
    architecturePatterns: [
      'Page objects',
      'Test fixtures',
      'Mocking patterns',
      'Test utilities',
    ],
    certifications: ['Testing Professional', 'Cypress Expert'],
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#99425B] to-[#BA5374] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <SiJest className="size-full text-white" />
      </div>
    ),
  },
  {
    id: 'ui-frameworks',
    title: 'UI Frameworks',
    proficiency: 90,
    experience: '4+ years',
    description: 'Modern UI component libraries and design systems',
    category: 'UI Component',
    features: [
      'Component library',
      'Theming system',
      'Responsive design',
      'Accessibility',
      'Animation',
      'Dark mode',
      'RTL support',
      'CSS-in-JS',
    ],
    tools: [
      'Material UI',
      'Chakra UI',
      'Tailwind CSS',
      'Styled Components',
      'Emotion',
      'Radix UI',
      'Headless UI',
      'DaisyUI',
    ],
    projects: 35,
    performance: {
      bundleSize: 'Tree-shakeable',
      renderTime: 'Optimized',
      accessibility: 'WAI-ARIA',
    },
    bestPractices: [
      'Component composition',
      'Theme tokens',
      'Style system',
      'A11y patterns',
    ],
    architecturePatterns: [
      'Compound components',
      'Style variants',
      'Theme providers',
      'Style abstractions',
    ],
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#319795] to-[#3182CE] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <SiChakraui className="size-full text-white" />
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

export function Frontend() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filteredSkills =
    filterCategory === 'all'
      ? frontendSkills
      : frontendSkills.filter((skill) => skill.category === filterCategory)

  const categories = [
    'all',
    ...new Set(frontendSkills.map((skill) => skill.category)),
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
          Frontend Development
        </h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          Modern frontend technologies and frameworks for building performant
          user interfaces
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
                          skill.category === 'Framework'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : skill.category === 'Library'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : skill.category === 'Testing'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                : skill.category === 'UI Component'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
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
