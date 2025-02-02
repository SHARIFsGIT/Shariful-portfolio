import {
  setSortOption,
  setViewOption,
  setZIndex,
} from '@/app/features/settings'
import { addFolder, openFolder } from '@/app/features/window-slice'
import { useDispatch, useSelector } from '@/app/store'
import {
  AlignHorizontalSpaceBetween,
  AlignVerticalSpaceBetween,
  ArrowUpDown,
  ChevronRight,
  ClipboardCopy,
  ClipboardPaste,
  Clock,
  Eye,
  FileCog,
  FolderOpen,
  FolderPlus,
  Image,
  Info,
  LayoutGrid,
  Maximize2,
  RefreshCcw,
  Settings,
  Smartphone,
  Trash2,
  type LucideIcon,
} from 'lucide-react'
import React, { ReactNode, useEffect, useRef, useState } from 'react'

interface MenuItemProps {
  children: ReactNode
  icon?: LucideIcon
  disabled?: boolean
  onClick?: () => void
  hasSubmenu?: boolean
  shortcut?: string
  danger?: boolean
}

interface Position {
  x: number
  y: number
}

interface ContextMenuProps {
  position: Position
  onClose: () => void
  selectedItems?: number
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  icon: Icon,
  disabled = false,
  onClick,
  hasSubmenu = false,
  shortcut,
  danger = false,
}) => (
  <li
    onClick={(e) => {
      e.stopPropagation()
      if (!disabled && onClick) onClick()
    }}
    className={`group relative flex items-center gap-3 px-3 py-1.5 text-sm ${
      disabled
        ? 'cursor-not-allowed text-gray-500'
        : 'cursor-pointer hover:bg-[#3d3d3d]'
    } ${hasSubmenu ? 'justify-between' : ''} ${
      danger ? 'text-red-400 hover:text-red-300' : 'text-gray-200'
    } rounded-sm transition-all duration-75`}
  >
    {Icon && (
      <Icon
        size={16}
        className={`${
          disabled
            ? 'text-gray-500'
            : danger
              ? 'text-red-400 group-hover:text-red-300'
              : 'text-gray-300'
        }`}
      />
    )}
    <span className="flex-grow">{children}</span>
    {shortcut && <span className="ml-8 text-xs text-gray-500">{shortcut}</span>}
    {hasSubmenu && <ChevronRight size={14} className="text-gray-400" />}
  </li>
)

const Divider = () => <li className="my-1 border-t border-[#4a4a4a]" />

