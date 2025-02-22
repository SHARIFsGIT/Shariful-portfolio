import { IconBrandCss3, IconBrandHtml5 } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import SkillCard from './skill-card'

interface Language {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  icon: React.FC<{ stroke?: number }>
  projects?: number
  certifications?: string[]
  keyFeatures: string[]
}

const languageSkills: Language[] = [
  {
    id: 'html5',
    title: 'HTML 5',
    proficiency: 95,
    experience: '5+ years',
    description: 'Expert in semantic markup and modern HTML5 features',
    keyFeatures: [
      'Semantic Elements',
      'Accessibility (ARIA)',
      'Forms & Validation',
      'SEO Optimization',
    ],
    projects: 50,
    certifications: ['W3C HTML5'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#E44D26] to-[#F16529] p-2 shadow-lg">
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
    keyFeatures: [
      'Flexbox & Grid',
      'Animations & Transitions',
      'Responsive Design',
      'CSS Modules',
    ],
    projects: 45,
    certifications: ['CSS Advanced Layouts'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#264DE4] to-[#2965F1] p-2 shadow-lg">
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
    keyFeatures: [
      'ES6+ Features',
      'Async Programming',
      'DOM Manipulation',
      'Design Patterns',
    ],
    projects: 40,
    certifications: ['JavaScript Advanced Concepts'],
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#F7DF1E] to-[#F7DF1E] p-2 shadow-lg">
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
    keyFeatures: ['Type Systems', 'Generics', 'Decorators', 'Advanced Types'],
    projects: 30,
    certifications: ['TypeScript Professional'],
    icon: () => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#007ACC] to-[#007ACC] p-2 shadow-lg">
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
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export function Languages() {
  const skillsRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={skillsRef}
      className="space-y-6 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-8">
        <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
          Programming Languages
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Core programming languages and markup technologies I specialize in
        </p>
      </div>

      <div className="space-y-6">
        {languageSkills.map((skill) => (
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
                    {skill.keyFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mb-2">
                    <span className="font-medium">Projects Completed:</span>{' '}
                    {skill.projects}
                  </div>
                  {skill.certifications && (
                    <div>
                      <span className="font-medium">Certifications:</span>
                      <ul className="mt-1 list-inside list-disc">
                        {skill.certifications.map((cert, index) => (
                          <li key={index}>{cert}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
