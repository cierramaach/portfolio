import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  contact as seedContact,
  efforts as seedEfforts,
  identity as seedIdentity,
  practices as seedPractices,
  type Effort,
  type Practice,
} from '../data/site'

const CONTENT_KEY = 'cierra.site'
const HASH_KEY = 'cierra.editor.hash'
const SESSION_KEY = 'cierra.editor.session'
const SALT = 'cierra.maach.editor.v1'

export type SiteContent = {
  identity: typeof seedIdentity
  contact: typeof seedContact
  practices: Practice[]
  efforts: Effort[]
}

type EditorContextValue = {
  site: SiteContent
  editing: boolean
  authed: boolean
  hasPassword: boolean
  setPassword: (password: string) => Promise<void>
  login: (password: string) => Promise<boolean>
  logout: () => void
  update: (mutate: (site: SiteContent) => void) => void
  exportCopy: () => void
  resetCopy: () => void
}

const EditorContext = createContext<EditorContextValue | null>(null)

function seed(): SiteContent {
  return structuredClone({
    identity: seedIdentity,
    contact: seedContact,
    practices: seedPractices,
    efforts: seedEfforts,
  })
}

function readContent(): SiteContent {
  const raw = localStorage.getItem(CONTENT_KEY)
  if (!raw) return seed()

  try {
    const saved = JSON.parse(raw) as Partial<SiteContent>
    const next = seed()
    if (saved.identity) {
      next.identity = {
        ...next.identity,
        ...saved.identity,
        blurbBreak: seedIdentity.blurbBreak,
        blurbContinue: seedIdentity.blurbContinue,
      }
    }
    if (saved.contact) {
      next.contact = {
        ...next.contact,
        ...saved.contact,
        line: next.contact.line,
        linkedin: saved.contact.linkedin || next.contact.linkedin,
        instagram: saved.contact.instagram || next.contact.instagram,
        resume: saved.contact.resume || next.contact.resume,
      }
    }
    if (Array.isArray(saved.practices)) {
      next.practices = next.practices.map((practice) => {
        const override = saved.practices?.find((item) => item.slug === practice.slug)
        return override
          ? {
              ...practice,
              ...override,
              path: practice.path,
              index: practice.index,
              title: practice.title,
              line: practice.line,
              preview: practice.preview || override.preview,
              hidden: practice.hidden,
            }
          : practice
      })
    }
    if (Array.isArray(saved.efforts)) {
      next.efforts = next.efforts.map((effort) => {
        const override = saved.efforts?.find((item) => item.id === effort.id)
        return override
          ? {
              ...effort,
              ...override,
              path: effort.path,
              index: effort.index,
              src: effort.src,
              title: effort.title,
              purpose: effort.purpose,
            }
          : effort
      })
    }
    return next
  } catch {
    return seed()
  }
}

export async function hashPassword(password: string) {
  const payload = new TextEncoder().encode(`${SALT}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', payload)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function storedHash() {
  const fromEnv = import.meta.env.VITE_EDITOR_HASH as string | undefined
  if (fromEnv) return fromEnv
  return localStorage.getItem(HASH_KEY)
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [site, setSite] = useState<SiteContent>(seed)
  const [authed, setAuthed] = useState(false)
  const [hasPassword, setHasPassword] = useState(false)

  useEffect(() => {
    setSite(readContent())
    setHasPassword(Boolean(storedHash()))
    setAuthed(sessionStorage.getItem(SESSION_KEY) === '1')
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-editing', authed)
    return () => document.body.classList.remove('is-editing')
  }, [authed])

  const persist = useCallback((next: SiteContent) => {
    localStorage.setItem(CONTENT_KEY, JSON.stringify(next))
    setSite(next)
  }, [])

  const setPassword = useCallback(async (password: string) => {
    const hash = await hashPassword(password)
    localStorage.setItem(HASH_KEY, hash)
    sessionStorage.setItem(SESSION_KEY, '1')
    setHasPassword(true)
    setAuthed(true)
  }, [])

  const login = useCallback(async (password: string) => {
    const expected = storedHash()
    if (!expected) return false
    const hash = await hashPassword(password)
    if (hash !== expected) return false
    sessionStorage.setItem(SESSION_KEY, '1')
    setAuthed(true)
    return true
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
  }, [])

  const update = useCallback(
    (mutate: (draft: SiteContent) => void) => {
      setSite((current) => {
        const next = structuredClone(current)
        mutate(next)
        localStorage.setItem(CONTENT_KEY, JSON.stringify(next))
        return next
      })
    },
    [],
  )

  const exportCopy = useCallback(() => {
    const blob = new Blob([JSON.stringify(site, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'cierra-copy.json'
    link.click()
    URL.revokeObjectURL(url)
  }, [site])

  const resetCopy = useCallback(() => {
    localStorage.removeItem(CONTENT_KEY)
    persist(seed())
  }, [persist])

  const value = useMemo<EditorContextValue>(
    () => ({
      site,
      editing: authed,
      authed,
      hasPassword,
      setPassword,
      login,
      logout,
      update,
      exportCopy,
      resetCopy,
    }),
    [
      site,
      authed,
      hasPassword,
      setPassword,
      login,
      logout,
      update,
      exportCopy,
      resetCopy,
    ],
  )

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  )
}

export function useEditor() {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditor must be used inside ContentProvider')
  }
  return context
}
