import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  sites: string[]
  splitCount: number
  mobileView: boolean
  adBlock: boolean
  customFilters: string

  addSite: (url: string) => boolean
  removeSite: (index: number) => void
  moveSite: (fromIndex: number, toIndex: number) => void
  setSplitCount: (count: number) => void
  setMobileView: (enabled: boolean) => void
  setAdBlock: (enabled: boolean) => void
  setCustomFilters: (filters: string) => void
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      sites: ['https://news.ycombinator.com', 'https://github.com'],
      splitCount: 2,
      mobileView: true,
      adBlock: true,
      customFilters: '',

      addSite: (url: string) => {
        let normalizedUrl = url.trim()

        if (!normalizedUrl) return false

        if (
          !normalizedUrl.startsWith('http://') &&
          !normalizedUrl.startsWith('https://')
        ) {
          normalizedUrl = 'https://' + normalizedUrl
        }

        try {
          new URL(normalizedUrl)

          set((state) => ({
            sites: [...state.sites, normalizedUrl],
          }))

          return true
        } catch {
          return false
        }
      },

      removeSite: (index: number) => {
        set((state) => ({
          sites: state.sites.filter((_, i) => i !== index),
        }))
      },

      moveSite: (fromIndex: number, toIndex: number) => {
        set((state) => {
          if (
            toIndex < 0 ||
            toIndex >= state.sites.length ||
            fromIndex === toIndex
          ) {
            return state
          }

          const newSites = [...state.sites]
          const [moved] = newSites.splice(fromIndex, 1)

          newSites.splice(toIndex, 0, moved)

          return {
            sites: newSites,
          }
        })
      },

      setSplitCount: (count: number) => {
        set({ splitCount: count })
      },

      setMobileView: (enabled: boolean) => {
        set({ mobileView: enabled })
      },

      setAdBlock: (enabled: boolean) => {
        set({ adBlock: enabled })
      },

      setCustomFilters: (filters: string) => {
        set({ customFilters: filters })
      },
    }),
    {
      name: 'frameset-settings',
    }
  )
)
