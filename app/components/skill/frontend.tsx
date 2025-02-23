import {
  IconBrandBootstrap,
  IconBrandCss3,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandReact,
  IconBrandTailwind,
} from '@tabler/icons-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import SkillCard from './skill-card'

interface FrontendSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  category:
    | 'Core'
    | 'Framework'
    | 'Styling'
    | 'State Management'
    | 'Backend Integration'
  icon: React.FC<{ className?: string; stroke?: number }>
  features: string[]
  tools: string[]
  projects?: number
  relatedTech?: string[]
  performance?: {
    loadTime?: string
    renderTime?: string
    optimization?: string
  }
  bestPractices?: string[]
  architecturePatterns?: string[]
}

const frontendSkills: FrontendSkill[] = [
  {
    id: 'html',
    title: 'HTML',
    proficiency: 90,
    experience: '3+ years',
    description: 'Semantic HTML markup and structure',
    category: 'Core',
    features: [
      'Semantic elements',
      'Accessibility',
      'SEO optimization',
      'Forms',
      'Media elements',
      'Meta tags',
      'Responsive design',
      'Web standards',
    ],
    tools: [
      'HTML5 Validator',
      'Meta tags generator',
      'Schema markup',
      'Accessibility tools',
    ],
    bestPractices: [
      'Semantic structure',
      'ARIA attributes',
      'Cross-browser compatibility',
      'Mobile-first design',
    ],
    architecturePatterns: [
      'Component structure',
      'Layout patterns',
      'Form patterns',
      'Progressive enhancement',
    ],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#E44D26] to-[#F16529] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandHtml5 className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'css',
    title: 'CSS',
    proficiency: 88,
    experience: '3+ years',
    description: 'Modern CSS styling and layouts',
    category: 'Core',
    features: [
      'Flexbox',
      'Grid',
      'Animations',
      'Media queries',
      'Custom properties',
      'Transforms',
      'Transitions',
      'Responsive design',
    ],
    tools: ['Sass/SCSS', 'PostCSS', 'Autoprefixer', 'CSS Modules'],
    bestPractices: [
      'BEM methodology',
      'Mobile-first',
      'Performance optimization',
      'Code organization',
    ],
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
    experience: '3+ years',
    description: 'Modern JavaScript development',
    category: 'Core',
    features: [
      'ES6+ features',
      'DOM manipulation',
      'Async/Await',
      'Modules',
      'Event handling',
      'APIs',
      'Error handling',
      'Performance',
    ],
    tools: ['ESLint', 'Prettier', 'Babel', 'Webpack', 'Chrome DevTools'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#F7DF1E] to-[#F7DF1E] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandJavascript className="size-full text-black" {...props} />
      </div>
    ),
  },
  {
    id: 'react',
    title: 'React.js',
    proficiency: 82,
    experience: '2+ years',
    description: 'Modern React application development',
    category: 'Framework',
    features: [
      'Components',
      'Hooks',
      'Context API',
      'State management',
      'Routing',
      'Forms',
      'Performance',
      'Testing',
    ],
    tools: [
      'Create React App',
      'React Router',
      'Redux',
      'React Query',
      'React Hook Form',
    ],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#61DAFB] to-[#00B7FF] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandReact className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'tailwind',
    title: 'Tailwind CSS',
    proficiency: 85,
    experience: '2+ years',
    description: 'Utility-first CSS framework',
    category: 'Styling',
    features: [
      'Utility classes',
      'Responsive design',
      'Custom configuration',
      'Dark mode',
      'Plugins',
      'JIT compiler',
      'CSS purging',
      'Theme system',
    ],
    tools: ['PostCSS', 'Tailwind Config', 'Headless UI', 'DaisyUI'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#38BDF8] to-[#0EA5E9] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandTailwind className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'bootstrap',
    title: 'Bootstrap',
    proficiency: 80,
    experience: '2+ years',
    description: 'Popular CSS framework',
    category: 'Styling',
    features: [
      'Grid system',
      'Components',
      'Utilities',
      'JavaScript plugins',
      'Customization',
      'Themes',
      'Icons',
      'Forms',
    ],
    tools: ['Sass', 'Bootstrap Icons', 'Theme customizer', 'NPM packages'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#7952B3] to-[#7952B3] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBrandBootstrap className="size-full text-white" {...props} />
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
          Web Development
        </h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          Frontend technologies and frameworks for building modern web
          applications
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
                      {skill.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-gray-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {skill.tools && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-purple-500" />
                        Tools & Libraries
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.tools.map((tool, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {skill.bestPractices && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Best Practices
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.bestPractices.map((practice, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-900 dark:text-green-200"
                          >
                            {practice}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {skill.architecturePatterns && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-indigo-500" />
                        Architecture Patterns
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.architecturePatterns.map((pattern, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                          >
                            {pattern}
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
                          skill.category === 'Core'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : skill.category === 'Framework'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : skill.category === 'Styling'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                : skill.category === 'State Management'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : skill.category === 'Backend Integration'
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}
                      >
                        {skill.category}
                      </span>
                    </div>
                    {skill.projects && (
                      <div>
                        <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                          Projects:
                        </span>{' '}
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {skill.projects}
                        </span>
                      </div>
                    )}
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

export default Frontend
