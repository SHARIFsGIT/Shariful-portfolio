import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Taskbar } from './components/taskbar'
import { Topbar } from './components/topbar'
import { WalpaperProvider } from './components/walpaper-wraper'
import './globals.css'
import { ReduxProvider } from './providers/redux-provider'

export const metadata: Metadata = {
  title: 'macOS 15 Sequoia',
  description: 'macOS 15 Sequoia by React, Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen overflow-hidden">
        <ReduxProvider>
          <ThemeProvider
            enableSystem
            attribute="class"
            disableTransitionOnChange
          >
            <WalpaperProvider />
            <Topbar />
            {children}
            <Taskbar />
            <div id="modal" />
            <div id="context-menu" />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
