import { motion, useInView } from 'framer-motion'
import { Cpu, LucideIcon, Settings } from 'lucide-react'
import React, { useRef, useState } from 'react'

// Types
interface RoboticsSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  type: 'Framework' | 'Hardware' | 'Simulation' | 'Control' | 'Scripting'
  icon: LucideIcon
  projects?: number
  features: string[]
  tools?: string[]
  libraries?: string[]
  performance?: {
    speed?: string
    reliability?: string
    compatibility?: string
  }
  bestPractices?: string[]
  architecturePatterns?: string[]
}

// Define SkillCard component
const SkillCard = ({
  title,
  proficiency,
  experience,
  description,
  onClick,
  children,
}: {
  title: string
  proficiency: number
  experience: string
  description: string
  onClick: () => void
  children: React.ReactNode
}) => (
  <div
    onClick={onClick}
    className="cursor-pointer rounded-xl p-6 transition-all duration-300"
  >
    <div className="flex items-start gap-4">
      {children}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        <div className="mt-2 flex items-center gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Proficiency: {proficiency}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Experience: {experience}
          </div>
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  </div>
)

// Animation variants
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

// Skills data
const roboticsSkills: RoboticsSkill[] = [
  {
    id: 'ros',
    title: 'ROS',
    proficiency: 85,
    experience: '2+ years',
    type: 'Framework',
    description: 'Robot Operating System for robotic application development',
    features: [
      'Node architecture',
      'Topic communication',
      'Service calls',
      'Action servers',
      'Parameter handling',
      'Launch files',
      'Diagnostics',
      'Navigation stack',
    ],
    tools: ['RViz', 'Gazebo', 'rqt', 'rosbag', 'catkin', 'roslaunch'],
    libraries: ['MoveIt', 'Navigation', 'Image Transport', 'TF2', 'PCL'],
    projects: 15,
    performance: {
      speed: 'Real-time capable',
      reliability: 'High',
      compatibility: 'Cross-platform',
    },
    bestPractices: [
      'Node organization',
      'Message design',
      'Error handling',
      'Resource management',
    ],
    architecturePatterns: [
      'Publisher/Subscriber',
      'Service/Client',
      'Action/Server',
      'Parameter Server',
    ],
    icon: Settings,
  },
  {
    id: 'arduino',
    title: 'Arduino',
    proficiency: 88,
    experience: '3+ years',
    type: 'Hardware',
    description: 'Microcontroller programming and prototyping platform',
    features: [
      'Digital I/O',
      'Analog reading',
      'PWM control',
      'Serial communication',
      'Interrupt handling',
      'Timer management',
      'Sensor integration',
      'Motor control',
    ],
    tools: [
      'Arduino IDE',
      'PlatformIO',
      'Serial Monitor',
      'Library Manager',
      'Board Manager',
    ],
    libraries: ['Servo', 'Wire', 'SPI', 'EEPROM', 'Stepper'],
    projects: 20,
    performance: {
      speed: 'Hardware dependent',
      reliability: 'Very high',
      compatibility: 'Cross-board',
    },
    bestPractices: [
      'Code organization',
      'Memory management',
      'Timing control',
      'Power efficiency',
    ],
    architecturePatterns: [
      'State machine',
      'Event handling',
      'Task scheduling',
      'Sensor fusion',
    ],
    icon: Cpu,
  },
  // Add other skills here...
]

// Main component
const Robotics = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<string>('all')

  const filteredSkills =
    filterType === 'all'
      ? roboticsSkills
      : roboticsSkills.filter((skill) => skill.type === filterType)

  const types = ['all', ...new Set(roboticsSkills.map((skill) => skill.type))]

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
          Robotics & Automation
        </h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          Skills in robotics, automation, and control systems development
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
            <SkillCard
              title={skill.title}
              proficiency={skill.proficiency}
              experience={skill.experience}
              description={skill.description}
              onClick={() =>
                setSelectedSkill(selectedSkill === skill.id ? null : skill.id)
              }
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-3 text-white shadow-lg"
              >
                <skill.icon className="size-full" />
              </motion.div>
            </SkillCard>

            {selectedSkill === skill.id && (
              <motion.div
                className="mt-4 pl-20"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid gap-6 text-sm text-gray-600 md:grid-cols-2 dark:text-gray-400">
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        Features
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
                          Performance
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(skill.performance).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center gap-2"
                              >
                                <span className="h-1 w-1 rounded-full bg-gray-400" />
                                <span className="font-medium">{key}:</span>{' '}
                                {value}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {skill.tools && (
                      <div>
                        <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                          <span className="h-2 w-2 rounded-full bg-indigo-500" />
                          Tools
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
                    )}

                    {skill.libraries && (
                      <div>
                        <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                          <span className="h-2 w-2 rounded-full bg-yellow-500" />
                          Libraries
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skill.libraries.map((library, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            >
                              {library}
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
                            skill.type === 'Framework'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : skill.type === 'Hardware'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : skill.type === 'Simulation'
                                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                  : skill.type === 'Control'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
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
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Robotics