export const ContextMenu: React.FC<ContextMenuProps> = ({
  position,
  onClose,
  selectedItems = 0,
}) => {
  const dispatch = useDispatch()
  const { screen: screenMode, zIndex } = useSelector((state) => state.settings)
  const [subPosition, setSubPosition] = useState<'left' | 'right'>('right')
  const menuRef = useRef<HTMLDivElement>(null)
  const [hasClipboard, setHasClipboard] = useState(false)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        if (typeof onClose === 'function') {
          onClose()
        }
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (typeof onClose === 'function') {
          onClose()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    if (menuRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect()
      if (position.x + menuRect.width + 256 > window.innerWidth) {
        setSubPosition('left')
      }
      if (position.y + menuRect.height > window.innerHeight) {
        menuRef.current.style.top = `${window.innerHeight - menuRect.height - 10}px`
      }
    }
  }, [position.x, position.y])

  useEffect(() => {
    const checkClipboard = async () => {
      try {
        const text = await navigator.clipboard.readText()
        setHasClipboard(text.length > 0)
      } catch {
        setHasClipboard(false)
      }
    }
    checkClipboard()
  }, [])

  const handleNewFolder = () => {
    dispatch(
      addFolder({
        id: crypto.randomUUID(),
        name: 'Untitled Folder',
        status: 'close',
        placement: 'desktop',
        type: 'folder',
      })
    )
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  const handleSort = (option: 'name' | 'date') => {
    dispatch(setSortOption(option))
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  const handleView = (option: 'vertical' | 'horizontal') => {
    dispatch(setViewOption(option))
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  const submenuClassName = `
    invisible absolute w-64 bg-[#343434] rounded-md border border-[#545454] 
    shadow-lg group-hover:visible transition-all duration-75
    ${subPosition === 'right' ? 'left-full -translate-x-1' : 'right-full translate-x-1'}
    top-0 opacity-0 group-hover:opacity-100
  `

  return (
    <div
      ref={menuRef}
      style={{ top: position.y, left: position.x }}
      className="absolute z-[9999] w-64 rounded-md border border-[#545454] bg-[#343434] bg-opacity-95 shadow-xl backdrop-blur-sm"
      onContextMenu={(e) => e.preventDefault()}
    >
      <ul className="py-1">
        <MenuItem icon={FolderPlus} onClick={handleNewFolder} shortcut="⌘N">
          New Folder
        </MenuItem>
        <MenuItem icon={FolderOpen} disabled={selectedItems === 0}>
          Open
        </MenuItem>
        <MenuItem icon={Info} shortcut="⌘I" disabled={selectedItems === 0}>
          Get Info
        </MenuItem>

        <Divider />

        <MenuItem
          icon={ClipboardCopy}
          disabled={selectedItems === 0}
          shortcut="⌘C"
        >
          Copy
        </MenuItem>
        <MenuItem icon={ClipboardPaste} disabled={!hasClipboard} shortcut="⌘V">
          Paste
        </MenuItem>

        <Divider />

        <MenuItem icon={FileCog} disabled={selectedItems === 0} hasSubmenu>
          Quick Actions
          <div className={submenuClassName}>
            <ul className="py-1">
              <MenuItem icon={Eye}>Preview</MenuItem>
              <MenuItem icon={RefreshCcw}>Refresh</MenuItem>
            </ul>
          </div>
        </MenuItem>

        <MenuItem icon={Smartphone} disabled hasSubmenu>
          Import From iPhone
          <div className={submenuClassName}>
            <ul className="py-1">
              <MenuItem>Photos</MenuItem>
              <MenuItem>Documents</MenuItem>
              <MenuItem>Music</MenuItem>
            </ul>
          </div>
        </MenuItem>

        <MenuItem
          icon={Image}
          onClick={() => {
            dispatch(setZIndex(zIndex + 1))
            dispatch(openFolder('settings'))
            if (typeof onClose === 'function') {
              onClose()
            }
          }}
        >
          Change Desktop Background
        </MenuItem>

        <MenuItem
          icon={Maximize2}
          onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen()
            } else if (document.body.requestFullscreen) {
              document.body.requestFullscreen()
            }
            if (typeof onClose === 'function') {
              onClose()
            }
          }}
          shortcut="F11"
        >
          {screenMode === 'fullscreen' ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        </MenuItem>

        <Divider />

        <MenuItem icon={ArrowUpDown} hasSubmenu>
          Sort By
          <div className={submenuClassName}>
            <ul className="py-1">
              <MenuItem onClick={() => handleSort('name')}>Name</MenuItem>
              <MenuItem onClick={() => handleSort('date')}>
                Date Modified
              </MenuItem>
            </ul>
          </div>
        </MenuItem>

        <MenuItem icon={LayoutGrid} hasSubmenu>
          View Options
          <div className={submenuClassName}>
            <ul className="py-1">
              <MenuItem
                icon={AlignVerticalSpaceBetween}
                onClick={() => handleView('vertical')}
              >
                Vertical
              </MenuItem>
              <MenuItem
                icon={AlignHorizontalSpaceBetween}
                onClick={() => handleView('horizontal')}
              >
                Horizontal
              </MenuItem>
            </ul>
          </div>
        </MenuItem>

        <Divider />

        <MenuItem icon={Clock} disabled>
          Clear History
        </MenuItem>
        <MenuItem
          icon={Trash2}
          disabled={selectedItems === 0}
          danger
          shortcut="⌘⌫"
        >
          Move to Trash
        </MenuItem>
        <MenuItem icon={Settings}>Preferences</MenuItem>
      </ul>
    </div>
  )
}

export default ContextMenu
