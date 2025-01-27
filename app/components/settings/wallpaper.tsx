import { setWallpaper } from '@/app/features/settings'
import { useDispatch, useSelector } from '@/app/store'
import { useTheme } from 'next-themes'
import Image from 'next/image'

// Import all wallpapers
import hd from '@/public/assets/background/helios-dark.jpg'
import hl from '@/public/assets/background/helios-light.jpg'
import md from '@/public/assets/background/monterey-dark.jpg'
import ml from '@/public/assets/background/monterey-light.jpg'
import vd from '@/public/assets/background/ventura-dark.jpg'
import vl from '@/public/assets/background/ventura-light.jpg'

import ad from '@/public/assets/background/accent-dark.jpg'
import al from '@/public/assets/background/accent-light.jpg'
import bd from '@/public/assets/background/blue-dark.jpg'
import bl from '@/public/assets/background/blue-light.jpg'
import dgd from '@/public/assets/background/darker-gray-dark.jpg'
import dgl from '@/public/assets/background/darker-gray-light.jpg'
import gd from '@/public/assets/background/gray-dark.jpg'
import gl from '@/public/assets/background/gray-light.jpg'
import grd from '@/public/assets/background/green-dark.jpg'
import grl from '@/public/assets/background/green-light.jpg'
import od from '@/public/assets/background/orange-dark.jpg'
import ol from '@/public/assets/background/orange-light.jpg'
import pd from '@/public/assets/background/purple-dark.jpg'
import pl from '@/public/assets/background/purple-light.jpg'
import rd from '@/public/assets/background/red-dark.jpg'
import rl from '@/public/assets/background/red-light.jpg'
import sd from '@/public/assets/background/spectrum-dark.jpg'
import sl from '@/public/assets/background/spectrum-light.jpg'
import yd from '@/public/assets/background/yellow-dark.jpg'
import yl from '@/public/assets/background/yellow-light.jpg'

const WALLPAPER_COLLECTIONS = {
  'Sequoia-Monterey-Ventura': [
    { dark: hd, light: hl, name: 'Helios' },
    { dark: md, light: ml, name: 'Monterey' },
    { dark: vd, light: vl, name: 'Ventura' },
  ],
  Macintosh: [
    { dark: ad, light: al, name: 'Accent' },
    { dark: bd, light: bl, name: 'Blue' },
    { dark: gd, light: gl, name: 'Gray' },
    { dark: grd, light: grl, name: 'Green' },
    { dark: dgd, light: dgl, name: 'Darker Gray' },
    { dark: od, light: ol, name: 'Orange' },
    { dark: pd, light: pl, name: 'Purple' },
    { dark: rd, light: rl, name: 'Red' },
    { dark: yd, light: yl, name: 'Yellow' },
    { dark: sd, light: sl, name: 'Spectrum' },
  ],
}

const WallpaperPreview = ({ src, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`relative h-28 overflow-hidden rounded-lg transition-all hover:ring-2 hover:ring-blue-500 ${isActive ? 'ring-2 ring-blue-500' : 'hover:scale-105'}`}
  >
    <Image
      className="object-cover object-center"
      alt="wallpaper"
      fill
      src={src}
      sizes="(max-width: 200px) 100vw"
    />
  </button>
)

const ThemeSelector = ({ theme, setTheme }) => (
  <div className="flex items-center gap-3">
    <h3 className="font-medium">Theme Mode</h3>
    <select
      onChange={(e) => setTheme(e.target.value)}
      value={theme}
      className="rounded border border-light-border bg-light-background px-2 py-1 hover:border-blue-500 focus:outline-none dark:border-[#4b4b4b] dark:bg-dark-background dark:hover:border-blue-400"
    >
      <option value="system">Automatic</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  </div>
)

export function Wallpaper() {
  const dispatch = useDispatch()
  const wallpaper = useSelector((state) => state.settings.wallpaper)
  const { theme, resolvedTheme, setTheme } = useTheme()

  const currentWallpaperSrc = wallpaper
    ? resolvedTheme === 'dark'
      ? wallpaper.dark
      : wallpaper.light
    : null

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-start justify-between gap-8 border-b border-light-border pb-6 dark:border-[#4b4b4b]">
        <div className="relative h-28 w-60 overflow-hidden rounded-lg">
          {currentWallpaperSrc && (
            <Image
              className="object-cover object-center"
              alt="current wallpaper"
              fill
              src={currentWallpaperSrc}
              sizes="(max-width: 240px) 100vw"
            />
          )}
        </div>
        <ThemeSelector theme={theme} setTheme={setTheme} />
      </div>

      {Object.entries(WALLPAPER_COLLECTIONS).map(
        ([collectionName, wallpapers]) => (
          <div key={collectionName} className="space-y-4">
            <h2 className="text-lg font-medium">{collectionName}</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
              {wallpapers.map((wp, index) => (
                <WallpaperPreview
                  key={index}
                  src={resolvedTheme === 'light' ? wp.light : wp.dark}
                  onClick={() =>
                    dispatch(setWallpaper({ dark: wp.dark, light: wp.light }))
                  }
                  isActive={
                    wallpaper?.dark === wp.dark && wallpaper?.light === wp.light
                  }
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  )
}
