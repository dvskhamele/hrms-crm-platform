'use client'

import '../globals.css'
import { Inter } from 'next/font/google'
import PWAInstaller from '../../components/PWAInstaller'
import { PWAProvider } from '../../context/PWAContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export default function PublicRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PWAProvider>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Gem" />
          <meta name="theme-color" content="#7e22ce" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          <link rel="manifest" href="/manifest.json" />
          <title>Gem - Public Candidate Bench</title>
          <meta name="description" content="Discover available candidates on the Gem platform" />
        </head>
        <body className={`${inter.className} antialiased`}>
          {children}
          <style jsx global>{`
            /* Mobile-first responsive styles */
            body {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-rendering: optimizeLegibility;
            }
            
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
            
            /* Improved focus styles for accessibility */
            button:focus, a:focus {
              outline: 2px solid #8b5cf6;
              outline-offset: 2px;
            }
            
            /* Scrollbar styling */
            ::-webkit-scrollbar {
              width: 6px;
              height: 6px;
            }
            
            ::-webkit-scrollbar-track {
              background: #f1f5f9;
              border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb {
              background: #94a3b8;
              border-radius: 4px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: #64748b;
            }
          `}</style>
          <PWAInstaller />
          <ToastContainer />
        </body>
      </html>
    </PWAProvider>
  )
}