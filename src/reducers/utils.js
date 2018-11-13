export function immutableMerge(base, incoming) {
  return Array.isArray(incoming)
    ? immutableMergeArray(base, incoming)
    : immutableMergeItem(base, incoming)
}

export function immutableMergeItem(array, item) {
  if (!item) return array
  const filtered = array.filter((i) => i.day !== item.day)
  return [...filtered, item]
}

export function immutableMergeArray(base, incoming) {
  const incValues = incoming.map((i) => i.day)
  const unchanged = base.filter((i) => !incValues.includes(i.day))
  return [].concat(unchanged, incoming)
}
