import {
  addNewNote,
  deleteNote,
  loadNotes,
  updateNote,
} from '@/app/features/notes'
import { useDispatch, useSelector } from '@/app/store'
import { IconNotes, IconPin, IconPlus, IconSearch } from '@tabler/icons-react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import { FiEdit } from 'react-icons/fi'

// Types & Interfaces
interface IEnhancedNote {
  id: string
  title: string
  content: string
  updatedAt: string
  isPinned: boolean
  tags: string[]
  folder: string
  color: string
  isFavorite: boolean
}

export function INotes() {
  const inotes = useSelector((state) => state.iNotes.notes) as IEnhancedNote[]
  const [tab, setTab] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [mode, setMode] = useState<'readonly' | 'edit'>('readonly')
  const activeNote = inotes.find((note) => note.id === tab)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  // Filter and sort notes
  const filteredNotes = inotes.filter((note) => {
    const matchesSearch = (note.title + note.content)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })

  // Effects
  useEffect(() => {
    if (textareaRef.current && mode === 'edit') {
      textareaRef.current.focus()
      const length = textareaRef.current.value.length
      textareaRef.current.setSelectionRange(length, length)
    }
  }, [tab, mode])

  useEffect(() => {
    const localNotes = localStorage.getItem('iNotes')
    const parseNotes: IEnhancedNote[] | null = JSON.parse(localNotes || 'null')
    if (parseNotes) {
      dispatch(loadNotes(parseNotes))
    }
  }, [dispatch])

  // Event Handlers
  const onNewNote = () => {
    const id = crypto.randomUUID()
    const newNote: IEnhancedNote = {
      id,
      title: 'Untitled Note',
      content: '',
      updatedAt: new Date().toISOString(),
      isPinned: false,
      tags: [],
      folder: 'default',
      color: '#ffffff',
      isFavorite: false,
    }
    dispatch(addNewNote(newNote))
    const updatedNotes = [newNote, ...inotes]
    localStorage.setItem('iNotes', JSON.stringify(updatedNotes))
    setTab(id)
    // Force edit mode for new notes
    setTimeout(() => {
      setMode('edit')
      titleRef.current?.focus()
      titleRef.current?.select()
    }, 0)
  }

  const onDelete = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return

    const currentIndex = sortedNotes.findIndex((note) => note.id === id)
    const nextNote =
      sortedNotes[currentIndex + 1] || sortedNotes[currentIndex - 1]

    dispatch(deleteNote(id))
    const updatedNotes = inotes.filter((note) => note.id !== id)
    localStorage.setItem('iNotes', JSON.stringify(updatedNotes))
    setMode('readonly')

    if (nextNote) {
      setTab(nextNote.id)
    } else {
      setTab('')
    }
  }

  const updateNoteProperty = <K extends keyof IEnhancedNote>(
    id: string,
    property: K,
    value: IEnhancedNote[K]
  ) => {
    const note = inotes.find((n) => n.id === id)
    if (!note) return

    const updatedNote = {
      ...note,
      [property]: value,
      updatedAt: new Date().toISOString(),
    }

    dispatch(updateNote(updatedNote))
    const updatedNotes = inotes.map((n) => (n.id === id ? updatedNote : n))
    localStorage.setItem('iNotes', JSON.stringify(updatedNotes))
  }

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!activeNote) return
    updateNoteProperty(activeNote.id, 'content', e.target.value)
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!activeNote) return
    const newTitle = e.target.value
    updateNoteProperty(
      activeNote.id,
      'title',
      newTitle === '' ? 'Untitled Note' : newTitle
    )
  }

  // Render
  return (
    <div className="grid h-full grid-cols-[240px,1fr] bg-gray-50">
      {/* Sidebar - macOS style */}
      <div className="flex h-full flex-col border-r border-gray-200 bg-[#F5F5F5]">
        {/* Search */}
        <div className="p-2">
          <div className="relative">
            <IconSearch
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
              size={14}
            />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 w-full rounded-md border border-gray-200 bg-white pl-8 pr-4 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {sortedNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => {
                  setTab(note.id)
                  setMode('readonly')
                }}
                className={`mb-1 w-full rounded-md p-2 text-left transition-colors ${
                  tab === note.id
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {note.isPinned && <IconPin size={14} />}
                  <div className="flex-1 overflow-hidden">
                    <h3 className="truncate font-medium">
                      {note.title || 'Untitled Note'}
                    </h3>
                    <p className="truncate text-xs opacity-80">
                      {note.content || 'No content'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-t border-gray-200 p-2">
          <button
            onClick={onNewNote}
            className="flex w-full items-center gap-2 rounded-md p-2 text-sm text-gray-600 hover:bg-gray-200"
          >
            <IconPlus size={16} />
            New Note
          </button>
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex h-full flex-col bg-white">
        {activeNote ? (
          <>
            {/* Note Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
              <input
                ref={titleRef}
                type="text"
                value={activeNote.title}
                onChange={handleTitleChange}
                placeholder="Untitled Note"
                className="border-none bg-transparent text-lg font-semibold focus:outline-none"
                readOnly={mode === 'readonly'}
              />
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setMode(mode === 'readonly' ? 'edit' : 'readonly')
                  }
                  className="rounded-md p-1 hover:bg-gray-100"
                >
                  <FiEdit size={16} className="text-gray-500" />
                </button>
                <button
                  onClick={() => onDelete(activeNote.id)}
                  className="rounded-md p-1 hover:bg-gray-100"
                >
                  <FaRegTrashCan size={16} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Note Content */}
            <div
              className="flex-1 overflow-y-auto"
              onClick={() => mode === 'readonly' && setMode('edit')}
            >
              <textarea
                ref={textareaRef}
                value={activeNote.content}
                onChange={handleContentChange}
                readOnly={mode === 'readonly'}
                placeholder="Start writing..."
                className="h-full w-full cursor-text resize-none bg-transparent p-4 text-gray-700 focus:outline-none"
              />
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <IconNotes size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-medium text-gray-400">
                No Note Selected
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
