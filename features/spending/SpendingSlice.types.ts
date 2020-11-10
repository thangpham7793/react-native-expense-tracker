export type SpendingItem = {
  amount: number
  note: string
  date: Date
  id?: string
}

export type Category = BaseCategory | string

export type BaseCategory =
  | "groceries"
  | "eating out"
  | "entertainment"
  | "bills"
  | "others"

export type CategoryState = {
  spendingHistory: SpendingItem[] | []
  budget: number
}

export type SpendingState = {
  [T in Category]: CategoryState
}

export type SetCategoryBudget = {
  category: Category
  budget: number
}

export type AddItem = {
  category: Category
  spendingItem: SpendingItem
}

export type DeleteItem = {
  category: Category
  spendingItemId: string
}

export type UpdateItem = {
  category: Category
  updatedSpendingItem: SpendingItem
}
