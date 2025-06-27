import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Fundation ',
  description: 'Financial Tycoon 8-Bit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-[#221C1C] text-[#F5F0F6] min-h-screen font-mono">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}