import { useApp } from "../state/store"

export default function ModeTabs() {
  const { mode, setMode } = useApp()

  const tabs = [
    { key: "seg", label: "Single Segmentation" },
    { key: "change", label: "Change Detection" },
    { key: "sam", label: "Interactive SAM" },
  ]

  return (
    <div className="flex gap-3 p-4 border-b border-gray-800">
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => setMode(t.key)}
          className={`px-4 py-2 rounded-lg text-sm
            ${mode === t.key
              ? "bg-indigo-600"
              : "bg-gray-800 hover:bg-gray-700"}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}