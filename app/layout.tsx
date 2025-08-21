import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import ErrorBoundary from '@/components/common/ErrorBoundary'
import JsonLd from '@/components/common/JsonLd'
import ScrollIndicator from '@/components/common/ScrollIndicator'
import { generateSEOMetadata, generateStructuredData } from '@/lib/seo'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = generateSEOMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = generateStructuredData()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={structuredData.person} />
        <JsonLd data={structuredData.resume} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ScrollIndicator />
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}
