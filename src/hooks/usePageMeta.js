import { useEffect } from 'react'

export function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title
    const meta = document.querySelector('meta[name="description"]')
    if (meta && description) meta.setAttribute('content', description)
  }, [title, description])
}
