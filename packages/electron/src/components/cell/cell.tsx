import { useRef, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  RefreshCw,
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
  Lock,
  Plus,
} from 'lucide-react'
import type { CellProps } from './cell.types'

export function Cell({ url, index, userAgent }: CellProps) {
  const webviewRef = useRef<Electron.WebviewTag>(null)
  const [currentUrl, setCurrentUrl] = useState(url)
  const [isLoading, setIsLoading] = useState(true)
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)

  const hostname = (() => {
    try {
      return new URL(currentUrl).hostname
    } catch {
      return currentUrl
    }
  })()

  const isSecure = currentUrl.startsWith('https://')

  useEffect(() => {
    const webview = webviewRef.current
    if (!webview) return

    const handleNavigation = () => {
      setCurrentUrl(webview.getURL())
      setCanGoBack(webview.canGoBack())
      setCanGoForward(webview.canGoForward())
    }

    const handleStartLoading = () => setIsLoading(true)
    const handleStopLoading = () => {
      setIsLoading(false)
      handleNavigation()
    }

    webview.addEventListener('did-navigate', handleNavigation)
    webview.addEventListener('did-navigate-in-page', handleNavigation)
    webview.addEventListener('did-start-loading', handleStartLoading)
    webview.addEventListener('did-stop-loading', handleStopLoading)

    return () => {
      webview.removeEventListener('did-navigate', handleNavigation)
      webview.removeEventListener('did-navigate-in-page', handleNavigation)
      webview.removeEventListener('did-start-loading', handleStartLoading)
      webview.removeEventListener('did-stop-loading', handleStopLoading)
    }
  }, [])

  const handleRefresh = () => {
    if (isLoading) {
      webviewRef.current?.stop()
    } else {
      webviewRef.current?.reload()
    }
  }

  const handleBack = () => {
    webviewRef.current?.goBack()
  }

  const handleForward = () => {
    webviewRef.current?.goForward()
  }

  const handleDevTools = () => {
    webviewRef.current?.openDevTools()
  }

  return (
    <div className="flex flex-col h-full min-h-0 bg-background rounded-lg overflow-hidden">
      <div className="flex items-center gap-1 px-2 py-1.5 bg-card shrink-0">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className={`h-7 w-7 ${canGoBack ? 'text-muted-foreground hover:text-foreground' : 'text-muted opacity-40'}`}
            onClick={handleBack}
            disabled={!canGoBack}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-7 w-7 ${canGoForward ? 'text-muted-foreground hover:text-foreground' : 'text-muted opacity-40'}`}
            onClick={handleForward}
            disabled={!canGoForward}
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex-1 flex items-center gap-2 bg-surface rounded-md px-3 py-1.5 mx-1">
          {isSecure && <Lock className="h-3 w-3 text-muted-foreground shrink-0" />}
          <span className="text-xs text-muted-foreground truncate">
            {hostname}
          </span>
        </div>

        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={handleRefresh}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={handleDevTools}
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
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
    <div className="flex flex-col items-center justify-center h-full bg-card rounded-lg gap-3">
      <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center">
        <Plus className="h-6 w-6 text-muted-foreground" />
      </div>
      <span className="text-sm text-muted-foreground">Add a site from sidebar</span>
    </div>
  )
}
