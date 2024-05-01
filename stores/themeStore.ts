import { create } from 'zustand'

type ThemeStore = {
  menuOpen: boolean
  setMenuOpen: (menuOpen: boolean) => void
  introVisible: boolean
  setIntroVisible: (introVisible: boolean) => void
  processWidth: number
  setProcessWidth: (processWidth: number) => void
  isHoveringCaseStudy: boolean
  setIsHoveringCaseStudy: (isHoveringCaseStudy: boolean) => void
  isHoveringHeroImage: boolean
  setIsHoveringHeroImage: (isHoveringHeroImage: boolean) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  menuOpen: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  introVisible: true,
  setIntroVisible: (introVisible) => set({ introVisible }),
  processWidth: 0,
  setProcessWidth: (processWidth) => set({ processWidth }),
  isHoveringCaseStudy: false,
  setIsHoveringCaseStudy: (isHoveringCaseStudy) => set({ isHoveringCaseStudy }),
  isHoveringHeroImage: false,
  setIsHoveringHeroImage: (isHoveringHeroImage) => set({ isHoveringHeroImage }),
}))
