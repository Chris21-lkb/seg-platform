import { createContext, useContext, useState } from "react"

const AppCtx = createContext()

export function AppProvider({ children }) {
  const [mode, setMode] = useState("seg")
  const [imageUrl, setImageUrl] = useState(null)

  return (
    <AppCtx.Provider value={{
      mode,
      setMode,
      imageUrl,
      setImageUrl
    }}>
      {children}
    </AppCtx.Provider>
  )
}

export function useApp() {
  return useContext(AppCtx)
}