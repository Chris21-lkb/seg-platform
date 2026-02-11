import { createContext, useContext, useState } from "react"

const AppCtx = createContext(null)

export function AppProvider({ children }) {
  const [mode, setMode] = useState("seg")

  // image preview URL
  const [imageUrl, setImageUrl] = useState(null)

  // keep the actual File so we can send it to backend
  const [imageFile, setImageFile] = useState(null)

  // SAM box [x1,y1,x2,y2] in ORIGINAL image coords
  const [box, setBox] = useState(null)

  // mask overlay as data URL (png)
  const [maskUrl, setMaskUrl] = useState(null)

  const value = {
    mode,
    setMode,
    imageUrl,
    setImageUrl,
    imageFile,
    setImageFile,
    box,
    setBox,
    maskUrl,
    setMaskUrl,
  }

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error("useApp must be used inside AppProvider")
  return ctx
}
