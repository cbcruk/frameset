import { Cell, EmptyCell } from '../cell/cell'
import type { GridProps } from './grid.types'
import { MOBILE_USER_AGENT, DESKTOP_USER_AGENT } from './grid.constants'

export function Grid({ sites, splitCount, mobileView }: GridProps) {
  const visibleSites = sites.slice(0, splitCount)
  const userAgent = mobileView ? MOBILE_USER_AGENT : DESKTOP_USER_AGENT
  const emptyCells = Math.max(0, splitCount - visibleSites.length)

  return (
    <div
      className="flex-1 grid gap-1 p-1 overflow-hidden"
      style={{
        gridTemplateColumns: `repeat(${splitCount}, 1fr)`,
        gridTemplateRows: '1fr',
      }}
    >
      {visibleSites.map((url, index) => (
        <Cell
          key={`${url}-${index}`}
          url={url}
          index={index}
          userAgent={userAgent}
        />
      ))}
      {Array.from({ length: emptyCells }).map((_, index) => (
        <EmptyCell key={`empty-${index}`} />
      ))}
    </div>
  )
}
