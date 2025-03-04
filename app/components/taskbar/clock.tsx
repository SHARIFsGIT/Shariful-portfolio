'use client'

import { clock_utils } from '@/app/utils';
import { useEffect, useState } from 'react';

export function TaskbarClock() {
  const [clock, setClock] = useState<{ time: string; date: string }>({
    time: clock_utils.getCurrentTime(),
    date: clock_utils.getCurrentDate(),
  })

  useEffect(() => {
    const interval_id = setInterval(() => {
      setClock({
        time: clock_utils.getCurrentTime(),
        date: clock_utils.getCurrentDate(),
      })
    }, 1000)
    return () => {
      clearInterval(interval_id)
    }
  }, [])

  return (
    <div className="space-x-2 font-medium">
      <span className="p-1">{clock.date}</span>
      <span className="p-1">{clock.time}</span>
    </div>
  )
}
