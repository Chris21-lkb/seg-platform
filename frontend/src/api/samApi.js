import { api } from "./client"

export async function runSAMFromBox(file, box) {
  // box = [x1,y1,x2,y2] in ORIGINAL image coords
  const [x1, y1, x2, y2] = box

  const form = new FormData()
  form.append("image", file)
  form.append("x1", String(x1))
  form.append("y1", String(y1))
  form.append("x2", String(x2))
  form.append("y2", String(y2))

  const res = await api.post("/sam/segment", form)
  return res.data // { mask_base64: "..." }
}