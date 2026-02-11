import { useState } from "react"
import { useApp } from "../state/store"
import { runSAMFromBox } from "../api/samApi"

export default function UploadPanel() {
  const {
    mode,
    imageUrl,
    setImageUrl,
    imageFile,
    setImageFile,
    box,
    maskUrl,
    setMaskUrl,
  } = useApp()

  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState(null)

  function handleChange(e) {
    const f = e.target.files?.[0]
    if (!f) return

    // reset old results
    setErr(null)
    setMaskUrl(null)

    setImageFile(f)
    setImageUrl(URL.createObjectURL(f))
  }

  async function handleRun() {
    setErr(null)

    if (mode !== "sam") {
      setErr("Switch to 'Interactive SAM' tab to run SAM.")
      return
    }
    if (!imageFile) {
      setErr("Upload an image first.")
      return
    }
    if (!box) {
      setErr("Draw a rectangle (box) on the image first.")
      return
    }

    try {
      setBusy(true)
      const data = await runSAMFromBox(imageFile, box)

      if (!data?.mask_base64) {
        throw new Error("No mask returned from server.")
      }

      // Convert base64 png -> data URL for rendering
      setMaskUrl(`data:image/png;base64,${data.mask_base64}`)
    } catch (e) {
      setErr(e?.message ?? "Failed to run SAM.")
    } finally {
      setBusy(false)
    }
  }

  const canRun = mode === "sam" && !!imageFile && !!box && !busy

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <h2 className="font-semibold mb-3">Input ({mode})</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full text-sm text-gray-300"
      />

      <button
        onClick={handleRun}
        disabled={!canRun}
        className={`mt-4 w-full py-2 rounded-lg ${
          canRun
            ? "bg-indigo-600 hover:bg-indigo-500"
            : "bg-gray-700 cursor-not-allowed"
        }`}
      >
        {busy ? "Running..." : "Run"}
      </button>

      {imageFile && (
        <p className="text-xs text-gray-400 mt-2">{imageFile.name}</p>
      )}

      {box && (
        <p className="text-xs text-gray-400 mt-2">
          Box: [{box.join(", ")}]
        </p>
      )}

      {maskUrl && (
        <p className="text-xs text-green-400 mt-2">Mask ready ✅</p>
      )}

      {err && (
        <p className="text-xs text-red-400 mt-2">{err}</p>
      )}
    </div>
  )
}
