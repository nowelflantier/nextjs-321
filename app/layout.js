// import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import { GamesProvider } from "./components/GameContext";



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'darts scorer',
  description: 'created by sergei',
}

export default function RootLayout({ children }) {
  return (
    <GamesProvider>
    <html lang="fr">
      <body className={inter.className}>{children}</body>
      <Analytics />
      
    </html>
    </GamesProvider>
  )
}
