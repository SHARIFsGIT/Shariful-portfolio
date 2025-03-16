import {
  IconBolt,
  IconCircuitCell,
  IconCircuitSwitchOpen,
  IconCpu,
  IconDeviceDesktop,
  IconWaveSine,
} from '@tabler/icons-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import SkillCard from './skill-card'

interface CircuitSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  category: 'Digital' | 'Analog' | 'Mixed-Signal' | 'Software' | 'PCB'
  icon: React.FC<{ className?: string; stroke?: number }>
  keyFeatures: string[]
  tools: string[]
  projects: number
  certifications: string[]
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  usageFrequency: 'Daily' | 'Weekly' | 'Monthly' | 'Occasional'
}

const circuitSkills: CircuitSkill[] = [
  {
    id: 'digital-design',
    title: 'Digital Circuit Design',
    proficiency: 80,
    experience: '3+ years',
    category: 'Digital',
    description: 'Advanced digital circuit and logic design',
    level: 'Advanced',
    usageFrequency: 'Occasional',
    keyFeatures: ['Simulation', 'Digital logic'],
    tools: ['VHDL', 'Verilog', 'ModelSim'],
    projects: 3,
    certifications: ['AIUB'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#4A90E2] to-[#2C3E50] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconCpu className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'analog-design',
    title: 'Analog Circuit Design',
    proficiency: 70,
    experience: '3+ years',
    category: 'Analog',
    description: 'Precision analog circuit and signal conditioning',
    level: 'Advanced',
    usageFrequency: 'Occasional',
    keyFeatures: [
      'Filter design',
      'Noise reduction',
      'Power management',
      'Analog simulation',
      'Signal amplification',
    ],
    tools: ['LTSpice', 'MATLAB', 'Simulink'],
    projects: 10,
    certifications: ['Analog Design', 'Signal Processing', 'Circuit Analysis'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#16A085] to-[#2C3E50] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconBolt className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'mixed-signal',
    title: 'Mixed-Signal Design',
    proficiency: 80,
    experience: '3+ years',
    category: 'Mixed-Signal',
    description: 'Integration of analog and digital circuits',
    level: 'Intermediate',
    usageFrequency: 'Occasional',
    keyFeatures: ['Power domains', 'ADC/DAC design', 'Signal conversion'],
    tools: ['ADS'],
    projects: 2,
    certifications: ['AIUB'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#9B59B6] to-[#8E44AD] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconCircuitCell className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'matlab',
    title: 'MATLAB',
    proficiency: 75,
    experience: '3+ years',
    category: 'Software',
    description: 'Technical computing and data analysis for circuit design',
    level: 'Intermediate',
    usageFrequency: 'Occasional',
    keyFeatures: [
      'Signal processing',
      'Model-based design',
      'Circuit simulation',
      'Algorithm development',
    ],
    tools: ['Simulink'],
    projects: 15,
    certifications: ['AIUB'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#E74C3C] to-[#C0392B] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconWaveSine className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'eagle',
    title: 'Eagle PCB',
    proficiency: 70,
    experience: '2+ years',
    category: 'PCB',
    description: 'Professional PCB design and layout',
    level: 'Intermediate',
    usageFrequency: 'Occasional',
    keyFeatures: [
      'Board layout',
      'Schematic capture',
      'Component library management',
    ],
    tools: ['Autodesk Eagle'],
    projects: 8,
    certifications: ['AIUB'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#F39C12] to-[#D35400] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconCircuitSwitchOpen className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'proteus',
    title: 'Proteus',
    proficiency: 80,
    experience: '2+ years',
    category: 'PCB',
    description: 'Full-system simulation and virtual prototyping',
    level: 'Advanced',
    usageFrequency: 'Occasional',
    keyFeatures: [
      'PCB design',
      'Circuit simulation',
      'Virtual instruments',
      'Microcontroller simulation',
    ],
    tools: ['ISIS Schematic'],
    projects: 6,
    certifications: ['AIUB'],
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#3498DB] to-[#2980B9] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <IconDeviceDesktop className="size-full text-white" {...props} />
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

export function CircuitDesign() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filteredSkills =
    filterCategory === 'all'
      ? circuitSkills
      : circuitSkills.filter((skill) => skill.category === filterCategory)

  const categories = [
    'all',
    ...new Set(circuitSkills.map((skill) => skill.category)),
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
          Circuit Design
        </h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          Gained experience in digital, analog, and mixed-signal circuit design
          during my undergraduate studies
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
                          skill.category === 'Digital'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : skill.category === 'Analog'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : skill.category === 'Mixed-Signal'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                : skill.category === 'Software'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                  : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
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

export default CircuitDesign
