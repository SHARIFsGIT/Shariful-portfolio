// menu-utils.ts
import { RefObject, useEffect, useState } from 'react'

export interface BaseMenuItem {
  label: string
  action?: () => void
  disabled?: boolean
  divider?: boolean
  shortcut?: string
  submenu?: BaseMenuItem[]
  icon?: React.ReactNode
}

export const menuItemStyles = {
  base: 'p-2 px-3 rounded-md text-[#e0e0e0] transition-colors duration-150 focus:outline-none focus:bg-[#444444]',
  hover: 'hover:bg-[#222222]',
  disabled: 'text-[#888888] cursor-not-allowed',
  divider: "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-[#5a5a5a] after:content-['']",
  submenuContainer: 'group relative flex items-center justify-between',
  submenuPanel: 'invisible absolute w-64 bg-transparent px-2 text-sm shadow-2xl group-hover:visible focus-within:visible',
}

export function useMenuNavigation(
  menuItems: BaseMenuItem[],
  onClose?: () => void
) {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setActiveIndex((prev) => (prev + 1) % menuItems.length)
        break
      case 'ArrowUp':
        event.preventDefault()
        setActiveIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length)
        break
      case 'Enter':
        event.preventDefault()
        const currentItem = menuItems[activeIndex]
        if (currentItem.action && !currentItem.disabled) {
          currentItem.action()
          onClose?.()
        }
        break
    }
  }

  return { activeIndex, handleKeyDown }
}

export function useClickOutside(
  ref: RefObject<HTMLElement>,
  onClose?: () => void
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose?.()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [ref, onClose])
}