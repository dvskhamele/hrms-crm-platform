'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import PWAInstaller from '../components/PWAInstaller'
import { PWAProvider } from '../context/PWAContext'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../context/AuthContext'
import { SidebarProvider } from '../context/SidebarContext'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PWAProvider>
      <SidebarProvider>
        <html lang="en">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-title" content="Gem" />
            <meta name="theme-color" content="#7e22ce" />
            <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
            <link rel="manifest" href="/manifest.json" />
            <title>Gem - AI-first Recruiting Platform</title>
            <meta name="description" content="AI-first all-in-one recruiting platform to help teams hire 5x faster" />
          </head>
          <body className={inter.className}>
            <AuthProvider>
              {children}
            </AuthProvider>
            {/* Add mobile-specific styles */}
            <style jsx global>{`
              @media (max-width: 767px) {
                body {
                  -webkit-touch-callout: none;
                  -webkit-user-select: none;
                  -khtml-user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  user-select: none;
                  -webkit-tap-highlight-color: transparent;
                }
                
                /* Ensure proper scrolling on mobile */
                html, body {
                  height: 100%;
                  overflow-x: hidden;
                }
                
                /* Mobile-specific optimizations */
                .mobile-optimized {
                  -webkit-overflow-scrolling: touch;
                  scroll-behavior: smooth;
                }
              }
            `}</style>
            <PWAInstaller />
            <ToastContainer />
          </body>
        </html>
      </SidebarProvider>
    </PWAProvider>
  )
}