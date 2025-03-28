import { motion, useInView } from 'framer-motion'
import { Bot, CircuitBoard, Server } from 'lucide-react'
import React, { useRef, useState } from 'react'
import SkillCard from './skill-card'

// Types and interfaces
interface RoboticsSkill {
  id: string
  title: string
  proficiency: number
  experience: string
  description: string
  category: 'Framework' | 'Hardware' | 'Simulation' | 'Control' | 'Scripting'
  icon: React.FC<{ className?: string; stroke?: string }>
  keyFeatures: string[]
  tools: string[]
  projects: number
  certifications: string[]
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  usageFrequency: 'Daily' | 'Weekly' | 'Monthly' | 'Occasional'
}

const roboticsSkills: RoboticsSkill[] = [
  {
    id: 'ros',
    title: 'ROS',
    proficiency: 75,
    experience: '1+ years',
    description: 'Robot Operating System for robotic application development',
    category: 'Framework',
    keyFeatures: [
      'ROS basics',
      'Kalman filters',
      'Robot dynamics',
      'Robot navigation',
      'Robot kinematics',
      'Robot perception',
      'Object manipulation',
      'Robot modeling with URDF',
      'Robot frame transformations with TF',
      'Build robot controllers',
      'Path planning algorithms',
    ],
    tools: [
      'RViz',
      'Gazebo',
      'rqt',
      'rosbag',
      'catkin',
      'roslaunch',
      'Docker',
      'Jenkins',
    ],
    projects: 15,
    certifications: ['ETH Zürich', 'The Construct'],
    level: 'Intermediate',
    usageFrequency: 'Daily',
    icon: () => (
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-lg bg-gradient-to-br from-[#22A699] to-[#147869] shadow-lg transition-shadow hover:shadow-xl">
        <Bot size={32} className="text-white" />
      </div>
    ),
  },
  {
    id: 'arduino',
    title: 'Arduino',
    proficiency: 70,
    experience: '2+ years',
    description:
      'Experienced in microcontroller programming with hands-on expertise using Arduino',
    category: 'Hardware',
    keyFeatures: [
      'PWM control',
      'Digital I/O',
      'Motor control',
      'Analog reading',
      'Timer management',
      'Sensor integration',
      'Serial communication',
    ],
    tools: ['Arduino IDE', 'Serial Monitor'],
    projects: 7,
    certifications: ['Null'],
    level: 'Advanced',
    usageFrequency: 'Monthly',
    icon: () => (
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-lg bg-gradient-to-br from-[#00979D] to-[#007982] shadow-lg transition-shadow hover:shadow-xl">
        <CircuitBoard size={32} className="text-white" />
      </div>
    ),
  },
  {
    id: 'gazebo',
    title: 'Gazebo',
    proficiency: 72,
    experience: '1+ years',
    description: 'Used for 3D robotics simulation environment',
    category: 'Simulation',
    keyFeatures: [
      'Robot modeling',
      'World creation',
      'ROS integration',
      '3D visualization',
      'Sensor simulation',
      'Plugin development',
      'Multi-robot simulation',
    ],
    tools: ['Gazebo GUI'],
    projects: 15,
    certifications: ['ETH Zürich', 'The Construct'],
    level: 'Intermediate',
    usageFrequency: 'Daily',
    icon: () => (
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-lg bg-gradient-to-br from-[#FF6B6B] to-[#D83A3A] shadow-lg transition-shadow hover:shadow-xl">
        <Server size={32} className="text-white" />
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

export function Robotics() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const filteredSkills =
    filterCategory === 'all'
      ? roboticsSkills
      : roboticsSkills.filter((skill) => skill.category === filterCategory)

  const categories = [
    'all',
    ...new Set(roboticsSkills.map((skill) => skill.category)),
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
          Robotics & Automation
        </h2>
        <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
          Skills in robotics, automation, and control systems development
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
                <skill.icon stroke="1.5" />
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
                      {skill.keyFeatures.map(
                        (feature: string, index: number) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-gray-400" />
                            {feature}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Tools & Technologies
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {skill.tools.map((tool: string, index: number) => (
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
                      <span className="h-2 w-2 rounded-full bg-yellow-500" />
                      Certifications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.certifications.map(
                        (cert: string, index: number) => (
                          <span
                            key={index}
                            className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          >
                            {cert}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div>
                      <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Category:
                      </span>{' '}
                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                          skill.category === 'Framework'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : skill.category === 'Hardware'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : skill.category === 'Simulation'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
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

export default Robotics
