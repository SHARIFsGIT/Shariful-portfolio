import {
  Activity,
  Book,
  Building2,
  Calendar,
  ExternalLink,
  GitFork,
  MapPin,
  Maximize2,
  Minus,
  Search,
  Star,
  Users,
  X,
} from 'lucide-react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { DockItem } from './app-tray'
// Using a simple error display div instead of the Alert component
const ErrorDisplay = ({ children }) => (
  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
    {children}
  </div>
)

// Define ProfileSection component first
const ProfileSection = ({ userData, contributions }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="space-y-6">
      <div
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-2 shadow-inner transition-all duration-500 ease-in-out hover:shadow-xl dark:from-gray-800 dark:to-gray-900"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {userData.avatar_url && (
          <div className="relative transform overflow-hidden transition-all duration-500 ease-out hover:scale-105">
            <div
              className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />
            <Image
              src={userData.avatar_url}
              alt={`${userData.login}'s profile`}
              width={200}
              height={200}
              className="transform rounded-xl transition-all duration-500 ease-in-out hover:brightness-105 group-hover:shadow-lg"
              priority
              quality={95}
            />
            {isHovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <a
                  href={`https://github.com/${userData.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 transition-transform hover:scale-105"
                >
                  View Profile
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="transform transition-all duration-300">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {userData.name || userData.login}
        </h2>
        {userData.bio && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {userData.bio}
          </p>
        )}
      </div>

      <div className="rounded-xl bg-blue-50 p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-blue-900/20">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
          <Activity className="size-4" />
          Activity Overview
        </h3>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between text-blue-600 dark:text-blue-400">
            <span>Public Repositories</span>
            <span className="font-semibold">{userData.public_repos}</span>
          </div>
          <div className="flex justify-between text-blue-600 dark:text-blue-400">
            <span>Public Gists</span>
            <span className="font-semibold">{userData.public_gists}</span>
          </div>
          <div className="flex justify-between text-blue-600 dark:text-blue-400">
            <span>Total Stars</span>
            <span className="font-semibold">
              {contributions.totalStars || 0}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="group flex items-center gap-2 transition-transform duration-200">
          <Users className="size-4 text-gray-500 transition-colors" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {userData.followers} followers · {userData.following} following
          </span>
        </div>

        {userData.company && (
          <div className="group flex items-center gap-2 transition-transform duration-200">
            <Building2 className="size-4 text-gray-500 transition-colors" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {userData.company}
            </span>
          </div>
        )}

        {userData.location && (
          <div className="group flex items-center gap-2 transition-transform duration-200">
            <MapPin className="size-4 text-gray-500 transition-colors" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {userData.location}
            </span>
          </div>
        )}

        <div className="group flex items-center gap-2 transition-transform duration-200">
          <Calendar className="size-4 text-gray-500 transition-colors" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Joined{' '}
            {new Date(userData.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  )
}

// Define RepositoryGrid component
const RepositoryGrid = ({ repositories }) => {
  const [sortBy, setSortBy] = useState('updated')
  const [filterLanguage, setFilterLanguage] = useState('')

  const languages = [
    ...new Set(repositories.map((repo) => repo.language).filter(Boolean)),
  ]

  const sortedRepos = [...repositories].sort((a, b) => {
    switch (sortBy) {
      case 'stars':
        return b.stargazers_count - a.stargazers_count
      case 'forks':
        return b.forks_count - a.forks_count
      case 'updated':
      default:
        return new Date(b.updated_at) - new Date(a.updated_at)
    }
  })

  const filteredRepos = filterLanguage
    ? sortedRepos.filter((repo) => repo.language === filterLanguage)
    : sortedRepos

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm transition-colors hover:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            <option value="updated">Recently Updated</option>
            <option value="stars">Most Stars</option>
            <option value="forks">Most Forks</option>
          </select>
          <select
            value={filterLanguage}
            onChange={(e) => setFilterLanguage(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm transition-colors hover:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            <option value="">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredRepos.map((repo) => (
          <div
            key={repo.id}
            className="group rounded-xl bg-white/50 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:shadow-lg dark:bg-gray-800/50 dark:hover:bg-gray-800/80"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Book className="size-4 text-gray-500" />
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {repo.name}
                </a>
              </div>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 transition-opacity group-hover:opacity-100"
              >
                <ExternalLink className="size-4 text-gray-500 hover:text-blue-500" />
              </a>
            </div>

            <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
              {repo.description || 'No description available'}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-4">
              {repo.language && (
                <span className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300">
                  <span className="size-2 rounded-full bg-gray-500"></span>
                  {repo.language}
                </span>
              )}

              <span className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-yellow-500">
                <Star className="size-3" />
                {repo.stargazers_count}
              </span>

              <span className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-blue-500">
                <GitFork className="size-3" />
                {repo.forks_count}
              </span>

              <span className="text-xs text-gray-500">
                Updated{' '}
                {new Date(repo.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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

  // Center the popup when it opens
  useEffect(() => {
    if (isOpen && popupRef.current) {
      const initialX = Math.max(0, (window.innerWidth - 1000) / 30)
      const initialY = Math.max(0, (window.innerHeight - 800) / 30)
      setPosition({ x: initialX, y: initialY })
    }
  }, [isOpen])

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

  const handleRefresh = () => {
    setLoading(true)
    fetchGitHubData()
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

        const userData = await fetch(
          `https://api.github.com/users/${username}`,
          { headers }
        )
          .then(handleApiError)
          .catch((error) => {
            throw new Error(`Failed to fetch user data: ${error.message}`)
          })

        let page = 1
        let allRepos = []
        let hasMoreRepos = true

        while (hasMoreRepos) {
          const reposResponse = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&page=${page}`,
            { headers }
          ).then(handleApiError)

          if (reposResponse.length === 0) {
            hasMoreRepos = false
          } else {
            allRepos = [...allRepos, ...reposResponse]
            page++
          }
        }

        setUserData(userData)
        setRepositories(allRepos)

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
      if (!isDragging) return
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      setPosition({ x: newX, y: newY })
    },
    [isDragging, dragStart]
  )

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return
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
              className="text-white-500 size-12 dark:text-gray-200"
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
            width: '1000px',
            height: '800px',
            position: 'fixed',
            transition: isDragging
              ? 'none'
              : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: isDragging ? 'grabbing' : 'default',
            zIndex: 50,
          }}
          className="overflow-hidden rounded-2xl bg-white/95 shadow-2xl backdrop-blur-xl dark:bg-gray-900/95"
        >
          {/* Title bar with enhanced animations */}
          <div
            onMouseDown={handleMouseDown}
            className="flex h-12 items-center justify-between bg-gray-100/90 px-4 dark:bg-gray-800/90"
          >
            <div className="window-controls flex space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="group relative flex size-3 items-center justify-center rounded-full bg-red-500 transition-all duration-200 hover:bg-red-600"
                aria-label="Close window"
              >
                <X className="size-4 text-black opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="group relative flex size-3 items-center justify-center rounded-full bg-yellow-500 transition-all duration-200 hover:bg-yellow-600"
                aria-label="Minimize window"
              >
                <Minus className="size-4 text-black opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
              <button
                disabled
                className="group relative flex size-3 cursor-not-allowed items-center justify-center rounded-full bg-gray-500/60"
                aria-label="Maximize window (disabled)"
              >
                <Maximize2 className="size-4 text-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            </div>
            <div className="flex-1 text-center text-sm font-medium text-gray-600 dark:text-gray-300">
              GitHub Profile - {userData?.login || username}
            </div>
          </div>

          {/* Enhanced navigation tabs */}
          <div className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
            <nav className="flex px-6" aria-label="Tabs">
              {['Overview', 'Repositories'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`relative border-b-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.toLowerCase()
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                  aria-current={
                    activeTab === tab.toLowerCase() ? 'page' : undefined
                  }
                >
                  {tab}
                  {activeTab === tab.toLowerCase() && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full animate-pulse bg-blue-500" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Main content with loading states and error handling */}
          <div className="max-h-[calc(100%-96px)] overflow-y-auto p-6">
            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="size-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Loading GitHub data...
                  </p>
                </div>
              </div>
            ) : error ? (
              <ErrorDisplay>{error}</ErrorDisplay>
            ) : userData ? (
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
                          All Repositories
                        </h3>
                        <div className="rounded-full bg-blue-50 px-4 py-1.5 text-sm shadow-sm transition-all duration-300 hover:shadow-md dark:bg-blue-900/20">
                          <span className="font-medium text-blue-700 dark:text-blue-300">
                            {userData.public_repos}
                          </span>
                          <span className="ml-1 text-blue-600 dark:text-blue-400">
                            repositories
                          </span>
                        </div>
                      </div>
                      <RepositoryGrid
                        repositories={repositories}
                        onRefresh={handleRefresh}
                      />
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Find a repository..."
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 text-gray-500 transition-colors focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                          />
                        </div>
                      </div>
                      {filteredRepositories.length > 0 ? (
                        <RepositoryGrid
                          repositories={filteredRepositories}
                          onRefresh={handleRefresh}
                        />
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
