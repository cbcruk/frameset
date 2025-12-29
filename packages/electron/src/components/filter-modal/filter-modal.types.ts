export interface FramesetAPI {
  addCustomFilter: (filter: string) => Promise<boolean>
  getBlockStats: () => Promise<{ blocked: number }>
}

export interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  filters: string
  onSave: (filters: string) => void
}
