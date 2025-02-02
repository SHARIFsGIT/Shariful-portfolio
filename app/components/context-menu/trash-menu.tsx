import { cleanTrash, removeFromTrash } from '@/app/features/trash'
import { restoreFolder, restoreFolderAll } from '@/app/features/window-slice'
import { useDispatch, useSelector } from '@/app/store'
import { ArrowUp, Copy, FolderUp, Info, Loader2, Trash } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Folder } from '../folder/folders'

// Ripple effect component
function Ripple({
  x,
  y,
  onComplete,
}: {
  x: number
  y: number
  onComplete: () => void
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20"
      style={{
        left: x,
        top: y,
        width: '20px',
        height: '20px',
        animation: 'ripple 500ms ease-out',
      }}
    />
  )
}

// Modal component
function Modal({
  open,
  onClose,
  title,
  children,
  actions,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  actions: React.ReactNode
}) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
      onClick={() => onClose()}
    >
      <div
        className="w-[400px] rounded-lg bg-dark-context-bg p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>
        <div className="mb-4 text-[#e0e0e0]">{children}</div>
        <div className="flex justify-end gap-2">{actions}</div>
      </div>
    </div>
  )
}

export function TrashContextMenu({
  position,
  item,
  onClose,
}: {
  item: Folder
  position: { x: number; y: number }
  onClose?: () => void
}) {
  const dispatch = useDispatch()
  const trashItems = useSelector((state) => state.trash.items)
  const menuRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEmptyDialog, setShowEmptyDialog] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([])
  const [deleteAnimation, setDeleteAnimation] = useState<string | null>(null)
  const [isMenuVisible, setIsMenuVisible] = useState(true)

  // Track mouse position
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleCloseMenu = useCallback(() => {
    onClose?.()
  }, [onClose])

  const addRipple = (x: number, y: number) => {
    const id = Date.now()
    setRipples((prev) => [...prev, { id, x, y }])
  }

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
  }

  const handleRestore = useCallback(async () => {
    setLoading('restore')
    try {
      await dispatch(restoreFolder(item))
      await dispatch(removeFromTrash({ id: item.id, name: item.name }))
    } catch (error) {
      console.error('Error restoring item:', error)
    } finally {
      setLoading(null)
      handleCloseMenu()
    }
  }, [dispatch, item, handleCloseMenu])

  const handleRestoreAll = useCallback(async () => {
    if (trashItems.length <= 1) return
    setLoading('restoreAll')
    try {
      await dispatch(restoreFolderAll(trashItems))
      await dispatch(cleanTrash())
    } catch (error) {
      console.error('Error restoring all items:', error)
    } finally {
      setLoading(null)
      handleCloseMenu()
    }
  }, [dispatch, trashItems, handleCloseMenu])

  const handleDelete = useCallback(
    async (e?: React.MouseEvent) => {
      if (e) {
        const rect = (e.target as HTMLElement).getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        addRipple(x, y)
      }

      setDeleteAnimation('delete')
      setLoading('delete')

      try {
        // Add a small delay for the animation
        await new Promise((resolve) => setTimeout(resolve, 300))
        await dispatch(removeFromTrash({ id: item.id, name: item.name }))
      } catch (error) {
        console.error('Error deleting item:', error)
      } finally {
        setLoading(null)
        handleCloseMenu()
      }
    },
    [dispatch, item, handleCloseMenu]
  )

  const handleEmptyTrash = useCallback(
    async (e?: React.MouseEvent) => {
      if (e) {
        const rect = (e.target as HTMLElement).getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        addRipple(x, y)
      }

      setDeleteAnimation('empty')
      setLoading('empty')

      try {
        await new Promise((resolve) => setTimeout(resolve, 300))
        await dispatch(cleanTrash())
      } catch (error) {
        console.error('Error emptying trash:', error)
      } finally {
        setLoading(null)
        handleCloseMenu()
      }
    },
    [dispatch, handleCloseMenu]
  )

  const menuItems = useMemo(
    () => [
      {
        label: 'Open',
        icon: null,
        disabled: true,
      },
      {
        label: 'Put Back',
        icon: <FolderUp className="h-4 w-4" />,
        onClick: handleRestore,
        loading: loading === 'restore',
      },
      {
        label: 'Put Back All',
        icon: <ArrowUp className="h-4 w-4" />,
        onClick: handleRestoreAll,
        disabled: trashItems.length <= 1,
        loading: loading === 'restoreAll',
      },
      {
        label: 'Delete Immediately',
        icon: <Trash className="h-4 w-4" />,
        onClick: (e: React.MouseEvent) => {
          setShowDeleteDialog(true)
          if (e) e.stopPropagation()
        },
        loading: loading === 'delete',
        dangerous: true,
      },
      {
        label: 'Empty Trash',
        icon: <Trash className="h-4 w-4" />,
        onClick: (e: React.MouseEvent) => {
          setShowEmptyDialog(true)
          if (e) e.stopPropagation()
        },
        loading: loading === 'empty',
        dangerous: true,
      },
      {
        label: 'Get Info',
        icon: <Info className="h-4 w-4" />,
        onClick: (e: React.MouseEvent) => {
          if (e) e.stopPropagation()
          setShowDetails(true)
        },
      },
      {
        label: 'Copy',
        icon: <Copy className="h-4 w-4" />,
        onClick: () => navigator.clipboard.writeText(item.name),
      },
    ],
    [trashItems.length, loading, item.name, handleRestore, handleRestoreAll]
  )

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % menuItems.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(
            (prev) => (prev - 1 + menuItems.length) % menuItems.length
          )
          break
        case 'Enter':
          e.preventDefault()
          const menuItem = menuItems[selectedIndex]
          if (!menuItem.disabled && menuItem.onClick) {
            menuItem.onClick({} as React.MouseEvent)
          }
          break
        case 'Escape':
          e.preventDefault()
          handleCloseMenu()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, menuItems, handleCloseMenu])

  // Handle mouse events and click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        handleCloseMenu()
      }
    }

    const handleMouseLeave = () => {
      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect()
        const mousePos = mousePosition

        if (mousePos) {
          const isOutside =
            mousePos.x < rect.left - 10 ||
            mousePos.x > rect.right + 10 ||
            mousePos.y < rect.top - 10 ||
            mousePos.y > rect.bottom + 10

          if (isOutside) {
            setIsMenuVisible(false)
            handleCloseMenu()
          }
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleCloseMenu, handleMouseMove, mousePosition])

  return (
    <>
      <style jsx global>{`
        @keyframes ripple {
          from {
            transform: scale(0);
            opacity: 1;
          }
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        @keyframes deleteAnimation {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
      <div
        ref={menuRef}
        style={{
          top: position.y,
          left: position.x,
          animation: deleteAnimation
            ? 'deleteAnimation 300ms ease-in forwards'
            : undefined,
          opacity: isMenuVisible ? 1 : 0,
          transition: 'opacity 150ms ease-in-out',
          pointerEvents: isMenuVisible ? 'auto' : 'none',
        }}
        onMouseEnter={() => setIsMenuVisible(true)}
        onMouseLeave={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX
          const y = e.clientY

          const isOutside =
            x < rect.left - 10 ||
            x > rect.right + 10 ||
            y < rect.top - 10 ||
            y > rect.bottom + 10

          if (isOutside) {
            setIsMenuVisible(false)
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        className="absolute z-[9999] w-64 rounded-md bg-dark-context-bg text-sm shadow-2xl"
      >
        <ul className="space-y-1 p-2">
          {menuItems.map((menuItem, index) => (
            <li
              key={menuItem.label}
              onClick={(e) => {
                if (!menuItem.disabled) {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const y = e.clientY - rect.top
                  addRipple(x, y)
                  menuItem.onClick?.(e)
                }
              }}
              onMouseEnter={(e) => {
                setSelectedIndex(index)
                setMousePosition({ x: e.clientX, y: e.clientY })
              }}
              onMouseMove={(e) => {
                setMousePosition({ x: e.clientX, y: e.clientY })
              }}
              className={`relative flex items-center gap-2 overflow-hidden rounded-md p-2 px-3 ${selectedIndex === index ? 'bg-[#222222]' : ''} ${menuItem.disabled ? 'cursor-not-allowed text-[#888888]' : 'cursor-pointer text-[#e0e0e0]'} ${menuItem.dangerous ? 'hover:text-red-400' : 'hover:text-white'} ${index < menuItems.length - 1 ? 'border-b border-[#5a5a5a]' : ''}`}
            >
              {ripples.map((ripple) => (
                <Ripple
                  key={ripple.id}
                  x={ripple.x}
                  y={ripple.y}
                  onComplete={() => removeRipple(ripple.id)}
                />
              ))}
              {menuItem.loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                menuItem.icon
              )}
              {menuItem.label}
            </li>
          ))}
        </ul>
      </div>

      <Modal
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        title="Delete Item"
        actions={
          <>
            <button
              onClick={() => setShowDeleteDialog(false)}
              className="rounded-md bg-[#333333] px-4 py-2 text-[#e0e0e0] hover:bg-[#444444]"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                setShowDeleteDialog(false)
                handleDelete(e)
              }}
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </>
        }
      >
        <p>&ldquo;{item.name}&rdquo; will be permanently deleted.</p>
      </Modal>

      <Modal
        open={showEmptyDialog}
        onClose={() => setShowEmptyDialog(false)}
        title="Empty Trash"
        actions={
          <>
            <button
              onClick={() => setShowEmptyDialog(false)}
              className="rounded-md bg-[#333333] px-4 py-2 text-[#e0e0e0] hover:bg-[#444444]"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                setShowEmptyDialog(false)
                handleEmptyTrash(e)
              }}
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Empty Trash
            </button>
          </>
        }
      >
        <p>Permanently delete all items?</p>
      </Modal>

      <Modal
        open={showDetails}
        onClose={() => setShowDetails(false)}
        title="Item Details"
        actions={
          <button
            onClick={() => setShowDetails(false)}
            className="rounded-md bg-[#333333] px-4 py-2 text-[#e0e0e0] hover:bg-[#444444]"
          >
            Close
          </button>
        }
      >
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {item.name}
          </p>
          <p>
            <strong>ID:</strong> {item.id}
          </p>
          <p>
            <strong>Date Deleted:</strong> {new Date().toLocaleString()}
          </p>
        </div>
      </Modal>
    </>
  )
}
