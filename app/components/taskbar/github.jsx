'use client'

import { IconBrandGithub } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'

const GitHubCalendar = () => {
  const [contributions, setContributions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({ total: 0, streak: 0, average: 0 })
  const username = 'SHARIFsGIT' // GitHub username

  const openGitHubProfile = () => {
    window.open(
      `https://github.com/${username}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/events`
        )
        if (!response.ok) throw new Error('Failed to fetch GitHub data')

        const events = await response.json()
        const contributionMap = new Map()

        const today = new Date()
        const yearAgo = new Date(today)
        yearAgo.setDate(yearAgo.getDate() - 365)

        for (
          let d = new Date(yearAgo);
          d <= today;
          d.setDate(d.getDate() + 1)
        ) {
          contributionMap.set(d.toISOString().split('T')[0], 0)
        }

        events.forEach((event) => {
          if (
            ['PushEvent', 'CreateEvent', 'PullRequestEvent'].includes(
              event.type
            )
          ) {
            const date = event.created_at.split('T')[0]
            if (contributionMap.has(date)) {
              contributionMap.set(date, contributionMap.get(date) + 1)
            }
          }
        })

        let total = 0
        let currentStreak = 0
        let maxStreak = 0

        const sortedDates = Array.from(contributionMap.entries()).sort()
        sortedDates.forEach(([, count]) => {
          // Removed unused '_' parameter
          total += count
          if (count > 0) {
            currentStreak++
            maxStreak = Math.max(maxStreak, currentStreak)
          } else {
            currentStreak = 0
          }
        })

        setStats({
          total,
          streak: maxStreak,
          average: (total / 365).toFixed(1),
        })

        setContributions(
          Array.from(contributionMap.entries()).map(([date, count]) => ({
            date: new Date(date),
            count,
          }))
        )
      } catch (error) {
        // Changed 'err' to 'error' to match the error state
        setError('Failed to load GitHub data')
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  const getContributionColor = (count) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800'
    if (count <= 3) return 'bg-emerald-100 dark:bg-emerald-900'
    if (count <= 6) return 'bg-emerald-300 dark:bg-emerald-700'
    return 'bg-emerald-500 dark:bg-emerald-500'
  }

  const weeks = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }

  return (
    <div className="relative h-full w-full rounded-lg bg-dark-background p-4">
      <div
        onClick={openGitHubProfile}
        className="group absolute right-4 top-4 cursor-pointer"
      >
        <IconBrandGithub
          stroke={1}
          className="size-10 text-dark-text transition-colors hover:text-emerald-400"
        />
        <span className="absolute -top-9 left-1/2 hidden -translate-x-1/2 rounded bg-[#3e3e3e] px-3 py-1 text-xs shadow-md group-hover:inline-block">
          Profile
        </span>
      </div>
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50/10 p-4 text-red-500">{error}</div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2
              className="cursor-pointer text-xl font-semibold text-dark-text transition-colors hover:text-emerald-400"
              onClick={openGitHubProfile}
            >
              Contribution Activity
            </h2>
            <div className="flex gap-4 text-sm">
              <div className="rounded-full bg-emerald-900/20 px-3 py-1">
                <span className="font-medium text-emerald-300">
                  {stats.total}
                </span>
                <span className="ml-1 text-emerald-400">contributions</span>
              </div>
              <div className="rounded-full bg-purple-900/20 px-3 py-1">
                <span className="font-medium text-purple-300">
                  {stats.streak}
                </span>
                <span className="ml-1 text-purple-400">max streak</span>
              </div>
              <div className="rounded-full bg-blue-900/20 px-3 py-1">
                <span className="font-medium text-blue-300">
                  {stats.average}
                </span>
                <span className="ml-1 text-blue-400">per day</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="flex">
              <div className="mr-2 flex h-32 flex-col justify-around">
                {['Mon', 'Wed', 'Fri'].map((day, i) => (
                  <span key={i} className="text-xs text-gray-400">
                    {day}
                  </span>
                ))}
              </div>

              <div className="flex gap-1 overflow-x-auto pb-2">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`h-3 w-3 cursor-pointer rounded-sm ring-emerald-400 ring-offset-2 ring-offset-dark-background transition-colors duration-200 hover:ring-2 ${getContributionColor(day.count)}`}
                        title={`${day.count} contributions on ${day.date.toDateString()}`}
                        onClick={openGitHubProfile}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-6 left-8 right-0 flex items-center justify-end text-xs text-gray-400">
              <span className="mr-2">Less</span>
              <div className="flex gap-1">
                {[0, 2, 5, 8].map((count) => (
                  <div
                    key={count}
                    className={`h-3 w-3 rounded-sm ${getContributionColor(count)}`}
                  />
                ))}
              </div>
              <span className="ml-2">More</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GitHubCalendar
