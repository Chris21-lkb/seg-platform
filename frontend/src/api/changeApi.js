import { api } from "./client"

export async function runChange(before, after) {
  const form = new FormData()
  form.append("before", before)
  form.append("after", after)

  const res = await api.post("/change/run", form)
  return res.data
}