import { downloadPhoto } from '@/app/actions/download-photo'
import { IPhoto } from '@/app/types/unsplash.type'

import gsap from 'gsap'
import { Download, Heart, Share2 } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'

export function ImageCard({ photo }: { photo: IPhoto }) {
  const layerRef = useRef<HTMLDivElement>(null)
  const [isLiked, setIsLiked] = useState(false)

  // Animation for mouse enter
  const handleMouseEnter = () => {
    if (layerRef.current) {
      gsap.to(layerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
      })
    }
  }

  // Animation for mouse leave
  const handleMouseLeave = () => {
    if (layerRef.current) {
      gsap.to(layerRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        ease: 'power3.inOut',
      })
    }
  }

  const onDownload = async () => {
    try {
      const res = await downloadPhoto(photo.id)
      if (res && res.url) {
        const link = document.createElement('a')
        link.href = res.url
        link.download = photo.alt_description || 'photo'
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: photo.alt_description || 'Shared Photo',
          text: `Check out this photo`,
          url: photo.urls.regular,
        })
      } else {
        await navigator.clipboard.writeText(photo.urls.regular)
        // You might want to add a toast notification here
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-fit w-fit overflow-hidden"
    >
      <Image
        alt={
          photo.alt_description ? photo.alt_description : 'No photo available'
        }
        src={photo.urls.regular}
        width={400}
        height={400}
        className="mb-4 rounded-xl"
      />
      <div
        ref={layerRef}
        className="absolute left-0 top-0 flex h-[calc(100%-16px)] w-full items-center justify-center rounded-xl bg-[#000000b2] opacity-0"
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="rounded-full bg-white p-2 opacity-70 transition-colors hover:bg-gray-200 hover:opacity-100"
            >
              <Heart
                className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`}
              />
            </button>
            <button
              onClick={handleShare}
              className="rounded-full bg-white p-2 opacity-70 transition-colors hover:bg-gray-200 hover:opacity-100"
            >
              <Share2 className="h-5 w-5 text-gray-700" />
            </button>
          </div>
          <button
            onClick={onDownload}
            type="button"
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white opacity-70 transition-colors hover:bg-primary/90 hover:opacity-100"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageCard
