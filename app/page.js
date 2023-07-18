import Image from 'next/image'
import Link from 'next/link';
import styles from './styles.scss'


export default function Home() {
  return (
    <main className="main">
      <div className="description">
        <p>
         Darts scorer <code>- beta</code>
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
        
        
        <Link href="/321/start-game" className="bottom btn"><p>Commencer</p></Link>
      </div>

      <div className="grid">
      </div>
    </main>
  )
}
