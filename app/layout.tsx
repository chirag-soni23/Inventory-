import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import Sidebar from "../src/components/Sidebar"
import Navbar from "../src/components/Navbar"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Inventory AI - Forecasting Dashboard",
  description: "AI-powered inventory forecasting platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <Suspense fallback={<div>Loading...</div>}>
            <Sidebar />
          </Suspense>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Navbar */}
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar />
            </Suspense>

            {/* Page Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">{children}</main>
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
