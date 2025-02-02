import PropTypes from 'prop-types'
import { memo, useCallback, useEffect, useState } from 'react'

const AnimatedBio = memo(
  ({
    className = '',
    texts = [
      'ROS Engineer',
      'Software Developer',
      'Competitive Programmer',
      'MERN Stack Web Developer',
    ],
    fadeDelay = 500,
    switchDelay = 3000,
    direction = 'fade',
    pauseOnHover = false,
    initialDelay = 0,
    customAnimations = {},
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(true)
    const [isPaused, setIsPaused] = useState(false)

    const getAnimationClass = () => {
      if (customAnimations[direction]) {
        return isVisible
          ? customAnimations[direction].visible
          : customAnimations[direction].hidden
      }

      const animations = {
        fade: isVisible ? 'opacity-100' : 'opacity-0',
        up: isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0',
        down: isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0',
        left: isVisible
          ? 'translate-x-0 opacity-100'
          : '-translate-x-full opacity-0',
        right: isVisible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0',
        scale: isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
        rotate: isVisible ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0',
      }

      return animations[direction] || animations.fade
    }

    const animateText = useCallback(() => {
      if (isPaused) return

      setIsVisible(false)

      const timeoutId = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
        setIsVisible(true)
      }, fadeDelay)

      return () => clearTimeout(timeoutId)
    }, [texts.length, fadeDelay, isPaused])

    useEffect(() => {
      if (!texts.length) return

      const initialTimeoutId = setTimeout(() => {
        const intervalId = setInterval(animateText, switchDelay)
        return () => clearInterval(intervalId)
      }, initialDelay)

      return () => clearTimeout(initialTimeoutId)
    }, [animateText, switchDelay, texts.length, initialDelay])

    if (!texts.length) {
      console.warn('AnimatedBio: No texts provided')
      return null
    }

    const handleMouseEnter = () => {
      if (pauseOnHover) setIsPaused(true)
    }

    const handleMouseLeave = () => {
      if (pauseOnHover) setIsPaused(false)
    }

    return (
      <div
        className="relative inline-flex h-8 items-center overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h6
          className={` ${className} min-w-[280px] transform transition-all duration-500 ease-in-out ${getAnimationClass()} `}
          aria-live="polite"
          role="status"
          aria-atomic="true"
        >
          {texts[currentIndex]}
        </h6>
      </div>
    )
  }
)

AnimatedBio.propTypes = {
  className: PropTypes.string,
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
  fadeDelay: PropTypes.number,
  switchDelay: PropTypes.number,
  direction: PropTypes.oneOf([
    'up',
    'down',
    'left',
    'right',
    'fade',
    'scale',
    'rotate',
  ]),
  pauseOnHover: PropTypes.bool,
  initialDelay: PropTypes.number,
  customAnimations: PropTypes.objectOf(
    PropTypes.shape({
      visible: PropTypes.string,
      hidden: PropTypes.string,
    })
  ),
}

AnimatedBio.displayName = 'AnimatedBio'

export default AnimatedBio
