const findEntryByDay = (entries, day) => entries.find((e) => e.day === day)
export const filterEntryByDay = (entries, day) =>
  entries.filter((e) => e.day !== day)

export function addRecord(entries, day, record) {
  const entry = findEntryByDay(entries, day)
  if (!entry) return entries

  const { records, id } = entry
  const newEntry = {
    ...entry,
    records: [...records, record],
    id: id ? id : record.entryId,
  }
  return [...filterEntryByDay(entries, day), newEntry]
}

export function removeRecord(entries, day, recordId) {
  const entry = findEntryByDay(entries, day)
  const newEntry = {
    ...entry,
    records: entry.records.filter((r) => r.id !== recordId),
  }
  return [...filterEntryByDay(entries, day), newEntry]
}
