export interface SidebarProps {
  sites: string[]
  splitCount: number
  mobileView: boolean
  adBlock: boolean
  onAddSite: (url: string) => boolean
  onRemoveSite: (index: number) => void
  onMoveSite: (fromIndex: number, toIndex: number) => void
  onSplitCountChange: (count: number) => void
  onMobileViewChange: (enabled: boolean) => void
  onAdBlockChange: (enabled: boolean) => void
  onOpenFilters: () => void
}
