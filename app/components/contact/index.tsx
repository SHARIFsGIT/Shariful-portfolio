import { Camera, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { memo, useEffect, useState } from 'react'

// Lazy load components with loading states
const CodingCode = dynamic(() => import('./CodingCode'), {
  ssr: true,
  loading: () => <LoadingPlaceholder />,
})
const PrimaryCode = dynamic(() => import('./PrimaryCode'), {
  ssr: true,
  loading: () => <LoadingPlaceholder />,
})
const ProfessionalCode = dynamic(() => import('./ProfessionalCode'), {
  ssr: true,
  loading: () => <LoadingPlaceholder />,
})
const SocialCode = dynamic(() => import('./SocialCode'), {
  ssr: true,
  loading: () => <LoadingPlaceholder />,
})
const ContactForm = dynamic(() => import('./ContactForm'), {
  ssr: true,
  loading: () => <LoadingPlaceholder />,
})

const LoadingPlaceholder = () => (
  <div className="flex items-center justify-center p-4">
    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
  </div>
)

const UnderlineHeading = memo(({ children }: { children: React.ReactNode }) => (
  <h3 className="group relative mb-4 mt-5 font-mono text-xl">
    <span className="relative inline-block">
      {children}
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gray-800 transition-all duration-1000 group-hover:w-full"></span>
    </span>
  </h3>
))

UnderlineHeading.displayName = 'UnderlineHeading'

const Divider = memo(() => (
  <div className="flex w-2/12 flex-col items-center justify-center">
    <div className="h-full w-px animate-pulse bg-red-300"></div>
    <span className="my-4 rounded-full bg-white px-4 py-2 shadow-sm transition-all hover:shadow-md dark:text-black">
      Or
    </span>
    <div className="h-full w-px animate-pulse bg-red-300"></div>
  </div>
))

Divider.displayName = 'Divider'

const ProfileHeader = memo(({ onImageClick }: { onImageClick: () => void }) => (
  <div className="relative">
    <header className="relative h-36 overflow-hidden">
      <div className="absolute inset-0 bg-black/20 transition-opacity hover:opacity-0"></div>
      <Image
        fill
        className="transform object-cover object-center transition-all duration-500 ease-in-out hover:scale-110"
        alt="Cover Image"
        src="/assets/images/author2.jpg"
        priority
      />
      <button
        onClick={onImageClick}
        className="absolute right-4 top-4 rounded-full bg-white/50 p-2 transition-all hover:bg-white dark:text-black"
        aria-label="Change cover photo"
      >
        <Camera className="h-5 w-5 " />
      </button>
      <h1 className="absolute bottom-4 left-40 bg-gradient-to-r from-green-200 to-white bg-clip-text text-3xl font-medium text-transparent">
        Shariful Islam
      </h1>
    </header>
    {/* Profile photo in a separate container with higher z-index */}
    <div className="absolute left-6 top-14 z-[9999]">
      <Image
        className="transform rounded-full border-2 border-black transition-all duration-500 ease-in-out hover:scale-110 hover:border-4 hover:shadow-xl"
        alt="Shariful Islam"
        width={120}
        height={120}
        src="/assets/images/author.jpg"
        priority
      />
    </div>
  </div>
))

ProfileHeader.displayName = 'ProfileHeader'

export function Contact() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleImageClick = () => {
    console.log('Image upload clicked')
  }

  if (!mounted) return null

  return (
    <div className="via-white-100 relative max-h-full overflow-y-auto bg-gradient-to-b from-pink-100 to-white transition-all">
      {/* Sticky header on scroll */}
      <div
        className={`fixed inset-x-0 top-0 z-[9998] transform bg-white/80 backdrop-blur transition-all duration-300 ${
          isScrolled ? 'translate-y-0 shadow-md' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto flex h-16 items-center px-4">
          <Image
            className="rounded-full"
            alt="Shariful Islam"
            width={40}
            height={40}
            src="/assets/images/author.jpg"
          />
          <h2 className="ml-4 text-lg font-medium">Shariful Islam</h2>
        </div>
      </div>

      <ProfileHeader onImageClick={handleImageClick} />

      {/* Main Content */}
      <main className="relative z-0 flex flex-col p-8 md:flex-row">
        {/* Left Section */}
        <section className="w-full md:w-5/12">
          <UnderlineHeading>
            <span className="dark:text-black">Find Me On</span>
          </UnderlineHeading>
          <div className="space-y-4">
            <PrimaryCode />
            <ProfessionalCode />
            <CodingCode />
            <SocialCode />
          </div>
        </section>

        <Divider />

        {/* Right Section */}
        <section className="w-full md:w-5/12">
          <UnderlineHeading>
            <span className="dark:text-black">Fill Out This Form</span>
          </UnderlineHeading>
          <div className="rounded-lg bg-white/50 p-4 shadow-sm transition-all hover:shadow-md">
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  )
}

// Add smooth scrolling to the entire page
if (typeof window !== 'undefined') {
  document.documentElement.style.scrollBehavior = 'smooth'
}
