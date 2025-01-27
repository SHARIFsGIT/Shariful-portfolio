import {
  addNewNote,
  deleteNote,
  INote,
  loadNotes,
  updateNote,
} from '@/app/features/notes'
import { useDispatch, useSelector } from '@/app/store'
import { IconNotes, IconPlus } from '@tabler/icons-react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import { FiEdit } from 'react-icons/fi'

export function INotes() {
  const inotes = useSelector((state) => state.iNotes.notes)
  const [tab, setTab] = useState<string>('')
  const activeNote = inotes.find((note) => note.id === tab)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const dispatch = useDispatch()
  const [mode, setMode] = useState<'readonly' | 'edit'>('readonly')

  // Sort notes by updatedAt in descending order (newest first)
  const sortedNotes = [...inotes].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )

  useEffect(() => {
    if (textareaRef.current instanceof HTMLTextAreaElement) {
      textareaRef.current.focus()
      const length = textareaRef.current.value.length
      textareaRef.current.setSelectionRange(length, length)
    }
  }, [tab])

  useEffect(() => {
    const localNotes = localStorage.getItem('iNotes')
    const parseNotes: INote[] | null = JSON.parse(localNotes || 'null')
    if (parseNotes) {
      dispatch(loadNotes(parseNotes))
    }
  }, [dispatch])

  const onDelete = (id: string) => {
    // Find the next most recent note
    const currentIndex = sortedNotes.findIndex((note) => note.id === id)
    const nextNote =
      sortedNotes[currentIndex + 1] || sortedNotes[currentIndex - 1]

    dispatch(deleteNote(id))
    const updatedNotes = inotes.filter((note) => note.id !== id)
    localStorage.setItem('iNotes', JSON.stringify(updatedNotes))
    setMode('readonly')

    // Set focus to the next note if available
    if (nextNote) {
      setTab(nextNote.id)
    } else {
      setTab('')
    }
  }

  const onNewNote = () => {
    const id = crypto.randomUUID()
    const newNote = {
      id,
      content: '-- Write your note here -- \n',
      updatedAt: new Date().toISOString(),
    }
    dispatch(addNewNote(newNote))

    // Update localStorage with the new note at the beginning
    const updatedNotes = [newNote, ...inotes]
    localStorage.setItem('iNotes', JSON.stringify(updatedNotes))
    setTab(id)
    setMode('edit')
  }

  const onEdit = () => {
    if (textareaRef.current instanceof HTMLTextAreaElement) {
      textareaRef.current.focus()
      const length = textareaRef.current.value.length
      textareaRef.current.setSelectionRange(length, length)
    }
    if (mode === 'edit') return
    setMode('edit')
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const now = new Date().toISOString()
    dispatch(
      updateNote({
        id: tab,
        content: e.target.value,
        updatedAt: now,
      })
    )
    const updatedNotes = inotes.map((note) => {
      if (note.id === tab) {
        return {
          id: tab,
          content: e.target.value,
          updatedAt: now,
        }
      } else return note
    })
    localStorage.setItem('iNotes', JSON.stringify(updatedNotes))
  }

  return (
    <div className="grid h-full grid-cols-[250px,1fr]">
      <div className="max-h-full overflow-y-auto bg-gradient-to-b from-black/20 via-white/15 to-white/40 p-4">
        <div className="mb-3">
          <button
            onClick={onNewNote}
            className="flex w-full items-center gap-2 rounded-md bg-white/90 px-4 py-1 text-sm font-medium dark:bg-white/10 justify-center"
          >
            <IconPlus className="size-4" stroke={2} />
            <span>Add a new note</span>
          </button>
        </div>
        <h3 className="text-center text-sm font-medium text-gray-500 dark:text-white/80">
          On your iCloud
        </h3>
        <div className="mt-2 space-y-2">
          {sortedNotes.map((note, index) => (
            <button
              key={note.id}
              onClick={() => {
                setTab(note.id)
                setMode('readonly')
              }}
              className={`grid w-full grid-cols-[auto,1fr] gap-2 rounded-md px-2 py-1 ${
                tab === note.id
                  ? 'bg-white/90 dark:bg-white/20'
                  : 'hover:bg-white/70 dark:hover:bg-white/10'
              }`}
            >
              <div className="size-6">
                <IconNotes
                  stroke={2}
                  className="size-full translate-y-[2px] text-emerald-500"
                />
              </div>
              <div className="flex flex-col text-start">
                <h2 className="line-clamp-1 text-sm font-medium text-gray-800 dark:text-white/90">
                  {`Note ${sortedNotes.length - index}`}
                </h2>
                <h2 className="text-[10px] text-gray-600 dark:text-white/70">
                  {new Date(note.updatedAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: '2-digit',
                  })}
                </h2>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-full overflow-y-auto p-4">
        {activeNote ? (
          <>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => onDelete(activeNote.id)}
                type="button"
                className="text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
              >
                <FaRegTrashCan />
              </button>
              <button
                onClick={onEdit}
                type="button"
                className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <FiEdit />
              </button>
            </div>
            <textarea
              title="Double Click To Edit"
              onDoubleClick={onEdit}
              readOnly={mode === 'readonly'}
              ref={textareaRef}
              className="h-[calc(100%-22px)] w-full resize-none bg-inherit focus:outline-none"
              value={activeNote.content}
              onChange={handleChange}
            />
          </>
        ) : (
          <div className="flex size-full items-center justify-center">
            <button
              onClick={onNewNote}
              className="flex items-center gap-2 rounded-md bg-light-foreground px-4 py-2 text-sm font-medium dark:bg-white/10"
            >
              <IconPlus className="size-4" stroke={2} />
              <span>Add new note</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
