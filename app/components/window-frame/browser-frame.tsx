'use client'

import {
  addNewtab,
  focusTab,
  moveTab,
  removeTab,
  resetChrome,
  toggleMuteTab,
  togglePinTab,
  updateTab,
} from '@/app/features/chrome'
import { setActiveApp, setZIndex } from '@/app/features/settings'
import { closeFolder, minimizeFolder } from '@/app/features/window-slice'
import { useClickOutside } from '@/app/hooks/use-click-outside'
import { Size, useResize } from '@/app/hooks/use-resize'
import { useDispatch, useSelector } from '@/app/store'
import googleIcon from '@/public/assets/icons/google_logo.svg'
import { useGSAP } from '@gsap/react'
import {
  IconArrowLeft,
  IconArrowRight,
  IconBookmark,
  IconBracketsAngle,
  IconDotsVertical,
  IconHome,
  IconLock,
  IconMinus,
  IconPin,
  IconPlus,
  IconReload,
  IconSearch,
  IconShare,
  IconVolume,
  IconVolumeOff,
  IconX,
} from '@tabler/icons-react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Status } from '../folder/folders'

const size: Size = { minW: 750, minH: 300 }

interface Bookmark {
  id: string
  title: string
  url: string
  favicon?: string
}

interface BrowserFrameProps {
  frameName: string
  frame_id: string
  status: Status
}

