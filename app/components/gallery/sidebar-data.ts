// sidebar-data.ts
import { IconType } from 'react-icons'
import {
  FaRegClock,
  FaRegHeart,
  FaUnsplash,
  FaUserCircle,
} from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'
import { MdPhotoLibrary } from 'react-icons/md'

export interface SidebarItem {
  id: string
  label: string
  Icon: IconType
  href: string
  badge?: number
  disabled?: boolean
  children?: Omit<SidebarItem, 'children'>[]
  description?: string
  keywords?: string[]
}

export interface SidebarSection {
  title: string
  items: SidebarItem[]
}

export const sidebarData: SidebarSection[] = [
  {
    title: 'Main',
    items: [
      {
        id: 'unsplash',
        label: 'Unsplash',
        Icon: FaUnsplash,
        href: '/unsplash',
        description: 'Browse and search Unsplash photos',
        keywords: ['photos', 'images', 'search'],
      },
      {
        id: 'library',
        label: 'Library',
        Icon: MdPhotoLibrary,
        href: '/library',
        description: 'Your personal photo library',
        badge: 0,
      },
    ],
  },
  {
    title: 'Browse',
    items: [
      {
        id: 'people',
        label: 'People',
        Icon: FaUserCircle,
        href: '/people',
        children: [
          {
            id: 'following',
            label: 'Following',
            Icon: FaUserCircle,
            href: '/people/following',
          },
          {
            id: 'photographers',
            label: 'Photographers',
            Icon: FaUserCircle,
            href: '/people/photographers',
          },
        ],
      },
      {
        id: 'places',
        label: 'Places',
        Icon: IoLocationOutline,
        href: '/places',
        description: 'Explore photos by location',
      },
    ],
  },
  {
    title: 'Personal',
    items: [
      {
        id: 'favourites',
        label: 'Favourites',
        Icon: FaRegHeart,
        href: '/favourites',
        badge: 0,
      },
      {
        id: 'recents',
        label: 'Recents',
        Icon: FaRegClock,
        href: '/recents',
        description: 'Recently viewed photos',
      },
    ],
  },
]