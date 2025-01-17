import '@/styles/globals.css'
import '@fontsource-variable/inter'
import '@fontsource-variable/inter/opsz.css'
import '@fontsource-variable/inter/opsz-italic.css'
import '@fontsource-variable/inter/wght-italic.css'

import React, { type ReactElement, type ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { type Metadata } from 'next'
import { Navigation } from '@/components/navigation/navigation'
import { Footer } from '@/components/footer/footer'

export default function RootLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <html lang="en" className="bg-ginger">
      <body>
        <Navigation />
        <main className="border-black border-l-2 border-r-2 container p-0">{children}</main>
        <Footer />

        <Analytics />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/ico',
        url: '/favicon/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/png',
        url: '/favicon/icon.png',
      },
      {
        rel: 'icon',
        type: 'image/svg',
        url: '/favicon/icon.svg',
      },
      {
        rel: 'apple-touch-icon',
        type: 'image/png',
        url: '/favicon/apple-touch-icon.png',
      },
    ],
  },

  manifest: './favicon/manifest.json',
}
