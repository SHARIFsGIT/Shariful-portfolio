import { LoadError, Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { getFilePlugin, RenderDownloadProps } from '@react-pdf-viewer/get-file'
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation'
import '@react-pdf-viewer/page-navigation/lib/styles/index.css'
import { printPlugin } from '@react-pdf-viewer/print'
import '@react-pdf-viewer/print/lib/styles/index.css'
import { searchPlugin } from '@react-pdf-viewer/search'
import '@react-pdf-viewer/search/lib/styles/index.css'
import { zoomPlugin } from '@react-pdf-viewer/zoom'
import '@react-pdf-viewer/zoom/lib/styles/index.css'
import {
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
  IconPrinter,
  IconSearch,
  IconZoomIn,
  IconZoomOut,
} from '@tabler/icons-react'
import { useCallback, useEffect, useState } from 'react'

interface PDFViewerProps {
  id: string
  defaultScale?: number
  className?: string
}

interface ZoomButtonProps {
  onClick: () => void
}

export function PDFViewer({
  id,
  defaultScale = 1,
  className = '',
}: PDFViewerProps) {
  const [error, setError] = useState<string | null>(null)
  const [currentScale, setCurrentScale] = useState(defaultScale)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Initialize plugins
  const getFilePluginInstance = getFilePlugin()
  const zoomPluginInstance = zoomPlugin()
  const printPluginInstance = printPlugin()
  const pageNavigationPluginInstance = pageNavigationPlugin()
  const searchPluginInstance = searchPlugin()

  const { Download } = getFilePluginInstance
  const { ZoomIn, ZoomOut } = zoomPluginInstance
  const { Print } = printPluginInstance
  const { CurrentPageInput, GoToNextPage, GoToPreviousPage, NumberOfPages } =
    pageNavigationPluginInstance

  // Handle document load
  const handleDocumentLoad = useCallback(() => {
    setError(null)
    setLoading(false)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '+':
            setCurrentScale((prev) => Math.min(5, prev + 0.1))
            e.preventDefault()
            break
          case '-':
            setCurrentScale((prev) => Math.max(0.1, prev - 0.1))
            e.preventDefault()
            break
          case '0':
            setCurrentScale(1)
            e.preventDefault()
            break
          case 'f':
            setIsSearchOpen(true)
            e.preventDefault()
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (error) {
    return (
      <div className="m-4 rounded border border-red-500 bg-red-50 p-4 text-red-700">
        <h3 className="font-semibold">Error</h3>
        <p>{error}</p>
        <button
          className="mt-2 rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className={`relative h-full max-h-full overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b bg-white p-2 shadow-sm dark:bg-gray-800">
        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <GoToPreviousPage>
            {({ onClick, isDisabled }) => (
              <button
                className="rounded p-1 hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-700"
                onClick={onClick}
                disabled={isDisabled}
              >
                <IconChevronLeft className="h-5 w-5" />
              </button>
            )}
          </GoToPreviousPage>

          <div className="flex items-center gap-1">
            <CurrentPageInput /> / <NumberOfPages />
          </div>

          <GoToNextPage>
            {({ onClick, isDisabled }) => (
              <button
                className="rounded p-1 hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-700"
                onClick={onClick}
                disabled={isDisabled}
              >
                <IconChevronRight className="h-5 w-5" />
              </button>
            )}
          </GoToNextPage>
        </div>

        {/* Zoom and Other Controls */}
        <div className="flex items-center gap-2">
          <ZoomOut>
            {({ onClick }: ZoomButtonProps) => (
              <button
                className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  onClick()
                  setCurrentScale((prev) => Math.max(0.1, prev - 0.1))
                }}
                title="Zoom Out (Ctrl+-)"
              >
                <IconZoomOut className="h-5 w-5" />
              </button>
            )}
          </ZoomOut>

          <select
            className="rounded border px-2 py-1 text-sm"
            value={currentScale}
            onChange={(e) => setCurrentScale(Number(e.target.value))}
          >
            <option value={0.5}>50%</option>
            <option value={0.75}>75%</option>
            <option value={1}>100%</option>
            <option value={1.25}>125%</option>
            <option value={1.5}>150%</option>
            <option value={2}>200%</option>
          </select>

          <ZoomIn>
            {({ onClick }: ZoomButtonProps) => (
              <button
                className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  onClick()
                  setCurrentScale((prev) => Math.min(5, prev + 0.1))
                }}
                title="Zoom In (Ctrl++)"
              >
                <IconZoomIn className="h-5 w-5" />
              </button>
            )}
          </ZoomIn>

          <button
            className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            title="Search (Ctrl+F)"
          >
            <IconSearch className="h-5 w-5" />
          </button>

          <Print>
            {({ onClick }) => (
              <button
                className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={onClick}
                title="Print"
              >
                <IconPrinter className="h-5 w-5" />
              </button>
            )}
          </Print>

          <Download>
            {(props: RenderDownloadProps) => (
              <button
                className="flex items-center gap-1 rounded bg-blue-500 px-3 py-1 text-sm font-medium text-white hover:bg-blue-600"
                onClick={props.onClick}
                title="Download PDF"
              >
                <IconDownload className="h-4 w-4" />
                <span>Download</span>
              </button>
            )}
          </Download>
        </div>
      </div>

      {/* Main Viewer */}
      <div className="h-[calc(100%-52px)] overflow-auto">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            fileUrl={`/assets/pdf/${id}.pdf`}
            defaultScale={currentScale}
            plugins={[
              getFilePluginInstance,
              zoomPluginInstance,
              printPluginInstance,
              pageNavigationPluginInstance,
              searchPluginInstance,
            ]}
            onDocumentLoad={handleDocumentLoad}
            renderError={(err: LoadError) => (
              <div className="m-4 rounded border border-red-500 bg-red-50 p-4 text-red-700">
                <h3 className="font-semibold">Error</h3>
                <p>{err.message || 'Failed to load PDF document'}</p>
              </div>
            )}
            renderLoader={() => (
              <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900 dark:border-white" />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Loading PDF...
                  </p>
                </div>
              </div>
            )}
          />
        </Worker>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 dark:bg-gray-800 dark:bg-opacity-75">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900 dark:border-white" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Loading PDF...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
