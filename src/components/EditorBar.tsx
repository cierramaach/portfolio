import { useEditor } from '../lib/content'
import { go } from '../lib/nav'

export function EditorBar() {
  const { authed, logout, exportCopy, resetCopy } = useEditor()

  if (!authed) return null

  return (
    <div className="editor-bar" role="region" aria-label="Editing">
      <p className="editor-bar-status">Editing</p>
      <div className="editor-bar-actions">
        <button type="button" className="editor-bar-btn" onClick={exportCopy}>
          Export
        </button>
        <button
          type="button"
          className="editor-bar-btn"
          onClick={() => {
            if (window.confirm('Restore the original copy?')) resetCopy()
          }}
        >
          Reset
        </button>
        <button
          type="button"
          className="editor-bar-btn"
          onClick={() => {
            logout()
            go('/')
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
