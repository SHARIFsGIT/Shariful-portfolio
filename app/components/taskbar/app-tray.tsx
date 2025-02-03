'use client'

import { setZIndex } from '@/app/features/settings'
import { minimizeFolder, openFolder } from '@/app/features/window-slice'
import { useDispatch, useSelector } from '@/app/store'
import Image, { StaticImageData } from 'next/image'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import GitHubPopup from './github'

// Move interfaces outside of component
interface DockItemProps {
  icon: StaticImageData
  name: string
  onClick: () => void
  isOpen?: boolean
  isMinimized?: boolean
  className?: string
  isAnimated?: boolean
  ariaLabel?: string
}

interface FolderType {
  id: string
  name: string
  type: string
  status: string
  placement: string
  onMinimizeRestore?: () => void
}

type IconMapType = Record<string, StaticImageData>

const DockItem = memo<DockItemProps>(
  ({
    icon,
    name,
    onClick,
    isOpen = false,
    isMinimized = false,
    className = '',
    isAnimated = true,
    ariaLabel,
  }) => {
    const baseButtonClass =
      'group relative flex items-center justify-center transition-all duration-150 hover:scale-125'
    const buttonClassName = className
      ? `${baseButtonClass} ${className}`
      : baseButtonClass

    const baseImageContainerClass =
      'relative size-14 transition-transform duration-300'
    const imageContainerClassName =
      isOpen && !isMinimized && isAnimated
        ? `${baseImageContainerClass} animate-bounce-once`
        : baseImageContainerClass

    const baseImageClass = 'object-cover object-center'
    const imageClassName = className
      ? `${baseImageClass} ${className}`
      : baseImageClass

    return (
      <button
        className={buttonClassName}
        onClick={onClick}
        aria-label={ariaLabel || name}
      >
        <div className={imageContainerClassName}>
          <Image
            alt={name}
            src={icon}
            fill
            sizes="56px"
            className={imageClassName}
            priority={isOpen}
          />
        </div>

        <div
          role="tooltip"
          className="absolute -top-12 left-1/2 -translate-x-1/2 transform rounded-lg bg-black/75 px-3 py-1.5 text-sm text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
        >
          {name}
          <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-black/75" />
        </div>

        {(isOpen || isMinimized) && (
          <span className="absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-white" />
        )}
      </button>
    )
  }
)

DockItem.displayName = 'DockItem'

export default function AppTray() {
  const dispatch = useDispatch()
  const folders = useSelector((state) => state.windowFrame) as FolderType[]
  const trashItems = useSelector((state) => state.trash.items).length
  const { zIndex } = useSelector((state) => state.settings)
  const [iconMap, setIconMap] = useState<IconMapType>({})

  // Move GitHub token state inside component and use environment variable
  const [githubToken] = useState(process.env.NEXT_PUBLIC_GITHUB_TOKEN || '')

  useEffect(() => {
    const loadIcons = async () => {
      const loadedIcons: IconMapType = {
        settings: (await import('@/public/assets/icons/Settings.png')).default,
        contact: (await import('@/public/assets/icons/Contacts.png')).default,
        gallery: (await import('@/public/assets/icons/Photos.png')).default,
        trash_empty: (await import('@/public/assets/icons/TrashEmpty.png'))
          .default,
        trash_full: (await import('@/public/assets/icons/TrashFull.png'))
          .default,
        inotes: (await import('@/public/assets/icons/Notes.png')).default,
        terminal: (await import('@/public/assets/icons/Terminal.png')).default,
        safari: (await import('@/public/assets/icons/Safari.png')).default,
        calculator: (await import('@/public/assets/icons/Calculator.png'))
          .default,
        folder: (await import('@/public/assets/icons/Folder.png')).default,
        finder: (await import('@/public/assets/icons/Finder.png')).default,
        imessages: (await import('@/public/assets/icons/Messages.png')).default,
        typing_master: (await import('@/public/assets/icons/typing-master.png'))
          .default,
        acrobat: (await import('@/public/assets/icons/Acrobat.png')).default,
      }
      setIconMap(loadedIcons)
    }

    loadIcons()
  }, [])

  const minimizeFolders = useMemo(
    () =>
      folders.filter(
        (folder) => folder.status !== 'close' && folder.placement === 'desktop'
      ),
    [folders]
  )

  const taskbarApps = useMemo(
    () => folders.filter((f) => f.placement === 'taskbar'),
    [folders]
  )

  const handleAppClick = useCallback(
    (folder: FolderType) => {
      if (folder.status === 'open') {
        dispatch(minimizeFolder(folder.id))
      } else {
        dispatch(setZIndex(zIndex + 1))
        dispatch(openFolder(folder.id))
        folder.onMinimizeRestore?.()
      }
    },
    [dispatch, zIndex]
  )

  const getIconForFolder = useCallback(
    (folder: FolderType) => {
      if (!iconMap || Object.keys(iconMap).length === 0) {
        return undefined
      }

      if (folder.type === 'folder') {
        if (folder.id === 'trash') {
          return trashItems > 0 ? iconMap.trash_full : iconMap.trash_empty
        }
        if (folder.id === 'notes') {
          return iconMap.inotes
        }
        return iconMap[folder.id as keyof typeof iconMap] || iconMap.folder
      }
      if (folder.type === 'browser') return iconMap.safari
      if (folder.type === 'calculator') return iconMap.calculator
      if (folder.type === 'pdf') return iconMap.acrobat
      return iconMap.folder
    },
    [trashItems, iconMap]
  )

  if (Object.keys(iconMap).length === 0) {
    return null
  }

  return (
    <div className="pointer-events-auto fixed bottom-2 left-1/2 -translate-x-1/2 transform">
      <nav className="rounded-2xl bg-white/10 p-1 px-2 shadow-lg backdrop-blur-md">
        <div className="flex items-end gap-1 pb-[5px]">
          <DockItem
            icon={iconMap.finder}
            name="Finder"
            onClick={() => {}}
            ariaLabel="Open Finder"
          />

          <DockItem
            icon={iconMap.imessages}
            name="iMessage"
            onClick={() => {}}
            ariaLabel="Open iMessage"
          />

          {taskbarApps.map((folder) => {
            const icon = getIconForFolder(folder)
            if (!icon) return null
            return (
              <DockItem
                key={folder.id}
                icon={icon}
                name={folder.name}
                onClick={() => handleAppClick(folder)}
                isOpen={folder.status === 'open'}
                isMinimized={folder.status === 'minimize'}
                ariaLabel={`${folder.status === 'open' ? 'Minimize' : 'Open'} ${folder.name}`}
              />
            )
          })}

          {minimizeFolders.map((folder) => {
            const icon = getIconForFolder(folder)
            if (!icon) return null
            return (
              <DockItem
                key={folder.id}
                icon={icon}
                name={folder.name}
                onClick={() => {
                  if (folder.status !== 'open') {
                    dispatch(openFolder(folder.id))
                    folder.onMinimizeRestore?.()
                  }
                }}
                isOpen={folder.status === 'open'}
                isMinimized={folder.status === 'minimize'}
                className={folder.id === 'typing-master' ? 'p-[6px]' : ''}
                ariaLabel={`Restore ${folder.name}`}
              />
            )
          })}

          <GitHubPopup githubToken={githubToken} />
        </div>
      </nav>
    </div>
  )
}
