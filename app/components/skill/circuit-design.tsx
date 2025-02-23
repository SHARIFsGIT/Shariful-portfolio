import { motion, useInView } from 'framer-motion'
import { Cpu } from 'lucide-react'
import React, { useRef, useState } from 'react'

interface CircuitSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  type: 'Digital' | 'Analog' | 'Mixed-Signal'
  icon: React.FC<{ className?: string; size?: number }>
  projects?: number
  features: string[]
  tools?: string[]
  softwareTools?: string[]
  performance?: {
    complexity?: string
    optimization?: string
    reliability?: string
  }
  certifications?: string[]
  bestPractices?: string[]
  designPatterns?: string[]
}

const circuitSkills: CircuitSkill[] = [
  {
    id: 'digital-design',
    title: 'Digital Circuit Design',
    proficiency: 85,
    experience: '3+ years',
    type: 'Digital',
    description: 'Advanced digital circuit and logic design',
    features: [
      'FPGA programming',
      'Digital logic',
      'State machine design',
      'Synchronous design',
      'Timing analysis',
      'Signal integrity',
      'Simulation',
      'Verification',
    ],
    tools: [
      'Verilog',
      'VHDL',
      'SystemVerilog',
      'Xilinx Vivado',
      'Intel Quartus',
      'ModelSim',
    ],
    softwareTools: ['Cadence', 'Synopsys', 'Altium Designer', 'KiCad'],
    projects: 15,
    bestPractices: [
      'Modular design',
      'Clock domain crossing',
      'Power optimization',
      'Design for testability',
    ],
    designPatterns: [
      'Finite state machines',
      'Synchronous reset',
      'Pipelining',
      'Bus interfaces',
    ],
    performance: {
      complexity: 'High',
      optimization: 'Performance-critical',
      reliability: 'High precision',
    },
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#4A90E2] to-[#2C3E50] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <Cpu className="size-full text-white" {...props} />
      </div>
    ),
  },
  {
    id: 'analog-design',
    title: 'Analog Circuit Design',
    proficiency: 75,
    experience: '2+ years',
    type: 'Analog',
    description: 'Precision analog circuit and signal conditioning',
    features: [
      'Signal amplification',
      'Filter design',
      'Sensor interfaces',
      'Noise reduction',
      'Precision measurement',
      'Analog simulation',
      'Circuit characterization',
      'Power management',
    ],
    tools: [
      'LTSpice',
      'MATLAB',
      'Simulink',
      'OrCAD',
      'Circuit simulation',
      'Schematic capture',
    ],
    softwareTools: [
      'Keysight ADS',
      'Eagle PCB',
      'Texas Instruments TINA',
      'Multisim',
    ],
    projects: 10,
    bestPractices: [
      'Signal integrity',
      'Thermal management',
      'Noise analysis',
      'Component selection',
    ],
    designPatterns: [
      'Differential amplifiers',
      'Feedback systems',
      'Voltage references',
      'Current mirrors',
    ],
    performance: {
      complexity: 'Medium',
      optimization: 'Signal quality',
      reliability: 'Precision-critical',
    },
    icon: (props) => (
      <div className="size-[60px] rounded-lg bg-gradient-to-br from-[#16A085] to-[#2C3E50] p-2 shadow-lg transition-shadow hover:shadow-xl">
        <Cpu className="size-full text-white" {...props} />
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
  const [filterType, setFilterType] = useState<string>('all')

  const filteredSkills =
    filterType === 'all'
      ? circuitSkills
      : circuitSkills.filter((skill) => skill.type === filterType)

  const types = ['all', ...new Set(circuitSkills.map((skill) => skill.type))]

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
          Expertise in digital, analog, and mixed-signal circuit design
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filterType === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              {type === 'all' ? 'All' : type}
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <skill.icon size={24} />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    {skill.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {skill.experience} • {skill.proficiency}% proficiency
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  setSelectedSkill(selectedSkill === skill.id ? null : skill.id)
                }
                className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
              >
                {selectedSkill === skill.id ? 'Less' : 'More'}
              </button>
            </div>

            <motion.div
              className="mt-4"
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
                        Primary Tools
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

                  {skill.softwareTools && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Software Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.softwareTools.map((tool, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-900 dark:text-green-200"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {skill.bestPractices && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-yellow-500" />
                        Best Practices
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.bestPractices.map((practice, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          >
                            {practice}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {skill.designPatterns && (
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        Design Patterns
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.designPatterns.map((pattern, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-800 dark:bg-red-900 dark:text-red-200"
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
                        Type:
                      </span>{' '}
                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                          skill.type === 'Digital'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : skill.type === 'Analog'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        }`}
                      >
                        {skill.type}
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
