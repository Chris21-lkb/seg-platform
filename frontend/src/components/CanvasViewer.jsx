import { useApp } from "../state/store"

export default function CanvasViewer() {
  const { imageUrl } = useApp()

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl h-[600px] flex items-center justify-center overflow-hidden">

      {!imageUrl && (
        <span className="text-gray-500">
          Canvas + Mask Overlay will render here
        </span>
      )}

      {imageUrl && (
        <img
          src={imageUrl}
          alt="preview"
          className="max-h-full max-w-full object-contain"
        />
      )}

    </div>
  )
}