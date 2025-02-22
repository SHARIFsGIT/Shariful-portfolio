import { motion } from 'framer-motion'
import React from 'react'

interface SkillCardProps {
  children: React.ReactNode
  title: string
  className: string
  proficiency: number
  experience: string
  description: string
  isSelected?: boolean
  onClick?: () => void
}

const progressBarVariants = {
  initial: { width: '0%' },
  animate: (proficiency: number) => ({
    width: `${proficiency}%`,
    transition: {
      duration: 1.2,
      ease: [0.87, 0, 0.13, 1], // Custom easing
      delay: 0.3,
    },
  }),
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  tap: {
    scale: 0.98,
  },
}

export default function SkillCard({
  children,
  title,
  className,
  proficiency,
  experience,
  description,
  isSelected = false,
  onClick,
}: SkillCardProps) {
  // Calculate the color based on proficiency
  const getProgressColor = (value: number) => {
    if (value >= 90) return 'from-emerald-500 to-emerald-400'
    if (value >= 75) return 'from-green-500 to-green-400'
    if (value >= 60) return 'from-yellow-500 to-yellow-400'
    return 'from-orange-500 to-orange-400'
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={`skillCard relative overflow-hidden rounded-xl p-6 ${isSelected ? 'bg-white shadow-lg dark:bg-gray-800' : 'hover:bg-white/80 dark:hover:bg-gray-800/80'} cursor-pointer transition-colors duration-200`}
    >
      {/* Background gradient effect */}
      <motion.div
        className="from-primary-100 to-primary-50 dark:from-primary-900/10 dark:to-primary-800/5 absolute inset-0 bg-gradient-to-r opacity-0"
        animate={{ opacity: isSelected ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative grid grid-cols-[auto,1fr] gap-6">
        {/* Icon section */}
        <motion.div
          className="flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>

        {/* Content section */}
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {experience}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>

          {/* Progress section */}
          <div className="space-y-2">
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
              <motion.div
                className={`absolute h-full rounded-full bg-gradient-to-r ${getProgressColor(proficiency)} ${className}`}
                variants={progressBarVariants}
                initial="initial"
                animate="animate"
                custom={proficiency}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Proficiency
              </span>
              <motion.span
                className="font-semibold text-gray-900 dark:text-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.3 }}
              >
                {proficiency}%
              </motion.span>
            </div>
          </div>
        </div>
      </div>

      {/* Side indicator for selected state */}
      <motion.div
        className="bg-primary-500 absolute bottom-0 left-0 top-0 w-1"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isSelected ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
