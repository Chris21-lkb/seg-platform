import { useApp } from "../state/store"
import { useState } from "react"

export default function UploadPanel() {
  const { mode, setImageUrl } = useApp()
  const [file, setFile] = useState(null)

  function handleChange(e) {
    const f = e.target.files[0]
    if (!f) return

    setFile(f)
    const url = URL.createObjectURL(f)
    setImageUrl(url)
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <h2 className="font-semibold mb-3">Input ({mode})</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full text-sm text-gray-300"
      />

      <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded-lg">
        Run
      </button>

      {file && (
        <p className="text-xs text-gray-400 mt-2">
          {file.name}
        </p>
      )}
    </div>
  )
}