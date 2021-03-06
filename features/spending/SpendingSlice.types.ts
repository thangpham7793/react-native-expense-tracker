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
  spendingHistory: SpendingItem[]
  weeklyBudget: number
}

export type SpendingState = {
  firstTimeUser: boolean
  categories: Categories
}

export type Categories = {
  [T in Category]: CategoryState
}

export type UserInputCategories = {
  [T in Category]: {
    weeklyBudget: number | string //to accommodate user input as string
    spendingHistory?: SpendingItem[]
  }
}

export type UserInputErrors = {
  [T in Category]: boolean | undefined
}

export type SetCategoryBudget = {
  category: Category
  weeklyBudget: number
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

export type AddCategory = {
  category: Category
  weeklyBudget: number
}
export type DeleteCategory = {
  category: Category
}
export type UpdateCategory = {
  currentCategory: Category
  updatedCategory: Category
  updatedBudget?: number
}
