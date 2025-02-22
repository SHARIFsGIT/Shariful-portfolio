import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Taskbar } from './components/taskbar'
import { Topbar } from './components/topbar'
import { WalpaperProvider } from './components/walpaper-wraper'
import './globals.css'
import { ReduxProvider } from './providers/redux-provider'

export const metadata: Metadata = {
  title: 'Portfolio | Shariful Islam',
  description: 'An inspired project of macOS',
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
