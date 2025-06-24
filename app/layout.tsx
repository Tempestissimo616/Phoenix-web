import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Phoenix Web',
  description: 'Thank you for visiting',
  generator: 'phoenix.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
