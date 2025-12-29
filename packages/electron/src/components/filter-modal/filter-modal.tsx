import { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import type { FramesetAPI, FilterModalProps } from './filter-modal.types'

export function FilterModal({
  isOpen,
  onClose,
  filters,
  onSave,
}: FilterModalProps) {
  const [value, setValue] = useState(filters)

  useEffect(() => {
    setValue(filters)
  }, [filters, isOpen])

  const handleSave = async () => {
    onSave(value)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const frameset = (window as any).frameset as FramesetAPI | undefined

    if (frameset) {
      await frameset.addCustomFilter(value)
    }

    onClose()

    alert('커스텀 필터가 저장되었습니다. 새로고침 후 적용됩니다.')
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-card border border-border rounded-lg w-[500px] max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-medium text-foreground">
            커스텀 광고 필터
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 flex-1 overflow-auto">
          <p className="text-sm text-muted-foreground mb-3">
            한 줄에 하나씩 필터 규칙을 입력하세요. uBlock Origin/AdBlock Plus
            형식을 지원합니다.
          </p>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full h-64 bg-input border border-border rounded p-3 text-sm text-foreground font-mono resize-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="||example.com^&#10;##.ad-banner&#10;@@||trusted-site.com^"
          />
        </div>
        <div className="flex justify-end gap-2 p-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </div>
      </div>
    </div>
  )
}
