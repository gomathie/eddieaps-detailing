/**
 * Several columns store JSON arrays as text. Malformed data shouldn't take an
 * endpoint down, so parse defensively and fall back to an empty list.
 */
export const parseJsonArray = <T>(value: string | null | undefined): T[] => {
  if (!value) return []
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed as T[] : []
  } catch {
    return []
  }
}
