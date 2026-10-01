import { useEffect, type ReactNode } from 'react'
import { EditorBar } from './components/EditorBar'
import { SmoothScroll } from './components/SmoothScroll'
import { isWorkPath, WorkParallax } from './components/WorkParallax'
import { useNav } from './lib/nav'
import { EditPage } from './pages/EditPage'
import { HomePage } from './pages/HomePage'
import { ClassroomGamePiecesPage } from './pages/ClassroomGamePiecesPage'
import { ClassicalOrbitalElementsPage } from './pages/ClassicalOrbitalElementsPage'
import { SpaceLawGamePage } from './pages/SpaceLawGamePage'
import { EquipmentManagementPage } from './pages/EquipmentManagementPage'
import { MakingSpacePage } from './pages/MakingSpacePage'
import { NssiDigitalPresencePage } from './pages/NssiDigitalPresencePage'
import { DltVisualIdentityPage } from './pages/DltVisualIdentityPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PracticePage } from './pages/PracticePage'

function Redirect({ to }: { to: string }) {
  useEffect(() => {
    const url = new URL(to, window.location.origin)
    window.history.replaceState({}, '', `${url.pathname}${url.hash}`)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }, [to])
  return null
}

function Alias({ to, children }: { to: string; children: ReactNode }) {
  useEffect(() => {
    const url = new URL(to, window.location.origin)
    const next = `${url.pathname}${url.hash}`
    if (`${window.location.pathname}${window.location.hash}` !== next) {
      window.history.replaceState({}, '', next)
    }
  }, [to])
  return children
}

function route(path: string): ReactNode {
  if (path === '/') return <HomePage />
  if (path === '/edit') return <EditPage />
  if (path === '/creative-direction') {
    return <Redirect to="/creative-direction/making-space" />
  }
  if (path === '/creative-direction/making-space') return <MakingSpacePage />
  if (path === '/creative-direction/space-law-game') {
    return (
      <Alias to="/experience/space-law-game">
        <SpaceLawGamePage />
      </Alias>
    )
  }
  if (path === '/creative-direction/equipment-management') {
    return <EquipmentManagementPage />
  }
  if (path === '/creative-direction/nssi-digital-presence') {
    return <NssiDigitalPresencePage />
  }
  if (path === '/visual-storytelling') {
    return <PracticePage slug="visual-storytelling" />
  }
  if (path === '/experience') {
    return <Redirect to="/experience/classical-orbital-elements" />
  }
  if (path === '/experience/classical-orbital-elements') {
    return <ClassicalOrbitalElementsPage />
  }
  if (path === '/experience/classroom-game-pieces') {
    return <ClassroomGamePiecesPage />
  }
  if (path === '/experience/space-law-game') {
    return <SpaceLawGamePage />
  }
  if (path === '/experiments') {
    return <Redirect to="/experiments/dlt-visual-identity" />
  }
  if (path === '/experiments/dlt-visual-identity') {
    return <DltVisualIdentityPage />
  }
  if (path === '/blog') return <PracticePage slug="blog" />
  return <NotFoundPage />
}

export default function App() {
  const { path } = useNav()
  return (
    <>
      <EditorBar />
      {route(path)}
      <SmoothScroll />
      {isWorkPath(path) ? <WorkParallax key={path} /> : null}
    </>
  )
}
