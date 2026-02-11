import { api } from "./client"

export async function runSAM(payload) {
  const res = await api.post("/sam/segment", payload)
  return res.data
}