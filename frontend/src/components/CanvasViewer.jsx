import { Stage, Layer, Image as KImage, Rect } from "react-konva"
import { useEffect, useRef, useState } from "react"
import { useApp } from "../state/store"

const STAGE_W = 900
const STAGE_H = 600

export default function CanvasViewer() {
  const { imageUrl, setBox, maskUrl } = useApp()

  const [img, setImg] = useState(null)
  const [maskImg, setMaskImg] = useState(null)
  const [rect, setRect] = useState(null)
  const [scale, setScale] = useState(1)

  const startRef = useRef(null)

  // load main image + compute fit scale
  useEffect(() => {
    if (!imageUrl) {
      setImg(null)
      setRect(null)
      startRef.current = null
      return
    }

    const i = new window.Image()
    i.src = imageUrl
    i.onload = () => {
      const s = Math.min(STAGE_W / i.width, STAGE_H / i.height)
      setScale(s)
      setImg(i)
    }
  }, [imageUrl])

  // load mask image when returned
  useEffect(() => {
    if (!maskUrl) {
      setMaskImg(null)
      return
    }
    const m = new window.Image()
    m.src = maskUrl
    m.onload = () => setMaskImg(m)
  }, [maskUrl])

  function handleDown(e) {
    if (!img) return
    const pos = e.target.getStage().getPointerPosition()
    startRef.current = pos
    setRect({ x: pos.x, y: pos.y, width: 0, height: 0 })
  }

  function handleMove(e) {
    if (!startRef.current) return
    const pos = e.target.getStage().getPointerPosition()
    setRect({
      x: startRef.current.x,
      y: startRef.current.y,
      width: pos.x - startRef.current.x,
      height: pos.y - startRef.current.y,
    })
  }

  function handleUp() {
    if (!rect) return
    startRef.current = null

    // map stage coords -> original image coords
    const x1 = Math.round(rect.x / scale)
    const y1 = Math.round(rect.y / scale)
    const x2 = Math.round((rect.x + rect.width) / scale)
    const y2 = Math.round((rect.y + rect.height) / scale)

    const boxCoords = [x1, y1, x2, y2]
    setBox(boxCoords)
    console.log("SAM BOX (orig coords):", boxCoords)
  }

  if (!imageUrl) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl h-[600px] flex items-center justify-center">
        <span className="text-gray-500">Upload image to start</span>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-2 overflow-hidden">
      <Stage
        width={STAGE_W}
        height={STAGE_H}
        onMouseDown={handleDown}
        onMouseMove={handleMove}
        onMouseUp={handleUp}
      >
        <Layer>
          {img && <KImage image={img} scaleX={scale} scaleY={scale} />}

          {/* mask overlay (same scale), add opacity */}
          {maskImg && (
            <KImage image={maskImg} scaleX={scale} scaleY={scale} opacity={0.45} />
          )}

          {rect && <Rect {...rect} stroke="lime" strokeWidth={2} />}
        </Layer>
      </Stage>
    </div>
  )
}