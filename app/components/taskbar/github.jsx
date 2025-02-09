import {
  Activity,
  Building2,
  Calendar,
  GitBranch,
  GitFork,
  MapPin,
  Maximize2,
  Minus,
  Star,
  Users,
  X,
} from 'lucide-react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { DockItem } from './app-tray'

// Define ProfileSection component first
const ProfileSection = ({ userData, contributions }) => (
  <div className="space-y-6">
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-2 shadow-inner transition-all duration-500 ease-in-out hover:shadow-xl dark:from-gray-800 dark:to-gray-900">
      {userData.avatar_url && (
        <div className="relative transform overflow-hidden transition-all duration-500 ease-out hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <Image
            src={userData.avatar_url}
            alt={`${userData.login}'s profile`}
            width={200}
            height={200}
            className="transform rounded-xl transition-all duration-500 ease-in-out hover:brightness-105 group-hover:shadow-lg"
            priority
            quality={95}
          />
        </div>
      )}
    </div>

    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {userData.name || userData.login}
      </h2>
      {userData.bio && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {userData.bio}
        </p>
      )}
    </div>

    <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
        <Activity className="size-4" />
        Activity Overview
      </h3>
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex justify-between text-blue-600 dark:text-blue-400">
          <span>Total Contributions</span>
          <span className="font-semibold">{contributions.total}</span>
        </div>
        <div className="flex justify-between text-blue-600 dark:text-blue-400">
          <span>Last Week</span>
          <span className="font-semibold">{contributions.lastWeek}</span>
        </div>
        <div className="flex justify-between text-blue-600 dark:text-blue-400">
          <span>Current Streak</span>
          <span className="font-semibold">{contributions.streak} days</span>
        </div>
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Users className="size-4 text-gray-500" />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {userData.followers} followers · {userData.following} following
        </span>
      </div>

      {userData.company && (
        <div className="flex items-center gap-2">
          <Building2 className="size-4 text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {userData.company}
          </span>
        </div>
      )}

      {userData.location && (
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {userData.location}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Calendar className="size-4 text-gray-500" />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Joined{' '}
          {(() => {
            try {
              return new Date(userData.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            } catch (error) {
              console.error('Date formatting error:', error)
              return 'Invalid date'
            }
          })()}
        </span>
      </div>
    </div>
  </div>
)

// Define RepositoryGrid component
const RepositoryGrid = ({ repositories }) => (
  <div className="grid grid-cols-2 gap-4">
    {repositories.map((repo) => (
      <div
        key={repo.id}
        className="group rounded-xl bg-white/50 p-4 shadow-sm transition-all hover:bg-white/80 hover:shadow-lg dark:bg-gray-800/50 dark:hover:bg-gray-800/80"
      >
        <div className="flex items-center gap-2">
          <GitBranch className="size-4 text-gray-500" />
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
          >
            {repo.name}
          </a>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {repo.description || 'No description available'}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          {repo.language && (
            <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              <span className="size-2 rounded-full bg-gray-500"></span>
              {repo.language}
            </span>
          )}

          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Star className="size-3" />
            {repo.stargazers_count}
          </span>

          <span className="flex items-center gap-1 text-xs text-gray-500">
            <GitFork className="size-3" />
            {repo.forks_count}
          </span>

          <span className="text-xs text-gray-500">
            Updated{' '}
            {(() => {
              try {
                return new Date(repo.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              } catch (error) {
                console.error('Date formatting error:', error)
                return 'Invalid date'
              }
            })()}
          </span>
        </div>
      </div>
    ))}
  </div>
)

// Define PropTypes for the components
ProfileSection.propTypes = {
  userData: PropTypes.shape({
    login: PropTypes.string.isRequired,
    name: PropTypes.string,
    bio: PropTypes.string,
    avatar_url: PropTypes.string.isRequired,
    company: PropTypes.string,
    location: PropTypes.string,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    public_repos: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  contributions: PropTypes.shape({
    total: PropTypes.number.isRequired,
    lastWeek: PropTypes.number.isRequired,
    streak: PropTypes.number.isRequired,
    contributions: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
}

RepositoryGrid.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      html_url: PropTypes.string.isRequired,
      language: PropTypes.string,
      stargazers_count: PropTypes.number.isRequired,
      forks_count: PropTypes.number.isRequired,
      updated_at: PropTypes.string.isRequired,
    })
  ).isRequired,
}

// Main GitHubPopup component
const GitHubPopup = ({ githubToken, username = 'SHARIFsGIT' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [userData, setUserData] = useState(null)
  const [repositories, setRepositories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [contributions, setContributions] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const popupRef = useRef(null)
  const [prevPosition, setPrevPosition] = useState(null)

  // Center the popup when it opens
  useEffect(() => {
    if (isOpen && popupRef.current) {
      const initialWidth = isMaximized ? window.innerWidth : 1000
      const initialHeight = isMaximized ? window.innerHeight : 800
      const initialX = Math.max(0, (window.innerWidth - initialWidth) / 30)
      const initialY = Math.max(0, (window.innerHeight - initialHeight) / 30)
      setPosition({ x: initialX, y: initialY })
    }
  }, [isOpen, isMaximized])

  // Error handling utility with proper type checking
  const handleApiError = async (response) => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `GitHub API error: ${response.status}`
      )
    }
    return response.json()
  }

  // Fetch GitHub data with proper error handling
  useEffect(() => {
    const fetchGitHubData = async () => {
      if (!isOpen || !githubToken) return
      setLoading(true)
      setError(null)

      try {
        const headers = {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        }

        const [userData, reposData] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { headers })
            .then(handleApiError)
            .catch((error) => {
              throw new Error(`Failed to fetch user data: ${error.message}`)
            }),
          fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
            { headers }
          )
            .then(handleApiError)
            .catch((error) => {
              throw new Error(`Failed to fetch repositories: ${error.message}`)
            }),
        ])

        setUserData(userData)
        setRepositories(reposData)

        const currentDate = new Date()
        const contributionsArray = Array.from({ length: 365 }, (_, index) => {
          const date = new Date(currentDate)
          date.setDate(date.getDate() - index)
          return Math.floor(Math.random() * (date.getDay() === 0 ? 2 : 5))
        })

        setContributions({
          total: userData.public_repos + (userData.total_private_repos || 0),
          lastWeek: contributionsArray.slice(0, 7).reduce((a, b) => a + b, 0),
          streak: Math.floor(Math.random() * 20) + 10,
          contributions: contributionsArray,
        })
      } catch (err) {
        setError(
          err.message ||
            'Failed to fetch GitHub data. Please check your token and try again.'
        )
        console.error('GitHub API Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [isOpen, githubToken, username])

  const handleMouseMove = React.useCallback(
    (e) => {
      if (!isDragging || isMaximized) return

      const newX = Math.max(
        0,
        Math.min(
          e.clientX - dragStart.x,
          window.innerWidth - popupRef.current.offsetWidth
        )
      )
      const newY = Math.max(
        0,
        Math.min(
          e.clientY - dragStart.y,
          window.innerHeight - popupRef.current.offsetHeight
        )
      )

      setPosition({ x: newX, y: newY })
    },
    [isDragging, dragStart, isMaximized]
  )

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls') || isMaximized) return
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove])

  const toggleMaximize = () => {
    if (!isMaximized) {
      setPrevPosition(position)
      setPosition({ x: 0, y: 0 })
    } else {
      setPosition(
        prevPosition || {
          x: Math.max(0, (window.innerWidth - 1000) / 2),
          y: Math.max(0, (window.innerHeight - 800) / 2),
        }
      )
    }
    setIsMaximized(!isMaximized)
  }

  const filteredRepositories = React.useMemo(
    () =>
      repositories.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (repo.description &&
            repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    [repositories, searchQuery]
  )

  if (!githubToken) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-500 dark:bg-red-900/20">
        Please provide a GitHub token to enable the GitHub popup functionality.
      </div>
    )
  }

  return (
    <>
      <DockItem
        icon={{
          type: 'element',
          data: (
            <svg
              viewBox="0 0 98 96"
              className="size-12 text-white-500 dark:text-gray-200"
            >
              <path
                fill="currentColor"
                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
              />
            </svg>
          ),
        }}
        name="GitHub"
        onClick={() => {
          setIsOpen(true)
          setIsMinimized(false)
        }}
        ariaLabel="Open GitHub Profile"
        isOpen={isOpen}
        isMinimized={isMinimized}
      />

      {isOpen && !isMinimized && (
        <div
          ref={popupRef}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            width: isMaximized ? '100%' : '1000px',
            height: isMaximized ? '100%' : '800px',
            position: 'fixed',
            top: isMaximized ? 0 : 'auto',
            left: isMaximized ? 0 : 'auto',
            transition: isDragging
              ? 'none'
              : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: isDragging ? 'grabbing' : 'default',
            zIndex: 50,
          }}
          className="overflow-hidden rounded-2xl bg-white/95 shadow-2xl backdrop-blur-xl dark:bg-gray-900/95"
        >
          {/* Title bar */}
          <div
            onMouseDown={handleMouseDown}
            className="flex h-12 items-center bg-gray-100/90 px-4 dark:bg-gray-800/90"
          >
            <div className="window-controls flex space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="group flex size-3 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-red-600"
                aria-label="Close window"
              >
                <X className="size-2 text-white opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="group flex size-3 items-center justify-center rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600"
                aria-label="Minimize window"
              >
                <Minus className="size-2 text-white opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={toggleMaximize}
                className="group flex size-3 items-center justify-center rounded-full bg-green-500 transition-colors hover:bg-green-600"
                aria-label="Maximize window"
              >
                <Maximize2 className="size-2 text-white opacity-0 group-hover:opacity-100" />
              </button>
            </div>
            <div className="flex-1 text-center text-sm font-medium text-gray-600 dark:text-gray-300">
              GitHub Profile - {userData?.login || username}
            </div>
            <div className="w-16" />
          </div>

          {/* Navigation tabs */}
          <div className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
            <nav className="flex px-6" aria-label="Tabs">
              {['Overview', 'Repositories'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`${
                    activeTab === tab.toLowerCase()
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  } border-b-2 px-4 py-3 text-sm font-medium transition-colors`}
                  aria-current={
                    activeTab === tab.toLowerCase() ? 'page' : undefined
                  }
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div className="max-h-[calc(100%-96px)] overflow-y-auto p-6">
            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="size-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
              </div>
            ) : error ? (
              <div className="rounded-lg bg-red-50 p-4 text-red-500 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            ) : userData && contributions ? (
              <div className="grid grid-cols-4 gap-8">
                <div className="col-span-1">
                  <ProfileSection
                    userData={userData}
                    contributions={contributions}
                  />
                </div>

                <div className="col-span-3">
                  {activeTab === 'overview' ? (
                    <>
                      <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Popular Repositories
                        </h3>
                        <div className="rounded-full bg-blue-50 px-4 py-1.5 text-sm dark:bg-blue-900/20">
                          <span className="font-medium text-blue-700 dark:text-blue-300">
                            {userData.public_repos}
                          </span>
                          <span className="ml-1 text-blue-600 dark:text-blue-400">
                            repositories
                          </span>
                        </div>
                      </div>
                      <RepositoryGrid repositories={repositories.slice(0, 6)} />
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Find a repository..."
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-500 transition-colors focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                        />
                      </div>
                      {filteredRepositories.length > 0 ? (
                        <RepositoryGrid repositories={filteredRepositories} />
                      ) : (
                        <div className="flex h-32 items-center justify-center text-gray-500 dark:text-gray-400">
                          No repositories found matching your search.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  )
}

GitHubPopup.propTypes = {
  githubToken: PropTypes.string.isRequired,
  username: PropTypes.string,
}

export default GitHubPopup
