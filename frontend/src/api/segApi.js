import { api } from "./client"

export async function runSegmentation(file) {
  const form = new FormData()
  form.append("image", file)

  const res = await api.post("/segmentation/run", form)
  return res.data
}