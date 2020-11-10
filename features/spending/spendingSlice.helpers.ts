import { AddItem, SpendingItem } from "./SpendingSlice.types"

export function addId(newItem: AddItem) {
  newItem.spendingItem.id = `${
    newItem.category
  }-${newItem.spendingItem.date.getTime()}`
  return newItem
}

export function getItemIndex(
  spendingHistory: SpendingItem[],
  targetItem: SpendingItem
) {
  return spendingHistory.findIndex((item) => (item.id = targetItem.id))
}

export function updateItem(
  spendingHistory: SpendingItem[],
  targetItem: SpendingItem
) {
  const targetItemIndex = getItemIndex(spendingHistory, targetItem)
  spendingHistory[targetItemIndex] = targetItem
}

export function deleteItem(
  spendingHistory: SpendingItem[],
  spendingItemId: string
) {
  const targetItemIndex = spendingHistory.findIndex(
    (item) => item.id === spendingItemId
  )
  spendingHistory.splice(targetItemIndex, 1)
}

export function compareByDateAscending(a: Date, b: Date): number {
  return a < b ? 1 : -1
}

export function compareByDateDescending(a: Date, b: Date): number {
  return a > b ? 1 : -1
}

export function calculateTotalSpentBudget(spendingHistory: SpendingItem[]) {
  return spendingHistory.reduce(
    (total: number, { amount }: SpendingItem) => total + amount,
    0
  )
}
