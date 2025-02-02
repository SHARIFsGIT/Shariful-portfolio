import { RefObject, useEffect, useState } from 'react'

interface IntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export function useIntersection(
  elementRef: RefObject<Element>,
  options: IntersectionOptions = {}
): boolean {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
  } = options
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef?.current
    if (!element) return

    if (freezeOnceVisible && isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting
        setIsVisible(isIntersecting)
      },
      { threshold, root, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible, isVisible])

  return isVisible
}