export function BrowserFrame({
  frameName,
  frame_id,
  status,
}: BrowserFrameProps) {
  const dispatch = useDispatch()
  const { focusedTab, tabs } = useSelector((state) => state.chrome)
  const { theme } = useTheme()
  const { zIndex } = useSelector((state) => state.settings)

  // Refs
  const frame = useRef<HTMLDivElement>(null)
  const frameHeader = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Animation timelines
  const timeline = useRef<gsap.core.Timeline>(gsap.timeline())
  const minimizeTL = useRef<gsap.core.Timeline>(gsap.timeline())
  const fullscreenTL = useRef<gsap.core.Timeline>(gsap.timeline())
  const dragRef = useRef<globalThis.Draggable[]>()

  // State
  const [url, setUrl] = useState('')
  const [isFocused, setIsFocused] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showTabContextMenu, setShowTabContextMenu] = useState<{
    x: number
    y: number
    tabId: string
  } | null>(null)
  const [showBookmarksBar] = useState(true)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    {
      id: '1',
      title: 'Google',
      url: 'https://google.com',
      favicon: '/favicon.ico',
    },
    {
      id: '2',
      title: 'GitHub',
      url: 'https://github.com/SHARIFsGIT',
      favicon: '/github-favicon.ico',
    },
  ])

  const activeTab = tabs.find((tab) => tab.id === focusedTab)

  // GSAP setup
  const { contextSafe } = useGSAP(() => {
    const position_x = Math.floor(
      Math.random() * (window.innerWidth - window.innerWidth / 2 - 50)
    )
    const position_y = Math.floor(
      Math.random() * (window.innerHeight - window.innerHeight / 2 - 80)
    )

    timeline.current.fromTo(
      frame.current,
      {
        left: `${position_x}px`,
        top: `${position_y}px`,
        opacity: 0,
        scale: 0.8,
        ease: 'back.inOut(1.7)',
        duration: 0.5,
      },
      {
        scale: 1,
        opacity: 1,
        ease: 'back.inOut(1.7)',
      }
    )

    dragRef.current = Draggable.create(frame.current, {
      trigger: frameHeader.current,
      zIndexBoost: false,
      allowEventDefault: true,
    })
  })

  // Drag handlers
  const onDragEnable = () => {
    if (dragRef.current) {
      dragRef.current[0].enable()
    }
  }

  const syncPosition = () => {
    if (dragRef.current && frame.current) {
      const rect = frame.current.getBoundingClientRect()
      gsap.set(frame.current, { left: rect.left, top: rect.top, x: 0, y: 0 })
    }
  }

  const onDragDisable = () => {
    if (dragRef.current) {
      syncPosition()
      dragRef.current[0].kill()
    }
  }

  // Tab drag and drop handlers
  const handleTabDragStart = (e: React.DragEvent, tabId: string) => {
    e.dataTransfer.setData('tabId', tabId)
  }

  const handleTabDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleTabDrop = (e: React.DragEvent, targetTabId: string) => {
    e.preventDefault()
    const draggedTabId = e.dataTransfer.getData('tabId')
    const draggedTab = tabs.find((tab) => tab.id === draggedTabId)
    const targetTab = tabs.find((tab) => tab.id === targetTabId)

    if (draggedTab && targetTab) {
      dispatch(moveTab({ id: draggedTabId, newIndex: targetTab.index }))
    }
  }

  // Window control handlers
  const handleZIndex = () => {
    if (frame.current) {
      dispatch(setZIndex(zIndex + 1))
      frame.current.style.zIndex = `${zIndex + 1}`
    }
  }

  const onClose = contextSafe(() => {
    dispatch(setActiveApp(null))
    timeline.current.reverse()
    timeline.current.eventCallback('onReverseComplete', () => {
      dispatch(closeFolder(frame_id))
    })
  })

  const onMinimize = contextSafe(() => {
    syncPosition()
    minimizeTL.current.to(frame.current, {
      yPercent: 100,
      scale: 0.3,
      xPercent: -50,
      left: '50%',
      duration: 0.5,
      ease: 'expo.in',
    })
    minimizeTL.current.eventCallback('onComplete', () => {
      dispatch(
        minimizeFolder({
          id: frame_id,
          onRestore: () => {
            minimizeTL.current.reverse()
            minimizeTL.current.eventCallback('onReverseComplete', () => {
              minimizeTL.current = gsap.timeline()
            })
          },
        })
      )
    })
  })

  const onFullScreen = contextSafe(() => {
    if (frame.current instanceof HTMLDivElement) {
      if (isFullscreen) {
        fullscreenTL.current.reverse()
        fullscreenTL.current.eventCallback('onReverseComplete', () => {
          fullscreenTL.current = gsap.timeline()
          if (dragRef.current) {
            dragRef.current[0].enable()
          }
        })
        setIsFullscreen(false)
      } else {
        fullscreenTL.current.to(frame.current, {
          width: '100vw',
          height: `${window.innerHeight - 28}px`,
          x: 0,
          y: 0,
          left: '0px',
          top: '28px',
          duration: 0.5,
          ease: 'expo.inOut',
        })
        if (dragRef.current) {
          dragRef.current[0].kill()
        }
        setIsFullscreen(true)
      }
    }
  })

  // URL handling
  const handleUrlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (url) {
      setIsLoading(true)
      const formattedUrl =
        url.startsWith('http://') || url.startsWith('https://')
          ? url
          : url.includes('.')
            ? `https://${url}`
            : `https://www.google.com/search?q=${encodeURIComponent(url)}`

      dispatch(
        updateTab({
          id: focusedTab,
          url: formattedUrl,
          iframe_url: formattedUrl,
          isLoading: true,
        })
      )

      // Simulate page load
      setTimeout(() => {
        setIsLoading(false)
        dispatch(
          updateTab({
            id: focusedTab,
            isLoading: false,
            title: url.includes('.')
              ? url.split('/')[0]
              : `${url} - Google Search`,
          })
        )
      }, 1500)
    }
  }

  // Context menu
  const handleTabContextMenu = (e: React.MouseEvent, tabId: string) => {
    e.preventDefault()
    setShowTabContextMenu({
      x: e.clientX,
      y: e.clientY,
      tabId,
    })
  }

  useClickOutside(() => {
    setShowTabContextMenu(null)
  }, menuRef)

  // Navigation handlers
  const handleReload = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const handleGoBack = () => {
    // Implementation for browser history
  }

  const handleGoForward = () => {
    // Implementation for browser history
  }

  // Resize handlers
  const t = useResize({ frame, place: 't', size, onDragEnable, onDragDisable })
  const tr = useResize({
    frame,
    place: 'tr',
    size,
    onDragEnable,
    onDragDisable,
  })
  const tl = useResize({
    frame,
    place: 'tl',
    size,
    onDragEnable,
    onDragDisable,
  })
  const r = useResize({ frame, place: 'r', size })
  const l = useResize({ frame, place: 'l', size, onDragEnable, onDragDisable })
  const bl = useResize({
    frame,
    place: 'bl',
    size,
    onDragEnable,
    onDragDisable,
  })
  const b = useResize({ frame, place: 'b', size })
  const br = useResize({ frame, place: 'br', size })

  // Effects
  useEffect(() => {
    if (frame.current) {
      frame.current.style.zIndex = `${zIndex}`
    }
    if (activeTab) {
      setUrl(activeTab.url)
    }
  }, [activeTab, zIndex])

  return (
    <div
      onContextMenu={(e) => {
        e.stopPropagation()
      }}
      onMouseDown={() => {
        dispatch(setActiveApp({ name: frameName }))
        handleZIndex()
        setIsFocused(true)
      }}
      ref={frame}
      className={`absolute h-1/2 min-h-[300px] w-2/4 min-w-[750px] overflow-hidden rounded-md bg-white/20 shadow-xl backdrop-blur-xl ${isFocused ? 'brightness-100' : 'brightness-90'} ${status === 'minimize' ? 'hidden' : ''}`}
    >
      <div className="relative h-full">
        {/* Resize handlers */}
        <div
          ref={t}
          className="absolute top-0 z-10 h-1 w-full cursor-ns-resize bg-transparent"
        />
        <div
          ref={b}
          className="absolute bottom-0 z-10 h-1 w-full cursor-ns-resize bg-transparent"
        />
        <div
          ref={r}
          className="absolute right-0 z-10 h-full w-1 cursor-ew-resize bg-transparent"
        />
        <div
          ref={l}
          className="absolute left-0 z-10 h-full w-1 cursor-ew-resize bg-transparent"
        />
        <div
          ref={tl}
          className="absolute left-0 top-0 z-20 size-2 cursor-nwse-resize bg-transparent"
        />
        <div
          ref={tr}
          className="absolute right-0 top-0 z-20 size-2 cursor-nesw-resize bg-transparent"
        />
        <div
          ref={bl}
          className="absolute bottom-0 left-0 z-20 size-2 cursor-nesw-resize bg-transparent"
        />
        <div
          ref={br}
          className="absolute bottom-0 right-0 z-20 size-2 cursor-nwse-resize bg-transparent"
        />

        {/* Header */}
        <div
          ref={frameHeader}
          onDoubleClick={onFullScreen}
          className="grid !cursor-custom-auto grid-cols-[auto,1fr] bg-light-background py-2 pb-1 dark:bg-dark-background"
        >
          {/* Window controls */}
          <div className="group flex items-center px-2">
            <button
              onClick={() => {
                onClose()
                dispatch(resetChrome())
              }}
              className="!cursor-custom-auto p-1"
              type="button"
            >
              <div className="size-3 rounded-full bg-[#FF6058]">
                <IconX className="size-full text-black opacity-0 group-hover:opacity-100" />
              </div>
            </button>
            <button
              onClick={onMinimize}
              className="!cursor-custom-auto p-1"
              type="button"
            >
              <div className="size-3 rounded-full bg-[#FFC130]">
                <IconMinus className="size-full text-black opacity-0 group-hover:opacity-100" />
              </div>
            </button>
            <button
              onClick={onFullScreen}
              className="group/fullscreen relative !cursor-custom-auto p-1"
              type="button"
            >
              <div className="size-3 rounded-full bg-[#27CA40]">
                <IconBracketsAngle className="size-full -rotate-45 text-black opacity-0 group-hover:opacity-100" />
              </div>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 text-sm">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                draggable
                onDragStart={(e) => handleTabDragStart(e, tab.id)}
                onDragOver={handleTabDragOver}
                onDrop={(e) => handleTabDrop(e, tab.id)}
                onContextMenu={(e) => handleTabContextMenu(e, tab.id)}
                className={`relative flex w-full max-w-40 items-center gap-2 rounded-t-md px-3 py-[6px] ${
                  focusedTab === tab.id
                    ? 'bg-light-foreground dark:bg-[#35363A]'
                    : 'bg-light-background/50 dark:bg-[#292A2D]'
                }`}
              >
                {tab.favicon && (
                  <Image
                    src={tab.favicon}
                    alt=""
                    width={16}
                    height={16}
                    className="size-4"
                    unoptimized // Add this for favicons since they're already optimized
                  />
                )}
                {tab.isAudible && (
                  <button
                    onClick={() => dispatch(toggleMuteTab(tab.id))}
                    className="flex-shrink-0"
                  >
                    {tab.isMuted ? (
                      <IconVolumeOff className="size-4" />
                    ) : (
                      <IconVolume className="size-4" />
                    )}
                  </button>
                )}
                {tab.isPinned && <IconPin className="size-4 -rotate-45" />}
                <span
                  className="line-clamp-1 flex-grow cursor-pointer"
                  onClick={() => {
                    dispatch(focusTab(tab.id))
                    setUrl(tab.url)
                  }}
                >
                  {tab.title}
                </span>
                <IconX
                  onClick={() => {
                    dispatch(removeTab(tab.id))
                    if (tabs.length === 1) {
                      onClose()
                    }
                  }}
                  stroke={2}
                  className="size-4 opacity-0 transition-opacity hover:opacity-100"
                />
                {focusedTab === tab.id && (
                  <span className="absolute -bottom-1 left-0 h-1 w-full bg-light-foreground dark:bg-[#35363A]" />
                )}
              </div>
            ))}
            <button
              onClick={() => {
                dispatch(addNewtab({ index: tabs.length }))
                setUrl('')
              }}
              className="rounded-t-md px-2 hover:bg-light-foreground/50 dark:hover:bg-[#35363A]/50"
              type="button"
            >
              <IconPlus stroke={2} className="size-5" />
            </button>
          </div>
        </div>

        {/* Browser content */}
        <div className="h-full max-h-[calc(100%-40px)] overflow-y-auto bg-light-background dark:bg-dark-background">
          {/* Navigation bar */}
          <div className="flex items-center gap-3 bg-light-foreground px-2 py-1 dark:bg-[#35363A]">
            <button
              onClick={handleGoBack}
              className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <IconArrowLeft stroke={2} className="text-gray-500" />
            </button>
            <button
              onClick={handleGoForward}
              className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <IconArrowRight stroke={2} className="text-gray-500" />
            </button>
            <button
              onClick={handleReload}
              className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isLoading ? (
                <div className="size-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
              ) : (
                <IconReload stroke={2} />
              )}
            </button>
            <button
              onClick={() => setUrl('')}
              className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <IconHome stroke={2} />
            </button>

            {/* URL/Search bar */}
            <form onSubmit={handleUrlSubmit} className="relative w-full">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                {activeTab?.url.startsWith('https://') ? (
                  <IconLock className="size-4 text-green-600" />
                ) : (
                  <IconSearch className="size-4 text-gray-400" />
                )}
              </div>
              <input
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  dispatch(
                    updateTab({
                      id: focusedTab,
                      url: e.target.value,
                    })
                  )
                }}
                type="text"
                placeholder="Search Google or enter a URL"
                className="w-full rounded-2xl border-2 border-light-border bg-light-background py-1 pl-10 pr-3 text-sm focus:border-[#858585] focus:outline-none dark:border-[#191919] dark:bg-[#1d1d1d]"
              />
            </form>

            {/* Settings button */}
            <button
              onClick={() => setShowTabContextMenu(null)}
              className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <IconDotsVertical stroke={2} />
            </button>
          </div>

          {/* Bookmarks bar */}
          {showBookmarksBar && (
            <div className="flex items-center gap-4 bg-light-foreground/50 px-4 py-1 text-sm dark:bg-[#35363A]/50">
              {bookmarks.map((bookmark) => (
                <button
                  key={bookmark.id}
                  onClick={() => {
                    dispatch(
                      updateTab({
                        id: focusedTab,
                        url: bookmark.url,
                        iframe_url: bookmark.url,
                      })
                    )
                    setUrl(bookmark.url)
                  }}
                  className="flex items-center gap-2 rounded px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {bookmark.favicon && (
                    <Image
                      src={bookmark.favicon}
                      alt=""
                      width={16}
                      height={16}
                      className="size-4"
                      unoptimized // Add this for favicons since they're already optimized
                    />
                  )}
                  <span>{bookmark.title}</span>
                </button>
              ))}
            </div>
          )}

          {/* Main content area */}
          {activeTab && activeTab.iframe_url ? (
            <div className="relative h-[calc(100%-40px)]">
              {isLoading && (
                <div className="absolute left-0 top-0 h-1 w-full bg-gray-200 dark:bg-gray-700">
                  <div className="animate-loading-bar h-full bg-blue-500" />
                </div>
              )}
              <iframe className="h-full w-full" src={activeTab.iframe_url} />
            </div>
          ) : (
            <div className="flex h-[calc(100%-40px)] w-full flex-col items-center justify-center gap-6">
              {theme === 'dark' ? (
                <div
                  style={{
                    maskImage: "url('/assets/icons/google_logo.svg')",
                    maskRepeat: 'no-repeat',
                    maskSize: '100%',
                  }}
                  className="h-[92px] w-[272px] bg-white forced-color-adjust-none"
                />
              ) : (
                <Image alt="" src={googleIcon} priority />
              )}
              <form onSubmit={handleUrlSubmit} className="w-full max-w-xl">
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  type="text"
                  placeholder="Search Google or enter a URL"
                  className="h-12 w-full rounded-full border-2 border-light-border bg-light-background px-6 text-sm focus:border-[#858585] focus:outline-none dark:border-[#858585] dark:bg-[#1d1d1d]"
                />
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Tab context menu */}
      {showTabContextMenu && (
        <div
          ref={menuRef}
          className="fixed z-50 w-64 rounded-lg border border-gray-200 bg-white py-2 shadow-xl dark:border-gray-700 dark:bg-gray-800"
          style={{
            left: showTabContextMenu.x,
            top: showTabContextMenu.y,
          }}
        >
          <button
            onClick={() => {
              dispatch(togglePinTab(showTabContextMenu.tabId))
              setShowTabContextMenu(null)
            }}
            className="flex w-full items-center gap-2 px-4 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <IconPin className="size-4" />
            {tabs.find((t) => t.id === showTabContextMenu.tabId)?.isPinned
              ? 'Unpin tab'
              : 'Pin tab'}
          </button>
          <button
            onClick={() => {
              const tab = tabs.find((t) => t.id === showTabContextMenu.tabId)
              if (tab) {
                navigator.clipboard.writeText(tab.url)
              }
              setShowTabContextMenu(null)
            }}
            className="flex w-full items-center gap-2 px-4 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <IconShare className="size-4" />
            Copy URL
          </button>
          <button
            onClick={() => {
              const tab = tabs.find((t) => t.id === showTabContextMenu.tabId)
              if (tab) {
                setBookmarks([
                  ...bookmarks,
                  {
                    id: crypto.randomUUID(),
                    title: tab.title,
                    url: tab.url,
                    favicon: tab.favicon,
                  },
                ])
              }
              setShowTabContextMenu(null)
            }}
            className="flex w-full items-center gap-2 px-4 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <IconBookmark className="size-4" />
            Bookmark tab
          </button>
        </div>
      )}

      {/* Loading animation styles */}
      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
