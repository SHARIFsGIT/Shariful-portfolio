import { motion, useAnimation } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface SkillCardProps {
  children: React.ReactNode
  title: string
  className: string
  proficiency: number
  experience: string
  description: string
  isSelected?: boolean
  onClick?: () => void
  lastUsed?: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  highlights?: string[]
  rating?: number
  usageFrequency?: 'Daily' | 'Weekly' | 'Monthly' | 'Occasional'
  certifications?: string[]
}

const progressBarVariants = {
  initial: { width: '0%' },
  animate: (proficiency: number) => ({
    width: `${proficiency}%`,
    transition: {
      duration: 1.3,
      ease: [0.87, 0, 0.13, 1],
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
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
  tap: {
    scale: 1.02,
  },
}

const LevelBadge = ({ level }: { level: string }) => {
  const getBadgeColor = () => {
    switch (level) {
      case 'Beginner':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Intermediate':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'Expert':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <span
      className={`rounded-lg px-3 py-1 text-xs font-medium ${getBadgeColor()}`}
    >
      {level}
    </span>
  )
}

const FrequencyIndicator = ({ frequency }: { frequency: string }) => {
  const getColor = () => {
    switch (frequency) {
      case 'Daily':
        return 'bg-green-500'
      case 'Weekly':
        return 'bg-blue-500'
      case 'Monthly':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${getColor()}`} />
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {frequency}
      </span>
    </div>
  )
}

// Enhanced Star Rating Component
interface StarRatingProps {
  rating: number
  readonly?: boolean
  size?: number
  precision?: 'full' | 'half'
  onChange?: (rating: number) => void
  showValue?: boolean
}

const StarRating = ({
  rating,
  readonly = true,
  size = 16,
  precision = 'half',
  onChange,
  showValue = false,
}: StarRatingProps) => {
  const [internalRating, setInternalRating] = useState(rating)
  const [hoverRating, setHoverRating] = useState(0)

  // Update internal rating when prop changes
  useEffect(() => {
    setInternalRating(rating)
  }, [rating])

  // Handle star click
  const handleClick = (selectedRating: number) => {
    if (readonly) return

    setInternalRating(selectedRating)
    onChange?.(selectedRating)
  }

  // Get star fill based on rating and hover state
  const getStarFill = (starPosition: number) => {
    const currentRating = hoverRating || internalRating

    if (precision === 'half') {
      // Full star
      if (starPosition <= Math.floor(currentRating)) {
        return 'currentColor'
      }
      // Half star
      if (
        starPosition === Math.ceil(currentRating) &&
        !Number.isInteger(currentRating)
      ) {
        return 'url(#halfGradient)'
      }
    } else {
      // Only full stars
      if (starPosition <= currentRating) {
        return 'currentColor'
      }
    }

    return 'none'
  }

  return (
    <div className="relative flex items-center gap-1">
      {/* SVG gradient definition for half stars */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="halfGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div
        className="flex items-center gap-1"
        onMouseLeave={() => !readonly && setHoverRating(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            className={!readonly ? 'cursor-pointer' : ''}
          >
            <Star
              size={size}
              className={`transition-all duration-200 ${
                (hoverRating || internalRating) >= star
                  ? 'text-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              } ${!readonly && 'hover:scale-110'}`}
              fill={getStarFill(star)}
              strokeWidth={1.5}
            />
          </div>
        ))}
      </div>

      {showValue && (
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {internalRating.toFixed(precision === 'half' ? 1 : 0)}
        </span>
      )}
    </div>
  )
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
  lastUsed,
  level = 'Intermediate',
  highlights = [],
  rating = 0,
  usageFrequency = 'Daily',
  certifications = [],
}: SkillCardProps) {
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [skillRating, setSkillRating] = useState(rating)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSelected) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [isSelected, controls])

  // Update internal rating when prop changes
  useEffect(() => {
    setSkillRating(rating)
  }, [rating])

  useEffect(() => {
    if (showDetails && cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
      }, 100)
    }
  }, [showDetails])

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
      onClick={() => {
        onClick?.()
        setShowDetails(!showDetails)
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-xl bg-white p-6 ${
        isSelected
          ? 'shadow-md dark:bg-gray-800'
          : 'hover:shadow-sm dark:bg-gray-800/90'
      } cursor-pointer transition-all duration-300`}
    >
      {/* Highlight glow effect */}
      <motion.div
        className="to-white-500/20 pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 opacity-0 blur-xl transition-opacity"
        animate={{ opacity: isHovered ? 0.3 : 0 }}
      />

      {/* Main content */}
      <div className="relative grid grid-cols-[auto,1fr] gap-6">
        {/* Icon section with hover effect */}
        <motion.div
          className="flex items-center justify-center"
          animate={
            isHovered ? { rotate: 360, scale: 1.02 } : { rotate: 0, scale: 1 }
          }
          transition={{ duration: 4, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>

        {/* Content section */}
        <div className="flex flex-col gap-4">
          {/* Header with badges */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
              <div className="flex items-center gap-3">
                <LevelBadge level={level} />
                <FrequencyIndicator frequency={usageFrequency} />
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {experience}
              </span>
              {lastUsed && (
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  Last used: {lastUsed}
                </p>
              )}
            </div>
          </div>

          {/* Description and rating */}
          <div className="flex items-start justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {description}
            </p>
            <StarRating
              rating={skillRating}
              readonly={!isSelected}
              precision="half"
              onChange={(newRating) => setSkillRating(newRating)}
            />
          </div>

          {/* Progress section */}
          <div className="space-y-2">
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
              <motion.div
                className={`absolute h-full rounded-full bg-gradient-to-r ${getProgressColor(
                  proficiency
                )} ${className}`}
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

          {/* Expandable details section */}
          <motion.div
            initial={false}
            animate={{ height: showDetails ? 'auto' : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="max-h-80 overflow-y-auto pr-2">
              {' '}
              {/* Add this wrapper with max height and scrolling */}
              {highlights.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Key Highlights
                  </h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span className="h-1 w-1 rounded-full bg-blue-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {certifications.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Certifications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Expand/collapse indicator */}
      <motion.div
        className="absolute bottom-2 right-2"
        animate={{ rotate: showDetails ? 180 : 0 }}
      >
        <ChevronDown className="size-5 text-gray-400 transition-colors group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300" />
      </motion.div>

      {/* Selection indicator */}
      <motion.div
        className="bg-primary-500 absolute bottom-0 left-0 top-0 w-1"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isSelected ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
