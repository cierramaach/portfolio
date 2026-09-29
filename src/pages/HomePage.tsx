import { useEffect } from 'react'
import { AuthorPlate } from '../components/AuthorPlate'
import { Close } from '../components/Close'
import { PracticeIndex } from '../components/PracticeIndex'
import { SiteHeader } from '../components/SiteHeader'
import { useNav } from '../lib/nav'

export function HomePage() {
  const { hash } = useNav()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash)?.scrollIntoView()
    }
  }, [hash])

  return (
    <>
      <a className="skip" href="#index">
        Skip to index
      </a>
      <main className="home">
        <SiteHeader onHero />
        <AuthorPlate />
        <PracticeIndex />
        <section id="close" className="coda" aria-label="Contact">
          <Close />
        </section>
      </main>
    </>
  )
}
