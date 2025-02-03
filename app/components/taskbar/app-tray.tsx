'use client'

import { setZIndex } from '@/app/features/settings'
import { minimizeFolder, openFolder } from '@/app/features/window-slice'
import { useDispatch, useSelector } from '@/app/store'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'

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
    const tooltipId = useMemo(
      () => `tooltip-${name.toLowerCase().replace(/\s+/g, '-')}`,
      [name]
    )

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
        aria-describedby={tooltipId}
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
          id={tooltipId}
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
  const [iconMap, setIconMap] = useState<Record<string, StaticImageData>>({})

  useEffect(() => {
    const loadIcons = async () => {
      const loadedIcons: Record<string, StaticImageData> = {
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

          <Link
            target="_blank"
            href="https://github.com/SHARIFsGIT"
            className="group relative flex size-14 items-center justify-center rounded-xl bg-dark-background/20 backdrop-blur-sm transition-transform hover:scale-110"
            aria-label="Visit GitHub Profile"
          >
            <svg viewBox="0 0 98 96" className="size-10">
              <path
                fill="black"
                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
              />
            </svg>
            <div className="absolute -top-12 left-1/2 hidden -translate-x-1/2 transform rounded-lg bg-black/75 px-3 py-1.5 text-sm text-white shadow-lg backdrop-blur-sm group-hover:block">
              GitHub
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-black/75" />
            </div>
          </Link>
        </div>
      </nav>
    </div>
  )
}
