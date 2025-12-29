import { useRef, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { RefreshCw, ArrowLeft, ArrowRight, Wrench } from 'lucide-react'
import type { CellProps } from './cell.types'

export function Cell({ url, index, userAgent }: CellProps) {
  const webviewRef = useRef<Electron.WebviewTag>(null)
  const [title, setTitle] = useState(() => {
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  })

  useEffect(() => {
    const webview = webviewRef.current

    if (!webview) return

    const handleTitleUpdate = (e: Event) => {
      const event = e as unknown as { title: string }

      if (event.title) {
        setTitle(event.title)
      }
    }

    webview.addEventListener('page-title-updated', handleTitleUpdate)

    return () => {
      webview.removeEventListener('page-title-updated', handleTitleUpdate)
    }
  }, [])

  const handleRefresh = () => {
    webviewRef.current?.reload()
  }

  const handleBack = () => {
    if (webviewRef.current?.canGoBack()) {
      webviewRef.current.goBack()
    }
  }

  const handleForward = () => {
    if (webviewRef.current?.canGoForward()) {
      webviewRef.current.goForward()
    }
  }

  const handleDevTools = () => {
    webviewRef.current?.openDevTools()
  }

  return (
    <div className="flex flex-col h-full min-h-0 bg-card border border-border rounded overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-card border-b border-border shrink-0">
        <span className="text-sm text-foreground truncate flex-1" title={title}>
          {title}
        </span>
        <div className="flex items-center gap-1 ml-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            title="새로고침"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleBack} title="뒤로">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleForward}
            title="앞으로"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDevTools}
            title="개발자 도구"
          >
            <Wrench className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <webview
        ref={webviewRef}
        src={url}
        partition="persist:frameset"
        useragent={userAgent}
        // @ts-expect-error Electron webview attribute
        allowpopups="true"
        webpreferences="contextIsolation=no"
      />
    </div>
  )
}

export function EmptyCell() {
  return (
    <div className="flex items-center justify-center h-full bg-card border border-border rounded">
      <span className="text-muted-foreground">사이트를 추가하세요</span>
    </div>
  )
}
