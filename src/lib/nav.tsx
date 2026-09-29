import {
  createContext,
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'

type Nav = {
  path: string
  hash: string
}

const NavContext = createContext<Nav>({ path: '/', hash: '' })

function readNav(): Nav {
  return {
    path: window.location.pathname,
    hash: window.location.hash.replace('#', ''),
  }
}

export function NavProvider({ children }: { children: ReactNode }) {
  const [nav, setNav] = useState<Nav>(readNav)

  useEffect(() => {
    const sync = () => setNav(readNav())
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  return <NavContext.Provider value={nav}>{children}</NavContext.Provider>
}

export function useNav() {
  return useContext(NavContext)
}

export function go(to: string) {
  const url = new URL(to, window.location.origin)
  window.history.pushState({}, '', `${url.pathname}${url.hash}`)
  window.dispatchEvent(new PopStateEvent('popstate'))

  if (url.hash) {
    requestAnimationFrame(() => {
      document.getElementById(url.hash.slice(1))?.scrollIntoView()
    })
  } else {
    window.scrollTo(0, 0)
  }
}

type LinkProps = {
  to: string
  className?: string
  id?: string
  children: ReactNode
}

export function Link({ to, className, id, children }: LinkProps) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return
    }
    event.preventDefault()
    go(to)
  }

  return (
    <a href={to} id={id} className={className} onClick={onClick}>
      {children}
    </a>
  )
}
