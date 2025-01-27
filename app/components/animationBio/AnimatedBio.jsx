import { useCallback, useEffect, useState } from 'react'

const AnimatedBio = ({
  className = '',
  texts = [
    'ROS Engineer',
    'Software Developer',
    'Competitive Programmer',
    'MERN Stack Web Developer',
  ],
  fadeDelay = 500,
  switchDelay = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const animateText = useCallback(() => {
    setIsVisible(false)

    const timeoutId = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
      setIsVisible(true)
    }, fadeDelay)

    return () => clearTimeout(timeoutId)
  }, [texts.length, fadeDelay])

  useEffect(() => {
    if (isPaused) return
    const intervalId = setInterval(animateText, switchDelay)
    return () => clearInterval(intervalId)
  }, [animateText, isPaused, switchDelay])

  if (!texts.length) {
    return null
  }

  return (
    <div
      className="inline-flex h-8 items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h6
        className={`${className} min-w-[280px] transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-live="polite"
        role="status"
      >
        {texts[currentIndex]}
      </h6>
    </div>
  )
}

export default AnimatedBio
