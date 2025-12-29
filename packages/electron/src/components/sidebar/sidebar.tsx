import { useState } from 'react'
import { Button } from '../ui/button'
import { Switch } from '../ui/switch'
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Plus,
  X,
  Globe,
  Settings,
} from 'lucide-react'
import type { SidebarProps } from './sidebar.types'
import { getHostname, getFaviconUrl } from './sidebar.utils'

export function Sidebar({
  sites,
  splitCount,
  mobileView,
  adBlock,
  onAddSite,
  onRemoveSite,
  onMoveSite,
  onSplitCountChange,
  onMobileViewChange,
  onAdBlockChange,
  onOpenFilters,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [newUrl, setNewUrl] = useState('')
  const [showSettings, setShowSettings] = useState(false)

  const handleAddSite = () => {
    if (onAddSite(newUrl)) {
      setNewUrl('')
    } else if (newUrl.trim()) {
      alert('유효한 URL을 입력하세요.')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSite()
    }
  }

  if (collapsed) {
    return (
      <div className="w-12 bg-card flex flex-col items-center py-3 gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => setCollapsed(false)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="w-60 bg-card flex flex-col h-full">
      <div className="p-3">
        <div className="flex items-center gap-2 bg-surface rounded-lg px-3 py-2">
          <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search or enter URL"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {newUrl && (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 text-muted-foreground hover:text-foreground"
              onClick={handleAddSite}
            >
              <Plus className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      <div className="px-3 py-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Tabs</span>
          <span className="text-muted">{sites.length}</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-2">
        <div className="space-y-0.5">
          {sites.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-surface-hover group cursor-default"
            >
              <img
                src={getFaviconUrl(url)}
                alt=""
                className="h-4 w-4 rounded shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <span className="text-sm text-foreground truncate flex-1">
                {getHostname(url)}
              </span>
              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-5 w-5 ${index === 0 ? 'text-muted opacity-40' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => onMoveSite(index, index - 1)}
                  disabled={index === 0}
                >
                  <ChevronUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-5 w-5 ${index === sites.length - 1 ? 'text-muted opacity-40' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => onMoveSite(index, index + 1)}
                  disabled={index === sites.length - 1}
                >
                  <ChevronDown className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-muted-foreground hover:text-foreground"
                  onClick={() => onRemoveSite(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => document.querySelector<HTMLInputElement>('input')?.focus()}
          className="flex items-center gap-2 w-full px-2 py-1.5 mt-1 rounded-md text-muted-foreground hover:bg-surface-hover hover:text-foreground transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm">New Tab</span>
        </button>
      </div>

      {showSettings && (
        <div className="border-t border-border p-3 space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">
              Split View
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((count) => (
                <button
                  key={count}
                  className={`flex-1 py-1.5 text-xs rounded-md transition-colors ${
                    splitCount === count
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-surface text-muted-foreground hover:bg-surface-hover hover:text-foreground'
                  }`}
                  onClick={() => onSplitCountChange(count)}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs text-foreground">Mobile View</label>
            <Switch checked={mobileView} onCheckedChange={onMobileViewChange} />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs text-foreground">Ad Block</label>
            <Switch checked={adBlock} onCheckedChange={onAdBlockChange} />
          </div>

          <button
            onClick={onOpenFilters}
            className="w-full py-1.5 text-xs text-muted-foreground bg-surface rounded-md hover:bg-surface-hover hover:text-foreground transition-colors"
          >
            Custom Filters
          </button>
        </div>
      )}

      <div className="flex items-center justify-between p-2 border-t border-border">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => setCollapsed(true)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${showSettings ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={handleAddSite}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
