import { useEffect, useState, type FormEvent } from 'react'
import { useEditor } from '../lib/content'
import { go } from '../lib/nav'

export function EditPage() {
  const { authed, hasPassword, login, setPassword } = useEditor()
  const [password, setValue] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const creating = !hasPassword

  useEffect(() => {
    if (authed) go('/')
  }, [authed])

  if (authed) return null

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')

    if (creating) {
      if (password.length < 8) {
        setError('Use at least eight characters.')
        return
      }
      if (password !== confirm) {
        setError('Those passwords do not match.')
        return
      }
      await setPassword(password)
      go('/')
      return
    }

    const ok = await login(password)
    if (!ok) {
      setError('That password is not right.')
      return
    }
    go('/')
  }

  return (
    <main className="edit-page">
      <form className="edit-card" onSubmit={onSubmit}>
        <p className="edit-kicker">Private</p>
        <h1 className="edit-title">
          {creating ? 'Set a password' : 'Sign in to edit'}
        </h1>
        <p className="edit-note">
          {creating
            ? 'This password stays in this browser. It is a gate for you, not a vault. The address is /edit.'
            : 'Enter the password for this browser to edit copy on the page.'}
        </p>
        <label className="edit-label">
          Password
          <input
            className="edit-input"
            type="password"
            autoComplete={creating ? 'new-password' : 'current-password'}
            value={password}
            onChange={(event) => setValue(event.target.value)}
            required
          />
        </label>
        {creating ? (
          <label className="edit-label">
            Confirm
            <input
              className="edit-input"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              required
            />
          </label>
        ) : null}
        {error ? <p className="edit-error">{error}</p> : null}
        <button className="edit-submit" type="submit">
          {creating ? 'Save and edit' : 'Enter'}
        </button>
      </form>
    </main>
  )
}
