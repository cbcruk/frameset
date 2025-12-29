import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Plus,
  X,
  Filter,
} from 'lucide-react'
import type { SidebarProps } from './sidebar.types'
import { getHostname } from './sidebar.utils'

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

  const handleAddSite = () => {
    if (onAddSite(newUrl)) {
      setNewUrl('')
    } else if (newUrl.trim()) {
      alert('유효한 URL을 입력하세요.')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSite()
    }
  }

  if (collapsed) {
    return (
      <div className="w-10 bg-card border-r border-border flex flex-col items-center py-2">
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(false)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h1 className="text-lg font-semibold text-foreground">Frameset</h1>
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(true)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-3 border-b border-border">
        <div className="flex gap-2">
          <Input
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="URL 입력..."
            className="flex-1"
          />
          <Button size="icon" onClick={handleAddSite}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3">
        <div className="space-y-1">
          {sites.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="flex items-center gap-1 px-2 py-1.5 rounded hover:bg-secondary group"
            >
              <span
                className="text-sm text-foreground truncate flex-1"
                title={url}
              >
                {getHostname(url)}
              </span>
              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => onMoveSite(index, index - 1)}
                  disabled={index === 0}
                >
                  <ChevronUp className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => onMoveSite(index, index + 1)}
                  disabled={index === sites.length - 1}
                >
                  <ChevronDown className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => onRemoveSite(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-border space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">
            화면 분할
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((count) => (
              <Button
                key={count}
                variant={splitCount === count ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => onSplitCountChange(count)}
              >
                {count}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-foreground">모바일 뷰</label>
          <Switch checked={mobileView} onCheckedChange={onMobileViewChange} />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-foreground">광고 차단</label>
          <Switch checked={adBlock} onCheckedChange={onAdBlockChange} />
        </div>

        <Button variant="outline" className="w-full" onClick={onOpenFilters}>
          <Filter className="h-4 w-4 mr-2" />
          커스텀 필터
        </Button>
      </div>
    </div>
  )
}
