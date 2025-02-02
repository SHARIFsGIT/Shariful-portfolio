import { useDebounce } from '@/app/hooks/useDebounce'
import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { ImageGrid } from './image-grid'
import { sidebarData, SidebarItem, SidebarSection } from './sidebar-data'

export function Gallery() {
  const [tab, setTab] = useState<string>('unsplash')
  const [query, setQuery] = useState('')

  const slowDown = useDebounce<string>((value) => {
    setQuery(value)
  }, 1)

  return (
    <div className="grid h-full grid-cols-[250px,1fr] text-light-text dark:text-dark-text">
      <div className="max-h-full overflow-y-auto bg-light-foreground p-4 dark:bg-dark-foreground">
        <div className="relative mb-2">
          <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2" />
          <input
            onChange={(e) => {
              slowDown(e.target.value)
            }}
            type="text"
            placeholder="Search"
            className="w-full rounded-md bg-white px-3 py-1 pl-8 text-sm focus:border-[#858585] focus:outline-none dark:bg-dark-input-bg"
          />
        </div>
        <div className="mt-2 space-y-4">
          {sidebarData.map((section: SidebarSection) => (
            <div key={section.title} className="space-y-1">
              {section.title && (
                <h3 className="px-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  {section.title}
                </h3>
              )}
              {section.items.map((item: SidebarItem) => (
                <div key={item.id}>
                  <button
                    onClick={() => setTab(item.id)}
                    className={`menuItem group flex w-full items-center gap-2 rounded-md px-2 py-1.5 transition-colors ${
                      tab === item.id
                        ? 'bg-white dark:bg-dark-hover-bg'
                        : 'hover:bg-white dark:hover:bg-dark-hover-bg'
                    }`}
                  >
                    <div className="flex size-5 items-center justify-center rounded-md bg-primary transition-transform group-hover:scale-105">
                      <item.Icon className="size-3 text-white" />
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                      <h2 className="text-sm font-medium">{item.label}</h2>
                      {item.badge !== undefined && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </button>
                  {item.children?.map((child: SidebarItem) => (
                    <button
                      onClick={() => setTab(child.id)}
                      key={child.id}
                      className={`menuItem group ml-7 flex w-[calc(100%-28px)] items-center gap-2 rounded-md px-2 py-1.5 transition-colors ${
                        tab === child.id
                          ? 'bg-white dark:bg-dark-hover-bg'
                          : 'hover:bg-white dark:hover:bg-dark-hover-bg'
                      }`}
                    >
                      <div className="flex size-4 items-center justify-center rounded-md bg-primary/80 transition-transform group-hover:scale-105">
                        <child.Icon className="size-2.5 text-white" />
                      </div>
                      <h2 className="text-sm font-medium">{child.label}</h2>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="max-h-full overflow-y-auto p-4">
        <ImageGrid query={query} />
      </div>
    </div>
  )
}