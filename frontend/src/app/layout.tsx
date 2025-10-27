import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gem - AI-first Recruiting Platform',
  description: 'AI-first all-in-one recruiting platform to help teams hire 5x faster',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}