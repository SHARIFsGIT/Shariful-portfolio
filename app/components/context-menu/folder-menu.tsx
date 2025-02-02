import { copyFolder } from '@/app/features/window-slice'
import { useDispatch } from '@/app/store'
import {
  Calculator,
  ChevronRight,
  Chrome,
  Copy,
  Copy as CopyIcon,
  Edit3,
  Files,
  FileText,
  Folder,
  Grid,
  Info,
  LucideIcon,
  Share2,
  Trash2,
} from 'lucide-react'
import { ReactNode, useEffect, useRef, useState } from 'react'

interface SubMenuProps {
  title: string
  children: ReactNode
  disabled?: boolean
}

const SubMenu = ({ title, children, disabled = false }: SubMenuProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <li
      className={`group relative flex items-center justify-between px-3 py-2 ${
        disabled
          ? 'cursor-not-allowed text-gray-500'
          : 'cursor-pointer hover:bg-[#4a4a4a]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{title}</span>
      <ChevronRight className="h-4 w-4" />

      {isHovered && !disabled && (
        <div className="absolute left-full top-0 ml-1 w-48 rounded-md bg-[#343434] p-1 shadow-2xl">
          <ul className="space-y-1">{children}</ul>
        </div>
      )}
    </li>
  )
}

interface MenuItemProps {
  icon: LucideIcon
  onClick: () => void
  children: ReactNode
  disabled?: boolean
  divider?: boolean
}

const MenuItem = ({
  icon: Icon,
  onClick,
  children,
  disabled = false,
  divider = false,
}: MenuItemProps) => (
  <li
    onClick={disabled ? undefined : onClick}
    className={`group flex items-center gap-2 rounded-sm px-3 py-2 transition-colors ${disabled ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer hover:bg-[#4a4a4a]'} ${divider ? 'mb-1 border-b border-[#5a5a5a] pb-3' : ''}`}
  >
    {Icon && (
      <Icon
        className={`h-4 w-4 ${disabled ? 'text-gray-500' : 'text-gray-300'}`}
      />
    )}
    <span>{children}</span>
  </li>
)

type FolderType = 'folder' | 'pdf' | 'browser' | 'calculator'

const getTypeIcon = (type: FolderType): LucideIcon => {
  switch (type) {
    case 'folder':
      return Folder
    case 'pdf':
      return FileText
    case 'browser':
      return Chrome
    case 'calculator':
      return Calculator
    default:
      return Files
  }
}

interface FolderCtxMenuProps {
  position: { x: number; y: number }
  id: string
  name: string
  type: FolderType
  onDelete: () => void
  onRename: () => void
  onOpenFolder: () => void
}

export function FolderCtxMenu({
  position,
  id,
  name,
  type,
  onDelete,
  onRename,
  onOpenFolder,
}: FolderCtxMenuProps) {
  const dispatch = useDispatch()
  const menuRef = useRef<HTMLDivElement>(null)
  const TypeIcon = getTypeIcon(type)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // Add your close menu logic here
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        // Add your close menu logic here
        break
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault()
        // Add focus navigation logic
        break
    }
  }

  const noop = () => {}

  return (
    <div
      ref={menuRef}
      style={{
        top: position.y,
        left: position.x,
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onKeyDown={handleKeyDown}
      className="absolute z-[9999] w-56 rounded-md bg-[#343434] p-1 text-sm text-[#e0e0e0] shadow-2xl ring-1 ring-white/10"
      tabIndex={0}
    >
      <ul className="space-y-0.5">
        <MenuItem icon={TypeIcon} onClick={onOpenFolder} divider>
          Open
        </MenuItem>

        <MenuItem icon={Trash2} onClick={onDelete} divider>
          Move to Trash
        </MenuItem>

        <SubMenu title="Get Info">
          <MenuItem icon={Info} onClick={noop}>
            General
          </MenuItem>
          <MenuItem icon={Share2} onClick={noop}>
            Sharing & Permissions
          </MenuItem>
        </SubMenu>

        <MenuItem icon={Edit3} onClick={onRename}>
          Rename
        </MenuItem>

        <MenuItem icon={Grid} onClick={noop} disabled>
          Use Stacks
        </MenuItem>

        <MenuItem
          icon={CopyIcon}
          onClick={() => {
            dispatch(
              copyFolder({
                id,
                name,
                placement: 'desktop',
                status: 'close',
                type,
              })
            )
          }}
        >
          Duplicate
        </MenuItem>

        <MenuItem icon={Grid} onClick={noop} disabled>
          Clean Up
        </MenuItem>

        <SubMenu title="Copy">
          <MenuItem icon={Copy} onClick={noop}>
            Copy Path
          </MenuItem>
          <MenuItem icon={Copy} onClick={noop}>
            Copy as URL
          </MenuItem>
        </SubMenu>

        <SubMenu title="Share">
          <MenuItem icon={Share2} onClick={noop}>
            AirDrop
          </MenuItem>
          <MenuItem icon={Share2} onClick={noop}>
            Mail
          </MenuItem>
          <MenuItem icon={Share2} onClick={noop}>
            Messages
          </MenuItem>
        </SubMenu>
      </ul>
    </div>
  )
}
