import { useState } from 'react'
import { Sidebar } from '../sidebar/sidebar'
import { Grid } from '../grid/grid'
import { FilterModal } from '../filter-modal/filter-modal'
import { useSettings } from '../../hooks/use-settings'

export function App() {
  const {
    sites,
    splitCount,
    mobileView,
    adBlock,
    customFilters,
    addSite,
    removeSite,
    moveSite,
    setSplitCount,
    setMobileView,
    setAdBlock,
    setCustomFilters,
  } = useSettings()
  const [filterModalOpen, setFilterModalOpen] = useState(false)

  return (
    <div className="flex h-full overflow-hidden bg-background">
      <Sidebar
        sites={sites}
        splitCount={splitCount}
        mobileView={mobileView}
        adBlock={adBlock}
        onAddSite={addSite}
        onRemoveSite={removeSite}
        onMoveSite={moveSite}
        onSplitCountChange={setSplitCount}
        onMobileViewChange={setMobileView}
        onAdBlockChange={setAdBlock}
        onOpenFilters={() => setFilterModalOpen(true)}
      />
      <Grid sites={sites} splitCount={splitCount} mobileView={mobileView} />
      <FilterModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        filters={customFilters}
        onSave={setCustomFilters}
      />
    </div>
  )
}
