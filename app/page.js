'use client'
import Image from 'next/image'
import Link from 'next/link';
import styles from './styles.scss'
import React, { useState, useEffect } from "react";



export default function Home() {
  const [isCookiesStored, setIsCookieesStored] = useState(false)
  useEffect(() => {
    if (localStorage.getItem("numPlayers") !== null) {
      setIsCookieesStored(true)
    }
    
  }, [])
  return (
    <main className="main">
      <div className="description">
        <p>
        321 Shangai - Darts scorer - v1.0
        </p>
        <div>
         powered by le S.
        </div>
      </div>

      <div className="center container">
        
        <p className='code'>let&apos;s play darts !<br/></p>
        <Image
          className="logo"
          src="/dart-aim.svg"
          alt="Next.js Logo"
          width={180}
          height={87}
          priority
        />
        
        
        <Link href="/321/select-players?new_game=true" className="bottom btn"><p>Nouvelle partie</p></Link>
        {isCookiesStored && <Link href="/321/game" className="bottom btn"><p>Reprendre ma partie</p></Link>}
      </div>
    </main>
  )
}
