import '@/styles/globals.css'
import '@fontsource-variable/inter'
import '@fontsource-variable/inter/opsz.css'
import '@fontsource-variable/inter/opsz-italic.css'
import '@fontsource-variable/inter/wght-italic.css'

import React, { type ReactElement, type ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Navigation } from '@/patterns/navigation/navigation'
import { Footer } from '@/patterns/footer/footer'

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
