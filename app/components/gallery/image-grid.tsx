// app/components/gallery/image-grid.tsx
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Photo {
  id: string
  url: string
  title: string
  // Add other photo properties as needed
}

interface ImageCardProps {
  photo: Photo
}

const ImageCard: React.FC<ImageCardProps> = ({ photo }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      <Image
        src={photo.url}
        alt={photo.title}
        width={400}
        height={300}
        className="h-48 w-full object-cover transition-transform hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 px-4 py-2">
        <h3 className="truncate text-sm font-medium text-white">
          {photo.title}
        </h3>
      </div>
    </div>
  )
}

interface ImageGridProps {
  initialPhotos?: Photo[]
  fetchUrl?: string
}

const ImageGrid: React.FC<ImageGridProps> = ({ initialPhotos, fetchUrl }) => {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos || [])
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!fetchUrl) return

      try {
        setStatus('loading')
        const response = await fetch(fetchUrl)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setPhotos(data)
        setStatus('success')
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch photos')
        setStatus('error')
      }
    }

    if (fetchUrl) {
      fetchPhotos()
    } else if (initialPhotos) {
      setStatus('success')
    }
  }, [fetchUrl, initialPhotos])

  if (status === 'loading') {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      {status === 'success' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.isArray(photos) && photos.length > 0 ? (
            photos.map((photo) => <ImageCard key={photo.id} photo={photo} />)
          ) : (
            <p className="col-span-full py-8 text-center text-gray-500">
              No photos available
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default ImageGrid
