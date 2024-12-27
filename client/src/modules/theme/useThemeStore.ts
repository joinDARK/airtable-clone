import {create} from "zustand"

interface ThemeState {
  isDark: boolean // Тип состояния
  setAltTheme: () => void // Тип функции изменения состояния
}

const useThemeStore = create<ThemeState>((set, get) => ({
  isDark: true,
  setAltTheme: () => {
    if (!get().isDark) {
      document.documentElement.classList.add("dark")
      set({isDark: true})
    } else {
      document.documentElement.classList.remove("dark")
      set({isDark: false})
    }
  },
}))

export default useThemeStore
